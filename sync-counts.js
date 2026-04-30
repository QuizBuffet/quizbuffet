#!/usr/bin/env node
// Run after pasting questions into any domain JSON:  node sync-counts.js
// Updates every domain count: field in all cert definition files to match actual JSON contents.

import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

const CERT_DEFS  = 'js/data/certifications';
const CERT_DATA  = 'data/certifications';

let totalChanged = 0;

for (const file of readdirSync(CERT_DEFS).filter(f => f.endsWith('.js') && f !== 'index.js')) {
  const defPath = join(CERT_DEFS, file);
  let src = readFileSync(defPath, 'utf8');

  // Extract cert slug from file name
  const certSlug = file.replace('.js', '');
  const dataDir  = join(CERT_DATA, certSlug);

  let domainFiles;
  try {
    domainFiles = readdirSync(dataDir).filter(f => f.endsWith('.json'));
  } catch {
    continue;
  }

  let changed = false;

  for (const domainFile of domainFiles) {
    const domainSlug = domainFile.replace('.json', '');
    let data;
    try {
      data = JSON.parse(readFileSync(join(dataDir, domainFile), 'utf8'));
    } catch {
      console.warn(`  skipping malformed JSON: ${domainFile}`);
      continue;
    }

    const count = (data.questions || []).length;

    // Match:  slug: 'domain-slug', ... count: <old>
    const pattern = new RegExp(
      `(slug:\\s*['"]${domainSlug}['"][^}]*?count:\\s*)(\\d+)`,
      's'
    );

    const updated = src.replace(pattern, (match, prefix, old) => {
      if (parseInt(old) !== count) {
        changed = true;
        console.log(`  ${certSlug}/${domainSlug}: ${old} → ${count}`);
      }
      return `${prefix}${count}`;
    });

    src = updated;
  }

  if (changed) {
    writeFileSync(defPath, src);
    totalChanged++;
  }
}

console.log(totalChanged ? `\nUpdated ${totalChanged} cert definition(s).` : '\nAll counts already up to date.');
