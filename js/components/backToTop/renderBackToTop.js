// Floating back-to-top button. Appears after the user scrolls past a threshold,
// pulses gently to attract attention, and animates the arrow on hover.
const SHOW_AT = 600; // px scroll before button appears

export function renderBackToTop() {
  if (document.getElementById('back-to-top')) return;

  const btn = document.createElement('button');
  btn.id = 'back-to-top';
  btn.className = 'back-to-top';
  btn.type = 'button';
  btn.setAttribute('aria-label', 'Back to top');
  btn.title = 'Back to top';
  btn.innerHTML = `
    <svg class="btt-arrow" width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 5l-7 7 1.4 1.4L11 8.8V20h2V8.8l4.6 4.6L19 12z"
            fill="currentColor"/>
    </svg>`;

  btn.addEventListener('click', () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  });

  document.body.appendChild(btn);

  let visible = false;
  const onScroll = () => {
    const shouldShow = window.scrollY > SHOW_AT;
    if (shouldShow !== visible) {
      visible = shouldShow;
      btn.classList.toggle('btt-visible', visible);
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  // Defer the initial read so we don't force a layout right after appendChild.
  requestAnimationFrame(onScroll);
}
