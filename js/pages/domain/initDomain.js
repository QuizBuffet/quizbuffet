// Entry point for the domain route — shows progress, stats, and action buttons for a single domain
import { renderAd } from '../../components/ad/renderAd.js';
import { loadDomain } from '../../loader/loadDomain.js';
import { certifications } from '../../data/certifications/index.js';
import { getDomainProgress } from '../../storage/getDomainProgress.js';
import { getRouteParams } from '../../router/initRouter.js';
import { renderDomainHeader } from './renderDomainHeader.js';
import { renderDomainProgress } from './renderDomainProgress.js';
import { renderDomainActions } from './renderDomainActions.js';
import { renderSessionSizePicker } from '../certification/renderSessionSizePicker.js';
import { renderDifficultyPicker } from './renderDifficultyPicker.js';
import { renderSessionHistory } from './renderSessionHistory.js';
import { renderWeakSpots } from './renderWeakSpots.js';
import { setMeta } from '../../components/meta/setMeta.js';
import { setJsonLd } from '../../components/meta/setJsonLd.js';

export async function init() {
  renderAd('ad-top');
  const { cert: certSlug, domain: domainSlug } = getRouteParams();
  const storageKey = certSlug ? `${certSlug}--${domainSlug}` : domainSlug;

  const certMeta   = certifications.find(c => c.slug === certSlug);
  const domainMeta = certMeta?.domains.find(d => d.slug === domainSlug);
  const certBack   = certSlug ? `/${certSlug}/` : '/';
  const quizUrl    = `/${certSlug}/${domainSlug}/quiz/`;

  if (!certMeta || !domainMeta) {
    document.getElementById('domain-header').innerHTML = `<p>Domain not found. <a href="${certBack}">← Back</a></p>`;
    setJsonLd(null);
    renderAd('ad-bottom');
    return;
  }

  const questions = await loadDomain(certSlug, domainSlug, certMeta);

  setMeta(
    `${domainMeta.name} — ${certMeta.name} (${certMeta.code}) Free Practice Test`,
    `${questions.length} free ${domainMeta.name} practice questions for ${certMeta.name} (${certMeta.code}). Instant feedback, progress tracking, and explanations — no account needed.`
  );
  setJsonLd({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['Quiz', 'LearningResource'],
        'name': `${domainMeta.name} — ${certMeta.name} Free Practice Quiz`,
        'description': `${questions.length} free ${domainMeta.name} practice questions for the ${certMeta.name} (${certMeta.code}) exam. Instant feedback, progress tracking, and explanations.`,
        'url': `https://quizbuffet.com/${certSlug}/${domainSlug}/`,
        'numberOfQuestions': questions.length,
        'educationalLevel': 'Professional',
        'learningResourceType': 'Practice Quiz',
        'teaches': domainMeta.name,
        'about': [
          { '@type': 'Thing', 'name': certMeta.name },
          { '@type': 'Thing', 'name': domainMeta.name },
        ],
        'provider': { '@type': 'EducationalOrganization', 'name': 'QuizBuffet', 'url': 'https://quizbuffet.com' },
        'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'USD', 'availability': 'https://schema.org/InStock' },
        'keywords': `${domainMeta.name}, ${certMeta.name}, ${certMeta.code}, free practice test, exam questions`,
      },
      {
        '@type': 'BreadcrumbList',
        'itemListElement': [
          { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://quizbuffet.com/' },
          { '@type': 'ListItem', 'position': 2, 'name': certMeta.name, 'item': `https://quizbuffet.com/${certSlug}/` },
          { '@type': 'ListItem', 'position': 3, 'name': domainMeta.name, 'item': `https://quizbuffet.com/${certSlug}/${domainSlug}/` },
        ],
      },
    ],
  });
  const prog      = getDomainProgress(storageKey);

  renderDomainHeader(certMeta, domainMeta, certBack);
  renderDomainProgress(prog, questions.length);
  renderSessionSizePicker(() => {});
  renderDifficultyPicker();
  renderDomainActions(storageKey, prog, questions, quizUrl);
  renderSessionHistory(storageKey);
  renderWeakSpots(storageKey, questions);
  renderAd('ad-bottom');
}
