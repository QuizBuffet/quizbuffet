// Keyboard shortcuts for quiz: a/b/c/d or 1/2/3/4 to pick an answer, Enter/Space to advance
const keyMap = { a: 'a', b: 'b', c: 'c', d: 'd', 1: 'a', 2: 'b', 3: 'c', 4: 'd' };

export function initKeyboard() {
  document.addEventListener('keydown', e => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const key = e.key.toLowerCase();

    if (key === 'enter' || key === ' ') {
      const next = document.getElementById('next-btn');
      if (next) { e.preventDefault(); next.click(); }
      return;
    }

    const answerId = keyMap[key];
    if (!answerId) return;
    const btn = document.querySelector(`.answer-btn[data-id="${answerId}"]`);
    if (btn && !btn.disabled) btn.click();
  });
}
