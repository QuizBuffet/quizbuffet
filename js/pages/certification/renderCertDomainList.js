import { getDomainProgress } from '../../storage/getDomainProgress.js';
import { loadDomain } from '../../loader/loadDomain.js';

export function renderCertDomainList(cert) {
  const el = document.getElementById('domain-list');
  if (!el) return;

  el.innerHTML = cert.domains.map((d, i) => {
    const key   = `${cert.slug}--${d.slug}`;
    const prog  = getDomainProgress(key);
    const url   = `/${cert.slug}/${d.slug}/`;
    const num   = (d.number || '').toString().replace(/\.0$/, '') || String(i + 1);

    return `
      <a href="${url}" class="domain-item ${prog.completed ? 'is-completed' : ''}" data-domain-key="${key}">
        <div class="domain-number-badge"><span>${num}</span></div>
        <div class="domain-body">
          <div class="domain-link">${d.name}</div>
          <div class="domain-bar" aria-hidden="true">
            <div class="domain-bar-fill" style="width: ${Math.min(100, d.weight * 2)}%"></div>
          </div>
          <div class="domain-meta-row">
            <span class="domain-weight">${d.weight}% of exam</span>
            <span class="domain-meta" data-count-key="${key}">${prog.completed ? '✓ Completed' : (prog.correct.length ? `${prog.correct.length} / …` : '… questions')}</span>
          </div>
        </div>
      </a>`;
  }).join('');

  cert.domains.forEach(d => {
    const key  = `${cert.slug}--${d.slug}`;
    const prog = getDomainProgress(key);
    if (prog.completed) return;

    loadDomain(cert.slug, d.slug, cert).then(questions => {
      const span = el.querySelector(`[data-count-key="${key}"]`);
      if (!span) return;
      span.textContent = prog.correct.length
        ? `${prog.correct.length} / ${questions.length}`
        : `${questions.length} questions`;
    });
  });

  fillEmptyGridCells(el);
  let raf;
  window.addEventListener('resize', () => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => fillEmptyGridCells(el));
  });
}

// Fills the trailing empty cells in the last row of an auto-fill grid with
// subtle placeholder cards so the layout doesn't end with awkward white space.
function fillEmptyGridCells(el) {
  el.querySelectorAll('.domain-item-placeholder').forEach(p => p.remove());
  const cards = el.querySelectorAll('.domain-item');
  if (!cards.length) return;
  const containerW = el.clientWidth;
  const cardW = cards[0].offsetWidth;
  const gap = parseFloat(getComputedStyle(el).columnGap) || parseFloat(getComputedStyle(el).gap) || 10;
  const cols = Math.max(1, Math.floor((containerW + gap) / (cardW + gap)));
  const extra = (cols - (cards.length % cols)) % cols;
  for (let i = 0; i < extra; i++) {
    const ph = document.createElement('div');
    ph.className = 'domain-item-placeholder';
    ph.setAttribute('aria-hidden', 'true');
    el.appendChild(ph);
  }
}
