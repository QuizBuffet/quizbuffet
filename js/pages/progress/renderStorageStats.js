import { certifications } from '../../data/certifications/index.js';
import { getDomainProgress } from '../../storage/getDomainProgress.js';

export function renderStorageStats() {
  const el = document.getElementById('progress-overview');
  if (!el) return;

  let totalCorrect = 0, domainsStarted = 0, domainsComplete = 0;

  for (const cert of certifications) {
    for (const domain of cert.domains) {
      const prog = getDomainProgress(`${cert.slug}--${domain.slug}`);
      if (prog.completed || prog.correct.length > 0 || prog.failed.length > 0) {
        domainsStarted++;
        totalCorrect += prog.correct.length;
        if (prog.completed) domainsComplete++;
      }
    }
  }

  if (!domainsStarted) {
    el.innerHTML = `<p class="prog-empty-top">No progress yet — start a quiz to track your answers.</p>`;
    return;
  }

  el.innerHTML = `<div class="prog-overview">
    <span class="prog-ov-item"><strong>${totalCorrect}</strong> correct answers</span>
    <span class="prog-ov-sep">·</span>
    <span class="prog-ov-item"><strong>${domainsStarted}</strong> domain${domainsStarted !== 1 ? 's' : ''} started</span>
    <span class="prog-ov-sep">·</span>
    <span class="prog-ov-item"><strong>${domainsComplete}</strong> complete</span>
  </div>`;
}
