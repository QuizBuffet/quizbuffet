// Renders domain list with live progress — uses embedded question count when available, falls back to static count field
import { getDomainProgress } from '../../storage/getDomainProgress.js';

export function renderCertDomainList(cert) {
  const el = document.getElementById('domain-list');
  if (!el) return;

  el.innerHTML = cert.domains.map(d => {
    const key = `${cert.slug}--${d.slug}`;
    const prog = getDomainProgress(key);
    const url = `/domain?cert=${cert.slug}&domain=${d.slug}`;
    const weight = `<span class="domain-meta" style="margin-left:6px">${d.weight}%</span>`;
    const count = cert.questions
      ? cert.questions.filter(q => q.domain === d.number).length
      : d.count;

    let right;
    if (prog.completed) {
      right = `<a href="${url}" class="take-again-link">Take Again</a>`;
    } else if (prog.correct.length) {
      right = `<span class="domain-meta">${prog.correct.length} / ${count}</span>`;
    } else {
      right = `<span class="domain-meta">${count} questions</span>`;
    }

    return `
      <div class="domain-item">
        <span><a href="${url}" class="domain-link">${d.name}</a>${weight}</span>
        ${right}
      </div>`;
  }).join('');
}
