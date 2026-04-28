// Entry point for the home route — wires search input to cert list filter
import { renderFeatured } from './renderFeatured.js';
import { renderRandomBtn } from './renderRandomBtn.js';
import { renderSearch } from './renderSearch.js';
import { renderCertList } from './renderCertList.js';
import { renderAd } from '../../components/ad/renderAd.js';
import { certifications } from '../../data/certifications/index.js';
import { setMeta } from '../../components/meta/setMeta.js';
import { setJsonLd } from '../../components/meta/setJsonLd.js';

export function init() {
  setMeta(
    'Free CompTIA Practice Tests — Security+, Network+, A+, CySA+, PenTest+, Cloud+',
    'Free CompTIA practice tests for Security+, Network+, A+, CySA+, PenTest+, Cloud+, Data+, and ITF+. Domain-by-domain quizzes with instant feedback and progress tracking. No account needed.'
  );
  setJsonLd({
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': 'QuizBuffet',
    'url': 'https://quizbuffet.com',
    'description': 'Free CompTIA certification practice tests for Security+, Network+, A+, CySA+, PenTest+, Cloud+, Data+, and ITF+. Domain-organized quizzes with instant feedback and progress tracking.',
    'applicationCategory': 'EducationalApplication',
    'operatingSystem': 'Any',
    'featureList': 'Domain-by-domain quizzes, progress tracking, instant feedback, explanations, no account required',
    'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'USD', 'availability': 'https://schema.org/InStock' },
    'provider': { '@type': 'EducationalOrganization', 'name': 'QuizBuffet', 'url': 'https://quizbuffet.com' },
  });
  renderFeatured({ name: certifications[0].name, slug: `/cert?cert=${certifications[0].slug}`, description: certifications[0].tagline });
  renderAd('ad-top');
  renderRandomBtn();
  renderSearch(filter => renderCertList(certifications, filter));
  renderCertList(certifications);
  renderAd('ad-bottom');
}
