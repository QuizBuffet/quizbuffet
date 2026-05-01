const BADGES = {
  udemy:   'Udemy',
  amazon:  'Amazon',
  comptia: 'CompTIA',
};

export function affiliateLinksHTML(affiliates) {
  if (!affiliates?.length) return '';
  const links = affiliates.filter(a => a.url);
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
