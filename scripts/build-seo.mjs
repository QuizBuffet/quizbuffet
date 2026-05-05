// Generates per-cert static HTML pages with full SEO metadata, JSON-LD (Course + FAQPage),
// per-cert OG images, and a fresh sitemap. Run with: node scripts/build-seo.mjs

import fs from 'node:fs';
import path from 'node:path';
import { certifications } from '../js/data/certifications/index.js';

const ROOT = path.resolve(import.meta.dirname, '..');
const SITE = 'https://quizbuffet.com';
const TODAY = new Date().toISOString().slice(0, 10);

function htmlEscape(s) {
  return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
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
  // Pick a few easy questions per domain to seed the FAQ schema
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

function buildCertHtml(cert) {
  // Count questions per domain
  let total = 0;
  const domainData = cert.domains.map(dom => {
    const qs = loadDomainQuestions(cert.slug, dom.slug);
    total += qs.length;
    return { ...dom, count: qs.length };
  });

  const faq = pickFaqQuestions(cert);
  const url = `${SITE}/${cert.slug}/`;
  const ogImage = `${SITE}/icons/og/${cert.slug}.svg`;
  const fullTitle = `${cert.name} (${cert.code}) Free Practice Test | QuizBuffet`;
  const desc = `Free ${cert.name} (${cert.code}) practice test — ${total}+ exam questions across ${cert.domains.length} domains with instant feedback. ${cert.tagline || ''}`.trim().replace(/\s+/g, ' ');

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
        'name': `${cert.name} (${cert.code}) Free Practice Test`,
        'courseCode': cert.code,
        'description': cert.about || desc,
        'url': url,
        'inLanguage': 'en-US',
        'dateModified': TODAY,
        'educationalCredentialAwarded': cert.name,
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
    ],
  };

  // Static SEO content (visible to crawlers; hidden by CSS once JS loads)
  const domainListHtml = domainData.map(d => {
    const num = d.number ? `${d.number} ` : '';
    return `<li><a href="/${cert.slug}/${d.slug}/"><strong>${htmlEscape(num + d.name)}</strong>${d.count ? ` — ${d.count} questions` : ''}${d.weight ? ` (${d.weight}% of exam)` : ''}</a></li>`;
  }).join('\n          ');

  const affiliateHtml = (cert.affiliates || []).filter(a => a.url).map(a =>
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
  <meta name="robots" content="index, follow">

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
  <link rel="alternate" type="application/rss+xml" title="QuizBuffet — new certs and updates" href="/feed.xml">
  <link rel="icon" type="image/png" href="/icons/favicon-96x96.png?v=20260428" sizes="96x96" />
  <link rel="icon" type="image/svg+xml" href="/icons/favicon.svg?v=20260428" />
  <link rel="shortcut icon" href="/icons/favicon.ico?v=20260428" />
  <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png?v=20260428" />
  <meta name="apple-mobile-web-app-title" content="QuizBuffet" />
  <link rel="manifest" href="/icons/site.webmanifest?v=20260428" />
  <meta name="theme-color" content="#333333">

  <script>document.documentElement.classList.add('js');try{var t=localStorage.getItem('qb_theme');if(t==='dark')document.documentElement.dataset.theme='dark';var c=localStorage.getItem('qb_color')||'buffet';document.documentElement.dataset.color=c;var cur=localStorage.getItem('qb_cursor')||'pencil';document.documentElement.dataset.cursor=cur;}catch(e){}</script>

  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-YRKFB3WT9C"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-YRKFB3WT9C');
  </script>

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&family=Playfair+Display:ital,wght@0,600;1,400&family=IM+Fell+English+SC&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/css/style.css">
  <link rel="stylesheet" href="/css/bg-dots.css">
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossorigin="anonymous"></script>

  <script type="application/ld+json">
${JSON.stringify(jsonLd, null, 2)}
  </script>
</head>
<body>
  <a href="#main-content" class="skip-link">Skip to main content</a>
  <div id="nav" role="navigation" aria-label="Main navigation"></div>
  <main id="main-content">
    <section id="seo-static">
      <nav aria-label="Breadcrumb"><a href="/">Home</a> &rsaquo; ${htmlEscape(cert.name)}</nav>
      <h1>${htmlEscape(cert.name)} (${htmlEscape(cert.code)}) Free Practice Test</h1>
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
      <p>QuizBuffet's ${htmlEscape(cert.name)} practice test is built for exam preparation. Every question is tagged by exam objective and difficulty (easy, medium, medium-hard, hard) so you can drill the areas you need most. Sessions are short by default — pick 10, 25, 50, or all questions per domain — so you can study in any spare moment.</p>
      <p>Wrong answers come with a contrastive explanation showing why your choice was wrong and what the correct concept actually is. Your progress is saved locally in your browser; nothing is uploaded and there's no signup.</p>
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

function buildComingSoonHtml(cert, priority) {
  const url = `${SITE}/${cert.slug}/`;
  const ogImage = `${SITE}/icons/og/${cert.slug}.svg`;
  const fullTitle = `${cert.name} (${cert.code}) Free Practice Test — Coming Soon | QuizBuffet`;
  const desc = `${cert.name} (${cert.code}) free practice test is coming soon to QuizBuffet. ${cert.tagline || ''} Domain-by-domain quizzes with instant feedback. No account needed.`.trim().replace(/\s+/g, ' ');

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
        'name': `${cert.name} (${cert.code}) Free Practice Test`,
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
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${htmlEscape(fullTitle)}</title>
  <meta name="description" content="${htmlEscape(desc)}">
  <link rel="canonical" href="${url}">
  <meta name="robots" content="index, follow">

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
  <link rel="icon" type="image/png" href="/icons/favicon-96x96.png?v=20260428" sizes="96x96" />
  <link rel="icon" type="image/svg+xml" href="/icons/favicon.svg?v=20260428" />
  <link rel="shortcut icon" href="/icons/favicon.ico?v=20260428" />
  <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png?v=20260428" />
  <meta name="apple-mobile-web-app-title" content="QuizBuffet" />
  <link rel="manifest" href="/icons/site.webmanifest?v=20260428" />
  <meta name="theme-color" content="#333333">

  <script>document.documentElement.classList.add('js');try{var t=localStorage.getItem('qb_theme');if(t==='dark')document.documentElement.dataset.theme='dark';var c=localStorage.getItem('qb_color')||'buffet';document.documentElement.dataset.color=c;var cur=localStorage.getItem('qb_cursor')||'pencil';document.documentElement.dataset.cursor=cur;}catch(e){}</script>

  <script async src="https://www.googletagmanager.com/gtag/js?id=G-YRKFB3WT9C"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-YRKFB3WT9C');
  </script>

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&family=Playfair+Display:ital,wght@0,600;1,400&family=IM+Fell+English+SC&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/css/style.css">
  <link rel="stylesheet" href="/css/bg-dots.css">

  <script type="application/ld+json">
${JSON.stringify(jsonLd, null, 2)}
  </script>
</head>
<body>
  <a href="#main-content" class="skip-link">Skip to main content</a>
  <div id="nav" role="navigation" aria-label="Main navigation"></div>
  <main id="main-content">
    <section id="seo-static">
      <nav aria-label="Breadcrumb"><a href="/">Home</a> &rsaquo; ${htmlEscape(cert.name)}</nav>
      <h1>${htmlEscape(cert.name)} (${htmlEscape(cert.code)}) Free Practice Test</h1>
      <p><strong>Coming soon to QuizBuffet.</strong> ${htmlEscape(cert.tagline || '')}</p>
      ${cert.about ? `<p>${htmlEscape(cert.about)}</p>` : ''}
      <p>Vendor: <strong>${htmlEscape(cert.vendor)}</strong>${cert.category ? ` · Category: <strong>${htmlEscape(cert.category)}</strong>` : ''}${priority ? ` · Launch priority: <strong>#${priority}</strong>` : ''}</p>
      <h2>What's coming</h2>
      <ul>
        <li>Hundreds of practice questions organized by exam objective</li>
        <li>Easy / medium / medium-hard / hard difficulty filtering</li>
        <li>Instant explanations on every wrong answer</li>
        <li>Local progress tracking — no account, no signup</li>
        <li>Free, with no daily limits</li>
      </ul>
      <p><a href="/">← Back to all certifications</a></p>
    </section>
    <div id="app">
      <main class="container">
        <h1 style="text-align:center;margin:2rem 0 0.5rem;">${htmlEscape(cert.name)}</h1>
        <p style="text-align:center;color:var(--muted,#666);margin:0 0 1.5rem;">${htmlEscape(cert.code)} · ${htmlEscape(cert.vendor)}</p>
        <div style="background:var(--surface,#f9f9f9);border:1px solid var(--border,#ddd);padding:1.5rem;border-radius:8px;max-width:40rem;margin:0 auto;text-align:center;">
          <div style="font-size:1.5rem;font-weight:700;margin-bottom:0.5rem;">📚 Coming Soon</div>
          <p style="margin:0 0 1rem;">This practice test is in development. ${htmlEscape(cert.tagline || '')}</p>
          ${cert.about ? `<p style="text-align:left;font-size:0.95rem;color:var(--muted,#555);">${htmlEscape(cert.about)}</p>` : ''}
          <p style="margin:1.5rem 0 0;"><a href="/" style="display:inline-block;padding:0.6rem 1.2rem;background:var(--btn-bg,#333);color:#fff;text-decoration:none;border-radius:6px;">← Back to all certifications</a></p>
        </div>
      </main>
    </div>
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
      ? `${cert.name} (${cert.code}) — coming soon`
      : `${cert.name} (${cert.code}) — ${total} free practice questions`;
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
    <title>QuizBuffet — Free Certification Practice Tests</title>
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
  for (const cert of certifications) {
    urls.push({ loc: `${SITE}/${cert.slug}/`, priority: '0.9', changefreq: 'monthly' });
    for (const d of cert.domains) {
      const qs = loadDomainQuestions(cert.slug, d.slug);
      if (qs.length > 0) {
        urls.push({ loc: `${SITE}/${cert.slug}/${d.slug}/`, priority: '0.8', changefreq: 'monthly' });
      }
    }
  }
  for (const cert of comingSoon) {
    urls.push({ loc: `${SITE}/${cert.slug}/`, priority: '0.5', changefreq: 'monthly' });
  }
  const body = urls.map(u =>
    `  <url><loc>${u.loc}</loc><lastmod>${TODAY}</lastmod><changefreq>${u.changefreq}</changefreq><priority>${u.priority}</priority></url>`
  ).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;
}

// Main
let generated = 0;
for (const cert of certifications) {
  const dir = path.join(ROOT, cert.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), buildCertHtml(cert));
  fs.writeFileSync(path.join(ROOT, 'icons', 'og', `${cert.slug}.svg`), buildOgSvg(cert));
  console.log(`  ✓ ${cert.slug}/index.html + og`);
  generated++;
}

const comingSoon = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'coming-soon.json'), 'utf8'));
let csGenerated = 0;
for (let i = 0; i < comingSoon.length; i++) {
  const cert = comingSoon[i];
  const dir = path.join(ROOT, cert.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), buildComingSoonHtml(cert, i + 1));
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

console.log(`\nGenerated ${generated} live cert pages + ${csGenerated} coming-soon stubs.`);
