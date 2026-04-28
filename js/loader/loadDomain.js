// Loads questions for a domain — tries embedded JS first, then local JSON, then GitHub raw as final fallback
const GITHUB_BASE = 'https://raw.githubusercontent.com/YOUR_USERNAME/quizbuffet-data/main/certifications';
const cache = {};

export async function loadDomain(certSlug, domainSlug, cert) {
  const key = `${certSlug}--${domainSlug}`;
  if (cache[key]) return cache[key];

  if (cert?.questions) {
    const domain = cert.domains.find(d => d.slug === domainSlug);
    if (domain) {
      cache[key] = cert.questions.filter(q => q.domain === domain.number);
      return cache[key];
    }
  }

  try {
    const res = await fetch(`data/certifications/${certSlug}/${domainSlug}.json`);
    if (!res.ok) throw new Error('not found');
    const data = await res.json();
    cache[key] = data.questions || [];
  } catch {
    try {
      const res = await fetch(`${GITHUB_BASE}/${certSlug}/${domainSlug}.json`);
      if (!res.ok) throw new Error('not found');
      const data = await res.json();
      cache[key] = data.questions || [];
    } catch {
      cache[key] = [];
    }
  }

  return cache[key];
}
