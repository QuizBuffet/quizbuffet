// Counts all questions across certs and caches in sessionStorage — also populates nonempty domain list used by the random button
import { certifications } from '../data/certifications/index.js';

const GITHUB_BASE = 'https://raw.githubusercontent.com/YOUR_USERNAME/quizbuffet-data/main/certifications';

export async function getTotalQuestionCount() {
  const cached = sessionStorage.getItem('qb_meta_total_questions');
  if (cached !== null) return parseInt(cached, 10);

  const entries = certifications.flatMap(cert =>
    cert.domains.map(domain => ({ cert, domain }))
  );

  const fetches = entries.map(({ cert, domain }) => {
    if (cert.questions) {
      const count = cert.questions.filter(q => q.domain === domain.number).length;
      return Promise.resolve({ cert, domain, count });
    }
    return fetch(`data/certifications/${cert.slug}/${domain.slug}.json`)
      .then(r => r.ok ? r.json() : Promise.reject())
      .catch(() => fetch(`${GITHUB_BASE}/${cert.slug}/${domain.slug}.json`)
        .then(r => r.ok ? r.json() : { questions: [] })
        .catch(() => ({ questions: [] }))
      )
      .then(data => ({ cert, domain, count: (data.questions || []).length }));
  });

  const results = await Promise.all(fetches);
  const total = results.reduce((sum, r) => sum + r.count, 0);
  const nonempty = results.filter(r => r.count > 0).map(r => `${r.cert.slug}/${r.domain.slug}`);
  sessionStorage.setItem('qb_meta_total_questions', String(total));
  sessionStorage.setItem('qb_meta_nonempty_domains', JSON.stringify(nonempty));
  return total;
}
