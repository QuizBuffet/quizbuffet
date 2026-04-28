// Renders filterable cert list — called on load and again on every search keystroke
export function renderCertList(certifications, filter = '') {
  const el = document.getElementById('cert-list');
  if (!el) return;

  const filtered = certifications.filter(c =>
    c.name.toLowerCase().includes(filter.toLowerCase()) ||
    c.code.toLowerCase().includes(filter.toLowerCase())
  );

  if (!filtered.length) {
    el.innerHTML = '<p style="color:var(--text-muted);font-size:13px;padding:8px 0">No certifications found.</p>';
    return;
  }

  el.innerHTML = filtered.map(c => `
    <div class="domain-item">
      <span>
        <a href="/cert?cert=${c.slug}" class="domain-link">${c.name}</a>
        <span class="domain-meta" style="margin-left:6px">${c.code}</span>
      </span>
      <span class="domain-meta">${c.domains.length} domains</span>
    </div>`
  ).join('');
}
