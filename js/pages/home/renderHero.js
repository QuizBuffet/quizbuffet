// Refined home hero: minimalist headline + stat strip + search bar.
// Absorbs the random-domain button as a secondary action and the search input.
import { certifications } from '../../data/certifications/index.js';
import { loadCounts } from '../../data/counts/loadCounts.js';

export function renderHero(comingSoon, onSearch) {
  const el = document.getElementById('hero');
  if (!el) return;

  // index.html ships with the hero pre-rendered (for LCP). Skip the innerHTML
  // overwrite when the static markup is already there; otherwise (SPA-navigated
  // home from another page) render it now.
  if (!el.querySelector('.hero-inner')) {
    el.innerHTML = `
      <section class="hero">
        <div class="hero-inner">
          <h1 class="hero-headline">Free practice tests for <span class="hero-em">professional certifications</span>.</h1>
          <p class="hero-sub">Domain-by-domain quizzes with instant feedback and detailed explanations. No account, no paywall.</p>

          <form class="hero-search" id="hero-search-form" role="search">
            <input class="hero-search-input" type="text" id="domain-search"
                   placeholder="Search certifications, vendors, categories…"
                   aria-label="Search certifications" autocomplete="off">
            <button class="hero-random" id="pick-random" type="button" title="Pick a random domain to study">
              <span class="hero-random-text">Random domain</span>
              <span class="hero-random-arrow" aria-hidden="true">→</span>
            </button>
          </form>
          <div class="hero-search-hint" aria-hidden="true">Filters as you type · press Enter to open the first match</div>

          <div class="hero-stats" id="hero-stats">
            <div class="hero-stat"><span class="hero-stat-num" data-stat="questions">, </span><span class="hero-stat-label">questions</span></div>
            <div class="hero-stat"><span class="hero-stat-num" data-stat="certs">, </span><span class="hero-stat-label">certifications</span></div>
            <div class="hero-stat"><span class="hero-stat-num">$0</span><span class="hero-stat-label">to use, forever</span></div>
          </div>
        </div>
      </section>`;
  }

  // Wire search: type to filter, Enter to open first match
  const input = document.getElementById('domain-search');
  const form  = document.getElementById('hero-search-form');
  if (input) input.addEventListener('input', e => onSearch(e.target.value));
  if (form)  form.addEventListener('submit', e => {
    e.preventDefault();
    // Find the first visible cert card in the list and follow its link
    const firstCard = document.querySelector('#cert-list .cert-card[data-cert-item]');
    if (firstCard && firstCard.href) {
      history.pushState({}, '', new URL(firstCard.href).pathname);
      window.dispatchEvent(new Event('popstate'));
    }
  });

  // Wire random button: same logic as the old renderRandomBtn
  const randomBtn = document.getElementById('pick-random');
  if (randomBtn) {
    randomBtn.addEventListener('click', () => {
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
      history.pushState({}, '', `/${pick.cert.slug}/${pick.domain.slug}/`);
      window.dispatchEvent(new Event('popstate'));
    });
  }

  // Populate stats from counts.json: keep static fallback if fetch fails
  loadCounts().then(c => {
    if (!c) return;
    const root = document.getElementById('hero-stats');
    if (!root) return;
    const qEl = root.querySelector('[data-stat="questions"]');
    const cEl = root.querySelector('[data-stat="certs"]');
    if (qEl) qEl.textContent = (c.total || 0).toLocaleString();
    if (cEl) cEl.textContent = (c.liveCerts || 0).toString();

    // Populate nonempty-domain list for the random button without fetching every JSON
    try {
      const nonempty = [];
      const perDomain = c.perDomain || {};
      for (const cert of certifications) {
        const dmap = perDomain[cert.slug] || {};
        for (const d of cert.domains) {
          if ((dmap[d.slug] || 0) > 0) nonempty.push(`${cert.slug}/${d.slug}`);
        }
      }
      sessionStorage.setItem('qb_meta_total_questions', String(c.total || 0));
      sessionStorage.setItem('qb_meta_nonempty_domains', JSON.stringify(nonempty));
    } catch {}
  });
}
