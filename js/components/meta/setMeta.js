// Updates page title, description, and social (OG/Twitter) meta tags on every route change
export function setMeta(title, description) {
  const full = `${title} | QuizBuffet`;
  document.title = full;

  const pageUrl = 'https://quizbuffet.com' + window.location.pathname + window.location.search;

  const updates = {
    'meta[name="description"]':         description,
    'meta[property="og:title"]':        full,
    'meta[property="og:description"]':  description,
    'meta[property="og:url"]':          pageUrl,
    'meta[name="twitter:title"]':       full,
    'meta[name="twitter:description"]': description,
  };

  for (const [sel, val] of Object.entries(updates)) {
    document.querySelector(sel)?.setAttribute('content', val);
  }

  document.querySelector('link[rel="canonical"]')?.setAttribute('href', pageUrl);
}
