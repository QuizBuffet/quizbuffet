// Per-cert radar charts — one polygon per cert showing accuracy across its domains.
// Uses d3 (loaded as an ES module from a CDN) so we don't bloat the main bundle for users
// who never visit /progress.
import { certifications } from '../../data/certifications/index.js';
import { getDomainProgress } from '../../storage/getDomainProgress.js';

const D3_URL = 'https://cdn.jsdelivr.net/npm/d3@7/+esm';

function buildCertData(cert) {
  // For each domain: total answered, accuracy 0..1
  const domains = cert.domains.map(d => {
    const prog = getDomainProgress(`${cert.slug}--${d.slug}`);
    const answered = prog.correct.length + prog.failed.length;
    const accuracy = answered ? prog.correct.length / answered : 0;
    return { name: d.name, slug: d.slug, weight: d.weight || 0, answered, accuracy };
  });
  const totalAnswered = domains.reduce((s, d) => s + d.answered, 0);
  return { cert, domains, totalAnswered };
}

function renderOneRadar(d3, container, certData) {
  const { cert, domains } = certData;
  const W = 320, H = 320;
  const cx = W / 2, cy = H / 2;
  const R = 110;
  const N = domains.length;

  // Clear and create svg
  container.innerHTML = '';
  const svg = d3.select(container).append('svg')
    .attr('viewBox', `0 0 ${W} ${H}`)
    .attr('class', 'cert-radar-svg')
    .attr('role', 'img')
    .attr('aria-label', `${cert.name} accuracy radar`);

  // Angle for each axis (i-th of N), starting from top
  const angle = i => (i / N) * Math.PI * 2 - Math.PI / 2;

  // Background grid: 4 concentric polygons at 25/50/75/100%
  const gridLevels = [0.25, 0.5, 0.75, 1.0];
  for (const lvl of gridLevels) {
    const pts = domains.map((_, i) => {
      const r = R * lvl;
      return [cx + r * Math.cos(angle(i)), cy + r * Math.sin(angle(i))].join(',');
    }).join(' ');
    svg.append('polygon')
      .attr('points', pts)
      .attr('class', 'cert-radar-grid');
  }

  // Axes
  domains.forEach((_, i) => {
    svg.append('line')
      .attr('x1', cx).attr('y1', cy)
      .attr('x2', cx + R * Math.cos(angle(i)))
      .attr('y2', cy + R * Math.sin(angle(i)))
      .attr('class', 'cert-radar-axis');
  });

  // Data polygon — accuracy per domain
  const dataPts = domains.map((d, i) => {
    const r = R * d.accuracy;
    return [cx + r * Math.cos(angle(i)), cy + r * Math.sin(angle(i))].join(',');
  }).join(' ');
  svg.append('polygon')
    .attr('points', dataPts)
    .attr('class', 'cert-radar-data');

  // Data points (small dots) with hover-friendly title
  domains.forEach((d, i) => {
    const r = R * d.accuracy;
    const x = cx + r * Math.cos(angle(i));
    const y = cy + r * Math.sin(angle(i));
    const dot = svg.append('circle')
      .attr('cx', x).attr('cy', y).attr('r', 4)
      .attr('class', 'cert-radar-dot');
    dot.append('title').text(`${d.name}: ${Math.round(d.accuracy * 100)}% (${d.answered} answered)`);
  });

  // Labels — show truncated text on chart, full name + accuracy in <title> tooltip
  domains.forEach((d, i) => {
    const labelR = R + 18;
    const x = cx + labelR * Math.cos(angle(i));
    const y = cy + labelR * Math.sin(angle(i));
    const ang = angle(i);
    let anchor = 'middle';
    if (Math.cos(ang) > 0.3) anchor = 'start';
    else if (Math.cos(ang) < -0.3) anchor = 'end';
    const display = d.name.length > 20 ? d.name.slice(0, 18) + '…' : d.name;
    const tooltip = `${d.name} — ${Math.round(d.accuracy * 100)}% correct (${d.answered} answered${d.weight ? `, ${d.weight}% of exam` : ''})`;
    const text = svg.append('text')
      .attr('x', x).attr('y', y)
      .attr('text-anchor', anchor)
      .attr('dominant-baseline', 'middle')
      .attr('class', 'cert-radar-label')
      .text(display);
    text.append('title').text(tooltip);
  });
}

export async function renderCertRadars() {
  const el = document.getElementById('progress-radars');
  if (!el) return;

  // Compute which certs to show: any cert with at least one answered question
  const datasets = certifications.map(buildCertData).filter(c => c.totalAnswered > 0);
  if (!datasets.length) {
    el.innerHTML = '';
    return;
  }

  el.innerHTML = `
    <h2 class="section-title">Domain accuracy by cert</h2>
    <p class="cert-radar-help">
      Each chart is one cert. Each spoke is one of its domains. The further the green polygon stretches toward the outer ring, the higher your accuracy on that domain — outer ring = 100% correct, center = 0%. The 4 grey rings are 25 / 50 / 75 / 100% guides. Hover any label or dot for the full name and your numbers.
    </p>
    <div class="cert-radar-grid-layout">
      ${datasets.map(({ cert, totalAnswered }) => `
        <article class="cert-radar-card">
          <header class="cert-radar-head">
            <a href="/${cert.slug}/" class="cert-radar-title">${cert.name}</a>
            <span class="cert-radar-meta">${totalAnswered} answered · ${cert.code}</span>
          </header>
          <div class="cert-radar-mount" data-slug="${cert.slug}"></div>
        </article>`).join('')}
    </div>`;

  // Lazy-load d3 only when the radar grid actually renders
  let d3;
  try {
    d3 = await import(/* @vite-ignore */ D3_URL);
  } catch (e) {
    el.querySelector('.cert-radar-grid-layout').insertAdjacentHTML('beforeend',
      `<p style="grid-column:1/-1;color:var(--text-muted);font-size:14px">Charts unavailable (d3 failed to load).</p>`);
    return;
  }

  for (const cd of datasets) {
    const mount = el.querySelector(`[data-slug="${cd.cert.slug}"]`);
    if (mount) renderOneRadar(d3, mount, cd);
  }
}
