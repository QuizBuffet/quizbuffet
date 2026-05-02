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
      const answer = explanation || correctText;
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
        'about': cert.domains.map(d => d.name),
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

function buildSitemap() {
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
  console.log(`  ✓ ${cert.slug}/index.html + og/${cert.slug}.svg`);
  generated++;
}

fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), buildSitemap());
console.log(`  ✓ sitemap.xml`);

console.log(`\nGenerated ${generated} cert pages.`);
