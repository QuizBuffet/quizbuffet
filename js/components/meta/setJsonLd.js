export function setJsonLd(data) {
  let el = document.getElementById('json-ld');
  if (!el) {
    el = document.createElement('script');
    el.type = 'application/ld+json';
    el.id = 'json-ld';
    document.head.appendChild(el);
  }
  el.textContent = data ? JSON.stringify(data) : '';
}
