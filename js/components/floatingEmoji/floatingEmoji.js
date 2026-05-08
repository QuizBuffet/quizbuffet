// Random test-related emojis fly across the screen after 5 minutes of dwell on the home page.
// Pure CSS animation; JS only spawns elements with randomized direction, vertical position, size, and rotation.
// Respects the user's prefers-reduced-motion media query and no-ops when the home page is no longer mounted.

const TEST_EMOJIS = [
  '📚','📖','📝','✏️','✒️','📓','📋','📊','📈','🔍','🧠','💡','💯','🎯',
  '🎓','🏆','⭐','✅','⏰','🤓','📐','📌','🗂️','🔖','📎','🍀','🚀','🎉',
];

const INITIAL_DELAY_MS = 5 * 60 * 1000;       // 5 minutes
const MIN_GAP_MS       = 45 * 1000;
const MAX_GAP_MS       = 150 * 1000;

let initialTimer = null;
let nextTimer    = null;

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function isHomeMounted() {
  // #cert-list is rendered only by the home page
  return !!document.getElementById('cert-list');
}

function spawnOne() {
  if (!isHomeMounted()) return;

  const emoji     = pick(TEST_EMOJIS);
  const direction = Math.random() < 0.5 ? 'rtl' : 'ltr';
  const topVh     = 10 + Math.random() * 70;            // 10vh – 80vh
  const sizePx    = 32 + Math.floor(Math.random() * 32); // 32–64 px
  const rotDeg    = (Math.random() - 0.5) * 60;          // -30° to +30°
  const durationMs = 4000 + Math.random() * 3000;        // 4–7 s

  const el = document.createElement('div');
  el.className = `floating-emoji floating-emoji-${direction}`;
  el.textContent = emoji;
  el.style.top      = topVh + 'vh';
  el.style.fontSize = sizePx + 'px';
  el.style.setProperty('--rot', rotDeg + 'deg');
  el.style.setProperty('--dur', durationMs + 'ms');
  el.setAttribute('aria-hidden', 'true');

  document.body.appendChild(el);
  setTimeout(() => el.remove(), durationMs + 500);
}

function scheduleNext() {
  if (!isHomeMounted()) return;
  const gap = MIN_GAP_MS + Math.random() * (MAX_GAP_MS - MIN_GAP_MS);
  nextTimer = setTimeout(() => {
    spawnOne();
    scheduleNext();
  }, gap);
}

export function initFloatingEmoji() {
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (initialTimer || nextTimer) return; // already running

  initialTimer = setTimeout(() => {
    initialTimer = null;
    spawnOne();
    scheduleNext();
  }, INITIAL_DELAY_MS);
}

export function stopFloatingEmoji() {
  if (initialTimer) clearTimeout(initialTimer);
  if (nextTimer)    clearTimeout(nextTimer);
  initialTimer = null;
  nextTimer    = null;
}
