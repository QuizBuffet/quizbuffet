// Entry point for the home route — wires search input to cert list filter
import { renderFeatured } from './renderFeatured.js';
import { renderRandomBtn } from './renderRandomBtn.js';
import { renderSearch } from './renderSearch.js';
import { renderCertList } from './renderCertList.js';
import { renderAd } from '../../components/ad/renderAd.js';
import { certifications } from '../../data/certifications/index.js';
import { setMeta } from '../../components/meta/setMeta.js';
import { setJsonLd } from '../../components/meta/setJsonLd.js';

export async function init() {
  setMeta(
    'Free Practice Tests for IT, Cloud, Cybersecurity, Healthcare, Trades & More',
    'Free, no-account practice tests for CompTIA, AWS, Azure, Cisco, CISSP, OSHA, CDL, FAA Part 107, EMT, CNA, Real Estate, ServSafe, and dozens more high-demand certifications. Domain-by-domain quizzes with instant feedback.'
  );
  setJsonLd({
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': 'QuizBuffet',
    'url': 'https://quizbuffet.com',
    'description': 'Free practice tests for high-demand IT, cybersecurity, cloud, healthcare, trades, transportation, and finance certifications. Domain-organized quizzes with instant feedback and progress tracking. No account required.',
    'applicationCategory': 'EducationalApplication',
    'operatingSystem': 'Any',
    'featureList': 'Domain-by-domain quizzes, progress tracking, instant feedback, explanations, no account required',
    'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'USD', 'availability': 'https://schema.org/InStock' },
    'provider': { '@type': 'EducationalOrganization', 'name': 'QuizBuffet', 'url': 'https://quizbuffet.com' },
  });

  let comingSoon = [];
  try {
    const res = await fetch('/data/coming-soon.json');
    if (res.ok) comingSoon = await res.json();
  } catch (_) {}

  renderFeatured({ name: certifications[0].name, slug: `/${certifications[0].slug}/`, description: certifications[0].tagline });
  renderAd('ad-top');
  renderRandomBtn();
  renderSearch(filter => renderCertList(certifications, comingSoon, filter));
  renderCertList(certifications, comingSoon);
  renderAd('ad-bottom');
}
