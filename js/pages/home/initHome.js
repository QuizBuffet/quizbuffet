// Entry point for the home route — wires search input to cert list filter
import { renderHero } from './renderHero.js';
import { renderFeatured } from './renderFeatured.js';
import { renderHomeSponsor } from './renderHomeSponsor.js';
import { renderComingSoonMarquee } from './renderComingSoonMarquee.js';
import { renderCertList } from './renderCertList.js';
import { renderAd } from '../../components/ad/renderAd.js';
import { renderTotalBadge } from '../../components/totalBadge/renderTotalBadge.js';
import { certifications } from '../../data/certifications/index.js';
import { setMeta } from '../../components/meta/setMeta.js';
import { setJsonLd } from '../../components/meta/setJsonLd.js';
import { initFloatingEmoji } from '../../components/floatingEmoji/floatingEmoji.js';
import { loadComingSoon } from '../../data/comingSoon/loadComingSoon.js';

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

  const comingSoon = await loadComingSoon();

  renderComingSoonMarquee(comingSoon);
  renderHero(comingSoon, filter => renderCertList(certifications, comingSoon, filter));
  renderHomeSponsor();
  renderFeatured(null, certifications);
  renderAd('ad-top');
  renderTotalBadge('total-badge');
  renderCertList(certifications, comingSoon);
  renderAd('ad-bottom');
  initFloatingEmoji();
}
