const BADGES = {
  udemy:   'Udemy',
  amazon:  'Amazon',
  comptia: 'CompTIA',
  intuit:  'Intuit',
};

const UDEMY_TRACKING_BASE = 'https://trk.udemy.com/c/7254431/3193860/39854';

function udemyDeepLink(destUrl) {
  return `${UDEMY_TRACKING_BASE}?u=${encodeURIComponent(destUrl)}`;
}

// Build the Udemy affiliate entries for a cert:
// - cert.udemyCourseUrl (string): primary "Top-rated" course.
// - cert.extraUdemyCourses (array of { label, url }): additional courses (e.g. domain-specific).
// - If neither is set, falls back to a Udemy search filtered by cert code + name.
function udemyAffiliates(cert) {
  if (!cert) return [];
  const out = [];
  if (cert.udemyCourseUrl) {
    out.push({
      provider: 'udemy',
      label: `Top-rated ${cert.code} course on Udemy`,
      url: udemyDeepLink(cert.udemyCourseUrl),
    });
  } else {
    const search = `https://www.udemy.com/courses/search/?q=${encodeURIComponent(`${cert.code} ${cert.name}`)}`;
    out.push({
      provider: 'udemy',
      label: `${cert.code} courses on Udemy`,
      url: udemyDeepLink(search),
    });
  }
  (cert.extraUdemyCourses || []).filter(c => c && c.url && c.label).forEach(c => {
    out.push({ provider: 'udemy', label: c.label, url: udemyDeepLink(c.url) });
  });
  return out;
}

export function affiliateLinksHTML(cert) {
  if (!cert) return '';
  const fromMetadata = (cert.affiliates || []).filter(a => a.url);
  const udemy = udemyAffiliates(cert);
  const links = [...udemy, ...fromMetadata];
  if (!links.length) return '';

  return `
    <div class="affiliate-section">
      <div class="affiliate-title">Recommended Study Resources</div>
      <div class="affiliate-links">
        ${links.map(a => `
          <a href="${a.url}" class="affiliate-link affiliate-${a.provider}" target="_blank" rel="nofollow sponsored noopener noreferrer">
            <span class="affiliate-badge affiliate-badge-${a.provider}">${BADGES[a.provider] || a.provider}</span>
            ${a.label} →
          </a>`).join('')}
      </div>
      <p class="affiliate-disclosure">Affiliate links — we may earn a small commission at no extra cost to you.</p>
    </div>`;
}
