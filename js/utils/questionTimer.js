let startTime = null;
let interval  = null;

function fmt(ms) {
  const s = Math.floor(ms / 1000);
  const m = Math.floor(s / 60);
  return `${m}:${String(s % 60).padStart(2, '0')}`;
}

function tick() {
  const el = document.getElementById('question-timer');
  if (el) el.textContent = fmt(Date.now() - startTime);
}

export function startTimer() {
  startTime = Date.now();
  if (interval) clearInterval(interval);
  tick();
  interval = setInterval(tick, 1000);
}

export function stopTimer() {
  if (interval) clearInterval(interval);
  interval = null;
}
