// Updates page title, description, social meta tags, robots, and canonical on SPA route changes.
// Skipped on a first load of a pre-rendered page (see keepStaticHead.js).
import { keepStaticHead } from './keepStaticHead.js';

// "Basic Life Support (BLS) (BLS)" -> "Basic Life Support (BLS)"
const dedupeParens = t => String(t).replace(/\(([^)]+)\)\s*\(\1\)/g, '($1)');
export function setMeta(title, description, { noindex = false } = {}) {
  if (keepStaticHead()) return;
  title = dedupeParens(title);
  description = dedupeParens(description);
  const full = /QuizBuffet/.test(title) ? title : `${title} | QuizBuffet`;
  document.title = full;

  const pageUrl = 'https://quizbuffet.com' + window.location.pathname + window.location.search;

  const updates = {
    'meta[name="description"]':         description,
    'meta[property="og:title"]':        full,
    'meta[property="og:description"]':  description,
    'meta[property="og:url"]':          pageUrl,
    'meta[name="twitter:title"]':       full,
    'meta[name="twitter:description"]': description,
  };

  for (const [sel, val] of Object.entries(updates)) {
    document.querySelector(sel)?.setAttribute('content', val);
  }

  document.querySelector('link[rel="canonical"]')?.setAttribute('href', pageUrl);

  let robotsMeta = document.querySelector('meta[name="robots"]');
  if (!robotsMeta) {
    robotsMeta = document.createElement('meta');
    robotsMeta.name = 'robots';
    document.head.appendChild(robotsMeta);
  }
  robotsMeta.content = noindex ? 'noindex, follow' : 'index, follow';
}
