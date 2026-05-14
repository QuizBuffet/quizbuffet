// Minifies css/style.css into css/style.min.css. Removes comments, collapses
// whitespace, drops trailing semicolons before `}`, and tightens punctuation.
// Conservative: skips anything inside string literals (url(), content:'…').
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const SRC = path.join(ROOT, 'css', 'style.css');
const OUT = path.join(ROOT, 'css', 'style.min.css');

let css = fs.readFileSync(SRC, 'utf8');
const before = css.length;

// 1. Strip /* ... */ comments (non-greedy, multi-line).
css = css.replace(/\/\*[\s\S]*?\*\//g, '');

// 2. Tokenize-protect strings (single/double-quoted) so whitespace passes don't touch them.
const STRINGS = [];
css = css.replace(/(['"])(?:\\.|(?!\1).)*\1/g, m => {
  STRINGS.push(m);
  return `\x00${STRINGS.length - 1}\x00`;
});

// 3. Collapse whitespace runs to a single space, drop leading/trailing.
css = css.replace(/\s+/g, ' ').trim();

// 4. Drop spaces around the structural punctuation that doesn't need them.
css = css.replace(/\s*([{}:;,>~+])\s*/g, '$1');

// 5. Drop trailing `;` before `}`.
css = css.replace(/;}/g, '}');

// 6. Restore protected strings.
css = css.replace(/\x00(\d+)\x00/g, (_, i) => STRINGS[+i]);

fs.writeFileSync(OUT, css);
const after = css.length;
const pct = ((1 - after / before) * 100).toFixed(1);
console.log(`  ✓ css/style.min.css (${(before / 1024).toFixed(1)} KiB → ${(after / 1024).toFixed(1)} KiB, -${pct}%)`);
