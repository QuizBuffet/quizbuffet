// Generates per-cert static HTML pages with full SEO metadata, JSON-LD (Course + FAQPage),
// per-cert OG images, and a fresh sitemap. Run with: node scripts/build-seo.mjs

import fs from 'node:fs';
import path from 'node:path';
import { certifications } from '../js/data/certifications/index.js';

const ROOT = path.resolve(import.meta.dirname, '..');
const SITE = 'https://quizbuffet.com';
const TODAY = new Date().toISOString().slice(0, 10);
// Human-readable display version of TODAY (e.g. "May 13, 2026"). Must
// represent the SAME calendar date as TODAY so Google's byline pipeline
// can match the visible byline to the JSON-LD `dateModified`.
const TODAY_DISPLAY = new Date().toLocaleDateString('en-US', {
  year: 'numeric', month: 'long', day: 'numeric',
});

function htmlEscape(s) {
  return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
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

function loadDomainQuestions(certSlug, domainSlug) {
  const p = path.join(ROOT, 'data', 'certifications', certSlug, `${domainSlug}.json`);
  if (!fs.existsSync(p)) return [];
  try {
    const d = JSON.parse(fs.readFileSync(p, 'utf8'));
    return d.questions || [];
  } catch { return []; }
}

// Wikipedia entity URLs for known vendors — lets AI link your pages to canonical entities
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

// Trim a verbose explanation down to the first sentence — what AI prefers to quote
function trimToFirstSentence(text, maxLen = 280) {
  const t = String(text).trim();
  const m = t.match(/^([^.!?]+[.!?])\s/);
  let out = m ? m[1] : t;
  if (out.length > maxLen) out = out.slice(0, maxLen).replace(/\s\S*$/, '') + '…';
  return out;
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
// long-form content (article-style — eligible for informational queries and
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

  const career = g.career || (sal ? (
    `Holders of ${cert.code} in the US currently see compensation in the range of ` +
    `<strong>${fmtUsd(sal.salary.low)} to ${fmtUsd(sal.salary.high)}</strong> per year, with median around <strong>${fmtUsd(sal.salary.mid)}</strong>. ` +
    `${sal.notes ? sal.notes + ' ' : ''}` +
    `Salary varies by region, employer size, and complementary skills, but the ${cert.code} credential consistently lifts the floor of what you can negotiate against.`
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

  // Registered certs with zero questions are scaffolds, not real pages — noindex so
  // Google doesn't flag them as "Crawled - currently not indexed". noindex clears
  // automatically once any domain ships with questions.
  const robotsMeta = total === 0
    ? 'noindex, follow'
    : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';

  const faq = pickFaqQuestions(cert);
  const url = `${SITE}/${cert.slug}/`;
  const ogImage = `${SITE}/icons/og/${cert.slug}.svg`;
  const shortName = cert.name.replace(/^AWS Certified |^Microsoft |^CompTIA |^Cisco /i, '').replace(/–|—/g, '-').trim();
  // Drop the "(code)" parenthetical when it just repeats the name (e.g. CPR / AED Certification (CPR/AED)).
  const norm = s => s.toLowerCase().replace(/[^a-z0-9]/g, '');
  const codeTag = norm(cert.name).includes(norm(cert.code)) ? '' : ` (${htmlEscape(cert.code)})`;
  // SEO leads with the question count — the strongest single signal we own for this query.
  // Scaffolded certs with 0 questions fall back to the old "Practice Test" framing.
  const fullTitle = total > 0
    ? clipText(`${total}+ Free ${cert.code} Practice Questions, No Signup`, 60)
    : clipText(`Free ${cert.code} Practice Test, No Signup`, 60);
  const desc = total > 0
    ? clipText(`Test yourself on every ${cert.code} exam domain for free. ${total} questions with instant feedback and explanations so you walk in ready. No account, no email.`.trim().replace(/\s+/g, ' '), 155)
    : clipText(`${cert.code} practice test, coming soon. Test yourself across ${cert.domains.length} exam domains with instant feedback and explanations. No signup, no email.`.trim().replace(/\s+/g, ' '), 155);

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
        'dateModified': TODAY,
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
        // hasPart links each domain quiz as a component of this Course — explicit
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
        'datePublished': TODAY,
        'dateModified': TODAY,
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

  <!-- Google tag (gtag.js) with Consent Mode v2 — default denied (GDPR/EEA), restored from prior choice. Do not revert to a bare config: see CLAUDE.md "Analytics consent". -->
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
      wait_for_update: 500
    });
    try{ if(localStorage.getItem('qb_consent')==='granted'){ gtag('consent','update',{analytics_storage:'granted'}); } }catch(e){}
  </script>
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-YRKFB3WT9C"></script>
  <script>
    gtag('js', new Date());
    gtag('config', 'G-YRKFB3WT9C');
  </script>

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <!-- Preload the woff2 files we use above the fold so they're ready before paint and don't cause font-swap CLS. -->
  <!-- URLs come from Google Fonts; they rotate occasionally — update with: curl -A "<chrome UA>" "<the css2 url>" -->
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
      <h1>${htmlEscape(cert.name)}${codeTag} Free Practice Test</h1>
      <p><strong>${total}+ exam-style questions</strong> across ${cert.domains.length} domains, organized exactly like the real ${htmlEscape(cert.code)} exam. Instant feedback on every question, progress tracking, and no account required.</p>
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
      <p class="cert-byline"><time datetime="${TODAY}">Last updated: ${TODAY_DISPLAY}</time></p>
    </section>
    <div id="app"></div>
    <article class="cert-guide-content">
      ${buildCertGuideHtml(cert)}
      ${cert.faq ? buildFaqHtml(cert, faq) : ''}
      <p class="cert-byline cert-guide-byline">
        <time datetime="${TODAY}">Published and last updated: ${TODAY_DISPLAY}</time>
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

function buildDomainHtml(cert, domain, questions) {
  const count = questions.length;
  // Domain pages with zero questions get noindex — clears automatically when questions ship.
  const robotsMeta = count === 0
    ? 'noindex, follow'
    : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
  const url = `${SITE}/${cert.slug}/${domain.slug}/`;
  const ogImage = `${SITE}/icons/og/${cert.slug}-${domain.slug}.svg`;
  const domNum = domain.number ? `${domain.number} ` : '';
  const shortName = cert.name.replace(/^AWS Certified |^Microsoft |^CompTIA |^Cisco /i, '').replace(/–|—/g, '-').trim();
  // Domain-page SEO also leads with the count. Empty domains fall back to the older framing.
  const fullTitle = count > 0
    ? clipText(`${count} Free ${cert.code} ${domain.name} Questions`, 60)
    : clipText(`Free ${cert.code} ${domain.name} Practice Quiz`, 60);
  const desc = count > 0
    ? clipText(`Test yourself on ${cert.code} ${domain.name}${domain.weight ? ` (${domain.weight}% of the exam)` : ''}. ${count} free questions with instant feedback and explanations. No signup, no email needed.`.trim().replace(/\s+/g, ' '), 155)
    : clipText(`${cert.code} ${domain.name} practice quiz, coming soon${domain.weight ? ` (${domain.weight}% of the exam)` : ''}. Test yourself with instant feedback once it's live. Part of the ${shortName} practice test.`.trim().replace(/\s+/g, ' '), 155);

  // Pick up to 3 sample questions (easy first) for static content
  const easy = questions.filter(q => q.difficulty === 'easy');
  const sample = (easy.length >= 3 ? easy : questions).slice(0, 3);

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
        'dateModified': TODAY,
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
        'mainEntity': sample.map(q => {
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

  const sampleHtml = sample.map(q => {
    const correct = (q.answers || []).find(a => a.id === q.correct);
    const correctText = correct?.text || '';
    const explanation = q.explanations?.[q.correct] || '';
    return `<article class="seo-sample-q">
        <h3>${htmlEscape(q.text)}</h3>
        ${correctText ? `<p><strong>Answer:</strong> ${htmlEscape(correctText)}</p>` : ''}
        ${explanation ? `<p>${htmlEscape(explanation)}</p>` : ''}
      </article>`;
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

  <!-- Google tag (gtag.js) with Consent Mode v2 — default denied (GDPR/EEA), restored from prior choice. Do not revert to a bare config: see CLAUDE.md "Analytics consent". -->
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
      wait_for_update: 500
    });
    try{ if(localStorage.getItem('qb_consent')==='granted'){ gtag('consent','update',{analytics_storage:'granted'}); } }catch(e){}
  </script>
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-YRKFB3WT9C"></script>
  <script>
    gtag('js', new Date());
    gtag('config', 'G-YRKFB3WT9C');
  </script>

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <!-- Preload the woff2 files we use above the fold so they're ready before paint and don't cause font-swap CLS. -->
  <!-- URLs come from Google Fonts; they rotate occasionally — update with: curl -A "<chrome UA>" "<the css2 url>" -->
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
      <h1>${htmlEscape(domNum + domain.name)} ${htmlEscape(cert.code)} Practice Quiz</h1>
      <p><strong>${count} exam-style questions</strong>${domain.weight ? ` covering <strong>${domain.weight}% of the ${htmlEscape(cert.code)} exam</strong>` : ''}. Instant feedback on every answer, progress tracking, no signup required.</p>
      <p>This domain is part of the <a href="/${cert.slug}/">${htmlEscape(cert.name)} practice test</a>. Each question is tagged by exam objective and difficulty so you can drill exactly the areas you need.</p>
      ${sampleHtml ? `<h2>Sample Questions</h2>
      ${sampleHtml}` : ''}
      ${otherDomainsHtml ? `<h2>Other ${htmlEscape(cert.code)} Domains</h2>
      <ul>
          ${otherDomainsHtml}
      </ul>` : ''}
      <p><a href="/${cert.slug}/">&larr; Back to ${htmlEscape(cert.code)} practice test overview</a></p>
      <p class="cert-byline"><time datetime="${TODAY}">Last updated: ${TODAY_DISPLAY}</time></p>
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

// Curated category mapping for live certs — used to find "related" recommendations on coming-soon pages
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
};

// Pick up to N live certs in the same category as the coming-soon cert
function pickRelatedLive(comingCert, liveCerts, n = 3) {
  const cat = comingCert.category || 'Other';
  const sameCategory = liveCerts.filter(c => (LIVE_CATEGORY_MAP[c.slug] || c.category || 'Other') === cat);
  if (sameCategory.length >= n) return sameCategory.slice(0, n);
  // Fallback: pad with assorted live certs from other categories
  const others = liveCerts.filter(c => !sameCategory.includes(c)).slice(0, n - sameCategory.length);
  return [...sameCategory, ...others].slice(0, n);
}

// Generate Amazon search URL with the site's affiliate tag
function udemyDeepLink(destUrl) {
  // Impact Radius deep link — `u` param is the URL-encoded destination on udemy.com
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

  <!-- Google tag (gtag.js) with Consent Mode v2 — default denied (GDPR/EEA), restored from prior choice. Do not revert to a bare config: see CLAUDE.md "Analytics consent". -->
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
      wait_for_update: 500
    });
    try{ if(localStorage.getItem('qb_consent')==='granted'){ gtag('consent','update',{analytics_storage:'granted'}); } }catch(e){}
  </script>
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-YRKFB3WT9C"></script>
  <script>
    gtag('js', new Date());
    gtag('config', 'G-YRKFB3WT9C');
  </script>

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <!-- Preload the woff2 files we use above the fold so they're ready before paint and don't cause font-swap CLS. -->
  <!-- URLs come from Google Fonts; they rotate occasionally — update with: curl -A "<chrome UA>" "<the css2 url>" -->
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

// llms.txt — concise, top-level index for AI crawlers (emerging spec, mirrors robots.txt's role for AI).
function buildLlmsTxt(comingSoon) {
  const liveLines = certifications.map(c => {
    const total = c.domains.reduce((s, d) => s + loadDomainQuestions(c.slug, d.slug).length, 0);
    return `- [${c.name} (${c.code})](${SITE}/${c.slug}/): ${c.tagline || 'Free practice test.'}${total ? ` ${total}+ questions.` : ''}`;
  }).join('\n');

  const comingLines = comingSoon.slice(0, 20).map((c, i) =>
    `- [${c.name} (${c.code})](${SITE}/${c.slug}/) — coming soon (priority #${i + 1})`
  ).join('\n');

  return `# QuizBuffet

> Free, no-account practice tests for IT, cybersecurity, cloud, healthcare, trades, and finance certifications. Domain-by-domain quizzes with instant feedback and progress tracking saved locally in the browser. Last updated ${TODAY}.

## Available certifications
${liveLines}

## Coming soon
${comingLines}

## Study hubs
- [CPA Exam — all 6 sections](${SITE}/cpa/): hub linking the 3 Core (AUD, FAR, REG) and 3 Discipline (BAR, ISC, TCP) CPA section practice tests.

## Resources
- [Sitemap](${SITE}/sitemap.xml)
- [RSS feed](${SITE}/feed.xml) — new cert launches and updates
- [Full content for AI ingestion](${SITE}/llms-full.txt)

## License and citation
QuizBuffet content is free to read and reference. Practice questions are authored for this site. When citing, link to the cert page (e.g., ${SITE}/comptia-security-plus/) rather than copying long passages.
`;
}

// llms-full.txt — long-form dump of cert metadata + sample FAQ entries for AI ingestion.
function buildLlmsFullTxt(comingSoon) {
  const sections = certifications.map(c => {
    const total = c.domains.reduce((s, d) => s + loadDomainQuestions(c.slug, d.slug).length, 0);
    const domainLines = c.domains.map(d => {
      const count = loadDomainQuestions(c.slug, d.slug).length;
      return `- ${d.number ? d.number + ' ' : ''}${d.name}${d.weight ? ` (${d.weight}% of exam)` : ''}${count ? ` — ${count} questions` : ''}`;
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

  const csList = comingSoon.map((c, i) => `- ${c.name} (${c.code}) — ${SITE}/${c.slug}/ — priority #${i + 1}`).join('\n');

  return `# QuizBuffet — Full Cert Reference

Last updated: ${TODAY}
Site: ${SITE}

QuizBuffet provides free practice tests for high-demand certifications across IT, cybersecurity, cloud, healthcare, trades, transportation, and finance. All content is browser-based — no signup, no tracking of personal data. Progress is stored in localStorage.

${sections}

## Coming soon (in priority order)
${csList}
`;
}

// RSS 2.0 feed — one item per live cert + top coming-soon entries.
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
    return `    <item>
      <title>${htmlEscape(title)}</title>
      <link>${url}</link>
      <description>${htmlEscape(desc)}</description>
      <category>${htmlEscape(cert.vendor || 'Certification')}</category>
      <pubDate>${buildDate}</pubDate>
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
  const urls = [{ loc: `${SITE}/`, priority: '1.0', changefreq: 'weekly' }];
  // CPA hub: a hand-built static landing at /cpa/ that links the 6 CPA section
  // certs (3 Core + 1 Discipline). Not a cert in the data model, so register its
  // sitemap entry here so it survives every build:seo run.
  urls.push({ loc: `${SITE}/cpa/`, priority: '0.9', changefreq: 'monthly' });
  // Privacy & cookie policy: hand-built static page, not a cert. Register here
  // so it survives every build:seo run and stays in the sitemap.
  urls.push({ loc: `${SITE}/privacy/`, priority: '0.3', changefreq: 'yearly' });
  for (const cert of certifications) {
    // Tally questions across all domains. Certs with zero questions are scaffolds —
    // the page carries noindex (see buildCertHtml) so don't advertise them in the sitemap.
    let certTotal = 0;
    const domainCounts = cert.domains.map(d => {
      const n = loadDomainQuestions(cert.slug, d.slug).length;
      certTotal += n;
      return { slug: d.slug, n };
    });
    if (certTotal === 0) continue;
    urls.push({ loc: `${SITE}/${cert.slug}/`, priority: '0.9', changefreq: 'monthly' });
    for (const d of domainCounts) {
      if (d.n > 0) {
        urls.push({ loc: `${SITE}/${cert.slug}/${d.slug}/`, priority: '0.8', changefreq: 'monthly' });
      }
    }
  }
  // Coming-soon pages carry <meta robots="noindex"> — exclude from sitemap to avoid
  // mixed signals to Google (sitemap inclusion = "index me", noindex = "don't").
  // When a cert flips live, its sitemap entry comes back through the live-cert loop above.
  const body = urls.map(u =>
    `  <url><loc>${u.loc}</loc><lastmod>${TODAY}</lastmod><changefreq>${u.changefreq}</changefreq><priority>${u.priority}</priority></url>`
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

  // 1. Title + meta description + og/twitter strings that include the cert count
  html = html.replace(/Free Practice Tests for \d+ Certifications/g, `Free Practice Tests for ${n} Certifications`);
  html = html.replace(/Free practice tests for \d+ certifications:/g, `Free practice tests for ${n} certifications:`);

  // 1b. Pre-rendered hero stats (LCP optimization — see <div id="app"> in index.html).
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
    console.warn('  ! index.html JSON-LD did not parse — skipping home auto-update');
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

  fs.writeFileSync(homePath, html);
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
  fs.writeFileSync(path.join(dir, 'index.html'), buildCertHtml(cert));
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
    fs.writeFileSync(path.join(domDir, 'index.html'), buildDomainHtml(cert, dom, qs));
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
  fs.writeFileSync(path.join(dir, 'index.html'), buildComingSoonHtml(cert, i + 1, certifications));
  fs.writeFileSync(path.join(ROOT, 'icons', 'og', `${cert.slug}.svg`), buildComingSoonOgSvg(cert));
  console.log(`  ⏳ ${cert.slug}/ (coming soon #${i + 1})`);
  csGenerated++;
}

fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), buildSitemap(comingSoon));
console.log(`  ✓ sitemap.xml`);

fs.writeFileSync(path.join(ROOT, 'llms.txt'), buildLlmsTxt(comingSoon));
console.log(`  ✓ llms.txt`);

fs.writeFileSync(path.join(ROOT, 'llms-full.txt'), buildLlmsFullTxt(comingSoon));
console.log(`  ✓ llms-full.txt`);

fs.writeFileSync(path.join(ROOT, 'feed.xml'), buildRssFeed(comingSoon));
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

updateHomeIndex(certifications);
console.log(`  ✓ index.html (cert count + ItemList + FAQ + offerCount synced to ${certifications.length} live certs)`);

console.log(`\nGenerated ${generated} live cert pages + ${csGenerated} coming-soon stubs.`);
