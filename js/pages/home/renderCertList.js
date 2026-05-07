import { loadDomain } from '../../loader/loadDomain.js';
import { loadSalaries, getSalaryEntry, formatCompactUSD, collarLabel } from '../../data/salaries/loadSalaries.js';
import { attachCertPreview } from '../../components/certPreview/certPreview.js';

// Live cert categories — coming-soon entries already carry their own `category` field.
const LIVE_CATEGORY = {
  'comptia-a-plus-core-1':              'IT Foundations',
  'comptia-a-plus-core-2':              'IT Foundations',
  'comptia-itf-plus':                   'IT Foundations',
  'comptia-network-plus':               'Networking',
  'cisco-ccna':                         'Networking',
  'comptia-security-plus':              'Cybersecurity',
  'comptia-cysa-plus':                  'Cybersecurity',
  'comptia-pentest-plus':               'Cybersecurity',
  'comptia-cloud-plus':                 'Cloud',
  'aws-cloud-practitioner':             'Cloud',
  'aws-solutions-architect-associate':  'Cloud',
  'aws-cloudops-engineer-associate':    'Cloud',
  'aws-developer-associate':            'Cloud',
  'aws-devops-engineer-professional':   'Cloud',
  'aws-security-specialty':             'Cybersecurity',
  'aws-advanced-networking-specialty':  'Networking',
  'aws-solutions-architect-professional': 'Cloud',
  'aws-ai-practitioner':                'Data & AI',
  'aws-ml-engineer-associate':          'Data & AI',
  'aws-genai-developer-professional':   'Data & AI',
  'aws-data-engineer-associate':        'Data & AI',
  'comptia-data-plus':                  'Data & AI',
};

const CATEGORY_ORDER = [
  'IT Foundations', 'Networking', 'Cybersecurity', 'Cloud', 'Data & AI',
  'IT Service Management', 'Project Management', 'Business', 'Accounting',
  'Healthcare', 'Safety', 'Trades', 'HVAC', 'Automotive',
  'Transportation', 'Aviation',
  'Real Estate', 'Insurance', 'Mortgage',
  'Food Service', 'Beauty', 'Fitness',
];

function categoryOf(cert, isLive) {
  if (isLive) return LIVE_CATEGORY[cert.slug] || cert.category || 'Other';
  return cert.category || 'Other';
}

function groupByCategory(certs, isLive) {
  const groups = new Map();
  for (const c of certs) {
    const cat = categoryOf(c, isLive);
    if (!groups.has(cat)) groups.set(cat, []);
    groups.get(cat).push(c);
  }
  return [...groups.entries()].sort(([a], [b]) => {
    const ai = CATEGORY_ORDER.indexOf(a);
    const bi = CATEGORY_ORDER.indexOf(b);
    if (ai === -1 && bi === -1) return a.localeCompare(b);
    if (ai === -1) return 1;
    if (bi === -1) return -1;
    return ai - bi;
  });
}

function renderLiveCard(c) {
  return `
    <a href="/${c.slug}/" class="cert-card" data-cert-item="${c.slug}">
      <div class="cert-card-name">${c.name}</div>
      <div class="cert-card-meta">${c.code}${c.vendor ? ` · ${c.vendor}` : ''}</div>
      <div class="cert-card-salary" data-salary="${c.slug}"></div>
      <div class="cert-card-footer" data-cert-count="${c.slug}">…</div>
    </a>`;
}

function renderCsCard(c, comingSoon) {
  const priority = comingSoon.indexOf(c) + 1;
  return `
    <a href="/${c.slug}/" class="cert-card cert-coming-soon">
      <span class="cert-card-priority" title="Build priority">#${priority}</span>
      <div class="cert-card-name">${c.name}</div>
      <div class="cert-card-meta">${c.code}${c.vendor ? ` · ${c.vendor}` : ''}</div>
      <div class="cert-card-salary" data-salary="${c.slug}"></div>
      <div class="cert-card-footer">Coming soon</div>
    </a>`;
}

function fillSalaries(rootEl) {
  loadSalaries().then(salaries => {
    rootEl.querySelectorAll('[data-salary]').forEach(slot => {
      const entry = getSalaryEntry(salaries, slot.dataset.salary);
      if (!entry) { slot.remove(); return; }
      const collar = collarLabel(entry.collar);
      const mid = formatCompactUSD(entry.salary.mid);
      slot.innerHTML = `
        <span class="cert-card-salary-mid">${mid} median</span>
        <span class="cert-card-salary-collar" title="${collar.label}">${collar.icon}</span>`;
    });
  });
}

function renderCategorizedSection(label, dotClass, total, groups, cardFn) {
  if (!total) return '';
  const inner = groups.map(([cat, items]) => `
    <div class="cert-category">
      <h4 class="cert-category-heading">${cat} <span class="cert-list-count">${items.length}</span></h4>
      <div class="cert-category-cards">${items.map(cardFn).join('')}</div>
    </div>`).join('');
  return `
    <section class="cert-list-section">
      <h3 class="cert-list-heading"><span class="dot ${dotClass}"></span> ${label} <span class="cert-list-count">${total}</span></h3>
      <div class="cert-categories">${inner}</div>
    </section>`;
}

export function renderCertList(live, comingSoon = [], filter = '') {
  const el = document.getElementById('cert-list');
  if (!el) return;

  const f = filter.trim().toLowerCase();
  const matches = c =>
    c.name.toLowerCase().includes(f) ||
    (c.code || '').toLowerCase().includes(f) ||
    (c.vendor || '').toLowerCase().includes(f) ||
    (categoryOf(c, true) || categoryOf(c, false) || '').toLowerCase().includes(f);

  const liveSorted = [...live].sort((a, b) => a.name.localeCompare(b.name));
  const liveFiltered = f ? liveSorted.filter(matches) : liveSorted;
  const csFiltered = f ? comingSoon.filter(matches) : comingSoon;

  if (!liveFiltered.length && !csFiltered.length) {
    el.innerHTML = '<p style="color:var(--text-muted);font-size:15px;padding:8px 0">No certifications found.</p>';
    return;
  }

  const liveGroups = groupByCategory(liveFiltered, true);
  const csGroups = groupByCategory(csFiltered, false);

  el.innerHTML = `
    ${renderCategorizedSection('Available now', 'dot-live', liveFiltered.length, liveGroups, renderLiveCard)}
    ${renderCategorizedSection('Coming soon', 'dot-soon', csFiltered.length, csGroups, c => renderCsCard(c, comingSoon))}
  `;

  fillSalaries(el);
  attachCertPreview(el, live);

  liveFiltered.forEach(cert => {
    Promise.all(
      cert.domains.map(d => loadDomain(cert.slug, d.slug, cert).then(qs => qs.length))
    ).then(counts => {
      const total = counts.reduce((s, n) => s + n, 0);
      const countEl = el.querySelector(`[data-cert-count="${cert.slug}"]`);
      const item = el.querySelector(`[data-cert-item="${cert.slug}"]`);
      if (!countEl || !item) return;

      if (total === 0) {
        countEl.textContent = 'No questions yet';
        item.classList.add('cert-empty');
      } else {
        countEl.innerHTML = `<strong>${total.toLocaleString()}</strong> questions <span class="cert-card-domains">· ${cert.domains.length} ${cert.domains.length === 1 ? 'domain' : 'domains'}</span>`;
      }
    });
  });
}
