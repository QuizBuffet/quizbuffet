// Sends a GA4 event. No-op when gtag is missing or analytics is disabled for bots.
export function trackEvent(name, params = {}) {
  if (typeof window.gtag !== 'function') return;
  window.gtag('event', name, params);
}
