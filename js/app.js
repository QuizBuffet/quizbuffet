// Single-page app entry point — owns the hash router, page shells, and lazy-loads each page's init module
import { renderNav } from './components/nav/renderNav.js';
import { renderFooter } from './components/footer/renderFooter.js';

const SHELLS = {
  '/': `
    <main class="container">
      <div id="featured"></div>
      <div id="ad-top" class="ad-slot">Advertisement</div>
      <div id="random-btn"></div>
      <div id="search"></div>
      <h2 class="section-title">Certifications</h2>
      <div id="cert-list"></div>
      <div id="ad-bottom" class="ad-slot">Advertisement</div>
    </main>`,

  '/cert': `
    <main class="container">
      <div id="ad-top" class="ad-slot">Advertisement</div>
      <div id="cert-header"></div>
      <div id="progress-summary"></div>
      <h2 class="section-title" id="domains-label">Exam Domains</h2>
      <div id="session-size-picker"></div>
      <div id="mix-quiz"></div>
      <div id="domain-list"></div>
      <div id="acronym-drill"></div>
      <div id="ad-bottom" class="ad-slot">Advertisement</div>
    </main>`,

  '/domain': `
    <main class="container">
      <div id="ad-top" class="ad-slot">Advertisement</div>
      <div id="domain-header"></div>
      <div id="domain-progress"></div>
      <div id="session-size-picker"></div>
      <div id="difficulty-picker"></div>
      <div id="domain-actions"></div>
      <div id="session-history"></div>
      <div id="weak-spots"></div>
      <div id="ad-bottom" class="ad-slot">Advertisement</div>
    </main>`,

  '/quiz': `
    <main class="container">
      <div id="ad-top" class="ad-slot">Advertisement</div>
      <div id="quiz-meta" class="quiz-meta" role="status" aria-live="polite"></div>
      <div id="question" aria-live="polite" aria-atomic="true"></div>
      <div id="answers" role="group" aria-label="Answer choices"></div>
      <div id="explanation" aria-live="polite"></div>
      <div id="ad-mid" class="ad-slot" style="display:none">Advertisement</div>
    </main>`,

  '/progress': `
    <main class="container">
      <div id="progress-overview"></div>
      <div id="progress-certs"></div>
      <div id="progress-footer"></div>
    </main>`,
};

const NAV_ACTIVE = { '/': 'Home', '/progress': 'Progress' };

async function route() {
  const path = location.pathname.replace('/index.html', '') || '/';

  document.getElementById('app').innerHTML = SHELLS[path] ||
    `<main class="container">
      <div class="not-found">
        <div class="not-found-code">404</div>
        <h1 class="not-found-title">Page not found</h1>
        <p class="not-found-body">This page doesn't exist or the link is broken.</p>
        <a href="/" class="not-found-btn">← Back to Home</a>
        <a href="mailto:artivicolab@gmail.com?subject=QuizBuffet%20-%20Broken%20link: ${encodeURIComponent(location.pathname + location.search)}" class="not-found-report">Report broken link</a>
      </div>
    </main>`;

  window.scrollTo(0, 0);
  renderNav(NAV_ACTIVE[path]);

  switch (path) {
    case '/': {
      const { init } = await import('./pages/home/initHome.js');
      init();
      break;
    }
    case '/cert': {
      const { init } = await import('./pages/certification/initCertification.js');
      init();
      break;
    }
    case '/domain': {
      const { init } = await import('./pages/domain/initDomain.js');
      await init();
      break;
    }
    case '/quiz': {
      const { init } = await import('./pages/quiz/initQuiz.js');
      await init();
      break;
    }
    case '/progress': {
      const { init } = await import('./pages/progress/initProgress.js');
      init();
      break;
    }
  }
}

renderFooter();
window.addEventListener('popstate', route);
route();

// Intercept internal link clicks so navigation stays in-app (no full page reloads)
document.addEventListener('click', e => {
  const a = e.target.closest('a');
  if (!a) return;

  const raw = a.getAttribute('href') || '';
  if (!raw || raw.startsWith('#') || raw.startsWith('mailto:') || raw.startsWith('tel:') || raw.startsWith('javascript:')) return;
  if (a.target === '_blank' || a.hasAttribute('download')) return;

  let url;
  try { url = new URL(a.href); } catch (_) { return; }
  if (url.origin !== location.origin) return;

  const dest = url.pathname + url.search;
  if (dest === location.pathname + location.search) return;

  e.preventDefault();
  history.pushState({}, '', dest);
  window.dispatchEvent(new Event('popstate'));
});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.addEventListener('message', e => {
    if (e.data?.type !== 'SW_UPDATED') return;
    const toast = document.createElement('div');
    toast.className = 'sw-toast';
    toast.innerHTML = `QuizBuffet was updated. <button class="sw-toast-btn" id="sw-reload">Refresh</button>`;
    document.body.appendChild(toast);
    document.getElementById('sw-reload').addEventListener('click', () => location.reload());
  });
}
