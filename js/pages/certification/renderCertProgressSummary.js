// Renders overall cert progress bar — reads wrong counts from sessionStorage for in-progress domains since they aren't in localStorage yet
import { getDomainProgress } from '../../storage/getDomainProgress.js';

export function renderCertProgressSummary(cert) {
  const el = document.getElementById('progress-summary');
  if (!el) return;

  let totalCorrect = 0, totalWrong = 0, completed = 0;
  const totalDomains = cert.domains.length;

  cert.domains.forEach(d => {
    const key = `${cert.slug}--${d.slug}`;
    const prog = getDomainProgress(key);
    if (prog.completed) {
      completed++;
      totalWrong   += prog.failed.length;
      totalCorrect += d.count - prog.failed.length;
    } else {
      totalCorrect += prog.correct.length;
      totalWrong   += JSON.parse(sessionStorage.getItem(`qbs_${key}_failed`) || '[]').length;
    }
  });

  const pct = Math.round((completed / totalDomains) * 100);
  el.innerHTML = `
    <div class="progress-summary">
      <strong>Your Progress:</strong> ${completed} of ${totalDomains} domains complete &middot; ${totalCorrect} correct &middot; ${totalWrong} wrong
      <div class="progress-bar-track"><div class="progress-bar-fill" style="width:${pct}%"></div></div>
    </div>`;
}
