const KEY = 'qb_timer_start';

let interval = null;

function fmt(ms) {
  const s = Math.floor(ms / 1000);
  const m = Math.floor(s / 60);
  return `${m}:${String(s % 60).padStart(2, '0')}`;
}

function getStart() {
  return Number(sessionStorage.getItem(KEY)) || null;
}

function tick() {
  const start = getStart();
  const el = document.getElementById('question-timer');
  if (el && start) el.textContent = fmt(Date.now() - start);
}

export function startTimer() {
  sessionStorage.setItem(KEY, Date.now());
  if (interval) clearInterval(interval);
  tick();
  interval = setInterval(tick, 1000);
}

export function stopTimer() {
  if (interval) clearInterval(interval);
  interval = null;
  sessionStorage.removeItem(KEY);
}
