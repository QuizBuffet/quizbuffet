// Loads /data/salaries.json once and caches the result for the page lifetime.
let _cache = null;
let _pending = null;

export async function loadSalaries() {
  if (_cache) return _cache;
  if (_pending) return _pending;
  _pending = fetch('/data/salaries.json')
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

export function getSalaryEntry(salaries, slug) {
  if (!salaries) return null;
  const e = salaries[slug];
  if (!e || typeof e !== 'object' || !e.salary) return null;
  return e;
}

// Compact: "$64k" or "$160k" — used on home cert cards
export function formatCompactUSD(n) {
  if (n == null) return '';
  if (n >= 1000) return `$${Math.round(n / 1000)}k`;
  return `$${n}`;
}

// Full with comma grouping: "$63,900" — used on cert detail page
export function formatFullUSD(n) {
  if (n == null) return '';
  return `$${n.toLocaleString('en-US')}`;
}

const COLLAR_LABELS = {
  'white-collar': { icon: '💼', label: 'White-collar' },
  'blue-collar':  { icon: '🔧', label: 'Blue-collar'  },
  'service':      { icon: '🤝', label: 'Service'      },
  'healthcare':   { icon: '⚕️', label: 'Healthcare'   },
};

export function collarLabel(collar) {
  return COLLAR_LABELS[collar] || { icon: '', label: collar || '' };
}
