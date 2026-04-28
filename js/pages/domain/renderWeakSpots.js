import { getErrorCounts } from '../../storage/getErrorCounts.js';

export function renderWeakSpots(storageKey, questions) {
  const el = document.getElementById('weak-spots');
  if (!el) return;

  const counts = getErrorCounts(storageKey);
  const qMap = Object.fromEntries(questions.map(q => [q.id, q]));

  const weak = Object.entries(counts)
    .filter(([id, n]) => n >= 2 && qMap[id])
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  if (!weak.length) { el.innerHTML = ''; return; }

  const rows = weak.map(([id, n]) => {
    const text = qMap[id].text;
    const preview = text.length > 100 ? text.slice(0, 97) + '…' : text;
    return `<div class="ws-row">
      <span class="ws-count">${n}×</span>
      <span class="ws-text">${preview}</span>
    </div>`;
  }).join('');

  el.innerHTML = `<h3 class="ws-title">Weak Spots</h3>
    <p class="ws-sub">Questions you keep missing</p>
    ${rows}`;
}
