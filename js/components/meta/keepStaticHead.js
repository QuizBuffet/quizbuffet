// True on a first load of a pre-rendered page: its <head> (title, description, canonical,
// JSON-LD with FAQ/breadcrumbs/organization) was built for this exact URL by build-seo,
// so the SPA must not overwrite it. After any in-app navigation the SPA owns the head.
export function keepStaticHead() {
  if (window.__qbNavigated) return false;
  // The canonical as served (captured in app.js at boot), not the one setMeta may have rewritten since.
  const canon = window.__qbBootCanonical || '';
  return canon === 'https://quizbuffet.com' + location.pathname;
}
