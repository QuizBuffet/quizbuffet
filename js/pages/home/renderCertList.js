import { loadDomain } from '../../loader/loadDomain.js';

export function renderCertList(certifications, filter = '') {
  const el = document.getElementById('cert-list');
  if (!el) return;

  const filtered = certifications.filter(c =>
    c.name.toLowerCase().includes(filter.toLowerCase()) ||
    c.code.toLowerCase().includes(filter.toLowerCase())
  );

  if (!filtered.length) {
    el.innerHTML = '<p style="color:var(--text-muted);font-size:15px;padding:8px 0">No certifications found.</p>';
    return;
  }

  el.innerHTML = filtered.map(c => `
    <div class="domain-item" data-cert-item="${c.slug}">
      <span>
        <a href="/${c.slug}/" class="domain-link">${c.name}</a>
        <span class="domain-meta" style="margin-left:6px">${c.code}</span>
      </span>
      <span class="domain-meta" data-cert-count="${c.slug}">…</span>
    </div>`
  ).join('');

  filtered.forEach(cert => {
    Promise.all(
      cert.domains.map(d => loadDomain(cert.slug, d.slug, cert).then(qs => qs.length))
    ).then(counts => {
      const total = counts.reduce((s, n) => s + n, 0);
      const countSpan = el.querySelector(`[data-cert-count="${cert.slug}"]`);
      const item = el.querySelector(`[data-cert-item="${cert.slug}"]`);
      if (!countSpan || !item) return;

      if (total === 0) {
        countSpan.textContent = 'Coming soon';
        item.classList.add('cert-empty');
      } else {
        countSpan.textContent = `${total.toLocaleString()} questions`;
      }
    });
  });
}
