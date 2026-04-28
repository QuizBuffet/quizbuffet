// Renders correct/wrong/remaining stats and progress bar for a domain
export function renderDomainProgress(prog, totalCount) {
  const el = document.getElementById('domain-progress');
  if (!el) return;

  const correct   = prog.correct.length;
  const wrong     = prog.failed.length;
  const attempted = correct + wrong;
  const remaining = totalCount - correct;
  const pct       = totalCount > 0 ? Math.round((correct / totalCount) * 100) : 0;

  if (attempted === 0 && !prog.completed) {
    el.innerHTML = `<p style="color:var(--text-muted);font-size:clamp(12px,3.2vw,14px);margin:8px 0 16px">${totalCount} questions &middot; Not started yet</p>`;
    return;
  }

  const statusText = prog.completed
    ? 'All done ✓'
    : `${remaining} question${remaining !== 1 ? 's' : ''} remaining`;

  el.innerHTML = `
    <div class="domain-stat-row">
      <span class="domain-stat-correct">${correct} correct</span>
      <span class="domain-stat-sep">&middot;</span>
      <span class="domain-stat-wrong">${wrong} wrong</span>
      <span class="domain-stat-sep">&middot;</span>
      <span class="domain-stat-total">${totalCount} total</span>
    </div>
    <div class="progress-bar-track" style="margin:8px 0 6px">
      <div class="progress-bar-fill" style="width:${pct}%"></div>
    </div>
    <p style="font-size:clamp(12px,3vw,13px);color:var(--text-muted);margin-bottom:16px">${pct}% correct &middot; ${statusText}</p>`;
}
