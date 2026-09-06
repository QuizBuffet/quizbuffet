#!/usr/bin/env node
// Scans every generated index.html page (live cert landing pages, their
// domain quiz pages, and coming-soon landing pages) and reports:
//   1. Exact-duplicate <title> values shared by 2+ URLs (HIGH — Google
//      Search Console "Duplicate, Google chose different canonical" bait).
//   2. Exact-duplicate meta description values shared by 2+ URLs (HIGH).
//   3. Templated-but-technically-unique titles/descriptions: pages whose
//      text is identical once the cert/domain name is masked out (LOW/INFO
//      — expected for a template-driven site, but flagged because
//      helpful-content systems can detect programmatic templating at scale).
//
// Page set mirrors scripts/build-seo.mjs exactly:
//   - <slug>/index.html            for every live cert in certifications[]
//   - <slug>/<domain-slug>/index.html for every domain of every live cert
//   - <slug>/index.html            for every entry in data/coming-soon.json
//
// Run: node scripts/check-seo-duplicates.mjs
// Exit code 0 if no exact duplicates, 1 if any exact duplicates found.

import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { certifications } from '../js/data/certifications/index.js';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

function extractTitle(html) {
  const m = html.match(/<title>([\s\S]*?)<\/title>/i);
  return m ? m[1].trim() : null;
}

function extractDescription(html) {
  // Matches name="description" content="..." regardless of attribute order.
  const m = html.match(/<meta\s+(?=[^>]*name=["']description["'])[^>]*content=["']([\s\S]*?)["'][^>]*>/i);
  return m ? m[1].trim() : null;
}

function decodeEntities(s) {
  return s
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

// Build the list of pages we expect build-seo.mjs to have generated.
const pages = []; // { url, filePath, kind, certSlug, domainSlug, certName, domainName }

for (const cert of certifications) {
  pages.push({
    url: `/${cert.slug}/`,
    filePath: join(ROOT, cert.slug, 'index.html'),
    kind: 'cert',
    certSlug: cert.slug,
    certName: cert.name,
    domainSlug: null,
    domainName: null,
  });
  for (const dom of cert.domains) {
    pages.push({
      url: `/${cert.slug}/${dom.slug}/`,
      filePath: join(ROOT, cert.slug, dom.slug, 'index.html'),
      kind: 'domain',
      certSlug: cert.slug,
      certName: cert.name,
      domainSlug: dom.slug,
      domainName: dom.name,
    });
  }
}

const comingSoonPath = join(ROOT, 'data', 'coming-soon.json');
if (existsSync(comingSoonPath)) {
  const comingSoon = JSON.parse(readFileSync(comingSoonPath, 'utf8'));
  for (const cert of comingSoon) {
    pages.push({
      url: `/${cert.slug}/`,
      filePath: join(ROOT, cert.slug, 'index.html'),
      kind: 'coming-soon',
      certSlug: cert.slug,
      certName: cert.name,
      domainSlug: null,
      domainName: null,
    });
  }
}

// Read each page and pull title/description.
const records = [];
let missing = 0;
for (const p of pages) {
  if (!existsSync(p.filePath)) {
    missing++;
    console.error(`  ! missing file: ${p.filePath}`);
    continue;
  }
  const html = readFileSync(p.filePath, 'utf8');
  const title = extractTitle(html);
  const description = extractDescription(html) ? decodeEntities(extractDescription(html)) : null;
  records.push({ ...p, title, description });
}

// --- 1 & 2: exact duplicates ---------------------------------------------
function groupByExact(field) {
  const map = new Map();
  for (const r of records) {
    const val = r[field];
    if (!val) continue;
    if (!map.has(val)) map.set(val, []);
    map.get(val).push(r);
  }
  return [...map.entries()].filter(([, list]) => list.length > 1);
}

const dupTitles = groupByExact('title');
const dupDescriptions = groupByExact('description');

// --- 3: templated-but-unique ------------------------------------------
// Mask the cert name and domain name out of each string; if two different
// pages collapse to the identical skeleton (but were NOT already caught as
// an exact duplicate above), it's the "same template, different plug-in"
// pattern the task asks about.
function maskVariable(text, r) {
  let out = text;
  const variables = [r.certName, r.domainName].filter(Boolean);
  // Longest first so a domain name that contains part of the cert name
  // (or vice versa) doesn't leave a partial mask behind.
  variables.sort((a, b) => b.length - a.length);
  for (const v of variables) {
    if (!v) continue;
    out = out.split(v).join('{{VAR}}');
  }
  // Also mask exam codes like CLF-C02 / short acronyms embedded via cert code.
  return out;
}

function groupTemplates(field) {
  const map = new Map();
  for (const r of records) {
    const val = r[field];
    if (!val) continue;
    const skeleton = maskVariable(val, r);
    if (skeleton === val) continue; // nothing was masked — not a template hit
    if (!map.has(skeleton)) map.set(skeleton, []);
    map.get(skeleton).push(r);
  }
  return [...map.entries()].filter(([, list]) => {
    // Only interesting if the underlying raw strings actually differ
    // (otherwise groupByExact already reported it).
    const uniqueRaw = new Set(list.map(r => r[field]));
    return list.length > 1 && uniqueRaw.size > 1;
  });
}

const templateTitles = groupTemplates('title');
const templateDescriptions = groupTemplates('description');

// --- report ---------------------------------------------------------------
function printGroup([val, list], field) {
  console.log(`\n  "${val}"`);
  for (const r of list) console.log(`    - ${r.url}  [${field} file: ${r.filePath.replace(ROOT + '/', '')}]`);
}

console.log(`Scanned ${records.length} generated page(s) (${records.length + missing} expected, ${missing} missing).`);
console.log(`  live certs: ${certifications.length}, domain pages: ${records.filter(r => r.kind === 'domain').length}, coming-soon: ${records.filter(r => r.kind === 'coming-soon').length}`);

console.log('\n=== 1. Exact-duplicate <title> ===');
if (dupTitles.length === 0) {
  console.log('  none found.');
} else {
  for (const g of dupTitles) printGroup(g, 'title');
}

console.log('\n=== 2. Exact-duplicate meta description ===');
if (dupDescriptions.length === 0) {
  console.log('  none found.');
} else {
  for (const g of dupDescriptions) printGroup(g, 'description');
}

console.log(`\n=== 3. Templated-but-unique titles (same skeleton, cert/domain name swapped) ===`);
console.log(`  ${templateTitles.length} skeleton pattern(s) shared by 2+ pages (this is expected on a template-driven site; flagged as a pattern only).`);
if (process.argv.includes('--verbose')) {
  for (const g of templateTitles.slice(0, 10)) printGroup(g, 'title');
  if (templateTitles.length > 10) console.log(`  ... and ${templateTitles.length - 10} more skeleton groups (--verbose truncated at 10)`);
}

console.log(`\n=== 3b. Templated-but-unique descriptions (same skeleton, cert/domain name swapped) ===`);
console.log(`  ${templateDescriptions.length} skeleton pattern(s) shared by 2+ pages (expected; flagged as a pattern only).`);
if (process.argv.includes('--verbose')) {
  for (const g of templateDescriptions.slice(0, 10)) printGroup(g, 'description');
  if (templateDescriptions.length > 10) console.log(`  ... and ${templateDescriptions.length - 10} more skeleton groups (--verbose truncated at 10)`);
}

const exactDupCount = dupTitles.length + dupDescriptions.length;
console.log(`\n${exactDupCount === 0 ? 'PASS' : 'FAIL'}: ${exactDupCount} exact-duplicate group(s) across title+description.`);

process.exit(exactDupCount > 0 || missing > 0 ? 1 : 0);
