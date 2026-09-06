// Regression guard for the generated site. Run before build:seo so a broken template,
// a missing OG image, or a reintroduced TODAY-stamp doesn't ship silently.
// Hard failures (exit 1): things that are always a code bug, never a legitimate state.
// Warnings (reported, do not fail): non-blocking findings.
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';

const ROOT = path.resolve(import.meta.dirname, '..');
const TODAY = new Date().toISOString().slice(0, 10);
const DASH_RE = /[–—]|&mdash;|&ndash;|&#8212;|&#8211;/;

const failures = [];
const warnings = [];

function loadDomainQuestions(certSlug, domainSlug) {
  const p = path.join(ROOT, 'data', 'certifications', certSlug, `${domainSlug}.json`);
  try { return JSON.parse(fs.readFileSync(p, 'utf8')).questions || []; }
  catch { return null; } // null = file missing, distinct from an empty array
}

function gitDate(relPath) {
  try {
    const dirty = execSync(`git status --porcelain -- "${relPath}"`, { cwd: ROOT }).toString().trim();
    if (dirty) return TODAY; // uncommitted right now: today is honest
    const d = execSync(`git log -1 --format=%cs -- "${relPath}"`, { cwd: ROOT }).toString().trim();
    return d || TODAY; // no history yet: brand new, today is honest
  } catch { return TODAY; }
}

const CERTS_DIR = path.join(ROOT, 'js', 'data', 'certifications');
const { order } = await import(pathToFileURL(path.join(CERTS_DIR, '_manifest.js')).href);
const certifications = await Promise.all(
  order.map(async slug => (await import(pathToFileURL(path.join(CERTS_DIR, `${slug}.js`)).href)).cert)
);

for (const cert of certifications) {
  const certDir = path.join(ROOT, cert.slug);
  const certHtmlPath = path.join(certDir, 'index.html');
  if (!fs.existsSync(certHtmlPath)) { failures.push(`${cert.slug}: no generated index.html`); continue; }
  const certHtml = fs.readFileSync(certHtmlPath, 'utf8');

  // 1. Every declared domain must have its JSON file (a missing file breaks the build).
  // Question counts are deliberately NOT audited: the question banks are final and out of
  // scope for this visibility work (owner decision 2026-09-06, see TODO.md and CLAUDE.md).
  for (const dom of cert.domains) {
    const qs = loadDomainQuestions(cert.slug, dom.slug);
    if (qs === null) failures.push(`${cert.slug}/${dom.slug}: domain JSON file missing`);
  }

  // 3. Cert page title must contain the cert's own name/seoName or code, not a stale/generic one.
  const titleMatch = certHtml.match(/<title>([^<]*)<\/title>/);
  const title = titleMatch ? titleMatch[1] : '';
  const nameForTitle = cert.seoName || cert.name;
  const titleHasIdentity = title.includes(nameForTitle) || title.includes(cert.code) ||
    nameForTitle.split(' ').some(w => w.length > 3 && title.includes(w));
  if (!title) failures.push(`${cert.slug}: generated page has no <title>`);
  else if (!titleHasIdentity) failures.push(`${cert.slug}: <title> "${title}" doesn't reference "${nameForTitle}" or "${cert.code}"`);

  // 4. Missing OG PNG.
  const certPng = path.join(ROOT, 'icons', 'og', `${cert.slug}.png`);
  if (!fs.existsSync(certPng)) failures.push(`${cert.slug}: missing icons/og/${cert.slug}.png`);

  // 5. Em-dash in generated HTML (cert page).
  if (DASH_RE.test(certHtml)) failures.push(`${cert.slug}/index.html: contains an em-dash or en-dash`);

  // 6. dateModified === TODAY when the underlying source is actually older (stale-freshness regression).
  const certJsPath = `js/data/certifications/${cert.slug}.js`;
  const realCertDate = gitDate(certJsPath);
  const dateModMatches = [...certHtml.matchAll(/"dateModified":\s*"(\d{4}-\d{2}-\d{2})"/g)].map(m => m[1]);
  if (dateModMatches.some(d => d === TODAY) && realCertDate !== TODAY) {
    failures.push(`${cert.slug}/index.html: dateModified is TODAY (${TODAY}) but ${certJsPath} last changed ${realCertDate}`);
  }

  for (const dom of cert.domains) {
    const domDir = path.join(certDir, dom.slug);
    const domHtmlPath = path.join(domDir, 'index.html');
    if (!fs.existsSync(domHtmlPath)) { failures.push(`${cert.slug}/${dom.slug}: no generated index.html`); continue; }
    const domHtml = fs.readFileSync(domHtmlPath, 'utf8');

    const domPng = path.join(ROOT, 'icons', 'og', `${cert.slug}-${dom.slug}.png`);
    if (!fs.existsSync(domPng)) failures.push(`${cert.slug}/${dom.slug}: missing icons/og/${cert.slug}-${dom.slug}.png`);

    if (DASH_RE.test(domHtml)) failures.push(`${cert.slug}/${dom.slug}/index.html: contains an em-dash or en-dash`);

    const domJsonPath = `data/certifications/${cert.slug}/${dom.slug}.json`;
    const realDomDate = gitDate(domJsonPath);
    const domDateMods = [...domHtml.matchAll(/"dateModified":\s*"(\d{4}-\d{2}-\d{2})"/g)].map(m => m[1]);
    if (domDateMods.some(d => d === TODAY) && realDomDate !== TODAY) {
      failures.push(`${cert.slug}/${dom.slug}/index.html: dateModified is TODAY (${TODAY}) but ${domJsonPath} last changed ${realDomDate}`);
    }
  }
}

console.log(`Audited ${certifications.length} live certs.\n`);

if (warnings.length) {
  console.log(`=== ${warnings.length} warning(s) (known content gaps, out of scope per TODO.md; not build-blocking) ===`);
  warnings.forEach(w => console.log('  -', w));
  console.log();
}

if (failures.length) {
  console.log(`=== ${failures.length} FAILURE(s) ===`);
  failures.forEach(f => console.log('  x', f));
  console.log();
  console.log('FAIL: fix the above before shipping.');
  process.exit(1);
}

console.log('PASS: no regressions found.');
