import { loadSalaries, getSalaryEntry, formatFullUSD, collarLabel } from '../../data/salaries/loadSalaries.js';

export async function renderSalaryPanel(mountId, slug) {
  const el = document.getElementById(mountId);
  if (!el) return;
  const salaries = await loadSalaries();
  const entry = getSalaryEntry(salaries, slug);
  if (!entry) { el.innerHTML = ''; return; }

  const { low, mid, high } = entry.salary;
  const collar = collarLabel(entry.collar);
  const sources = (entry.sources || []).join(', ');
  const updated = entry.lastUpdated ? new Date(entry.lastUpdated).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : '';

  el.innerHTML = `
    <div class="salary-panel">
      <div class="salary-row">
        <div class="salary-fig">
          <div class="salary-mid">${formatFullUSD(mid)}</div>
          <div class="salary-mid-label">typical median</div>
        </div>
        <div class="salary-range">
          <div class="salary-range-label">Range</div>
          <div class="salary-range-vals">${formatFullUSD(low)} <span class="salary-dash">—</span> ${formatFullUSD(high)}</div>
        </div>
        <div class="salary-collar">
          <span class="salary-collar-icon">${collar.icon}</span>
          <span class="salary-collar-label">${collar.label}</span>
        </div>
      </div>
      <div class="salary-meta">
        ${sources ? `<span>Sources: ${sources}</span>` : ''}
        ${updated ? `<span>Updated ${updated}</span>` : ''}
        <span class="salary-meta-note">US-wide median; varies by region and role.</span>
      </div>
    </div>`;
}
