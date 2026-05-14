// Badge of honor — animated count-up showing total practice questions across the entire site.
// Reads /data/counts.json (written by scripts/build-seo.mjs).
import { loadCounts } from '../../data/counts/loadCounts.js';

const COUNT_UP_MS = 1200;

export async function renderTotalBadge(mountId) {
  const el = document.getElementById(mountId);
  if (!el) return;
  const counts = await loadCounts();
  if (!counts) return;

  const total = counts.total || 0;
  const live = counts.liveCerts || 0;
  if (!total) { el.innerHTML = ''; return; }

  el.innerHTML = `
    <div class="total-badge" role="status" aria-label="${total.toLocaleString()} practice questions across ${live} certifications">
      <div class="total-badge-shine"></div>
      <div class="total-badge-content">
        <div class="total-badge-fig">
          <span class="total-badge-num" data-target="${total}">0</span>
          <span class="total-badge-plus">+</span>
        </div>
        <div class="total-badge-meta">
          <span class="total-badge-label">free practice questions</span>
          <span class="total-badge-sub">across <strong>${live}</strong> certifications · all free, no account</span>
        </div>
      </div>
    </div>`;

  const numEl = el.querySelector('.total-badge-num');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) {
    numEl.textContent = total.toLocaleString();
    return;
  }

  // Count-up animation triggered when badge enters viewport
  const startCountUp = () => {
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / COUNT_UP_MS);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - t, 3);
      numEl.textContent = Math.round(total * eased).toLocaleString();
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries, obs) => {
      for (const e of entries) if (e.isIntersecting) { startCountUp(); obs.disconnect(); break; }
    }, { threshold: 0.4 });
    io.observe(el.querySelector('.total-badge'));
  } else {
    startCountUp();
  }
}
