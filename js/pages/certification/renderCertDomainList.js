// Dashboard-style domain cards — number badge, progress bar (real %), state-driven CTA.
import { getDomainProgress } from '../../storage/getDomainProgress.js';
import { loadDomain } from '../../loader/loadDomain.js';

function cardState(prog, attempted) {
  if (prog.completed) return { tone: 'done',  cta: 'Review →' };
  if (attempted > 0)  return { tone: 'busy',  cta: 'Resume →' };
  return                       { tone: 'new',   cta: 'Start →'  };
}

export function renderCertDomainList(cert) {
  const el = document.getElementById('domain-list');
  if (!el) return;

  el.innerHTML = cert.domains.map((d, i) => {
    const key = `${cert.slug}--${d.slug}`;
    const prog = getDomainProgress(key);
    const attempted = prog.correct.length + prog.failed.length;
    const { tone, cta } = cardState(prog, attempted);
    const url = `/${cert.slug}/${d.slug}/`;
    const num = (d.number || '').toString().replace(/\.0$/, '') || String(i + 1);

    return `
      <a href="${url}" class="dcard dcard-${tone}" data-domain-key="${key}">
        <div class="dcard-head">
          <span class="dcard-num">${num}</span>
          <span class="dcard-weight">${d.weight}% of exam</span>
        </div>
        <div class="dcard-title">${d.name}</div>
        <div class="dcard-progress" aria-hidden="true">
          <div class="dcard-bar"><div class="dcard-bar-fill" data-fill-key="${key}" style="width:0%"></div></div>
          <div class="dcard-meta" data-meta-key="${key}">${prog.completed ? 'Completed' : (attempted ? `${prog.correct.length} correct so far` : 'Not started')}</div>
        </div>
        <div class="dcard-cta">${cta}</div>
      </a>`;
  }).join('');

  // Hydrate per-domain question counts once loaded
  cert.domains.forEach(d => {
    const key = `${cert.slug}--${d.slug}`;
    const prog = getDomainProgress(key);

    loadDomain(cert.slug, d.slug, cert).then(questions => {
      const total = questions.length;
      const attempted = prog.correct.length + prog.failed.length;
      const fill = el.querySelector(`[data-fill-key="${key}"]`);
      const meta = el.querySelector(`[data-meta-key="${key}"]`);
      if (!fill || !meta) return;

      if (prog.completed) {
        fill.style.width = '100%';
        meta.textContent = `${total} questions · ${prog.failed.length} missed`;
        return;
      }
      const pct = total ? Math.round((attempted / total) * 100) : 0;
      fill.style.width = `${pct}%`;
      meta.textContent = attempted
        ? `${attempted} / ${total} · ${prog.correct.length} correct`
        : `${total} questions`;
    });
  });

  fillEmptyGridCells(el);
  let raf;
  window.addEventListener('resize', () => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => fillEmptyGridCells(el));
  });
}

function fillEmptyGridCells(el) {
  el.querySelectorAll('.dcard-placeholder').forEach(p => p.remove());
  const cards = el.querySelectorAll('.dcard');
  if (!cards.length) return;
  const containerW = el.clientWidth;
  const cardW = cards[0].offsetWidth;
  const gap = parseFloat(getComputedStyle(el).columnGap) || parseFloat(getComputedStyle(el).gap) || 12;
  const cols = Math.max(1, Math.floor((containerW + gap) / (cardW + gap)));
  const extra = (cols - (cards.length % cols)) % cols;
  for (let i = 0; i < extra; i++) {
    const ph = document.createElement('div');
    ph.className = 'dcard-placeholder';
    ph.setAttribute('aria-hidden', 'true');
    el.appendChild(ph);
  }
}
