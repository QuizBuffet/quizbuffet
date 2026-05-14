#!/usr/bin/env node
// Verify that no domain is UNDER-weighted vs the exam-guide target.
// Over-preparing is fine (extra questions in a domain don't hurt students),
// but under-preparing means students drill less than the real exam weights.
// Flags negative drift > 1.5%. Exit code 0 if all certs pass, 1 if any fail.

import { readFileSync, readdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const UNDER_TOL = 1.5; // flag domains under exam weight by more than this

const certs = readdirSync(join(ROOT, 'js/data/certifications'))
  .filter(f => f.endsWith('.js') && f !== 'index.js' && !f.startsWith('_'));

let anyFail = false;

for (const file of certs.sort()) {
  const mod = await import(join(ROOT, 'js/data/certifications', file));
  const cert = mod.cert;
  const dataDir = join(ROOT, 'data/certifications', cert.slug);
  if (!existsSync(dataDir)) continue;

  let total = 0;
  const counts = {};
  for (const dom of cert.domains) {
    const p = join(dataDir, `${dom.slug}.json`);
    if (!existsSync(p)) { counts[dom.slug] = 0; continue; }
    const d = JSON.parse(readFileSync(p, 'utf8'));
    counts[dom.slug] = (d.questions || []).length;
    total += counts[dom.slug];
  }

  if (total === 0) continue;

  const rows = cert.domains.map(dom => {
    const n = counts[dom.slug];
    const got = (n / total) * 100;
    const delta = got - dom.weight;
    return { name: dom.name, n, target: dom.weight, got, delta, under: delta < -UNDER_TOL };
  });

  const failing = rows.filter(r => r.under);
  const status = failing.length ? '✗' : '✓';
  if (failing.length) anyFail = true;

  console.log(`\n${status} ${cert.code} — ${cert.name} (${total} questions)`);
  console.log(`  ${'Domain'.padEnd(60)} ${'Qs'.padStart(5)} ${'Tgt%'.padStart(6)} ${'Got%'.padStart(6)} ${'Δ'.padStart(7)}`);
  for (const r of rows) {
    const sign = r.delta >= 0 ? '+' : '';
    const flag = r.under ? ' ⚠ under' : '';
    console.log(`  ${r.name.padEnd(60)} ${String(r.n).padStart(5)} ${(r.target+'%').padStart(6)} ${r.got.toFixed(1).padStart(5)}% ${(sign+r.delta.toFixed(1)).padStart(7)}${flag}`);
  }

  if (failing.length) {
    // Anchor on the heaviest domain (its current count represents its target weight).
    // Compute total needed so that every other domain reaches at least its exam weight.
    const anchor = rows.reduce((max, r) => (r.n / r.target) > (max.n / max.target) ? r : max);
    const requiredTotal = Math.ceil((anchor.n / anchor.target) * 100);
    console.log(`  Add to bring each domain to its exam weight (anchored on "${anchor.name}", required total=${requiredTotal}):`);
    for (const r of rows) {
      const targetN = Math.ceil((r.target / 100) * requiredTotal);
      const diff = targetN - r.n;
      if (diff > 0) {
        console.log(`    add ${diff} to "${r.name}" (target ${targetN}, have ${r.n})`);
      }
    }
  }
}

process.exit(anyFail ? 1 : 0);
