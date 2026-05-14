#!/usr/bin/env node
// Validate data/salaries.json: every cert (live + coming-soon) has an entry,
// flag entries with missing salary numbers, and warn on stale lastUpdated dates.

import { readFileSync, readdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const STALE_MONTHS = 12;

const salaries = JSON.parse(readFileSync(join(ROOT, 'data/salaries.json'), 'utf8'));
const comingSoon = JSON.parse(readFileSync(join(ROOT, 'data/coming-soon.json'), 'utf8'));

// Live cert slugs
const certFiles = readdirSync(join(ROOT, 'js/data/certifications'))
  .filter(f => f.endsWith('.js') && f !== 'index.js' && !f.startsWith('_'));
const liveSlugs = [];
for (const file of certFiles.sort()) {
  const mod = await import(join(ROOT, 'js/data/certifications', file));
  liveSlugs.push(mod.cert.slug);
}

const csSlugs = comingSoon.map(c => c.slug);
const expectedSlugs = new Set([...liveSlugs, ...csSlugs]);
const haveSlugs = new Set(Object.keys(salaries).filter(k => !k.startsWith('_')));

const missing = [...expectedSlugs].filter(s => !haveSlugs.has(s));
const orphaned = [...haveSlugs].filter(s => !expectedSlugs.has(s));

const now = new Date();
const staleMs = STALE_MONTHS * 30 * 24 * 60 * 60 * 1000;

const noSalary = [];
const noUpdate = [];
const stale = [];
const noCollar = [];

for (const [slug, entry] of Object.entries(salaries)) {
  if (slug.startsWith('_')) continue;
  if (!entry.collar) noCollar.push(slug);
  if (!entry.salary) noSalary.push(slug);
  if (!entry.lastUpdated) {
    noUpdate.push(slug);
  } else {
    const updated = new Date(entry.lastUpdated);
    if (now - updated > staleMs) stale.push({ slug, age: Math.floor((now - updated) / (30 * 24 * 60 * 60 * 1000)) });
  }
}

let fail = false;
const log = (label, items, isError = false) => {
  if (!items.length) return;
  fail = fail || isError;
  console.log(`\n${isError ? '✗' : '⚠'} ${label} (${items.length}):`);
  for (const item of items) {
    if (typeof item === 'string') console.log(`    ${item}`);
    else console.log(`    ${item.slug}  (${item.age} months old)`);
  }
};

console.log(`Salary check — ${liveSlugs.length} live + ${csSlugs.length} coming-soon = ${expectedSlugs.size} certs expected\n`);
console.log(`  Coverage:       ${haveSlugs.size}/${expectedSlugs.size} certs in salaries.json`);
console.log(`  Has salary:     ${haveSlugs.size - noSalary.length}/${haveSlugs.size}`);
console.log(`  Has collar:     ${haveSlugs.size - noCollar.length}/${haveSlugs.size}`);
console.log(`  Recently updated (<${STALE_MONTHS}mo): ${haveSlugs.size - noUpdate.length - stale.length}/${haveSlugs.size}`);

log('Missing entries (cert exists but not in salaries.json)', missing, true);
log('Orphaned entries (in salaries.json but cert no longer exists)', orphaned, true);
log('Missing collar classification', noCollar, true);
log('Salary not yet curated', noSalary);
log('Never updated (lastUpdated is null)', noUpdate);
log(`Stale (>${STALE_MONTHS} months old — refresh from Payscale/Glassdoor/BLS)`, stale);

if (!noSalary.length && !noUpdate.length && !stale.length && !missing.length && !orphaned.length && !noCollar.length) {
  console.log('\n✓ All salary entries are complete and fresh.');
}

process.exit(fail ? 1 : 0);
