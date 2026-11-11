// The only page_view sender: gtag('config') runs with send_page_view:false, so landing
// pages are not double-counted. Called after each route has set its own document.title.
export function sendPageView() {
  if (typeof window.gtag !== 'function') return;
  window.gtag('event', 'page_view', {
    page_path: location.pathname + location.search,
    page_title: document.title,
    page_location: location.href,
  });
}
