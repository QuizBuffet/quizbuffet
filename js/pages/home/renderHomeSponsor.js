// Renders a single Udemy-sponsored callout on the home page.
// The destination is wrapped in the Impact Radius tracking link so clicks pay out.

const TRACKING_BASE = 'https://trk.udemy.com/c/7254431/3193860/39854';

function udemyDeepLink(destUrl) {
  return `${TRACKING_BASE}?u=${encodeURIComponent(destUrl)}`;
}

export function renderHomeSponsor() {
  const el = document.getElementById('home-sponsor');
  if (!el) return;

  const courseUrl = 'https://www.udemy.com/course/better-testing/?couponCode=KEEPLEARNING';
  const href = udemyDeepLink(courseUrl);

  el.innerHTML = `
    <a class="home-sponsor" href="${href}" rel="sponsored noopener" target="_blank" data-sponsor="udemy">
      <span class="home-sponsor-tag">Sponsored · Udemy</span>
      <span class="home-sponsor-title">Better Testing: sharpen your exam technique</span>
      <span class="home-sponsor-cta">View course →</span>
    </a>
  `;

  el.addEventListener('click', e => {
    const a = e.target.closest('a[data-sponsor]');
    if (!a) return;
    try {
      if (typeof gtag === 'function') {
        gtag('event', 'home_sponsor_click', { sponsor: a.dataset.sponsor, href: a.href });
      }
    } catch (_) {}
  });
}
