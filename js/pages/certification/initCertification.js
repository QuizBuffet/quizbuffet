// Entry point for the cert route — resolves cert from hash param and renders all sections
import { renderAd } from '../../components/ad/renderAd.js';
import { certifications } from '../../data/certifications/index.js';
import { renderCertHeader } from './renderCertHeader.js';
import { renderCertDomainList } from './renderCertDomainList.js';
import { renderCertProgressSummary } from './renderCertProgressSummary.js';
import { renderAcronymDrill } from './renderAcronymDrill.js';
import { renderSessionSizePicker } from './renderSessionSizePicker.js';
import { renderMixQuizBtn } from './renderMixQuizBtn.js';
import { getHashParams } from '../../router/hashRouter.js';
import { setMeta } from '../../components/meta/setMeta.js';
import { setJsonLd } from '../../components/meta/setJsonLd.js';

export function init() {
  renderAd('ad-top');
  const certSlug = getHashParams().get('cert') || '';
  const cert = certifications.find(c => c.slug === certSlug);

  if (!cert) {
    document.getElementById('cert-header').innerHTML = '<p>Certification not found. <a href="/">← Home</a></p>';
    setJsonLd(null);
  } else {
    const totalQ = cert.questions
      ? cert.questions.length
      : cert.domains.reduce((s, d) => s + d.count, 0);
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
    renderCertHeader(cert);
    renderCertProgressSummary(cert);
    renderSessionSizePicker(() => {});
    renderMixQuizBtn(cert);
    renderCertDomainList(cert);
    renderAcronymDrill(cert);
  }

  renderAd('ad-bottom');
}
