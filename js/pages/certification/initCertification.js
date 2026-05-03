// Entry point for the cert route — resolves cert from hash param and renders all sections
import { renderAd } from '../../components/ad/renderAd.js';
import { certifications } from '../../data/certifications/index.js';
import { renderCertHeader } from './renderCertHeader.js';
import { renderCertDomainList } from './renderCertDomainList.js';
import { renderCertProgressSummary } from './renderCertProgressSummary.js';
import { renderAcronymDrill } from './renderAcronymDrill.js';
import { renderSessionSizePicker } from './renderSessionSizePicker.js';
import { renderMixQuizBtn } from './renderMixQuizBtn.js';
import { loadDomain } from '../../loader/loadDomain.js';
import { getRouteParams } from '../../router/initRouter.js';
import { setMeta } from '../../components/meta/setMeta.js';
import { setJsonLd } from '../../components/meta/setJsonLd.js';
import { affiliateLinksHTML } from '../../components/affiliates/affiliateLinksHTML.js';

export async function init() {
  renderAd('ad-top');
  const certSlug = getRouteParams().cert;
  const cert = certifications.find(c => c.slug === certSlug);

  if (!cert) {
    // Maybe it's a coming-soon cert — render a placeholder card
    let comingSoon = null;
    try {
      const res = await fetch('/data/coming-soon.json');
      if (res.ok) {
        const list = await res.json();
        comingSoon = list.find(c => c.slug === certSlug) || null;
      }
    } catch (_) {}

    if (comingSoon) {
      setMeta(
        `${comingSoon.name} (${comingSoon.code}) Free Practice Test — Coming Soon`,
        `${comingSoon.name} (${comingSoon.code}) free practice test is coming soon. ${comingSoon.tagline || ''}`
      );
      document.getElementById('cert-header').innerHTML = `
        <h1 style="text-align:center;margin:1.5rem 0 0.25rem;">${comingSoon.name}</h1>
        <p style="text-align:center;color:var(--text-muted);margin:0 0 1.25rem;">${comingSoon.code} · ${comingSoon.vendor}</p>
        <div style="background:var(--surface,#f9f9f9);border:1px solid var(--border,#ddd);padding:1.25rem;border-radius:8px;max-width:40rem;margin:0 auto;">
          <div style="font-weight:700;font-size:1.15rem;margin-bottom:0.5rem;">📚 Coming Soon</div>
          <p style="margin:0 0 0.75rem;">${comingSoon.tagline || ''}</p>
          ${comingSoon.about ? `<p style="font-size:0.95rem;color:var(--text-muted);margin:0 0 0.75rem;">${comingSoon.about}</p>` : ''}
          <p style="margin:1rem 0 0;"><a href="/" class="btn">← Back to all certifications</a></p>
        </div>`;
    } else {
      document.getElementById('cert-header').innerHTML = '<p>Certification not found. <a href="/">← Home</a></p>';
    }
    setJsonLd(null);
  } else {
    // Render immediately with placeholder, then update once all domains are fetched
    renderCertHeader(cert, null);
    renderCertProgressSummary(cert);
    renderSessionSizePicker(() => {});
    renderMixQuizBtn(cert);
    renderCertDomainList(cert);
    renderAcronymDrill(cert);

    const affiliatesEl = document.getElementById('affiliates');
    if (affiliatesEl) affiliatesEl.innerHTML = affiliateLinksHTML(cert.affiliates);

    // Fetch all domain counts in parallel — loadDomain caches results for the quiz
    const counts = await Promise.all(
      cert.domains.map(d => loadDomain(cert.slug, d.slug, cert).then(qs => qs.length))
    );
    const totalQ = counts.reduce((s, n) => s + n, 0);

    renderCertHeader(cert, totalQ);
    setMeta(
      `${cert.name} (${cert.code}) Free Practice Test`,
      `Free ${cert.name} (${cert.code}) practice test — ${totalQ}+ exam questions across ${cert.domains.length} domains. No account needed. Track progress domain-by-domain until you're ready to pass.`
    );
    setJsonLd({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Course',
          'name': `${cert.name} (${cert.code}) Free Practice Test`,
          'courseCode': cert.code,
          'description': cert.about || `Free ${cert.name} exam practice questions organized by domain. Quiz yourself on every topic until you're ready to pass.`,
          'url': `https://quizbuffet.com/${cert.slug}/`,
          'provider': { '@type': 'EducationalOrganization', 'name': 'QuizBuffet', 'url': 'https://quizbuffet.com' },
          'educationalLevel': 'Professional',
          'teaches': cert.domains.map(d => d.name),
          'hasCourseInstance': {
            '@type': 'CourseInstance',
            'courseMode': 'online',
            'courseWorkload': `${totalQ}+ questions across ${cert.domains.length} exam domains`,
          },
          'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'USD', 'availability': 'https://schema.org/InStock' },
          'keywords': `${cert.name}, ${cert.code}, free practice test, exam questions, certification prep, quiz`,
        },
        {
          '@type': 'BreadcrumbList',
          'itemListElement': [
            { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://quizbuffet.com/' },
            { '@type': 'ListItem', 'position': 2, 'name': cert.name, 'item': `https://quizbuffet.com/${cert.slug}/` },
          ],
        },
        {
          '@type': 'FAQPage',
          'mainEntity': [
            {
              '@type': 'Question',
              'name': `What is ${cert.name}?`,
              'acceptedAnswer': { '@type': 'Answer', 'text': cert.about },
            },
            {
              '@type': 'Question',
              'name': `How many questions are on the ${cert.name} (${cert.code}) exam?`,
              'acceptedAnswer': { '@type': 'Answer', 'text': cert.details },
            },
            {
              '@type': 'Question',
              'name': `Is this ${cert.name} practice test free?`,
              'acceptedAnswer': { '@type': 'Answer', 'text': `Yes, all ${totalQ}+ practice questions are completely free. No account or sign-up required.` },
            },
          ],
        },
      ],
    });
  }

  renderAd('ad-bottom');
}
