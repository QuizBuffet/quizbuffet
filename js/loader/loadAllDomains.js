import { loadDomain } from './loadDomain.js';

// Loads every domain for a cert and annotates each question with its origin.
// Returns all questions shuffled — limit is applied by the caller.
export async function loadAllDomains(cert) {
  const perDomain = await Promise.all(
    cert.domains.map(async d => {
      const questions = await loadDomain(cert.slug, d.slug, cert);
      return questions.map(q => ({
        ...q,
        _domainName: d.name,
        _storageKey: `${cert.slug}--${d.slug}`,
      }));
    })
  );

  const all = perDomain.flat();
  for (let i = all.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [all[i], all[j]] = [all[j], all[i]];
  }
  return all;
}
