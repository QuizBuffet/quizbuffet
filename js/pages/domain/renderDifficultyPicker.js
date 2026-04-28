// Difficulty filter — persists choice to localStorage so it survives across visits
const KEY = 'qb_difficulty';
const LEVELS = ['easy', 'medium', 'hard'];

export function renderDifficultyPicker() {
  const el = document.getElementById('difficulty-picker');
  if (!el) return;

  const saved = localStorage.getItem(KEY); // null = All

  function render() {
    const current = localStorage.getItem(KEY);
    const btns = LEVELS.map(l =>
      `<button class="ssp-btn${current === l ? ' active' : ''}" data-val="${l}">${l[0].toUpperCase() + l.slice(1)}</button>`
    ).join(' · ');
    el.innerHTML = `<span class="ssp-label">Difficulty:</span> ${btns} · <button class="ssp-btn${!current ? ' active' : ''}" data-val="">All</button>`;

    el.querySelectorAll('.ssp-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const val = btn.dataset.val;
        if (val) localStorage.setItem(KEY, val);
        else localStorage.removeItem(KEY);
        render();
      });
    });
  }

  render();
}
