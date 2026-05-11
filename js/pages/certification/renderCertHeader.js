// Cert page dashboard hero — vendor tag, name, code, stats row, progress ring, primary CTA.
// Reads progress from localStorage so the ring shows real % complete.
import { loadPricing, getPricingEntry, formatPrice } from '../../data/pricing/loadPricing.js';
import { getDomainProgress } from '../../storage/getDomainProgress.js';

function computeOverallProgress(cert) {
  let domainsDone = 0;
  let totalCorrect = 0;
  let totalAttempted = 0;
  cert.domains.forEach(d => {
    const key = `${cert.slug}--${d.slug}`;
    const prog = getDomainProgress(key);
    if (prog.completed) domainsDone++;
    totalCorrect += prog.correct.length;
    totalAttempted += prog.correct.length + prog.failed.length;
  });
  return {
    domainsDone,
    totalCorrect,
    totalAttempted,
    domainsPct: Math.round((domainsDone / cert.domains.length) * 100),
  };
}

function progressRingSvg(pct) {
  const r = 52;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - pct / 100);
  return `
    <svg class="cert-ring" width="124" height="124" viewBox="0 0 124 124" aria-hidden="true">
      <circle class="cert-ring-track" cx="62" cy="62" r="${r}" />
      <circle class="cert-ring-fill" cx="62" cy="62" r="${r}"
              stroke-dasharray="${c.toFixed(2)}" stroke-dashoffset="${offset.toFixed(2)}"
              transform="rotate(-90 62 62)" />
      <text class="cert-ring-pct" x="62" y="62" text-anchor="middle" dominant-baseline="central">${pct}%</text>
    </svg>`;
}

export function renderCertHeader(cert, totalQ) {
  const el = document.getElementById('cert-header');
  if (!el) return;

  const { domainsDone, totalCorrect, domainsPct } = computeOverallProgress(cert);
  const hasProgress = domainsDone > 0 || totalCorrect > 0;
  const primaryCtaLabel = hasProgress ? 'Continue practicing' : 'Start mix quiz';
  const totalQuestionsLabel = totalQ ? totalQ.toLocaleString() : '…';

  el.innerHTML = `
    <section class="cert-hero">
      <div class="cert-hero-main">
        <div class="cert-hero-vendor">${cert.vendor}</div>
        <h1 class="cert-hero-title">${cert.name}</h1>
        <div class="cert-hero-meta">
          <span class="cert-hero-code">${cert.code}</span>
          ${cert.tagline ? `<span class="cert-hero-tagline">${cert.tagline}</span>` : ''}
        </div>
        <div class="cert-hero-stats">
          <div class="cert-stat">
            <div class="cert-stat-value">${totalQuestionsLabel}</div>
            <div class="cert-stat-label">Practice questions</div>
          </div>
          <div class="cert-stat">
            <div class="cert-stat-value">${cert.domains.length}</div>
            <div class="cert-stat-label">Exam domains</div>
          </div>
          <div class="cert-stat">
            <div class="cert-stat-value">${domainsDone}/${cert.domains.length}</div>
            <div class="cert-stat-label">Domains complete</div>
          </div>
        </div>
        <div class="cert-hero-cta-row">
          <a href="/${cert.slug}/mix/" class="cert-hero-cta cert-hero-cta-primary">${primaryCtaLabel} <span aria-hidden="true">→</span></a>
          <p class="cert-hero-price" data-price="${cert.slug}"></p>
        </div>
      </div>
      <div class="cert-hero-ring">
        ${progressRingSvg(domainsPct)}
        <div class="cert-ring-caption">${hasProgress ? 'Your progress' : 'Get started'}</div>
      </div>
    </section>
    <section class="cert-about">
      <h2 class="cert-section-title">About this certification</h2>
      <p class="cert-about-lead">${cert.about}</p>
      ${cert.details ? `<p class="cert-about-details"><strong>Exam format:</strong> ${cert.details}</p>` : ''}
    </section>`;

  loadPricing().then(pricing => {
    const slot = el.querySelector('[data-price]');
    if (!slot) return;
    const entry = getPricingEntry(pricing, slot.dataset.price);
    if (!entry) { slot.remove(); return; }
    slot.innerHTML = `<span class="cert-header-price-other">Other practice tests: ${formatPrice(entry.practice_usd)}</span> · <strong class="cert-header-price-us">Free on QuizBuffet</strong>`;
  });
}
