// Returns total live questions across all certs by reading the pre-built counts.json.
// Also populates the non-empty domain list used by the "Random domain" button.
// Cached in sessionStorage per page session.
import { certifications } from '../data/certifications/index.js';
import { loadCounts } from '../data/counts/loadCounts.js';

export async function getTotalQuestionCount() {
  const cached = sessionStorage.getItem('qb_meta_total_questions');
  if (cached !== null) return parseInt(cached, 10);

  const counts = await loadCounts();
  if (!counts) return 0;

  const total = counts.total || 0;
  const nonempty = [];
  const perDomain = counts.perDomain || {};
  for (const cert of certifications) {
    const dmap = perDomain[cert.slug] || {};
    for (const d of cert.domains) {
      if ((dmap[d.slug] || 0) > 0) nonempty.push(`${cert.slug}/${d.slug}`);
    }
  }
  sessionStorage.setItem('qb_meta_total_questions', String(total));
  sessionStorage.setItem('qb_meta_nonempty_domains', JSON.stringify(nonempty));
  return total;
}
