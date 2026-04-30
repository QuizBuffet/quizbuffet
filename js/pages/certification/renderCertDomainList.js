import { getDomainProgress } from '../../storage/getDomainProgress.js';
import { loadDomain } from '../../loader/loadDomain.js';

export function renderCertDomainList(cert) {
  const el = document.getElementById('domain-list');
  if (!el) return;

  el.innerHTML = cert.domains.map(d => {
    const key   = `${cert.slug}--${d.slug}`;
    const prog  = getDomainProgress(key);
    const url   = `/domain?cert=${cert.slug}&domain=${d.slug}`;
    const weight = `<span class="domain-meta" style="margin-left:6px">${d.weight}%</span>`;

    let right;
    if (prog.completed) {
      right = `<a href="${url}" class="take-again-link">Take Again</a>`;
    } else if (prog.correct.length) {
      right = `<span class="domain-meta" data-count-key="${key}">${prog.correct.length} / …</span>`;
    } else {
      right = `<span class="domain-meta" data-count-key="${key}">… questions</span>`;
    }

    return `
      <div class="domain-item">
        <span><a href="${url}" class="domain-link">${d.name}</a>${weight}</span>
        ${right}
      </div>`;
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
