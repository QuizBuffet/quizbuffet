import { loadSalaries, getSalaryEntry, formatCompactUSD, collarLabel } from '../../data/salaries/loadSalaries.js';
import { loadPricing, getPricingEntry, formatPrice } from '../../data/pricing/loadPricing.js';
import { attachCertPreview } from '../../components/certPreview/certPreview.js';
import { loadCounts } from '../../data/counts/loadCounts.js';

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
  'microsoft-az-900':                   'Cloud',
  'microsoft-az-104':                   'Cloud',
  'aws-ai-practitioner':                'Data & AI',
  'aws-ml-engineer-associate':          'Data & AI',
  'aws-genai-developer-professional':   'Data & AI',
  'aws-data-engineer-associate':        'Data & AI',
  'comptia-data-plus':                  'Data & AI',
  'osha-10-construction':               'Safety',
  'osha-30-construction':               'Safety',
  'forklift-certification':             'Safety',
  'cdl-class-a':                        'Transportation',
  'real-estate-license':                'Real Estate',
  'nmls-mlo':                           'Mortgage',
  'faa-part-107':                       'Aviation',
  'personal-trainer-nasm':              'Fitness',
  'cpr-aed':                            'Healthcare',
  'bls':                                'Healthcare',
  'quickbooks-proadvisor':              'Accounting',
  'isc2-cissp':                         'Cybersecurity',
  'itil-foundation':                    'IT Service Management',
  'cosmetology-license':                'Beauty',
  'esthetician-license':                'Beauty',
  'micropigmentation':                  'Beauty',
  'barber-license':                     'Beauty',
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
  const cat = LIVE_CATEGORY[c.slug] || c.category || 'Other';
  return `
    <a href="/${c.slug}/" class="cert-card" data-cert-item="${c.slug}" data-cat="${cat}">
      <div class="cert-card-col cert-card-col-l">
        <div class="cert-card-name">${c.name}</div>
        <div class="cert-card-meta">${c.code}${c.vendor ? ` · ${c.vendor}` : ''}</div>
        <div class="cert-card-salary" data-salary="${c.slug}"></div>
      </div>
      <div class="cert-card-col cert-card-col-r">
        <span class="cert-card-cat">${cat}</span>
        <div class="cert-card-price" data-price="${c.slug}"></div>
        <div class="cert-card-footer" data-cert-count="${c.slug}">…</div>
      </div>
    </a>`;
}

function renderCsCard(c, comingSoon) {
  const priority = comingSoon.indexOf(c) + 1;
  const cat = c.category || 'Other';
  return `
    <a href="/${c.slug}/" class="cert-card cert-coming-soon" data-cat="${cat}">
      <span class="cert-card-priority" title="Build priority">#${priority}</span>
      <div class="cert-card-col cert-card-col-l">
        <div class="cert-card-name">${c.name}</div>
        <div class="cert-card-meta">${c.code}${c.vendor ? ` · ${c.vendor}` : ''}</div>
        <div class="cert-card-salary" data-salary="${c.slug}"></div>
      </div>
      <div class="cert-card-col cert-card-col-r">
        <span class="cert-card-cat">${cat}</span>
        <div class="cert-card-price" data-price="${c.slug}"></div>
        <div class="cert-card-footer">Coming soon</div>
      </div>
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
    scheduleCollarShakes();
  });
}

function fillPricing(rootEl) {
  loadPricing().then(pricing => {
    rootEl.querySelectorAll('[data-price]').forEach(slot => {
      const entry = getPricingEntry(pricing, slot.dataset.price);
      if (!entry) { slot.remove(); return; }
      slot.innerHTML = `
        <span class="cert-card-price-other">${formatPrice(entry.practice_usd)} elsewhere</span>
        <span class="cert-card-price-us">free here</span>`;
    });
  });
}

// Pick a random visible collar icon every few seconds and shake it briefly.
// Sparse: only one at a time, with random gaps between 1.8s and 5s.
let shakeScheduled = false;
function scheduleCollarShakes() {
  if (shakeScheduled) return;
  shakeScheduled = true;
  const tick = () => {
    if (document.hidden) {
      setTimeout(tick, 4000);
      return;
    }
    const icons = document.querySelectorAll('.cert-card-salary-collar, .salary-collar-icon');
    if (icons.length) {
      const pick = icons[Math.floor(Math.random() * icons.length)];
      // Restart the CSS animation without a synchronous layout flush
      pick.classList.remove('shake');
      requestAnimationFrame(() => requestAnimationFrame(() => {
        pick.classList.add('shake');
        pick.addEventListener('animationend', () => pick.classList.remove('shake'), { once: true });
      }));
    }
    const delay = icons.length ? (500 + Math.random() * 1300) : 800;
    setTimeout(tick, delay);
  };
  setTimeout(tick, 400);
}

// Pick column count from viewport so JS packing matches the CSS grid breakpoints.
function getColumnCount() {
  if (typeof window === 'undefined') return 3;
  const w = window.innerWidth;
  if (w >= 1500) return 3;
  if (w >= 720)  return 2;
  return 1;
}

// Bin-pack categories into N columns using LPT (Longest Processing Time first):
// sort by weight desc, then drop each category into the currently-shortest column.
// Within each column, restore the original CATEGORY_ORDER so reading order stays stable.
// Each heading is ~1.5 cards tall, so headingWeight=1.5 makes 1-item categories feel real.
function packIntoColumns(groups, columnCount, headingWeight = 1.5) {
  if (columnCount <= 1 || groups.length <= 1) return [{ groups: [...groups] }];
  const orderIndex = new Map(groups.map((g, i) => [g[0], i]));
  const sorted = [...groups].sort((a, b) => b[1].length - a[1].length);
  const columns = Array.from({ length: columnCount }, () => ({ groups: [], weight: 0 }));
  for (const g of sorted) {
    const w = g[1].length + headingWeight;
    let target = columns[0];
    for (const col of columns) if (col.weight < target.weight) target = col;
    target.groups.push(g);
    target.weight += w;
  }
  for (const col of columns) col.groups.sort(([a], [b]) => orderIndex.get(a) - orderIndex.get(b));
  return columns;
}

function renderCategorizedSection(label, dotClass, total, groups, cardFn) {
  if (!total) return '';
  const columns = packIntoColumns(groups, getColumnCount());
  const renderCat = ([cat, items]) => `
    <div class="cert-category">
      <h4 class="cert-category-heading">${cat} <span class="cert-list-count">${items.length}</span></h4>
      <div class="cert-category-cards">${items.map(cardFn).join('')}</div>
    </div>`;
  const inner = columns.map(col => `
    <div class="cert-column">${col.groups.map(renderCat).join('')}</div>`).join('');
  return `
    <section class="cert-list-section">
      <h3 class="cert-list-heading"><span class="dot ${dotClass}"></span> ${label} <span class="cert-list-count">${total}</span></h3>
      <div class="cert-categories" data-cols="${columns.length}">${inner}</div>
    </section>`;
}

let lastCall = null;
let lastCols = typeof window !== 'undefined' ? getColumnCount() : 3;
let resizeTimer = null;
let resizeAttached = false;

function attachResizeRepacker() {
  if (resizeAttached || typeof window === 'undefined') return;
  resizeAttached = true;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const cols = getColumnCount();
      if (cols !== lastCols && lastCall) {
        lastCols = cols;
        renderCertList(lastCall.live, lastCall.comingSoon, lastCall.filter);
      }
    }, 120);
  });
}

export function renderCertList(live, comingSoon = [], filter = '') {
  lastCall = { live, comingSoon, filter };
  attachResizeRepacker();
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
  fillPricing(el);
  attachCertPreview(el, live);

  loadCounts().then(counts => {
    const perCert = (counts && counts.perCert) || {};
    liveFiltered.forEach(cert => {
      const countEl = el.querySelector(`[data-cert-count="${cert.slug}"]`);
      const item = el.querySelector(`[data-cert-item="${cert.slug}"]`);
      if (!countEl || !item) return;
      const total = perCert[cert.slug] || 0;
      if (total === 0) {
        countEl.textContent = 'No questions yet';
        item.classList.add('cert-empty');
      } else {
        countEl.innerHTML = `<strong>${total.toLocaleString()}</strong> questions <span class="cert-card-domains">· ${cert.domains.length} ${cert.domains.length === 1 ? 'domain' : 'domains'}</span>`;
      }
    });
  });
}
