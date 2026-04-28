import { getSessionHistory } from '../../storage/getSessionHistory.js';

function fmt(ts) {
  return new Date(ts).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

export function renderSessionHistory(storageKey) {
  const el = document.getElementById('session-history');
  if (!el) return;

  const hist = getSessionHistory(storageKey);
  if (!hist.length) { el.innerHTML = ''; return; }

  const rows = hist.slice().reverse().map(({ ts, pass, total }) => {
    const pct = total ? Math.round((pass / total) * 100) : 0;
    return `<div class="sh-row">
      <span class="sh-date">${fmt(ts)}</span>
      <span class="sh-score">${pass}/${total}</span>
      <span class="sh-bar-wrap"><span class="sh-bar" style="width:${pct}%"></span></span>
      <span class="sh-pct">${pct}%</span>
    </div>`;
  }).join('');

  el.innerHTML = `<h3 class="sh-title">Session History</h3>${rows}`;
}
