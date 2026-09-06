#!/usr/bin/env node
// Audit <link rel="canonical"> tags across every generated cert landing page
// (<slug>/index.html) and domain quiz page (<slug>/<domain-slug>/index.html)
// produced by scripts/build-seo.mjs.
//
// Checks, per CLAUDE.md SEO requirements:
//   1. Exactly one canonical tag per page.
//   2. The canonical is self-referential: it resolves to
//      https://quizbuffet.com/<path-of-this-file>/ — not a different page,
//      not the homepage, and not missing/adding a trailing slash.
//   3. No two different pages declare the same canonical URL (a collision
//      tells Google to consolidate/deindex one of them).
//   4. Protocol/host/trailing-slash form matches robots.txt / sitemap.xml
//      (https://quizbuffet.com/..., no http, no www).
//
// Pages are discovered by walking the filesystem directly (not by reading
// cert metadata), so the audit catches orphaned or stale generated files
// too, not just the pages the data layer currently expects.
//
// Usage: node scripts/check-canonicals.mjs
// Exit code 0 if clean, 1 if any finding was reported.

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, dirname, relative, sep } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://quizbuffet.com';

// Top-level directories that exist alongside cert directories but are not
// cert pages: build infrastructure, plus hand-built single pages that are
// documented exceptions in CLAUDE.md (privacy policy, CPA hub).
const EXCLUDED_TOP_LEVEL = new Set([
  'assets', 'css', 'data', 'docs', 'icons', 'js', 'scripts',
  'node_modules', '.git', '.github', '.claude',
  'privacy', 'cpa',
]);

function listDirs(dir) {
  return readdirSync(dir, { withFileTypes: true })
    .filter(e => e.isDirectory())
    .map(e => e.name);
}

function hasIndexHtml(dir) {
  try {
    return statSync(join(dir, 'index.html')).isFile();
  } catch {
    return false;
  }
}

// --- 1. Discover every candidate page -------------------------------------

const pages = []; // { relPath: 'slug/index.html' or 'slug/domain/index.html', type }

for (const top of listDirs(ROOT)) {
  if (EXCLUDED_TOP_LEVEL.has(top) || top.startsWith('.')) continue;
  const topDir = join(ROOT, top);
  if (!hasIndexHtml(topDir)) continue; // not a cert-shaped directory

  pages.push({ relPath: join(top, 'index.html'), type: 'cert' });

  for (const sub of listDirs(topDir)) {
    const subDir = join(topDir, sub);
    if (!hasIndexHtml(subDir)) continue;
    pages.push({ relPath: join(top, sub, 'index.html'), type: 'domain' });
  }
}

pages.sort((a, b) => a.relPath.localeCompare(b.relPath));

// --- 2. Extract canonical tag(s) from each page ----------------------------

const CANONICAL_TAG_RE = /<link\b[^>]*\brel=["']canonical["'][^>]*>/gi;
const HREF_RE = /\bhref=["']([^"']*)["']/i;

function expectedUrl(relPath) {
  // relPath is like "slug/index.html" or "slug/domain/index.html".
  const segments = relPath.split(sep);
  segments.pop(); // drop "index.html"
  return `${SITE}/${segments.join('/')}/`;
}

const findings = [];
const canonicalOwners = new Map(); // canonical URL -> [relPath, ...]

function addFinding(severity, relPath, message, value) {
  findings.push({ severity, file: relPath, message, value });
}

for (const page of pages) {
  const absPath = join(ROOT, page.relPath);
  const html = readFileSync(absPath, 'utf8');
  const tags = html.match(CANONICAL_TAG_RE) || [];
  const expected = expectedUrl(page.relPath);

  if (tags.length === 0) {
    addFinding('critical', page.relPath, 'No <link rel="canonical"> tag found (expected exactly one)', null);
    continue;
  }
  if (tags.length > 1) {
    const hrefs = tags.map(t => (t.match(HREF_RE) || [])[1] || '(no href)');
    addFinding('high', page.relPath, `Found ${tags.length} canonical tags, expected exactly one: ${hrefs.join(' | ')}`, hrefs);
  }

  // Evaluate every tag found (in case of duplicates with different hrefs,
  // every value needs checking, not just the first).
  const seenOnPage = new Set();
  for (const tag of tags) {
    const m = tag.match(HREF_RE);
    const href = m ? m[1] : '';
    if (seenOnPage.has(href)) continue;
    seenOnPage.add(href);

    if (!href) {
      addFinding('critical', page.relPath, 'Canonical tag has no href attribute', tag);
      continue;
    }

    // Protocol / host form checks, independent of exact-match, so the
    // report names *why* it's wrong (helps triage at scale).
    if (href.startsWith('http://')) {
      addFinding('high', page.relPath, `Canonical uses http:// instead of https://: ${href}`, href);
    } else if (/^https?:\/\/www\./i.test(href)) {
      addFinding('high', page.relPath, `Canonical uses www subdomain (sitemap/robots.txt use non-www): ${href}`, href);
    } else if (!href.startsWith(SITE + '/')) {
      addFinding('high', page.relPath, `Canonical points to an unexpected host/origin: ${href}`, href);
    }

    if (href.startsWith(SITE) && !href.endsWith('/') && !href.includes('?') && !href.includes('#')) {
      addFinding('medium', page.relPath, `Canonical is missing a trailing slash: ${href}`, href);
    }

    // Self-referential exact-match check.
    if (href !== expected) {
      addFinding('high', page.relPath, `Canonical is not self-referential — expected "${expected}" but found "${href}"`, href);
    }

    // Track for cross-page collision detection.
    if (!canonicalOwners.has(href)) canonicalOwners.set(href, []);
    canonicalOwners.get(href).push(page.relPath);
  }
}

// --- 3. Cross-page collisions -----------------------------------------------

for (const [url, owners] of canonicalOwners) {
  if (owners.length > 1) {
    addFinding('critical', owners.join(', '), `${owners.length} different pages declare the same canonical URL "${url}" — tells Google to consolidate/deindex all but one`, url);
  }
}

// --- 4. Report ---------------------------------------------------------------

const severityRank = { critical: 0, high: 1, medium: 2, low: 3, info: 4 };
findings.sort((a, b) => severityRank[a.severity] - severityRank[b.severity]);

console.log(`Checked ${pages.length} generated pages (${pages.filter(p => p.type === 'cert').length} cert landing + ${pages.filter(p => p.type === 'domain').length} domain quiz pages).`);
console.log(`Distinct canonical URLs declared: ${canonicalOwners.size}`);

if (findings.length === 0) {
  console.log(`\nAll ${pages.length} pages: exactly one canonical tag, self-referential, unique, and consistent with https://quizbuffet.com/ (matches robots.txt / sitemap.xml). No issues found.`);
  process.exit(0);
}

console.log(`\n${findings.length} finding(s):\n`);
for (const f of findings) {
  console.log(`[${f.severity.toUpperCase()}] ${f.file}`);
  console.log(`  ${f.message}`);
}

const bySeverity = findings.reduce((acc, f) => {
  acc[f.severity] = (acc[f.severity] || 0) + 1;
  return acc;
}, {});
console.log(`\nSummary: ${Object.entries(bySeverity).map(([k, v]) => `${v} ${k}`).join(', ')}`);

process.exit(1);
