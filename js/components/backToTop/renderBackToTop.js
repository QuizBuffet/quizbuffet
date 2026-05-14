// Floating back-to-top button. Appears after the user scrolls past a threshold,
// pulses gently to attract attention, and animates the arrow on hover.
//
// Uses IntersectionObserver on a sentinel placed at the top of the page so we
// never read scrollY (which forces synchronous layout on the main thread).
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

  // Sentinel sits at the top of the page; when it scrolls out of view (past
  // SHOW_AT pixels of scroll), the button reveals. No scroll listener, no
  // scrollY reads → zero forced reflow.
  const sentinel = document.createElement('div');
  sentinel.setAttribute('aria-hidden', 'true');
  sentinel.style.cssText = `position:absolute;top:${SHOW_AT}px;left:0;width:1px;height:1px;pointer-events:none`;
  document.body.appendChild(sentinel);

  const io = new IntersectionObserver(
    ([entry]) => btn.classList.toggle('btt-visible', !entry.isIntersecting),
    { rootMargin: '0px', threshold: 0 }
  );
  io.observe(sentinel);
}
