// Loads /data/pricing.json once and caches the result for the page lifetime.
let _cache = null;
let _pending = null;

export async function loadPricing() {
  if (_cache) return _cache;
  if (_pending) return _pending;
  _pending = fetch('/data/pricing.json')
    .then(r => r.ok ? r.json() : {})
    .then(data => {
      _cache = data;
      _pending = null;
      return data;
    })
    .catch(() => {
      _cache = {};
      _pending = null;
      return _cache;
    });
  return _pending;
}

export function getPricingEntry(pricing, slug) {
  if (!pricing) return null;
  const e = pricing[slug];
  if (!e || typeof e !== 'object') return null;
  if (typeof e.practice_usd !== 'number') return null;
  return e;
}

export function formatPrice(n) {
  if (n == null) return '';
  return `$${n.toLocaleString('en-US')}`;
}
