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
}
