// Generates per-cert static HTML pages with full SEO metadata, JSON-LD (Course + FAQPage),
// per-cert OG images, and a fresh sitemap. Run with: node scripts/build-seo.mjs

import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';
import { certifications } from '../js/data/certifications/index.js';

const ROOT = path.resolve(import.meta.dirname, '..');
const SITE = 'https://quizbuffet.com';
const TODAY = new Date().toISOString().slice(0, 10);

// Human-readable display version of an ISO date (e.g. "May 13, 2026"). Must represent the
// SAME calendar date as its input so Google's byline pipeline can match the visible byline
// to the JSON-LD dateModified/datePublished.
function displayDate(iso) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC',
  });
}
// Used only where no single page's date applies: data/build.json, counts.json.generatedAt.
const TODAY_DISPLAY = displayDate(TODAY);
const maxDate = (a, b) => (a > b ? a : b);

// Real per-page freshness instead of stamping every page with today's date on every build:
// a sitemap where every lastmod is always today gets ignored by Google as a recrawl signal.
// Falls back to TODAY for a path with uncommitted working-tree changes (that page really is
// changing right now) or one git has no history for yet (new page, not committed).
const dateCache = new Map();
function lastCommitDate(relPath) {
  if (dateCache.has(relPath)) return dateCache.get(relPath);
  let d = '';
  try {
    const dirty = execSync(`git status --porcelain -- "${relPath}"`, { cwd: ROOT }).toString().trim();
    if (!dirty) d = execSync(`git log -1 --format=%cs -- "${relPath}"`, { cwd: ROOT }).toString().trim();
  } catch { d = ''; }
  if (!d) d = TODAY;
  dateCache.set(relPath, d);
  return d;
}

// data/published.json: slug (and slug/domain) -> first-publish date, persisted across builds
// so datePublished stops being overwritten with TODAY on every run. Seeded from git history
// on the first run after this map gains a new key; read back unchanged after that.
const PUBLISHED_PATH = path.join(ROOT, 'data', 'published.json');
const published = fs.existsSync(PUBLISHED_PATH) ? JSON.parse(fs.readFileSync(PUBLISHED_PATH, 'utf8')) : {};
let publishedDirty = false;
function firstPublishDate(key, relPath) {
  if (published[key]) return published[key];
  let d = '';
  try { d = execSync(`git log --diff-filter=A --format=%cs -- "${relPath}" | tail -1`, { cwd: ROOT }).toString().trim(); } catch { d = ''; }
  published[key] = d || TODAY;
  publishedDirty = true;
  return published[key];
}

// D4: only claim "Last updated" when that is still true within a normal recrawl window;
// an old, untouched page reads as more honest (and less like a manipulated freshness
// signal) labeled by when it was first published instead.
function bylineHtml(modified, publishedIso) {
  const ageDays = (Date.parse(TODAY) - Date.parse(modified)) / 86400000;
  const label = ageDays <= 365 ? 'Last updated' : 'Published';
  const shown = ageDays <= 365 ? modified : publishedIso;
  return `<time datetime="${shown}">${label}: ${displayDate(shown)}</time>`;
}

// Site style rule (CLAUDE.md): no em-dashes or en-dashes anywhere in rendered pages.
// Sources are kept clean, but question data and FAQ text can still carry them, so every
// generated file passes through this before it is written.
function noDash(s) {
  return String(s)
    .replace(/&(?:mdash|ndash|#8212|#8211|#x2014|#x2013);/gi, '\u2014')
    .replace(/(?<=\d)[\u2013\u2014](?=\d)/g, '-')
    .replace(/\s*[\u2013\u2014]\s+(?=[A-Z][a-z])/g, '. ')
    .replace(/\s*[\u2013\u2014]\s+/g, ', ')
    .replace(/[\u2013\u2014]/g, ', ');
}

function htmlEscape(s) {
  return noDash(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function writeClean(file, text) {
  fs.writeFileSync(file, noDash(text));
}

// Trim a string to <= maxLen, breaking at the last whitespace before the cut.
// Drops a trailing ellipsis only if we actually trimmed mid-content.
function clipText(s, maxLen) {
  s = String(s).trim();
  if (s.length <= maxLen) return s;
  const cut = s.slice(0, maxLen);
  const lastSpace = cut.lastIndexOf(' ');
  let out = (lastSpace > maxLen * 0.6 ? cut.slice(0, lastSpace) : cut).replace(/[.,;:\-—]+$/, '').trim();
  // Drop a dangling trailing conjunction/preposition/article so the snippet
  // doesn't read as cut off (e.g. "...instant feedback and").
  out = out.replace(/\s+(?:and|or|but|with|the|a|an|of|to|for|in|on|at|by|so)$/i, '').trim();
  return out;
}

// EEA (EU27 + Iceland/Liechtenstein/Norway) + UK: the region set that gets a denied-by-default
// ad-consent posture. Everyone else gets ad consent granted by default (opt-in isn't required
// there); analytics stays denied by default everywhere until Accept.
const EEA_UK_REGIONS = ['AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE', 'IS', 'LI', 'NO', 'GB'];

// Consent Mode v2 + gtag head block shared by every generated page (cert/domain/coming-soon).
// index.html, privacy/index.html, and cpa/index.html carry their own hand-maintained copy of
// this same block (build:seo does not touch those files), keep them in sync by hand. See
// CLAUDE.md "Analytics consent" before changing this.
function buildConsentGtagBlock() {
  return `<!-- Google tag (gtag.js) with Consent Mode v2, ad consent region-split (EEA/UK denied until Accept, granted by default elsewhere); analytics denied everywhere until Accept. Do not revert to a bare config: see CLAUDE.md "Analytics consent". -->
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('consent', 'default', {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: 'denied',
      functionality_storage: 'denied',
      personalization_storage: 'denied',
      security_storage: 'granted',
      region: ${JSON.stringify(EEA_UK_REGIONS)},
      wait_for_update: 500
    });
    gtag('consent', 'default', {
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted',
      analytics_storage: 'denied',
      functionality_storage: 'denied',
      personalization_storage: 'denied',
      security_storage: 'granted',
      wait_for_update: 500
    });
    try{
      if(localStorage.getItem('qb_consent')==='granted'){
        gtag('consent','update',{analytics_storage:'granted', ad_storage:'granted', ad_user_data:'granted'});
      }
    }catch(e){}
  </script>
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-YRKFB3WT9C"></script>
  <script>
    gtag('js', new Date());
    gtag('config', 'G-YRKFB3WT9C');
    gtag('config', 'AW-17221241617');
  </script>

  <!-- Event snippet for Page view conversion page -->
  <script>
    // Secondary conversion only: every page view fires this. Set its Google Ads
    // conversion action to Secondary (Goals > Conversions > Goal and action optimization)
    // so it never competes with the real primary conversion (see trackConversion.js /
    // TODO.md A1, Q4). No value/currency: a page view is not a $1 event.
    gtag('event', 'conversion', {
        'send_to': 'AW-17221241617/yyIzCIPOruQaEJGW3ZNA'
    });
  </script>`;
}

function loadDomainQuestions(certSlug, domainSlug) {
  const p = path.join(ROOT, 'data', 'certifications', certSlug, `${domainSlug}.json`);
  if (!fs.existsSync(p)) return [];
  try {
    const d = JSON.parse(fs.readFileSync(p, 'utf8'));
    return d.questions || [];
  } catch { return []; }
}

// Wikipedia entity URLs for known vendors: lets AI link your pages to canonical entities
const VENDOR_ENTITIES = {
  'CompTIA': 'https://en.wikipedia.org/wiki/CompTIA',
  'Cisco':   'https://en.wikipedia.org/wiki/Cisco',
  'AWS':     'https://en.wikipedia.org/wiki/Amazon_Web_Services',
  'Microsoft': 'https://en.wikipedia.org/wiki/Microsoft',
  'ISC2':    'https://en.wikipedia.org/wiki/(ISC)%C2%B2',
  'PeopleCert': 'https://en.wikipedia.org/wiki/PeopleCert',
  'OSHA':    'https://en.wikipedia.org/wiki/Occupational_Safety_and_Health_Administration',
  'AWS / OSHA': 'https://en.wikipedia.org/wiki/Occupational_Safety_and_Health_Administration',
  'FAA':     'https://en.wikipedia.org/wiki/Federal_Aviation_Administration',
  'NREMT':   'https://en.wikipedia.org/wiki/National_Registry_of_Emergency_Medical_Technicians',
  'NASM':    'https://en.wikipedia.org/wiki/National_Academy_of_Sports_Medicine',
  'PMI':     'https://en.wikipedia.org/wiki/Project_Management_Institute',
  'Intuit':  'https://en.wikipedia.org/wiki/Intuit',
  'American Heart Association': 'https://en.wikipedia.org/wiki/American_Heart_Association',
};

// Trim a verbose explanation down to the first sentence, what AI prefers to quote
function trimToFirstSentence(text, maxLen = 280) {
  const t = String(text).trim();
  const m = t.match(/^([^.!?]+[.!?])\s/);
  let out = m ? m[1] : t;
  if (out.length > maxLen) out = out.slice(0, maxLen).replace(/\s\S*$/, '') + '…';
  return out;
}

// G2: 8-question mixed-difficulty sample instead of 3 easy-only, so domain pages carry
// real, varied content beyond the two identical filler sentences every page used to share.
// Falls back gracefully (fills from whatever's left) when a domain lacks a full bucket.
function pickMixedSample(questions, target = 8) {
  const buckets = { easy: 2, medium: 3, 'medium-hard': 2, hard: 1 };
  const byDiff = {};
  for (const q of questions) (byDiff[q.difficulty] ||= []).push(q);
  const used = new Set();
  const picked = [];
  for (const [diff, n] of Object.entries(buckets)) {
    for (const q of (byDiff[diff] || []).slice(0, n)) { picked.push(q); used.add(q.id); }
  }
  if (picked.length < target) {
    for (const q of questions) {
      if (picked.length >= target) break;
      if (!used.has(q.id)) { picked.push(q); used.add(q.id); }
    }
  }
  return picked.slice(0, Math.min(target, questions.length));
}

// G3: "Key terms in this domain" block, sourced entirely from data the site already has
// (js/data/services/<slug>.js, the same concept list used by the cert page's Service Match
// drill) — no new content authored. Only 42 of 51 certs have a services file; domains on the
// rest simply render no block (see the `services.length` guard at the call site).
// Generic words excluded here would otherwise "match" almost every entry in an AWS-style
// services file (nearly every description mentions "cloud"/"data"/"aws"), swamping the
// genuinely discriminating words with noise.
const STOPWORDS = new Set(['and', 'the', 'for', 'with', 'of', 'to', 'in', 'on', 'a', 'an', 'aws', 'amazon', 'cloud', 'data', 'service', 'services', 'your', 'you']);

async function loadServices(certSlug) {
  const svcPath = path.join(ROOT, 'js', 'data', 'services', `${certSlug}.js`);
  if (!fs.existsSync(svcPath)) return [];
  const mod = await import(pathToFileURL(svcPath).href);
  return mod.services || [];
}

function domainSearchWords(domain, questions) {
  const words = new Set();
  for (const w of domain.name.toLowerCase().split(/\W+/)) {
    if (w.length > 3 && !STOPWORDS.has(w)) words.add(w);
  }
  const keywordCounts = {};
  for (const q of questions) {
    if (!q.keyword) continue;
    for (const w of q.keyword.toLowerCase().split(/\W+/)) {
      if (w.length > 3 && !STOPWORDS.has(w)) keywordCounts[w] = (keywordCounts[w] || 0) + 1;
    }
  }
  Object.entries(keywordCounts).sort((a, b) => b[1] - a[1]).slice(0, 15).forEach(([w]) => words.add(w));
  return words;
}

function pickKeyTerms(services, searchWords, max = 10) {
  const scored = services.map(s => {
    const hay = `${s.a} ${s.d}`.toLowerCase();
    let score = 0;
    for (const w of searchWords) if (hay.includes(w)) score++;
    return { s, score };
  }).filter(x => x.score > 0);
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, max).map(x => x.s);
}

function pickFaqQuestions(cert, max = 12) {
  // Prefer hand-written, search-intent FAQs (real "People also ask" style questions)
  // when the cert defines them. These render visibly AND seed the FAQPage schema.
  if (Array.isArray(cert.faq) && cert.faq.length) {
    return cert.faq.filter(f => f && f.q && f.a).slice(0, max).map(f => ({ question: f.q, answer: f.a }));
  }
  // Fallback: seed a few easy exam questions per domain (schema only, not rendered).
  const faq = [];
  const perDomain = Math.max(1, Math.ceil(max / cert.domains.length));
  for (const dom of cert.domains) {
    const qs = loadDomainQuestions(cert.slug, dom.slug).filter(q => q.difficulty === 'easy');
    for (let i = 0; i < perDomain && i < qs.length && faq.length < max; i++) {
      const q = qs[i];
      const correct = (q.answers || []).find(a => a.id === q.correct);
      const correctText = correct?.text || '';
      const explanation = q.explanations?.[q.correct] || '';
      const answer = trimToFirstSentence(correctText || explanation);
      if (q.text && answer) {
        faq.push({ question: q.text, answer });
      }
    }
  }
  return faq;
}

function buildOgSvg(cert) {
  // Simple text-on-color OG image, 1200x630
  const palette = {
    'comptia-security-plus':   '#0b6e4f',
    'comptia-network-plus':    '#1f4287',
    'comptia-cloud-plus':      '#2b6cb0',
    'comptia-cysa-plus':       '#9c1d1d',
    'comptia-pentest-plus':    '#7a1f1f',
    'comptia-a-plus-core-1':   '#5b3a8c',
    'comptia-a-plus-core-2':   '#5b3a8c',
    'comptia-itf-plus':        '#8a4a00',
    'comptia-data-plus':       '#a83b5b',
  };
  const bg = palette[cert.slug] || '#333333';
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${bg}"/>
  <text x="60" y="180" font-family="Nunito, system-ui, sans-serif" font-size="48" fill="#ffffff" font-weight="600" opacity="0.85">QuizBuffet</text>
  <text x="60" y="320" font-family="Nunito, system-ui, sans-serif" font-size="92" fill="#ffffff" font-weight="700">${htmlEscape(cert.name)}</text>
  <text x="60" y="400" font-family="Nunito, system-ui, sans-serif" font-size="48" fill="#ffffff" opacity="0.85">${htmlEscape(cert.code)}</text>
  <text x="60" y="540" font-family="Nunito, system-ui, sans-serif" font-size="40" fill="#ffffff" opacity="0.95" font-weight="600">Free Practice Test</text>
  <text x="60" y="590" font-family="Nunito, system-ui, sans-serif" font-size="28" fill="#ffffff" opacity="0.8">Domain-by-domain quizzes · No account needed</text>
</svg>`;
}

// Salary data per cert: { collar, salary: { low, mid, high, currency }, notes, lastUpdated, sources }
const SALARIES = (() => {
  try { return JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'salaries.json'), 'utf8')); }
  catch { return {}; }
})();

function fmtUsd(n) { return '$' + Math.round(n / 1000) + 'k'; }

// First-draft long-form prose for a cert. Author can override any field by
// setting cert.guide.<field> on the cert metadata. Otherwise we auto-generate
// from cert metadata + salary data so every cert page has unique substantive
// long-form content (article-style: eligible for informational queries and
// the byline-date pipeline).
function buildCertGuideSections(cert) {
  const g = cert.guide || {};
  const year = new Date().getFullYear();
  const sortedDomains = [...cert.domains].sort((a, b) => (b.weight || 0) - (a.weight || 0));
  const heaviest = sortedDomains[0];
  const lightest = sortedDomains[sortedDomains.length - 1];
  const sal = SALARIES[cert.slug];

  const whyItMatters = g.whyItMatters || (
    `${cert.name} is one of the most recognized credentials issued by ${cert.vendor}, ` +
    `and ${year} hiring data continues to show ${cert.code} on job postings as either required ` +
    `or strongly preferred for the roles it targets. The certification validates that you can ` +
    `apply real working knowledge, not just recall facts, across ${cert.domains.length} distinct ` +
    `exam domains${heaviest ? `, with the largest weight on ${heaviest.name}` : ''}. For candidates competing in the ${cert.vendor} ecosystem, ${cert.code} is a ` +
    `clear signal to a hiring manager that you have invested in measurable, third-party-verified competence.`
  );

  const whoShouldTake = g.whoShouldTake || (
    `${cert.code} is most useful for professionals working in or moving toward the ${cert.vendor} ecosystem. ` +
    `${cert.tagline ? `In short: ${cert.tagline.replace(/\.$/, '')}. ` : ''}` +
    `If you are early in your career, ${cert.code} is one of the fastest credentials to add to a résumé that recruiters actively screen for. ` +
    `If you are mid-career, it formalizes the skills you already use day-to-day and unlocks roles that gate on it. ` +
    `If you are switching tracks, it gives you a structured curriculum that tells you exactly what to study, in what order, weighted by what the real exam tests.`
  );

  const examStructure = g.examStructure || (
    `The ${cert.name} exam is organized into ${cert.domains.length} domains, each weighted by the official ${cert.vendor} ` +
    `exam guide. The heaviest weighting is ${heaviest.name} at <strong>${heaviest.weight}% of the exam</strong>, so that is where you ` +
    `should spend the most preparation time. ${lightest && lightest !== heaviest ? `The lightest is ${lightest.name} at ${lightest.weight}%, ` +
    `meaning you can dedicate roughly proportional review time without over-investing. ` : ''}` +
    `${cert.details ? `<br><br>Format details: ${cert.details}. ` : ''}` +
    `Following the domain weights is the single biggest leverage point candidates miss, because many over-study lower-weighted material that feels comfortable.`
  );

  const studyPlan = g.studyPlan || (
    `A practical four-step plan for ${cert.code}:`
  );
  const studyPlanSteps = g.studyPlanSteps || [
    `Read the official ${cert.vendor} exam guide for ${cert.code} and write down every sub-objective. This becomes your study checklist.`,
    `Use the domain practice quizzes on this page in weight order (heaviest first). Aim for 80% on each domain before moving on.`,
    `When you miss a question, read the explanation for every wrong answer, because that contrastive learning is where understanding compounds.`,
    `Once every domain is at 80%+, take the Mix Quiz repeatedly to simulate real exam conditions across all topics.`,
  ];

  const salarySource = sal?.sources?.length
    ? ` <span class="cert-salary-source">Source: ${htmlEscape(sal.sources.join(', '))}${sal.lastUpdated ? `, ${sal.lastUpdated.slice(0, 4)}` : ''}.</span>`
    : '';
  const career = (g.career ? g.career + salarySource : null) || (sal ? (
    `Holders of ${cert.code} in the US currently see compensation in the range of ` +
    `<strong>${fmtUsd(sal.salary.low)} to ${fmtUsd(sal.salary.high)}</strong> per year, with median around <strong>${fmtUsd(sal.salary.mid)}</strong>. ` +
    `${sal.notes ? sal.notes + ' ' : ''}` +
    `Salary varies by region, employer size, and complementary skills, but the ${cert.code} credential consistently lifts the floor of what you can negotiate against.` +
    `${sal.sources?.length ? ` <span class="cert-salary-source">Source: ${htmlEscape(sal.sources.join(', '))}${sal.lastUpdated ? `, ${sal.lastUpdated.slice(0, 4)}` : ''}.</span>` : ''}`
  ) : (
    `${cert.code} opens doors to roles in the ${cert.vendor} ecosystem where the certification appears as a hiring filter. ` +
    `Compensation varies by region and employer, but the credential consistently lifts the floor of what you can negotiate against.`
  ));

  const pitfalls = g.pitfalls || (
    `The three traps that kill ${cert.code} candidates: (1) over-memorizing acronyms instead of practicing the application of concepts in scenarios, when ` +
    `the exam is scenario-driven, not a vocab quiz. (2) Skipping the heaviest-weighted domain because it feels less interesting, which can fail the whole exam ` +
    `by neglecting ${heaviest.name}. (3) Not timing practice sessions, when the exam has a real clock and pacing is its own skill. Build timing into your last two weeks of prep.`
  );

  return {
    whyItMatters, whoShouldTake, examStructure,
    studyPlan, studyPlanSteps,
    career, pitfalls,
  };
}

function buildCertGuideHtml(cert) {
  const s = buildCertGuideSections(cert);
  const slug = cert.slug;
  return `
    <section class="cert-guide">
      <header class="cert-guide-header">
        <h2 class="cert-section-title">The ${htmlEscape(cert.code)} Guide</h2>
        <p class="cert-guide-subtitle">Everything you need to know before sitting for ${htmlEscape(cert.name)}</p>
      </header>

      <h3 id="${slug}-why-it-matters">Why ${htmlEscape(cert.code)} matters in ${new Date().getFullYear()}</h3>
      <p>${s.whyItMatters}</p>

      <h3 id="${slug}-who-should-take">Who should take ${htmlEscape(cert.code)}</h3>
      <p>${s.whoShouldTake}</p>

      <h3 id="${slug}-exam-structure">Exam structure and difficulty</h3>
      <p>${s.examStructure}</p>

      <h3 id="${slug}-study-plan">How to prepare</h3>
      <p>${s.studyPlan}</p>
      <ol class="cert-guide-steps">
        ${s.studyPlanSteps.map(step => `<li>${step}</li>`).join('\n        ')}
      </ol>

      <h3 id="${slug}-career">Career outcomes and salary</h3>
      <p>${s.career}</p>

      <h3 id="${slug}-pitfalls">Common pitfalls</h3>
      <p>${s.pitfalls}</p>
    </section>`;
}

// Visible FAQ block. Only rendered for certs that hand-author real search-intent
// questions (cert.faq); seeds the same content shown in the FAQPage JSON-LD so the
// page can earn "People also ask" placements. `faq` is the [{question, answer}] list.
function buildFaqHtml(cert, faq) {
  if (!faq.length) return '';
  const items = faq.map(item => `
        <div class="cert-faq-item">
          <h3>${htmlEscape(item.question)}</h3>
          <p>${htmlEscape(item.answer)}</p>
        </div>`).join('');
  return `
      <section class="cert-faq">
        <h2 class="cert-section-title">${htmlEscape(cert.code)} questions, answered</h2>${items}
      </section>`;
}

function buildCertHtml(cert) {
  // Count questions per domain
  let total = 0;
  const domainData = cert.domains.map(dom => {
    const qs = loadDomainQuestions(cert.slug, dom.slug);
    total += qs.length;
    return { ...dom, count: qs.length };
  });

  // D1/D2: real per-page freshness. modified = last commit touching either the question
  // data or the metadata file; published = first-publish date, persisted in published.json.
  const metaRelPath = `js/data/certifications/${cert.slug}.js`;
  const modified = maxDate(lastCommitDate(`data/certifications/${cert.slug}`), lastCommitDate(metaRelPath));
  const publishedDate = firstPublishDate(cert.slug, metaRelPath);

  // Registered certs with zero questions are scaffolds, not real pages, noindex so
  // Google doesn't flag them as "Crawled - currently not indexed". noindex clears
  // automatically once any domain ships with questions.
  const robotsMeta = total === 0
    ? 'noindex, follow'
    : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';

  const faq = pickFaqQuestions(cert);
  // F3: pickRelatedLive was already built for coming-soon pages; wire it up here too so live
  // cert pages cross-link to 3 other live certs in the same category (cheap internal authority).
  const related = pickRelatedLive(cert, certifications.filter(c => c.slug !== cert.slug), 3);
  const url = `${SITE}/${cert.slug}/`;
  const ogImage = `${SITE}/icons/og/${cert.slug}.svg`;
  const shortName = cert.name.replace(/^AWS Certified |^Microsoft |^CompTIA |^Cisco /i, '').replace(/–|—/g, '-').trim();
  // Search Console: searchers use the cert name plus "practice test"/"practice exam", almost
  // never the raw exam code (under 5% of queries), leading titles with the code was rejected
  // by Google on most pages (it substitutes its own title from the H1 instead). seoName lets a
  // cert override cert.name when it's long or reads unnaturally as a title lead.
  const seoName = cert.seoName || cert.name;
  // Drop the "(code)" parenthetical when it's already inside seoName (the string the title
  // actually uses) — e.g. CISSP's seoName "CISSP (ISC2)" already contains "CISSP", so a
  // trailing "(CISSP)" would just duplicate it. Checking cert.name here (rather than seoName)
  // was the original bug: cert.name is the long-form name, which never contains the code.
  const norm = s => s.toLowerCase().replace(/[^a-z0-9]/g, '');
  const codeTag = norm(seoName).includes(norm(cert.code)) ? '' : ` (${htmlEscape(cert.code)})`;
  // Title tiers: never let clipText cut into "Practice Test". Try the full form, then drop
  // the code, then the count, then fall back to the exam code as the lead.
  const titleLeadName = `${seoName} Practice Test`.length <= 60 ? seoName : cert.code;
  const titleTiers = total > 0
    ? [`${titleLeadName} Practice Test: ${total}+ Free Questions${codeTag}`,
       `${titleLeadName} Practice Test: ${total}+ Free Questions`,
       `${titleLeadName} Practice Test: Free Questions`,
       `${titleLeadName} Free Practice Test`,
       `${titleLeadName} Practice Test`]
    : [`${titleLeadName} Practice Test (Coming Soon)`, `${titleLeadName} Practice Test`];
  const fullTitle = cert.seoTitle
    ? clipText(cert.seoTitle, 60)
    : clipText(titleTiers.find(t => t.length <= 60) || titleTiers[titleTiers.length - 1], 60);
  const desc = total > 0
    ? clipText((cert.seoDescription || `Free ${seoName} practice test online: ${total} exam-style questions across ${cert.domains.length} domains with instant feedback and explanations. No signup. Covers the ${cert.code} exam.`).trim().replace(/\s+/g, ' '), 155)
    : clipText(`${seoName} practice test, coming soon. Test yourself across ${cert.domains.length} exam domains with instant feedback and explanations. No signup, no email.`.trim().replace(/\s+/g, ' '), 155);

  // JSON-LD: WebPage + Course + FAQPage + Breadcrumb
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        'itemListElement': [
          { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': `${SITE}/` },
          { '@type': 'ListItem', 'position': 2, 'name': `${cert.name} Practice Test`, 'item': url },
        ],
      },
      {
        '@type': 'Course',
        'name': fullTitle,
        'courseCode': cert.code,
        'description': cert.about || desc,
        'url': url,
        'inLanguage': 'en-US',
        'dateModified': modified,
        'educationalCredentialAwarded': cert.name,
        'learningResourceType': 'Practice Test',
        'isAccessibleForFree': true,
        'teaches': cert.domains.map(d => d.name),
        'provider': {
          '@type': 'Organization',
          'name': 'QuizBuffet',
          'url': SITE,
        },
        'hasCourseInstance': {
          '@type': 'CourseInstance',
          'courseMode': 'online',
          'courseWorkload': `PT${Math.max(1, Math.round(total / 60))}H`,
        },
        'about': [
          ...(VENDOR_ENTITIES[cert.vendor] ? [{
            '@type': 'Organization',
            'name': cert.vendor,
            'sameAs': VENDOR_ENTITIES[cert.vendor],
          }] : []),
          ...cert.domains.map(d => ({ '@type': 'Thing', 'name': d.name })),
        ],
        // hasPart links each domain quiz as a component of this Course, explicit
        // hierarchy that helps Google decide which sub-pages to surface as sitelinks.
        'hasPart': domainData.filter(d => d.count > 0).map(d => ({
          '@type': 'Quiz',
          'name': `Free ${cert.code} ${d.name} Questions`,
          'url': `${SITE}/${cert.slug}/${d.slug}/`,
          'numberOfItems': d.count,
          'isAccessibleForFree': true,
        })),
        'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'USD', 'availability': 'https://schema.org/InStock' },
      },
      ...(faq.length ? [{
        '@type': 'FAQPage',
        'mainEntity': faq.map(item => ({
          '@type': 'Question',
          'name': item.question,
          'acceptedAnswer': { '@type': 'Answer', 'text': item.answer },
        })),
      }] : []),
      {
        '@type': 'Article',
        'headline': `The ${cert.code} Study Guide`,
        'description': desc,
        'url': url,
        'datePublished': publishedDate,
        'dateModified': modified,
        'inLanguage': 'en-US',
        'image': ogImage,
        'author': { '@type': 'Organization', 'name': 'QuizBuffet', 'url': SITE },
        'publisher': {
          '@type': 'Organization',
          'name': 'QuizBuffet',
          'url': SITE,
          'logo': { '@type': 'ImageObject', 'url': `${SITE}/favicon-96x96.png` },
        },
        'mainEntityOfPage': { '@type': 'WebPage', '@id': url },
      },
    ],
  };

  // Static SEO content (visible to crawlers; hidden by CSS once JS loads)
  const domainListHtml = domainData.map(d => {
    const num = d.number ? `${d.number} ` : '';
    return `<li><a href="/${cert.slug}/${d.slug}/"><strong>${htmlEscape(num + d.name)}</strong>${d.count ? `, ${d.count} questions` : ''}${d.weight ? ` (${d.weight}% of exam)` : ''}</a></li>`;
  }).join('\n          ');

  // Inject Udemy affiliates alongside whatever each cert defines in its metadata.
  // cert.udemyCourseUrl → primary "Top-rated" course.
  // cert.extraUdemyCourses → additional courses (e.g. domain-specific). Both auto-wrapped in trk link.
  const udemyAffs = [{
    label: cert.udemyCourseUrl
      ? `Top-rated ${cert.code} course on Udemy`
      : `${cert.code} courses on Udemy`,
    url: udemyForCert(cert),
  }];
  (cert.extraUdemyCourses || []).filter(c => c && c.url && c.label).forEach(c => {
    udemyAffs.push({ label: c.label, url: udemyDeepLink(c.url) });
  });
  const affiliateHtml = [...udemyAffs, ...(cert.affiliates || []).filter(a => a.url)].map(a =>
    `<li><a href="${htmlEscape(a.url)}" rel="nofollow sponsored">${htmlEscape(a.label)}</a></li>`
  ).join('\n          ');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${htmlEscape(fullTitle)}</title>
  <meta name="description" content="${htmlEscape(desc)}">
  <link rel="canonical" href="${url}">
  <meta name="robots" content="${robotsMeta}">

  <meta property="og:type"        content="website">
  <meta property="og:site_name"   content="QuizBuffet">
  <meta property="og:title"       content="${htmlEscape(fullTitle)}">
  <meta property="og:description" content="${htmlEscape(desc)}">
  <meta property="og:image"       content="${ogImage}">
  <meta property="og:url"         content="${url}">

  <meta name="twitter:card"        content="summary_large_image">
  <meta name="twitter:title"       content="${htmlEscape(fullTitle)}">
  <meta name="twitter:description" content="${htmlEscape(desc)}">
  <meta name="twitter:image"       content="${ogImage}">

  <link rel="sitemap" type="application/xml" href="/sitemap.xml">
  <link rel="alternate" type="text/markdown" title="LLM-friendly index" href="/llms.txt">
  <link rel="alternate" type="text/markdown" title="LLM full content" href="/llms-full.txt">
  <link rel="alternate" type="application/rss+xml" title="QuizBuffet, new certs and updates" href="/feed.xml">
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png">
  <link rel="icon" type="image/png" sizes="192x192" href="/android-icon-192x192.png">
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png">
  <link rel="shortcut icon" href="/favicon.ico">
  <link rel="manifest" href="/manifest.json">
  <meta name="apple-mobile-web-app-title" content="QuizBuffet">
  <meta name="msapplication-TileColor" content="#ffffff">
  <meta name="msapplication-TileImage" content="/ms-icon-144x144.png">
  <meta name="msapplication-config" content="/browserconfig.xml">
  <meta name="theme-color" content="#333333">

  <script>document.documentElement.classList.add('js');try{var t=localStorage.getItem('qb_theme');if(t==='dark')document.documentElement.dataset.theme='dark';var c=localStorage.getItem('qb_color')||'buffet';document.documentElement.dataset.color=c;var cur=localStorage.getItem('qb_cursor')||'pencil';document.documentElement.dataset.cursor=cur;}catch(e){}</script>

  ${buildConsentGtagBlock()}

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <!-- Preload the woff2 files we use above the fold so they're ready before paint and don't cause font-swap CLS. -->
  <!-- URLs come from Google Fonts; they rotate occasionally: update with: curl -A "<chrome UA>" "<the css2 url>" -->
  <link rel="preload" as="font" type="font/woff2" crossorigin href="https://fonts.gstatic.com/s/playfairdisplay/v40/nuFRD-vYSZviVYUb_rj3ij__anPXDTnCjmHKM4nYO7KN_qiTXtHA-X-uE0qEEw.woff2">
  <link rel="preload" as="font" type="font/woff2" crossorigin href="https://fonts.gstatic.com/s/playfairdisplay/v40/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKebunDXbtPK-F2qC0s.woff2">
  <link rel="preload" as="font" type="font/woff2" crossorigin href="https://fonts.gstatic.com/s/imfellenglishsc/v16/a8IENpD3CDX-4zrWfr1VY879qFF05pZ7PIIPoUgxzQ.woff2">
  <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&family=Playfair+Display:ital,wght@0,600;1,400&family=IM+Fell+English+SC&display=optional" onload="this.onload=null;this.rel='stylesheet'">
  <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&family=Playfair+Display:ital,wght@0,600;1,400&family=IM+Fell+English+SC&display=optional"></noscript>
  <link rel="preload" as="style" href="/css/style.min.css" onload="this.onload=null;this.rel='stylesheet'">
  <noscript><link rel="stylesheet" href="/css/style.min.css"></noscript>
  <style>
    #app{min-height:100vh}
    #nav{min-height:88px}
    #cs-marquee{min-height:62px}
    #hero{min-height:360px}
    #home-sponsor{min-height:64px}
    #featured{min-height:240px}
    #total-badge{min-height:120px}
    @media (max-width:720px){#nav{min-height:140px}#hero{min-height:440px}#home-sponsor{min-height:88px}#total-badge{min-height:140px}}
    body::before,body::after{content:'';position:fixed;inset:0;pointer-events:none;z-index:-1}
    body::before{background-image:radial-gradient(circle,rgba(0,0,0,0.09) 1px,transparent 1px);background-size:44px 44px;animation:bg-pulse-a 5s ease-in-out infinite}
    body::after{background-image:radial-gradient(circle,rgba(0,0,0,0.06) 1px,transparent 1px);background-size:66px 66px;background-position:22px 22px;animation:bg-pulse-b 7s ease-in-out infinite}
    @keyframes bg-pulse-a{0%,100%{opacity:.4}50%{opacity:1}}
    @keyframes bg-pulse-b{0%,100%{opacity:1}50%{opacity:.2}}
  </style>
  <!-- AdSense disabled until a real ca-pub client is wired up. To re-enable: restore the script tag here AND in index.html, uncomment the push() in js/components/ad/renderAd.js. -->

  <script type="application/ld+json" id="json-ld">
${JSON.stringify(jsonLd, null, 2)}
  </script>
</head>
<body>
  <a href="#main-content" class="skip-link">Skip to main content</a>
  <noscript>
    <div style="background:#1c1c1c;color:#fff;padding:12px 18px;text-align:center;font:14px/1.5 Nunito,system-ui,sans-serif">
      JavaScript is disabled. You can still read this page, but QuizBuffet's interactive practice quizzes, navigation, and settings require JavaScript.
    </div>
  </noscript>
  <div id="nav" role="navigation" aria-label="Main navigation"></div>
  <main id="main-content">
    <section id="seo-static">
      <nav aria-label="Breadcrumb"><a href="/">Home</a> &rsaquo; ${htmlEscape(cert.name)}</nav>
      <h1>${cert.seoH1 ? htmlEscape(cert.seoH1) : `${htmlEscape(seoName)} Practice Test and Practice Exam Questions${codeTag}`}</h1>
      <p>Free ${htmlEscape(seoName)} practice test with <strong>${total}+ exam-style questions</strong> across ${cert.domains.length} domains, organized like the real ${htmlEscape(cert.code)} exam. Use it as a practice exam, a mock test, or a quick quiz. Instant feedback, no account.</p>
      ${cert.about ? `<p>${htmlEscape(cert.about)}</p>` : ''}
      ${cert.details ? `<p><em>${htmlEscape(cert.details)}</em></p>` : ''}
      <h2>Exam Domains</h2>
      <ul>
          ${domainListHtml}
      </ul>
      ${affiliateHtml ? `<h2>Study Resources</h2>
      <ul>
          ${affiliateHtml}
      </ul>` : ''}
      <h2>About This Practice Test</h2>
      <p>QuizBuffet's ${htmlEscape(cert.name)} practice test is built for exam preparation. Every question is tagged by exam objective and difficulty (easy, medium, medium-hard, hard) so you can drill the areas you need most. Sessions are short by default (pick 10, 25, 50, or all questions per domain), so you can study in any spare moment.</p>
      <p>Wrong answers come with a contrastive explanation showing why your choice was wrong and what the correct concept actually is. Your progress is saved locally in your browser; nothing is uploaded and there's no signup.</p>
      <p class="cert-byline">${bylineHtml(modified, publishedDate)}</p>
    </section>
    <div id="app"></div>
    <article class="cert-guide-content">
      ${buildCertGuideHtml(cert)}
      ${cert.faq ? buildFaqHtml(cert, faq) : ''}
      ${related.length ? `<section class="cert-related">
        <h2>Related Practice Tests</h2>
        <div class="cert-related-grid">
          ${related.map(r => `<a class="cert-related-card" href="/${r.slug}/">
            <div class="cert-related-vendor">${htmlEscape(r.vendor || '')}</div>
            <div class="cert-related-name">${htmlEscape(r.name)}</div>
            <div class="cert-related-code">${htmlEscape(r.code)}</div>
            <div class="cert-related-tag">${htmlEscape(r.tagline || '')}</div>
          </a>`).join('\n          ')}
        </div>
      </section>` : ''}
      <p class="cert-byline cert-guide-byline">
        <time datetime="${publishedDate}">Published: ${displayDate(publishedDate)}</time>${modified !== publishedDate ? ` · <time datetime="${modified}">Updated: ${displayDate(modified)}</time>` : ''}
        · By <span>QuizBuffet Editorial</span>
      </p>
    </article>
  </main>
  <div id="footer" role="contentinfo"></div>
  <script type="module" src="/js/app.js"></script>
  <script>
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js');
    }
  </script>
</body>
</html>
`;
}

function buildDomainOgSvg(cert, domain) {
  const palette = {
    'comptia-security-plus':   '#0b6e4f',
    'comptia-network-plus':    '#1f4287',
    'comptia-cloud-plus':      '#2b6cb0',
    'comptia-cysa-plus':       '#9c1d1d',
    'comptia-pentest-plus':    '#7a1f1f',
    'comptia-a-plus-core-1':   '#5b3a8c',
    'comptia-a-plus-core-2':   '#5b3a8c',
    'comptia-itf-plus':        '#8a4a00',
    'comptia-data-plus':       '#a83b5b',
  };
  const bg = palette[cert.slug] || '#333333';
  const domName = htmlEscape(clipText(domain.name, 60));
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${bg}"/>
  <text x="60" y="160" font-family="Nunito, system-ui, sans-serif" font-size="44" fill="#ffffff" font-weight="600" opacity="0.85">QuizBuffet · ${htmlEscape(cert.code)}</text>
  <text x="60" y="300" font-family="Nunito, system-ui, sans-serif" font-size="80" fill="#ffffff" font-weight="700">${domName}</text>
  <text x="60" y="380" font-family="Nunito, system-ui, sans-serif" font-size="36" fill="#ffffff" opacity="0.85">${htmlEscape(cert.name)}</text>
  <text x="60" y="540" font-family="Nunito, system-ui, sans-serif" font-size="40" fill="#ffffff" opacity="0.95" font-weight="600">Free Domain Practice Quiz</text>
  <text x="60" y="590" font-family="Nunito, system-ui, sans-serif" font-size="28" fill="#ffffff" opacity="0.8">Instant feedback · No signup</text>
</svg>`;
}

async function buildDomainHtml(cert, domain, questions) {
  const services = await loadServices(cert.slug);
  const keyTerms = services.length ? pickKeyTerms(services, domainSearchWords(domain, questions)) : [];
  const count = questions.length;
  // Domain pages with zero questions get noindex, clears automatically when questions ship.
  const robotsMeta = count === 0
    ? 'noindex, follow'
    : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
  const domainRelPath = `data/certifications/${cert.slug}/${domain.slug}.json`;
  const modified = lastCommitDate(domainRelPath);
  const publishedDate = firstPublishDate(`${cert.slug}/${domain.slug}`, domainRelPath);
  const url = `${SITE}/${cert.slug}/${domain.slug}/`;
  const ogImage = `${SITE}/icons/og/${cert.slug}-${domain.slug}.svg`;
  const domNum = domain.number ? `${domain.number} ` : '';
  const shortName = cert.name.replace(/^AWS Certified |^Microsoft |^CompTIA |^Cisco /i, '').replace(/–|—/g, '-').trim();
  const seoName = cert.seoName || cert.name;
  // Search Console: domain titles should read like the cert titles (B1), lead with the
  // recognizable cert name and keep "Practice Quiz", not the raw exam code. Domain names can
  // be long: if seoName + domain.name would run past a safe budget, drop to the shorter
  // cert.code instead of truncating the domain name itself (that previously produced
  // duplicate/mid-word-cut titles: see real-estate-license).
  const titleLead = (seoName.length + domain.name.length > 52) ? cert.code : seoName;
  // Drop a word repeated across the lead/domain-name boundary (seoName "CPR and AED" +
  // domain "AED Operation" would otherwise read "CPR and AED AED Operation").
  const leadWords = titleLead.trim().split(/\s+/);
  const domainWords = domain.name.trim().split(/\s+/);
  const titleBody = leadWords[leadWords.length - 1].toLowerCase() === domainWords[0].toLowerCase()
    ? `${titleLead} ${domainWords.slice(1).join(' ')}`.trim()
    : `${titleLead} ${domain.name}`;
  const titleNoCount = `${titleBody} Practice Quiz`;
  const titleWithCount = `${titleNoCount} (${count} Questions)`;
  // Tiers: with count, without count, code as lead, domain name alone. Never cut "Practice Quiz".
  const codeNoCount = `${cert.code} ${domain.name} Practice Quiz`;
  const bareNoCount = `${domain.name} Practice Quiz`;
  const domainTiers = count > 0
    ? [titleWithCount, titleNoCount, `${codeNoCount} (${count} Questions)`, codeNoCount, bareNoCount]
    : [titleNoCount, codeNoCount, bareNoCount];
  const fullTitle = domain.seoTitle
    ? clipText(domain.seoTitle, 60)
    : (domainTiers.find(t => t.length <= 60) || `${clipText(domain.name, 54).replace(/[,;:]+$/, '')} Quiz`);
  const desc = count > 0
    ? clipText(`Test yourself on ${cert.code} ${domain.name}${domain.weight ? ` (${domain.weight}% of the exam)` : ''}. ${count} free questions with instant feedback and explanations. No signup, no email needed.`.trim().replace(/\s+/g, ' '), 155)
    : clipText(`${cert.code} ${domain.name} practice quiz, coming soon${domain.weight ? ` (${domain.weight}% of the exam)` : ''}. Test yourself with instant feedback once it's live. Part of the ${shortName} practice test.`.trim().replace(/\s+/g, ' '), 155);

  // Up to 8 sample questions, mixed difficulty, for static content (G2).
  const sample = pickMixedSample(questions, 8);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        'itemListElement': [
          { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': `${SITE}/` },
          { '@type': 'ListItem', 'position': 2, 'name': `${cert.name} Practice Test`, 'item': `${SITE}/${cert.slug}/` },
          { '@type': 'ListItem', 'position': 3, 'name': domain.name, 'item': url },
        ],
      },
      {
        '@type': 'Quiz',
        'name': fullTitle,
        'description': desc,
        'url': url,
        'image': ogImage,
        'inLanguage': 'en-US',
        'dateModified': modified,
        'about': { '@type': 'Thing', 'name': domain.name },
        'educationalLevel': 'Professional certification',
        'learningResourceType': 'Practice Quiz',
        'isAccessibleForFree': true,
        'numberOfItems': count,
        // Names the parent certification so Google can connect the quiz to the credential
        'assesses': {
          '@type': 'DefinedTerm',
          'name': `${cert.name}: ${domain.name}`,
          'inDefinedTermSet': cert.name,
        },
        'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'USD', 'availability': 'https://schema.org/InStock' },
        'isPartOf': {
          '@type': 'Course',
          'name': `Free ${cert.code} Practice Test`,
          'url': `${SITE}/${cert.slug}/`,
        },
      },
      ...(sample.length ? [{
        '@type': 'FAQPage',
        // Google truncates long FAQ schema anyway: keep this to a small subset even though
        // the visible page now shows up to 8 sample questions (G2).
        'mainEntity': sample.slice(0, 4).map(q => {
          const correct = (q.answers || []).find(a => a.id === q.correct);
          const correctText = correct?.text || '';
          const explanation = q.explanations?.[q.correct] || '';
          return {
            '@type': 'Question',
            'name': q.text,
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': trimToFirstSentence(correctText ? `${correctText}. ${explanation}` : explanation),
            },
          };
        }),
      }] : []),
    ],
  };

  const otherDomainsHtml = cert.domains.filter(d => d.slug !== domain.slug).map(d => {
    const num = d.number ? `${d.number} ` : '';
    return `<li><a href="/${cert.slug}/${d.slug}/">${htmlEscape(num + d.name)}</a></li>`;
  }).join('\n          ');

  // G4: a compact nav under the H1 so sibling domains aren't only reachable via the full
  // list at the bottom of the page (below the fold on longer pages).
  const domainPillsHtml = cert.domains.map(d => {
    const isCurrent = d.slug === domain.slug;
    const label = htmlEscape(d.number ? `${d.number} ${d.name}` : d.name);
    return isCurrent
      ? `<span class="seo-domain-pill seo-domain-pill-current" aria-current="page">${label}</span>`
      : `<a class="seo-domain-pill" href="/${cert.slug}/${d.slug}/">${label}</a>`;
  }).join('\n          ');

  const sampleHtml = sample.map(q => {
    const answersHtml = (q.answers || []).map(a => {
      const isCorrect = a.id === q.correct;
      return `<li class="seo-sample-answer${isCorrect ? ' seo-sample-correct' : ''}">${a.id.toUpperCase()}. ${htmlEscape(a.text)}</li>`;
    }).join('\n            ');
    const explanation = q.explanations?.[q.correct] || '';
    return `<details class="seo-sample-q">
        <summary>${htmlEscape(q.text)}</summary>
        <ul class="seo-sample-answers">
            ${answersHtml}
        </ul>
        ${explanation ? `<p class="seo-sample-explain">${htmlEscape(explanation)}</p>` : ''}
      </details>`;
  }).join('\n      ');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${htmlEscape(fullTitle)}</title>
  <meta name="description" content="${htmlEscape(desc)}">
  <link rel="canonical" href="${url}">
  <meta name="robots" content="${robotsMeta}">

  <meta property="og:type"        content="website">
  <meta property="og:site_name"   content="QuizBuffet">
  <meta property="og:title"       content="${htmlEscape(fullTitle)}">
  <meta property="og:description" content="${htmlEscape(desc)}">
  <meta property="og:image"       content="${ogImage}">
  <meta property="og:url"         content="${url}">

  <meta name="twitter:card"        content="summary_large_image">
  <meta name="twitter:title"       content="${htmlEscape(fullTitle)}">
  <meta name="twitter:description" content="${htmlEscape(desc)}">
  <meta name="twitter:image"       content="${ogImage}">

  <link rel="sitemap" type="application/xml" href="/sitemap.xml">
  <link rel="alternate" type="text/markdown" title="LLM-friendly index" href="/llms.txt">
  <link rel="alternate" type="text/markdown" title="LLM full content" href="/llms-full.txt">
  <link rel="alternate" type="application/rss+xml" title="QuizBuffet, new certs and updates" href="/feed.xml">
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png">
  <link rel="icon" type="image/png" sizes="192x192" href="/android-icon-192x192.png">
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png">
  <link rel="shortcut icon" href="/favicon.ico">
  <link rel="manifest" href="/manifest.json">
  <meta name="apple-mobile-web-app-title" content="QuizBuffet">
  <meta name="msapplication-TileColor" content="#ffffff">
  <meta name="msapplication-TileImage" content="/ms-icon-144x144.png">
  <meta name="msapplication-config" content="/browserconfig.xml">
  <meta name="theme-color" content="#333333">

  <script>document.documentElement.classList.add('js');try{var t=localStorage.getItem('qb_theme');if(t==='dark')document.documentElement.dataset.theme='dark';var c=localStorage.getItem('qb_color')||'buffet';document.documentElement.dataset.color=c;var cur=localStorage.getItem('qb_cursor')||'pencil';document.documentElement.dataset.cursor=cur;}catch(e){}</script>

  ${buildConsentGtagBlock()}

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <!-- Preload the woff2 files we use above the fold so they're ready before paint and don't cause font-swap CLS. -->
  <!-- URLs come from Google Fonts; they rotate occasionally: update with: curl -A "<chrome UA>" "<the css2 url>" -->
  <link rel="preload" as="font" type="font/woff2" crossorigin href="https://fonts.gstatic.com/s/playfairdisplay/v40/nuFRD-vYSZviVYUb_rj3ij__anPXDTnCjmHKM4nYO7KN_qiTXtHA-X-uE0qEEw.woff2">
  <link rel="preload" as="font" type="font/woff2" crossorigin href="https://fonts.gstatic.com/s/playfairdisplay/v40/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKebunDXbtPK-F2qC0s.woff2">
  <link rel="preload" as="font" type="font/woff2" crossorigin href="https://fonts.gstatic.com/s/imfellenglishsc/v16/a8IENpD3CDX-4zrWfr1VY879qFF05pZ7PIIPoUgxzQ.woff2">
  <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&family=Playfair+Display:ital,wght@0,600;1,400&family=IM+Fell+English+SC&display=optional" onload="this.onload=null;this.rel='stylesheet'">
  <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&family=Playfair+Display:ital,wght@0,600;1,400&family=IM+Fell+English+SC&display=optional"></noscript>
  <link rel="preload" as="style" href="/css/style.min.css" onload="this.onload=null;this.rel='stylesheet'">
  <noscript><link rel="stylesheet" href="/css/style.min.css"></noscript>
  <style>
    #app{min-height:100vh}
    #nav{min-height:88px}
    #cs-marquee{min-height:62px}
    #hero{min-height:360px}
    #home-sponsor{min-height:64px}
    #featured{min-height:240px}
    #total-badge{min-height:120px}
    @media (max-width:720px){#nav{min-height:140px}#hero{min-height:440px}#home-sponsor{min-height:88px}#total-badge{min-height:140px}}
    body::before,body::after{content:'';position:fixed;inset:0;pointer-events:none;z-index:-1}
    body::before{background-image:radial-gradient(circle,rgba(0,0,0,0.09) 1px,transparent 1px);background-size:44px 44px;animation:bg-pulse-a 5s ease-in-out infinite}
    body::after{background-image:radial-gradient(circle,rgba(0,0,0,0.06) 1px,transparent 1px);background-size:66px 66px;background-position:22px 22px;animation:bg-pulse-b 7s ease-in-out infinite}
    @keyframes bg-pulse-a{0%,100%{opacity:.4}50%{opacity:1}}
    @keyframes bg-pulse-b{0%,100%{opacity:1}50%{opacity:.2}}
  </style>

  <script type="application/ld+json" id="json-ld">
${JSON.stringify(jsonLd, null, 2)}
  </script>
</head>
<body>
  <a href="#main-content" class="skip-link">Skip to main content</a>
  <noscript>
    <div style="background:#1c1c1c;color:#fff;padding:12px 18px;text-align:center;font:14px/1.5 Nunito,system-ui,sans-serif">
      JavaScript is disabled. You can still read this page, but QuizBuffet's interactive practice quizzes, navigation, and settings require JavaScript.
    </div>
  </noscript>
  <div id="nav" role="navigation" aria-label="Main navigation"></div>
  <main id="main-content">
    <section id="seo-static">
      <nav aria-label="Breadcrumb"><a href="/">Home</a> &rsaquo; <a href="/${cert.slug}/">${htmlEscape(cert.name)}</a> &rsaquo; ${htmlEscape(domain.name)}</nav>
      <h1>${domain.seoH1 ? htmlEscape(domain.seoH1) : `${htmlEscape(domNum + domain.name)} ${htmlEscape(cert.code)} Practice Quiz`}</h1>
      ${cert.domains.length > 1 ? `<nav class="seo-domain-pills" aria-label="${htmlEscape(cert.code)} domains">
          ${domainPillsHtml}
      </nav>` : ''}
      <p><strong>${count} exam-style questions</strong>${domain.weight ? ` covering <strong>${domain.weight}% of the ${htmlEscape(cert.code)} exam</strong>` : ''}. Instant feedback on every answer, progress tracking, no signup required.</p>
      <p>This domain is part of the <a href="/${cert.slug}/">${htmlEscape(cert.name)} practice test</a>. Each question is tagged by exam objective and difficulty so you can drill exactly the areas you need.</p>
      ${sampleHtml ? `<h2>Sample Questions</h2>
      ${sampleHtml}` : ''}
      ${keyTerms.length ? `<h2>Key Terms in This Domain</h2>
      <ul class="seo-key-terms">
          ${keyTerms.map(t => `<li><strong>${htmlEscape(t.a)}:</strong> ${htmlEscape(t.d)}</li>`).join('\n          ')}
      </ul>` : ''}
      ${otherDomainsHtml ? `<h2>Other ${htmlEscape(cert.code)} Domains</h2>
      <ul>
          ${otherDomainsHtml}
      </ul>` : ''}
      <p><a href="/${cert.slug}/">&larr; Back to ${htmlEscape(cert.code)} practice test overview</a></p>
      <p class="cert-byline">${bylineHtml(modified, publishedDate)}</p>
    </section>
    <div id="app"></div>
  </main>
  <div id="footer" role="contentinfo"></div>
  <script type="module" src="/js/app.js"></script>
  <script>
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js');
    }
  </script>
</body>
</html>
`;
}

function buildComingSoonOgSvg(cert) {
  const bg = '#444444';
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${bg}"/>
  <text x="60" y="180" font-family="Nunito, system-ui, sans-serif" font-size="48" fill="#ffffff" font-weight="600" opacity="0.85">QuizBuffet</text>
  <text x="60" y="320" font-family="Nunito, system-ui, sans-serif" font-size="76" fill="#ffffff" font-weight="700">${htmlEscape(cert.name)}</text>
  <text x="60" y="390" font-family="Nunito, system-ui, sans-serif" font-size="40" fill="#ffffff" opacity="0.85">${htmlEscape(cert.code)}</text>
  <rect x="60" y="450" width="380" height="80" rx="12" fill="#ffd24a"/>
  <text x="80" y="505" font-family="Nunito, system-ui, sans-serif" font-size="42" fill="#222222" font-weight="700">Coming Soon</text>
  <text x="60" y="585" font-family="Nunito, system-ui, sans-serif" font-size="26" fill="#ffffff" opacity="0.8">Practice test in development · Free when launched</text>
</svg>`;
}

// Curated category mapping for live certs: used to find "related" recommendations on coming-soon pages
const LIVE_CATEGORY_MAP = {
  'comptia-a-plus-core-1':              'IT Foundations',
  'comptia-a-plus-core-2':              'IT Foundations',
  'comptia-itf-plus':                   'IT Foundations',
  'comptia-network-plus':               'Networking',
  'cisco-ccna':                         'Networking',
  'comptia-security-plus':              'Cybersecurity',
  'comptia-cysa-plus':                  'Cybersecurity',
  'comptia-pentest-plus':               'Cybersecurity',
  'isc2-cissp':                         'Cybersecurity',
  'aws-security-specialty':             'Cybersecurity',
  'comptia-cloud-plus':                 'Cloud',
  'aws-cloud-practitioner':             'Cloud',
  'aws-solutions-architect-associate':  'Cloud',
  'aws-cloudops-engineer-associate':    'Cloud',
  'aws-developer-associate':            'Cloud',
  'aws-devops-engineer-professional':   'Cloud',
  'aws-solutions-architect-professional': 'Cloud',
  'aws-advanced-networking-specialty':  'Networking',
  'microsoft-az-900':                   'Cloud',
  'microsoft-az-104':                   'Cloud',
  'aws-ai-practitioner':                'Data & AI',
  'aws-ml-engineer-associate':          'Data & AI',
  'aws-genai-developer-professional':   'Data & AI',
  'aws-data-engineer-associate':        'Data & AI',
  'comptia-data-plus':                  'Data & AI',
  'itil-foundation':                    'IT Service Management',
  'osha-10-construction':               'Safety',
  'osha-30-construction':               'Safety',
  'forklift-certification':             'Safety',
  'cdl-class-a':                        'Transportation',
  'real-estate-license':                'Real Estate',
  'nmls-mlo':                           'Mortgage',
  'faa-part-107':                       'Aviation',
  'personal-trainer-nasm':              'Fitness',
  'cpr-aed':                            'Healthcare',
  'quickbooks-proadvisor':              'Accounting',
  'bls':                                'Healthcare',
  'ceh':                                'Cybersecurity',
  'comptia-project-plus':               'Project Management',
  'cpa-aud':                            'Finance',
  'cpa-bar':                            'Finance',
  'cpa-far':                            'Finance',
  'cpa-isc':                            'Finance',
  'cpa-reg':                            'Finance',
  'cpa-tcp':                            'Finance',
  'barber-license':                     'Beauty',
  'barber-no-chemical':                 'Beauty',
  'cosmetology-license':                'Beauty',
  'micropigmentation':                  'Beauty',
  'tattoo-license':                     'Beauty',
};

// Pick up to N live certs in the same category as the coming-soon cert
function pickRelatedLive(comingCert, liveCerts, n = 3) {
  // comingCert.category exists on coming-soon.json entries; a live cert has no .category
  // field of its own (only LIVE_CATEGORY_MAP does) — check both so this also works when the
  // reference cert is itself live (F3), not just for coming-soon pages.
  const cat = LIVE_CATEGORY_MAP[comingCert.slug] || comingCert.category || 'Other';
  const sameCategory = liveCerts.filter(c => (LIVE_CATEGORY_MAP[c.slug] || c.category || 'Other') === cat);
  if (sameCategory.length >= n) return sameCategory.slice(0, n);
  // Fallback: pad with assorted live certs from other categories
  const others = liveCerts.filter(c => !sameCategory.includes(c)).slice(0, n - sameCategory.length);
  return [...sameCategory, ...others].slice(0, n);
}

// Generate Amazon search URL with the site's affiliate tag
function udemyDeepLink(destUrl) {
  // Impact Radius deep link: `u` param is the URL-encoded destination on udemy.com
  return `https://trk.udemy.com/c/7254431/3193860/39854?u=${encodeURIComponent(destUrl)}`;
}

function udemySearch(query) {
  return udemyDeepLink(`https://www.udemy.com/courses/search/?q=${encodeURIComponent(query)}`);
}

// Use cert.udemyCourseUrl if set (deep-link to the specific bestseller course for that cert),
// otherwise fall back to a Udemy search filtered by cert code + name.
function udemyForCert(cert) {
  if (cert.udemyCourseUrl) return udemyDeepLink(cert.udemyCourseUrl);
  return udemySearch(`${cert.code} ${cert.name}`);
}

function amazonSearch(query) {
  const q = encodeURIComponent(query);
  return `https://www.amazon.com/s?k=${q}&tag=0003aa-20`;
}

function buildComingSoonHtml(cert, priority, allLiveCerts = []) {
  const url = `${SITE}/${cert.slug}/`;
  const ogImage = `${SITE}/icons/og/${cert.slug}.svg`;
  const shortName = cert.name.replace(/^AWS Certified |^Microsoft |^CompTIA |^Cisco /i, '').replace(/–|—/g, '-').trim();
  const fullTitle = clipText(`${cert.code} Practice Test (Coming Soon)`, 60);
  const desc = clipText(`${cert.code} practice test, coming soon to QuizBuffet. Soon you'll be able to test yourself on every exam domain with instant feedback and explanations. No signup, no email.`.trim().replace(/\s+/g, ' '), 155);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        'itemListElement': [
          { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': `${SITE}/` },
          { '@type': 'ListItem', 'position': 2, 'name': `${cert.name} Practice Test`, 'item': url },
        ],
      },
      {
        '@type': 'Course',
        'name': fullTitle,
        'courseCode': cert.code,
        'description': cert.about || desc,
        'url': url,
        'provider': {
          '@type': 'Organization',
          'name': 'QuizBuffet',
          'url': SITE,
        },
        'educationalCredentialAwarded': cert.name,
      },
    ],
  };

  return `<!DOCTYPE html>
<html lang="en" data-coming-soon="1">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${htmlEscape(fullTitle)}</title>
  <meta name="description" content="${htmlEscape(desc)}">
  <link rel="canonical" href="${url}">
  <meta name="robots" content="noindex, follow">

  <meta property="og:type"        content="website">
  <meta property="og:site_name"   content="QuizBuffet">
  <meta property="og:title"       content="${htmlEscape(fullTitle)}">
  <meta property="og:description" content="${htmlEscape(desc)}">
  <meta property="og:image"       content="${ogImage}">
  <meta property="og:url"         content="${url}">

  <meta name="twitter:card"        content="summary_large_image">
  <meta name="twitter:title"       content="${htmlEscape(fullTitle)}">
  <meta name="twitter:description" content="${htmlEscape(desc)}">
  <meta name="twitter:image"       content="${ogImage}">

  <link rel="sitemap" type="application/xml" href="/sitemap.xml">
  <link rel="alternate" type="text/markdown" title="LLM-friendly index" href="/llms.txt">
  <link rel="alternate" type="text/markdown" title="LLM full content" href="/llms-full.txt">
  <link rel="alternate" type="application/rss+xml" title="QuizBuffet, new certs and updates" href="/feed.xml">
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png">
  <link rel="icon" type="image/png" sizes="192x192" href="/android-icon-192x192.png">
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png">
  <link rel="shortcut icon" href="/favicon.ico">
  <link rel="manifest" href="/manifest.json">
  <meta name="apple-mobile-web-app-title" content="QuizBuffet">
  <meta name="msapplication-TileColor" content="#ffffff">
  <meta name="msapplication-TileImage" content="/ms-icon-144x144.png">
  <meta name="msapplication-config" content="/browserconfig.xml">
  <meta name="theme-color" content="#333333">

  <script>document.documentElement.classList.add('js');try{var t=localStorage.getItem('qb_theme');if(t==='dark')document.documentElement.dataset.theme='dark';var c=localStorage.getItem('qb_color')||'buffet';document.documentElement.dataset.color=c;var cur=localStorage.getItem('qb_cursor')||'pencil';document.documentElement.dataset.cursor=cur;}catch(e){}</script>

  ${buildConsentGtagBlock()}

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <!-- Preload the woff2 files we use above the fold so they're ready before paint and don't cause font-swap CLS. -->
  <!-- URLs come from Google Fonts; they rotate occasionally: update with: curl -A "<chrome UA>" "<the css2 url>" -->
  <link rel="preload" as="font" type="font/woff2" crossorigin href="https://fonts.gstatic.com/s/playfairdisplay/v40/nuFRD-vYSZviVYUb_rj3ij__anPXDTnCjmHKM4nYO7KN_qiTXtHA-X-uE0qEEw.woff2">
  <link rel="preload" as="font" type="font/woff2" crossorigin href="https://fonts.gstatic.com/s/playfairdisplay/v40/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKebunDXbtPK-F2qC0s.woff2">
  <link rel="preload" as="font" type="font/woff2" crossorigin href="https://fonts.gstatic.com/s/imfellenglishsc/v16/a8IENpD3CDX-4zrWfr1VY879qFF05pZ7PIIPoUgxzQ.woff2">
  <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&family=Playfair+Display:ital,wght@0,600;1,400&family=IM+Fell+English+SC&display=optional" onload="this.onload=null;this.rel='stylesheet'">
  <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&family=Playfair+Display:ital,wght@0,600;1,400&family=IM+Fell+English+SC&display=optional"></noscript>
  <link rel="preload" as="style" href="/css/style.min.css" onload="this.onload=null;this.rel='stylesheet'">
  <noscript><link rel="stylesheet" href="/css/style.min.css"></noscript>
  <style>
    #app{min-height:100vh}
    #nav{min-height:88px}
    #cs-marquee{min-height:62px}
    #hero{min-height:360px}
    #home-sponsor{min-height:64px}
    #featured{min-height:240px}
    #total-badge{min-height:120px}
    @media (max-width:720px){#nav{min-height:140px}#hero{min-height:440px}#home-sponsor{min-height:88px}#total-badge{min-height:140px}}
    body::before,body::after{content:'';position:fixed;inset:0;pointer-events:none;z-index:-1}
    body::before{background-image:radial-gradient(circle,rgba(0,0,0,0.09) 1px,transparent 1px);background-size:44px 44px;animation:bg-pulse-a 5s ease-in-out infinite}
    body::after{background-image:radial-gradient(circle,rgba(0,0,0,0.06) 1px,transparent 1px);background-size:66px 66px;background-position:22px 22px;animation:bg-pulse-b 7s ease-in-out infinite}
    @keyframes bg-pulse-a{0%,100%{opacity:.4}50%{opacity:1}}
    @keyframes bg-pulse-b{0%,100%{opacity:1}50%{opacity:.2}}
  </style>

  <script type="application/ld+json" id="json-ld">
${JSON.stringify(jsonLd, null, 2)}
  </script>
</head>
<body>
  <a href="#main-content" class="skip-link">Skip to main content</a>
  <noscript>
    <div style="background:#1c1c1c;color:#fff;padding:12px 18px;text-align:center;font:14px/1.5 Nunito,system-ui,sans-serif">
      JavaScript is disabled. You can still read this page, but QuizBuffet's interactive practice quizzes, navigation, and settings require JavaScript.
    </div>
  </noscript>
  <div id="nav" role="navigation" aria-label="Main navigation"></div>
  <main id="main-content">
    <section id="seo-static" class="container container-cs">
    ${(() => {
      const related = pickRelatedLive(cert, allLiveCerts, 3);
      const amazonUrl = amazonSearch(`${cert.code} ${cert.name} study guide exam prep`);
      const udemyUrl = udemyForCert(cert);
      const udemyLabel = cert.udemyCourseUrl
        ? `Top-rated ${cert.code} course on Udemy`
        : `${cert.code} courses on Udemy`;
      const vendorSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(cert.vendor + ' ' + cert.code + ' official exam guide')}`;
      const escSubj = encodeURIComponent(`Notify me: ${cert.name} (${cert.code})`);
      const escMail = `mailto:artivicolab@gmail.com?subject=${escSubj}`;

      return `
    <nav class="cs-breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a> <span aria-hidden="true">›</span> ${htmlEscape(cert.name)}</nav>

    <section class="cs-hero">
      <div class="cs-hero-tag">COMING SOON · PRIORITY #${priority}</div>
      <h1 class="cs-hero-title">${htmlEscape(cert.name)}</h1>
      <p class="cs-hero-meta"><strong>${htmlEscape(cert.code)}</strong> · ${htmlEscape(cert.vendor)}${cert.category ? ` · ${htmlEscape(cert.category)}` : ''}</p>
      ${cert.tagline ? `<p class="cs-hero-tagline">${htmlEscape(cert.tagline)}</p>` : ''}
    </section>

    <section class="cs-notify" aria-labelledby="cs-notify-h">
      <h2 id="cs-notify-h">Get notified when this launches</h2>
      <p class="cs-notify-pitch">Be first to know when free <strong>${htmlEscape(cert.code)}</strong> practice questions go live. One email when it ships, no spam.</p>
      <form class="cs-notify-form" id="cs-notify-form" action="https://formspree.io/f/REPLACE_WITH_FORMSPREE_ID" method="POST" data-cert="${htmlEscape(cert.slug)}">
        <input type="hidden" name="_subject" value="QuizBuffet notify: ${htmlEscape(cert.name)} (${htmlEscape(cert.code)})">
        <input type="hidden" name="cert_slug" value="${htmlEscape(cert.slug)}">
        <input type="hidden" name="cert_name" value="${htmlEscape(cert.name)}">
        <input type="email" name="email" id="cs-notify-email" required placeholder="you@example.com" aria-label="Email address" autocomplete="email">
        <button type="submit" class="cs-notify-btn">Notify me <span aria-hidden="true">→</span></button>
      </form>
      <p class="cs-notify-fallback">Or email us directly: <a href="${escMail}">artivicolab@gmail.com</a></p>
      <p class="cs-notify-status" id="cs-notify-status" role="status" aria-live="polite"></p>
    </section>

    ${cert.about ? `
    <section class="cs-about">
      <h2>About this certification</h2>
      <p>${htmlEscape(cert.about)}</p>
    </section>
    ` : ''}

    <section class="cs-resources">
      <h2>Free study resources</h2>
      <ul class="cs-resource-list">
        <li><a href="${vendorSearchUrl}" rel="noopener" target="_blank" data-cs-out="vendor">Official ${htmlEscape(cert.vendor)} exam guide</a> <span class="cs-resource-meta">(search)</span></li>
        <li><a href="${udemyUrl}" rel="sponsored noopener" target="_blank" data-cs-out="udemy">${htmlEscape(udemyLabel)}</a> <span class="cs-resource-meta">(affiliate)</span></li>
        <li><a href="${amazonUrl}" rel="sponsored noopener" target="_blank" data-cs-out="amazon">${htmlEscape(cert.code)} study guides on Amazon</a> <span class="cs-resource-meta">(affiliate)</span></li>
        <li><a href="https://www.youtube.com/results?search_query=${encodeURIComponent(cert.code + ' exam prep')}" rel="noopener" target="_blank" data-cs-out="youtube">Free YouTube exam-prep playlists</a></li>
      </ul>
    </section>

    ${related.length ? `
    <section class="cs-related">
      <h2>While you wait, practice these</h2>
      <p class="cs-related-pitch">Live certs in the same category. Start drilling now while ${htmlEscape(cert.code)} is built out.</p>
      <div class="cs-related-grid">
        ${related.map(r => `
          <a class="cs-related-card" href="/${r.slug}/" data-cs-out="related">
            <div class="cs-related-name">${htmlEscape(r.name)}</div>
            <div class="cs-related-meta">${htmlEscape(r.code)}${r.vendor ? ` · ${htmlEscape(r.vendor)}` : ''}</div>
          </a>
        `).join('')}
      </div>
    </section>
    ` : ''}

    <p class="cs-back"><a href="/">← Back to all certifications</a></p>

    <script>
      (function () {
        var slug = ${JSON.stringify(cert.slug)};
        var code = ${JSON.stringify(cert.code)};
        function track(name, params) {
          try { if (typeof gtag === 'function') gtag('event', name, params || {}); } catch (e) {}
        }
        track('cs_view', { cert_slug: slug, cert_code: code });

        var form = document.getElementById('cs-notify-form');
        var status = document.getElementById('cs-notify-status');
        if (form) {
          form.addEventListener('submit', function (e) {
            track('cs_notify_signup', { cert_slug: slug, cert_code: code });
            // If the Formspree ID hasn't been set, fall back to mailto so the user still gets through.
            if (form.action.indexOf('REPLACE_WITH_FORMSPREE_ID') !== -1) {
              e.preventDefault();
              var email = document.getElementById('cs-notify-email').value;
              window.location.href = 'mailto:artivicolab@gmail.com?subject=' + encodeURIComponent('Notify me: ' + ${JSON.stringify(cert.name)} + ' (' + code + ')') + '&body=' + encodeURIComponent('Please notify me when this launches.\\n\\nEmail: ' + email + '\\nCert: ' + slug);
              if (status) status.textContent = 'Opening your email app. Send the message and we\\'ll add you to the list.';
              return;
            }
            // Async submit to Formspree so we can show inline confirmation
            e.preventDefault();
            var data = new FormData(form);
            fetch(form.action, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
              .then(function (r) {
                if (r.ok) {
                  if (status) status.textContent = '✓ Thanks, we\\'ll email you when this launches.';
                  form.reset();
                } else {
                  if (status) status.textContent = 'Couldn\\'t submit. Email us directly at artivicolab@gmail.com.';
                }
              })
              .catch(function () {
                if (status) status.textContent = 'Network error. Email us directly at artivicolab@gmail.com.';
              });
          });
        }

        // Track outbound resource and related-cert clicks
        document.querySelectorAll('[data-cs-out]').forEach(function (a) {
          a.addEventListener('click', function () {
            track('cs_outbound_click', { cert_slug: slug, dest: a.getAttribute('data-cs-out'), href: a.href });
          });
        });
      })();
    </script>
      `;
    })()}
    </section>
    <div id="app"></div>
  </main>
  <div id="footer" role="contentinfo"></div>
  <script type="module" src="/js/app.js"></script>
  <script>
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js');
    }
  </script>
</body>
</html>
`;
}

// llms.txt: concise, top-level index for AI crawlers (emerging spec, mirrors robots.txt's role for AI).
function buildLlmsTxt(comingSoon) {
  const liveLines = certifications.map(c => {
    const total = c.domains.reduce((s, d) => s + loadDomainQuestions(c.slug, d.slug).length, 0);
    return `- [${c.name} (${c.code})](${SITE}/${c.slug}/): ${c.tagline || 'Free practice test.'}${total ? ` ${total}+ questions.` : ''}`;
  }).join('\n');

  const comingLines = comingSoon.slice(0, 20).map((c, i) =>
    `- [${c.name} (${c.code})](${SITE}/${c.slug}/): coming soon (priority #${i + 1})`
  ).join('\n');

  return `# QuizBuffet

> Free, no-account practice tests for IT, cybersecurity, cloud, healthcare, trades, and finance certifications. Domain-by-domain quizzes with instant feedback and progress tracking saved locally in the browser. Last updated ${TODAY}.

## Available certifications
${liveLines}

## Coming soon
${comingLines}

## Study hubs
- [CPA Exam: all 6 sections](${SITE}/cpa/): hub linking the 3 Core (AUD, FAR, REG) and 3 Discipline (BAR, ISC, TCP) CPA section practice tests.

## Resources
- [Sitemap](${SITE}/sitemap.xml)
- [RSS feed](${SITE}/feed.xml): new cert launches and updates
- [Full content for AI ingestion](${SITE}/llms-full.txt)

## License and citation
QuizBuffet content is free to read and reference. Practice questions are authored for this site. When citing, link to the cert page (e.g., ${SITE}/comptia-security-plus/) rather than copying long passages.
`;
}

// llms-full.txt: long-form dump of cert metadata + sample FAQ entries for AI ingestion.
function buildLlmsFullTxt(comingSoon) {
  const sections = certifications.map(c => {
    const total = c.domains.reduce((s, d) => s + loadDomainQuestions(c.slug, d.slug).length, 0);
    const domainLines = c.domains.map(d => {
      const count = loadDomainQuestions(c.slug, d.slug).length;
      return `- ${d.number ? d.number + ' ' : ''}${d.name}${d.weight ? ` (${d.weight}% of exam)` : ''}${count ? `: ${count} questions` : ''}`;
    }).join('\n');
    const faq = pickFaqQuestions(c, 6);
    const faqLines = faq.map(f => `**Q: ${f.question}**\nA: ${f.answer}`).join('\n\n');
    return `## ${c.name} (${c.code})
Vendor: ${c.vendor || 'Unknown'}
URL: ${SITE}/${c.slug}/
Total questions: ${total}

${c.about || c.tagline || ''}

### Domains
${domainLines}

${faqLines ? `### Sample questions\n${faqLines}\n` : ''}`;
  }).join('\n');

  const csList = comingSoon.map((c, i) => `- ${c.name} (${c.code}): ${SITE}/${c.slug}/: priority #${i + 1}`).join('\n');

  return `# QuizBuffet: Full Cert Reference

Last updated: ${TODAY}
Site: ${SITE}

QuizBuffet provides free practice tests for high-demand certifications across IT, cybersecurity, cloud, healthcare, trades, transportation, and finance. All content is browser-based: no signup, no tracking of personal data. Progress is stored in localStorage.

${sections}

## Coming soon (in priority order)
${csList}
`;
}

// RSS 2.0 feed: one item per live cert + top coming-soon entries.
// Stable <guid> per cert URL so RSS readers don't re-fire on every rebuild.
function buildRssFeed(comingSoon) {
  const buildDate = new Date().toUTCString();

  const liveItems = [...certifications]
    .map(cert => {
      const total = cert.domains.reduce((s, d) => s + loadDomainQuestions(cert.slug, d.slug).length, 0);
      return { cert, total, soon: false };
    })
    // Newest live certs first (later in the index = newer)
    .reverse();

  const csItems = comingSoon.slice(0, 10).map((cert, i) => ({ cert, total: 0, soon: true, rank: i + 1 }));

  const items = [...liveItems, ...csItems].map(({ cert, total, soon, rank }) => {
    const url = `${SITE}/${cert.slug}/`;
    const title = soon
      ? `${cert.name} (${cert.code}), coming soon`
      : `${cert.name} (${cert.code}): ${total} free practice questions`;
    const desc = soon
      ? `${cert.tagline || ''} Free practice test in development${rank ? ` (priority #${rank})` : ''}.`.trim()
      : `${cert.tagline || ''} ${total} questions across ${cert.domains.length} domains. Free, no account needed.`.trim();
    // D1: each item's real first-publish date, not the build timestamp — every item
    // reading as "just published" on every rebuild is exactly the freshness-signal
    // problem this fix is for.
    const itemPubDate = new Date(`${firstPublishDate(cert.slug, `js/data/certifications/${cert.slug}.js`)}T00:00:00Z`).toUTCString();
    return `    <item>
      <title>${htmlEscape(title)}</title>
      <link>${url}</link>
      <description>${htmlEscape(desc)}</description>
      <category>${htmlEscape(cert.vendor || 'Certification')}</category>
      <pubDate>${itemPubDate}</pubDate>
      <guid isPermaLink="true">${url}</guid>
    </item>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet href="/feed.xsl" type="text/xsl"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>QuizBuffet, Free Certification Practice Tests</title>
    <link>${SITE}/</link>
    <atom:link href="${SITE}/feed.xml" rel="self" type="application/rss+xml" />
    <description>Free, no-account practice tests for IT, cybersecurity, cloud, healthcare, trades, and finance certifications. New cert content and exam-prep updates as they go live.</description>
    <language>en-US</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <ttl>1440</ttl>
${items}
  </channel>
</rss>
`;
}

function buildSitemap(comingSoon) {
  const urls = [{ loc: `${SITE}/`, priority: '1.0', changefreq: 'weekly', lastmod: lastCommitDate('index.html') }];
  // CPA hub: a hand-built static landing at /cpa/ that links the 6 CPA section
  // certs (3 Core + 1 Discipline). Not a cert in the data model, so register its
  // sitemap entry here so it survives every build:seo run.
  urls.push({ loc: `${SITE}/cpa/`, priority: '0.7', changefreq: 'monthly', lastmod: lastCommitDate('cpa/index.html') });
  // Privacy & cookie policy: hand-built static page, not a cert. Register here
  // so it survives every build:seo run and stays in the sitemap.
  urls.push({ loc: `${SITE}/privacy/`, priority: '0.1', changefreq: 'yearly', lastmod: lastCommitDate('privacy/index.html') });
  urls.push({ loc: `${SITE}/about/`, priority: '0.5', changefreq: 'yearly', lastmod: lastCommitDate('about/index.html') });
  for (const cert of certifications) {
    // Tally questions across all domains. Certs with zero questions are scaffolds,
    // the page carries noindex (see buildCertHtml) so don't advertise them in the sitemap.
    let certTotal = 0;
    const domainCounts = cert.domains.map(d => {
      const n = loadDomainQuestions(cert.slug, d.slug).length;
      certTotal += n;
      return { slug: d.slug, n };
    });
    if (certTotal === 0) continue;
    const certModified = maxDate(lastCommitDate(`data/certifications/${cert.slug}`), lastCommitDate(`js/data/certifications/${cert.slug}.js`));
    urls.push({ loc: `${SITE}/${cert.slug}/`, priority: '0.8', changefreq: 'monthly', lastmod: certModified });
    for (const d of domainCounts) {
      if (d.n > 0) {
        urls.push({ loc: `${SITE}/${cert.slug}/${d.slug}/`, priority: '0.6', changefreq: 'monthly', lastmod: lastCommitDate(`data/certifications/${cert.slug}/${d.slug}.json`) });
      }
    }
  }
  // Coming-soon pages carry <meta robots="noindex">: exclude from sitemap to avoid
  // mixed signals to Google (sitemap inclusion = "index me", noindex = "don't").
  // When a cert flips live, its sitemap entry comes back through the live-cert loop above.
  const body = urls.map(u =>
    `  <url><loc>${u.loc}</loc><lastmod>${u.lastmod}</lastmod><changefreq>${u.changefreq}</changefreq><priority>${u.priority}</priority></url>`
  ).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;
}

// Rewrite the drift-prone parts of the root index.html so the home page stays in
// sync as certs are added/removed: title + meta description count, og/twitter
// equivalents, the WebApplication.offers.offerCount, the FAQ "which certifications"
// answer, and the ItemList entries in the JSON-LD @graph.
function updateHomeIndex(certs) {
  const homePath = path.join(ROOT, 'index.html');
  if (!fs.existsSync(homePath)) return;
  let html = fs.readFileSync(homePath, 'utf8');
  const n = certs.length;

  // Sort alphabetically by cert.name so the order is stable and predictable
  const sorted = [...certs].sort((a, b) => a.name.localeCompare(b.name));

  // 1. Meta description + og/twitter description strings that include the cert count.
  // The <title>/og:title/twitter:title (B7) no longer embed a live count, so there is
  // nothing to sync there.
  html = html.replace(/Free practice tests for \d+ certifications:/g, `Free practice tests for ${n} certifications:`);

  // 1b. Pre-rendered hero stats (LCP optimization: see <div id="app"> in index.html).
  // Keep the static numbers in sync with the live count so they don't bounce when
  // counts.json arrives at runtime.
  html = html.replace(
    /(data-stat="questions">)[\d,]+(<\/span>)/,
    `$1${grandTotal.toLocaleString()}$2`
  );
  html = html.replace(
    /(data-stat="certs">)\d+(<\/span>)/,
    `$1${n}$2`
  );

  // 2. Patch the JSON-LD block by parsing it, updating the drift-prone nodes, and re-stringifying
  const ldRegex = /(<script type="application\/ld\+json">)([\s\S]*?)(<\/script>)/;
  const m = html.match(ldRegex);
  if (!m) return;

  let data;
  try {
    data = JSON.parse(m[2]);
  } catch (e) {
    console.warn('  ! index.html JSON-LD did not parse: skipping home auto-update');
    return;
  }

  for (const node of (data['@graph'] || [])) {
    // WebApplication.offers.offerCount
    if (node['@type'] === 'WebApplication' && node.offers) {
      node.offers.offerCount = String(n);
    }
    // FAQ "Which certifications does QuizBuffet cover?" answer
    if (node['@type'] === 'FAQPage') {
      for (const q of (node.mainEntity || [])) {
        if (q.name === 'Which certifications does QuizBuffet cover?') {
          q.acceptedAnswer.text = buildCertCoverageText(sorted);
        }
      }
    }
    // Full ItemList
    if (node['@type'] === 'ItemList') {
      node.itemListElement = sorted.map((c, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: `Free ${c.code} Practice Test`,
        url: `${SITE}/${c.slug}/`,
      }));
    }
  }

  const newLd = JSON.stringify(data, null, 2);
  html = html.replace(ldRegex, `$1\n  ${newLd}\n  $3`);

  // 3. Static, crawlable cert grid inside #cert-list (S2/E1). The SPA replaces it with the
  // richer card grid on hydrate; the static markup is what Googlebot and no-JS readers get.
  const gridRegex = /(<!-- BEGIN home-cert-grid -->)[\s\S]*?(<!-- END home-cert-grid -->)/;
  if (gridRegex.test(html)) {
    html = html.replace(gridRegex, `$1\n${buildHomeCertGrid(sorted)}\n        $2`);
  } else {
    console.warn('  ! index.html has no home-cert-grid markers: static grid not injected');
  }

  writeClean(homePath, html);
}

// Group live certs by category and emit plain links with question counts.
function buildHomeCertGrid(certs) {
  let perCert = {};
  try { perCert = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'counts.json'), 'utf8')).perCert || {}; } catch {}
  const groups = new Map();
  for (const c of certs) {
    const cat = LIVE_CATEGORY_MAP[c.slug] || c.category || 'Other';
    if (!groups.has(cat)) groups.set(cat, []);
    groups.get(cat).push(c);
  }
  const order = ['Cybersecurity', 'Cloud', 'Networking', 'IT Foundations', 'Data & AI', 'IT Service Management', 'Project Management', 'Healthcare', 'Safety', 'Transportation', 'Aviation', 'Real Estate', 'Mortgage', 'Accounting', 'Finance', 'Fitness', 'Beauty', 'Trades'];
  const cats = [...groups.keys()].sort((a, b) => {
    const ia = order.indexOf(a), ib = order.indexOf(b);
    return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib) || a.localeCompare(b);
  });
  return cats.map(cat => `        <section class="home-cat">
          <h3 class="home-cat-title">${htmlEscape(cat)} practice tests</h3>
          <ul class="home-cert-links">
${groups.get(cat).map(c => {
    const n = perCert[c.slug];
    const name = c.seoName || c.name;
    return `            <li><a href="/${c.slug}/">${htmlEscape(name)} practice test</a>${n ? ` <span class="home-cert-count">${n.toLocaleString()} questions</span>` : ''}</li>`;
  }).join('\n')}
          </ul>
        </section>`).join('\n');
}

function shortCertNameForListing(cert) {
  return cert.name
    .replace(/^AWS Certified |^Microsoft |^CompTIA |^Cisco /i, '')
    .replace(/\s*\([^)]+\)\s*$/, '')   // strip trailing parenthetical, e.g. " (BLS)"
    .replace(/–|—/g, '-')
    .trim();
}

function buildCertCoverageText(sortedCerts) {
  // Group by vendor for readability
  const byVendor = {};
  for (const c of sortedCerts) {
    (byVendor[c.vendor] ||= []).push(c);
  }
  const vendorOrder = ['AWS', 'CompTIA', 'Cisco', 'Microsoft', 'ISC2', 'PeopleCert', 'FAA', 'NASM', 'American Heart Association', 'OSHA', 'AWS / OSHA', 'PMI', 'Intuit'];
  const segments = [];
  for (const v of vendorOrder) {
    if (!byVendor[v]) continue;
    const list = byVendor[v];
    const codes = list.map(c => c.code).join(', ');
    segments.push(`${v} (${codes})`);
    delete byVendor[v];
  }
  // Anything left (state boards, EPA, etc.)
  for (const [v, list] of Object.entries(byVendor)) {
    const codes = list.map(c => c.code).join(', ');
    segments.push(`${v} (${codes})`);
  }
  return `QuizBuffet covers ${sortedCerts.length} live certifications: ${segments.join('; ')}. More certifications across cybersecurity, healthcare, trades, project management, and other industries are coming soon.`;
}

// Main
let generated = 0;
const perCertCounts = {};
const perDomainCounts = {};
let grandTotal = 0;
let domainGenerated = 0;
for (const cert of certifications) {
  const dir = path.join(ROOT, cert.slug);
  fs.mkdirSync(dir, { recursive: true });
  writeClean(path.join(dir, 'index.html'), buildCertHtml(cert));
  fs.writeFileSync(path.join(ROOT, 'icons', 'og', `${cert.slug}.svg`), buildOgSvg(cert));
  // Tally questions and generate a static page per domain (fixes 404s on domain quiz URLs)
  let n = 0;
  const domMap = {};
  for (const dom of cert.domains) {
    const qs = loadDomainQuestions(cert.slug, dom.slug);
    n += qs.length;
    domMap[dom.slug] = qs.length;
    const domDir = path.join(dir, dom.slug);
    fs.mkdirSync(domDir, { recursive: true });
    writeClean(path.join(domDir, 'index.html'), await buildDomainHtml(cert, dom, qs));
    fs.writeFileSync(path.join(ROOT, 'icons', 'og', `${cert.slug}-${dom.slug}.svg`), buildDomainOgSvg(cert, dom));
    domainGenerated++;
  }
  perCertCounts[cert.slug] = n;
  perDomainCounts[cert.slug] = domMap;
  grandTotal += n;
  console.log(`  ✓ ${cert.slug}/index.html + ${cert.domains.length} domain pages + og`);
  generated++;
}
console.log(`  ✓ ${domainGenerated} domain pages generated`);

const comingSoon = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'coming-soon.json'), 'utf8'));
let csGenerated = 0;
for (let i = 0; i < comingSoon.length; i++) {
  const cert = comingSoon[i];
  const dir = path.join(ROOT, cert.slug);
  fs.mkdirSync(dir, { recursive: true });
  writeClean(path.join(dir, 'index.html'), buildComingSoonHtml(cert, i + 1, certifications));
  fs.writeFileSync(path.join(ROOT, 'icons', 'og', `${cert.slug}.svg`), buildComingSoonOgSvg(cert));
  console.log(`  ⏳ ${cert.slug}/ (coming soon #${i + 1})`);
  csGenerated++;
}

fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), buildSitemap(comingSoon));
console.log(`  ✓ sitemap.xml`);

writeClean(path.join(ROOT, 'llms.txt'), buildLlmsTxt(comingSoon));
console.log(`  ✓ llms.txt`);

writeClean(path.join(ROOT, 'llms-full.txt'), buildLlmsFullTxt(comingSoon));
console.log(`  ✓ llms-full.txt`);

writeClean(path.join(ROOT, 'feed.xml'), buildRssFeed(comingSoon));
console.log(`  ✓ feed.xml (RSS)`);

const counts = {
  total: grandTotal,
  liveCerts: certifications.length,
  comingSoonCerts: comingSoon.length,
  generatedAt: TODAY,
  perCert: perCertCounts,
  perDomain: perDomainCounts,
};
fs.writeFileSync(path.join(ROOT, 'data', 'counts.json'), JSON.stringify(counts));
console.log(`  ✓ data/counts.json (${grandTotal.toLocaleString()} questions across ${certifications.length} certs)`);

// Surface the SW cache version + this build's date so the footer can show "what's live"
// without hand-edits. Version comes from sw.js (the cache string is the deploy marker).
const swSrc = fs.readFileSync(path.join(ROOT, 'sw.js'), 'utf8');
const version = (swSrc.match(/CACHE\s*=\s*['"]([^'"]+)['"]/) || [, 'unknown'])[1];
fs.writeFileSync(path.join(ROOT, 'data', 'build.json'), JSON.stringify({ version, builtAt: TODAY }));
console.log(`  ✓ data/build.json (${version}, ${TODAY})`);

// D2: persist first-publish dates so datePublished stops being overwritten with TODAY.
// Only rewritten when a key was actually added or seeded this run.
if (publishedDirty) {
  fs.writeFileSync(PUBLISHED_PATH, JSON.stringify(published, Object.keys(published).sort(), 2) + '\n');
  console.log(`  ✓ data/published.json (${Object.keys(published).length} pages)`);
}

updateHomeIndex(certifications);
console.log(`  ✓ index.html (cert count + ItemList + FAQ + offerCount synced to ${certifications.length} live certs)`);

console.log(`\nGenerated ${generated} live cert pages + ${csGenerated} coming-soon stubs.`);
