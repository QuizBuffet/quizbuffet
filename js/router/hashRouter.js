export function navigate(url) {
  if (location.pathname + location.search === url) window.dispatchEvent(new Event('popstate'));
  else { history.pushState({}, '', url); window.dispatchEvent(new Event('popstate')); }
}

export function refresh() {
  window.dispatchEvent(new Event('popstate'));
}

export function getHashParams() {
  return new URLSearchParams(location.search);
}
