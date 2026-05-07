#!/usr/bin/env node
// Submit all live + coming-soon cert URLs to IndexNow (Bing, Yandex, Naver, Seznam).
// Usage: node scripts/indexnow-submit.mjs
// IndexNow docs: https://www.indexnow.org/documentation

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const HOST = 'quizbuffet.com';
const KEY = 'b5913fcade434b0590464f5192050782';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const ENDPOINT = 'https://api.indexnow.org/IndexNow';

const { certifications } = await import(path.join(ROOT, 'js/data/certifications/index.js'));
const comingSoon = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/coming-soon.json'), 'utf8'));

const liveUrls = certifications.map(c => `https://${HOST}/${c.slug}/`);
const csUrls   = comingSoon.map(c => `https://${HOST}/${c.slug}/`);
const allUrls = [
  `https://${HOST}/`,
  `https://${HOST}/progress/`,
  ...liveUrls,
  ...csUrls,
];

console.log(`Submitting ${allUrls.length} URLs to IndexNow…`);

const body = {
  host: HOST,
  key: KEY,
  keyLocation: KEY_LOCATION,
  urlList: allUrls,
};

const res = await fetch(ENDPOINT, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify(body),
});

console.log(`Status: ${res.status} ${res.statusText}`);
const text = await res.text();
if (text) console.log('Body:', text);

if (res.status === 200) {
  console.log('✓ Submitted successfully.');
} else if (res.status === 202) {
  console.log('✓ Accepted (URLs received, validation in progress).');
} else if (res.status === 403) {
  console.error('✗ Key file not reachable. Make sure', KEY_LOCATION, 'is deployed.');
  process.exit(1);
} else if (res.status === 422) {
  console.error('✗ URL/key mismatch. Check that all URLs are on the right host.');
  process.exit(1);
} else if (res.status === 429) {
  console.error('✗ Rate limited. Wait and retry later.');
  process.exit(1);
} else {
  console.error('✗ Unexpected status. Check IndexNow docs.');
  process.exit(1);
}
