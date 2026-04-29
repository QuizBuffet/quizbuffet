// Renders cert name, code, about blurb, and exam details at the top of certification.html
export function renderCertHeader(cert, totalQ) {
  const el = document.getElementById('cert-header');
  if (!el) return;
  const nameHtml = cert.name.replace(/\+/, '<span class="plus-ping">+</span>');
  const qBadge = totalQ
    ? `<span style="margin-left:10px;font-size:clamp(12px,3vw,13px);color:var(--text-muted);font-weight:400">${totalQ.toLocaleString()} practice questions</span>`
    : '';
  el.innerHTML = `
    <div style="margin: 18px 0 12px">
      <span class="section-title" style="border:none;margin:0;padding:0">${cert.vendor}</span>
      <h1 style="font-size:clamp(20px,5vw,26px);font-weight:700;margin:4px 0 6px;line-height:1.3">${nameHtml} <span style="color:var(--text-muted);font-weight:400;font-size:clamp(14px,3.5vw,16px)">${cert.code}</span>${qBadge}</h1>
      <p style="color:var(--text-mid);font-size:clamp(13px,3.5vw,15px);line-height:1.7;margin-bottom:8px">${cert.about}</p>
      <p style="color:var(--text-muted);font-size:clamp(12px,3vw,13px)">${cert.details}</p>
    </div>`;
}
