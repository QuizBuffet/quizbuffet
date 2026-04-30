const GITHUB_BASE = 'https://raw.githubusercontent.com/YOUR_USERNAME/quizbuffet-data/main/certifications';
const cache = {};

export async function loadDomain(certSlug, domainSlug, cert) {
  const key = `${certSlug}--${domainSlug}`;
  if (cache[key]) return cache[key];

  const domainName = cert?.domains.find(d => d.slug === domainSlug)?.name || domainSlug;

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
