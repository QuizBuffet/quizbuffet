// Renders random domain button — prefers non-empty domains from the sessionStorage cache to avoid dead-end quiz pages
import { certifications } from '../../data/certifications/index.js';

export function renderRandomBtn() {
  const el = document.getElementById('random-btn');
  if (!el) return;

  el.innerHTML = `<button class="random-btn" id="pick-random">Feeling lucky? Pick a random domain →</button>`;

  document.getElementById('pick-random').addEventListener('click', () => {
    const nonemptyRaw = sessionStorage.getItem('qb_meta_nonempty_domains');
    const nonempty = nonemptyRaw ? JSON.parse(nonemptyRaw) : [];

    const allDomains = certifications.flatMap(cert =>
      cert.domains.map(domain => ({ cert, domain }))
    );

    const pool = nonempty.length > 0
      ? allDomains.filter(({ cert, domain }) => nonempty.includes(`${cert.slug}/${domain.slug}`))
      : allDomains;

    if (!pool.length) return;

    const pick = pool[Math.floor(Math.random() * pool.length)];
    history.pushState({}, '', `/domain?cert=${pick.cert.slug}&domain=${pick.domain.slug}`);
    window.dispatchEvent(new Event('popstate'));
  });
}
