// Loads questions for a domain — tries embedded JS first, then local JSON, then GitHub raw as final fallback
const GITHUB_BASE = 'https://raw.githubusercontent.com/YOUR_USERNAME/quizbuffet-data/main/certifications';
const cache = {};

export async function loadDomain(certSlug, domainSlug, cert) {
  const key = `${certSlug}--${domainSlug}`;
  if (cache[key]) return cache[key];

  const domainMeta = cert?.domains.find(d => d.slug === domainSlug);
  const domainName = domainMeta?.name || domainSlug;

  if (cert?.questions) {
    if (domainMeta) {
      cache[key] = cert.questions
        .filter(q => q.domain === domainMeta.number)
        .map(q => ({ ...q, _domainName: domainName }));
      return cache[key];
    }
  }

  try {
    const res = await fetch(`data/certifications/${certSlug}/${domainSlug}.json`);
    if (!res.ok) throw new Error('not found');
    const data = await res.json();
    cache[key] = (data.questions || []).map(q => ({ ...q, _domainName: domainName }));
  } catch {
    try {
      const res = await fetch(`${GITHUB_BASE}/${certSlug}/${domainSlug}.json`);
      if (!res.ok) throw new Error('not found');
      const data = await res.json();
      cache[key] = (data.questions || []).map(q => ({ ...q, _domainName: domainName }));
    } catch {
      cache[key] = [];
    }
  }

  return cache[key];
}
