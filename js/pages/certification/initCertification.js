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
import { getHashParams } from '../../router/hashRouter.js';
import { setMeta } from '../../components/meta/setMeta.js';
import { setJsonLd } from '../../components/meta/setJsonLd.js';
import { affiliateLinksHTML } from '../../components/affiliates/affiliateLinksHTML.js';

export async function init() {
  renderAd('ad-top');
  const certSlug = getHashParams().get('cert') || '';
  const cert = certifications.find(c => c.slug === certSlug);

  if (!cert) {
    document.getElementById('cert-header').innerHTML = '<p>Certification not found. <a href="/">← Home</a></p>';
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
      '@type': 'Course',
      'name': `${cert.name} (${cert.code}) Free Practice Test`,
      'courseCode': cert.code,
      'description': cert.about || `Free ${cert.name} exam practice questions organized by domain. Quiz yourself on every topic until you're ready to pass.`,
      'url': `https://quizbuffet.com/cert?cert=${cert.slug}`,
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
    });
  }

  renderAd('ad-bottom');
}
