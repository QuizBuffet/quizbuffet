import { loadDomain } from '../../loader/loadDomain.js';

// Renders two grid sections: Available Now (live certs, alphabetical with question counts)
// and Coming Soon (priority-ordered placeholders). Search filter applies to both.
export function renderCertList(live, comingSoon = [], filter = '') {
  const el = document.getElementById('cert-list');
  if (!el) return;

  const f = filter.trim().toLowerCase();
  const matches = c =>
    c.name.toLowerCase().includes(f) ||
    (c.code || '').toLowerCase().includes(f) ||
    (c.vendor || '').toLowerCase().includes(f);

  const liveSorted = [...live].sort((a, b) => a.name.localeCompare(b.name));
  const liveFiltered = f ? liveSorted.filter(matches) : liveSorted;
  const csFiltered = f ? comingSoon.filter(matches) : comingSoon;

  if (!liveFiltered.length && !csFiltered.length) {
    el.innerHTML = '<p style="color:var(--text-muted);font-size:15px;padding:8px 0">No certifications found.</p>';
    return;
  }

  const liveCards = liveFiltered.map(c => `
    <a href="/${c.slug}/" class="cert-card" data-cert-item="${c.slug}">
      <div class="cert-card-name">${c.name}</div>
      <div class="cert-card-meta">${c.code}${c.vendor ? ` · ${c.vendor}` : ''}</div>
      <div class="cert-card-footer" data-cert-count="${c.slug}">…</div>
    </a>`).join('');

  // Coming-soon cards keep their JSON priority order (#1 = highest demand)
  const csCards = csFiltered.map((c) => {
    const originalIdx = comingSoon.indexOf(c);
    const priority = originalIdx + 1;
    return `
    <a href="/${c.slug}/" class="cert-card cert-coming-soon">
      <span class="cert-card-priority" title="Build priority">#${priority}</span>
      <div class="cert-card-name">${c.name}</div>
      <div class="cert-card-meta">${c.code}${c.vendor ? ` · ${c.vendor}` : ''}</div>
      <div class="cert-card-footer">Coming soon${c.category ? ` · ${c.category}` : ''}</div>
    </a>`;
  }).join('');

  el.innerHTML = `
    ${liveFiltered.length ? `
      <div class="cert-list-section">
        <h3 class="cert-list-heading"><span class="dot dot-live"></span> Available now <span class="cert-list-count">${liveFiltered.length}</span></h3>
        <div class="cert-grid">${liveCards}</div>
      </div>` : ''}
    ${csFiltered.length ? `
      <div class="cert-list-section">
        <h3 class="cert-list-heading"><span class="dot dot-soon"></span> Coming soon <span class="cert-list-count">${csFiltered.length}</span></h3>
        <div class="cert-grid">${csCards}</div>
      </div>` : ''}
  `;

  liveFiltered.forEach(cert => {
    Promise.all(
      cert.domains.map(d => loadDomain(cert.slug, d.slug, cert).then(qs => qs.length))
    ).then(counts => {
      const total = counts.reduce((s, n) => s + n, 0);
      const countEl = el.querySelector(`[data-cert-count="${cert.slug}"]`);
      const item = el.querySelector(`[data-cert-item="${cert.slug}"]`);
      if (!countEl || !item) return;

      if (total === 0) {
        countEl.textContent = 'No questions yet';
        item.classList.add('cert-empty');
      } else {
        countEl.innerHTML = `<strong>${total.toLocaleString()}</strong> questions <span class="cert-card-domains">· ${cert.domains.length} ${cert.domains.length === 1 ? 'domain' : 'domains'}</span>`;
      }
    });
  });
}
