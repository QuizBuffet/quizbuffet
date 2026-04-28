import { getStorageInfo } from '../../storage/getStorageInfo.js';

function fmtBytes(b) {
  if (b < 1024) return `${b} B`;
  if (b < 1048576) return `${(b / 1024).toFixed(1)} KB`;
  return `${(b / 1048576).toFixed(1)} MB`;
}

export async function renderResetButtons(onReset) {
  const el = document.getElementById('progress-footer');
  if (!el) return;

  const { qbBytes } = await getStorageInfo();
  const hasData    = Object.keys(localStorage).some(k => k.startsWith('qb_') && k !== 'qb_theme' && k !== 'qb_color');
  const hasDisplay = !!(localStorage.getItem('qb_theme') || localStorage.getItem('qb_color'));

  el.innerHTML = `
    <div class="prog-footer">
      <button id="clear-all-btn" class="clear-all-btn" aria-label="Reset all quiz progress"${hasData ? '' : ' disabled'}>Reset All Progress</button>
      <span class="prog-storage-note">Using ${fmtBytes(qbBytes)} of storage</span>
    </div>
    <div class="prog-footer" style="margin-top:8px">
      <button id="reset-display-btn" class="reset-display-btn"${hasDisplay ? '' : ' disabled'}>Reset Display Settings</button>
      <span class="prog-storage-note">Resets theme and dark/light mode to defaults</span>
    </div>`;

  document.getElementById('clear-all-btn').addEventListener('click', () => {
    if (!confirm('Reset all progress? This cannot be undone.')) return;
    for (const k of Object.keys(localStorage).filter(k => k.startsWith('qb_') && k !== 'qb_theme' && k !== 'qb_color')) {
      localStorage.removeItem(k);
    }
    onReset();
  });

  document.getElementById('reset-display-btn').addEventListener('click', () => {
    localStorage.removeItem('qb_theme');
    localStorage.removeItem('qb_color');
    location.reload();
  });
}
