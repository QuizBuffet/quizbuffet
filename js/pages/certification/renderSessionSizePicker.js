// Session size picker — persists choice to localStorage so it's remembered across visits
const SIZES = [5, 10, 20, 50];
const KEY = 'qb_session_size';

export function renderSessionSizePicker(onSelect) {
  const el = document.getElementById('session-size-picker');
  if (!el) return null;

  const saved = localStorage.getItem(KEY);
  let current = saved ? parseInt(saved) : null; // null = All

  function render() {
    const sizeBtns = SIZES.map(n =>
      `<button class="ssp-btn${current === n ? ' active' : ''}" data-val="${n}">${n}</button>`
    ).join(' · ');
    el.innerHTML = `<span class="ssp-label">Questions per session:</span> ${sizeBtns} · <button class="ssp-btn${!current ? ' active' : ''}" data-val="">All</button>`;

    el.querySelectorAll('.ssp-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const val = btn.dataset.val;
        current = val ? parseInt(val) : null;
        if (current) localStorage.setItem(KEY, String(current));
        else localStorage.removeItem(KEY);
        render();
        onSelect(current);
      });
    });
  }

  render();
  return current;
}
