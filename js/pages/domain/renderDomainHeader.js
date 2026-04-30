// Renders domain name, cert name, weight and back link at the top of the domain page
export function renderDomainHeader(cert, domain, backLink) {
  const el = document.getElementById('domain-header');
  if (!el) return;
  el.innerHTML = `
    <div style="margin:16px 0 12px">
      <a href="${backLink}" style="font-size:15px;color:var(--text-muted)">← ${cert.name}</a>
      <h1 style="font-size:clamp(18px,5vw,24px);font-weight:700;margin:6px 0 3px;line-height:1.3">${domain.name}</h1>
      <p style="font-size:clamp(15px,3.8vw,17px);color:var(--text-muted)">${domain.number} &middot; ${domain.weight}% of exam &middot; ${cert.code}</p>
    </div>`;
}
