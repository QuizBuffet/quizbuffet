// "After this, try these": up to 3 same-vendor or same-category live certs.
import { certifications } from '../../data/certifications/index.js';

export function renderRelatedCerts(cert) {
  const el = document.getElementById('cert-related');
  if (!el) return;

  const sameVendor = certifications.filter(c => c.slug !== cert.slug && c.vendor === cert.vendor);
  const others = certifications.filter(c => c.slug !== cert.slug && c.vendor !== cert.vendor);
  const picks = [...sameVendor, ...others].slice(0, 3);
  if (!picks.length) { el.innerHTML = ''; return; }

  el.innerHTML = `
    <section class="cert-related">
      <h2 class="cert-section-title">After ${cert.code}, try these</h2>
      <div class="cert-related-grid">
        ${picks.map(c => `
          <a class="cert-related-card" href="/${c.slug}/">
            <div class="cert-related-vendor">${c.vendor}</div>
            <div class="cert-related-name">${c.name}</div>
            <div class="cert-related-code">${c.code}</div>
            ${c.tagline ? `<div class="cert-related-tag">${c.tagline}</div>` : ''}
          </a>`).join('')}
      </div>
    </section>`;
}
