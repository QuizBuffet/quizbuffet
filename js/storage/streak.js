const KEY = 'qb_streak';

function load() {
  try { return JSON.parse(localStorage.getItem(KEY)) || { correct: 0, wrong: 0 }; } catch { return { correct: 0, wrong: 0 }; }
}

function save(s) { localStorage.setItem(KEY, JSON.stringify(s)); }

export function recordCorrect() {
  const s = load();
  s.correct += 1;
  s.wrong = 0;
  save(s);
  return s.correct;
}

export function recordWrong() {
  const s = load();
  s.wrong += 1;
  s.correct = 0;
  save(s);
  return s.wrong;
}
