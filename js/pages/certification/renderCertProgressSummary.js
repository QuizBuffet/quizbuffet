// Weak Spots strip: shows up to 3 domains with lowest accuracy.
// Only renders if the user has answered at least one question on this cert.
import { getDomainProgress } from '../../storage/getDomainProgress.js';

export function renderCertProgressSummary(cert) {
  const el = document.getElementById('progress-summary');
  if (!el) return;

  const stats = cert.domains.map(d => {
    const key = `${cert.slug}--${d.slug}`;
    const prog = getDomainProgress(key);
    const attempted = prog.correct.length + prog.failed.length;
    const accuracy = attempted ? prog.correct.length / attempted : null;
    return { domain: d, key, attempted, accuracy, correct: prog.correct.length, failed: prog.failed.length };
  });

  const attemptedStats = stats.filter(s => s.attempted >= 3 && s.accuracy !== null);
  if (!attemptedStats.length) { el.innerHTML = ''; return; }

  // Lowest accuracy first; tiebreak by highest attempted (more confident the weakness is real)
  attemptedStats.sort((a, b) => a.accuracy - b.accuracy || b.attempted - a.attempted);
  const weak = attemptedStats.slice(0, 3);

  el.innerHTML = `
    <section class="cert-weak">
      <div class="cert-weak-head">
        <span class="cert-weak-label">Weak spots</span>
        <span class="cert-weak-hint">Drill these first</span>
      </div>
      <div class="cert-weak-list">
        ${weak.map(s => {
          const pct = Math.round(s.accuracy * 100);
          const tone = pct < 50 ? 'low' : pct < 70 ? 'mid' : 'ok';
          return `
            <a class="cert-weak-card cert-weak-${tone}" href="/${cert.slug}/${s.domain.slug}/">
              <div class="cert-weak-name">${s.domain.name}</div>
              <div class="cert-weak-meta"><strong>${pct}%</strong> accuracy · ${s.failed} wrong of ${s.attempted}</div>
            </a>`;
        }).join('')}
      </div>
    </section>`;
}
