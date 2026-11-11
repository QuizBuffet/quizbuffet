// Replaces the page's JSON-LD on SPA route changes; keeps the build-time JSON-LD on a
// first load of a pre-rendered page (see keepStaticHead.js).
import { keepStaticHead } from './keepStaticHead.js';

export function setJsonLd(data) {
  if (keepStaticHead()) return;
  let el = document.getElementById('json-ld');
  if (!el) {
    el = document.createElement('script');
    el.type = 'application/ld+json';
    el.id = 'json-ld';
    document.head.appendChild(el);
  }
  // Drop any other JSON-LD block (e.g. the home page's static one) so a route never carries two.
  document.querySelectorAll('script[type="application/ld+json"]').forEach(s => { if (s !== el) s.remove(); });
  el.textContent = data ? JSON.stringify(data) : '';
}
