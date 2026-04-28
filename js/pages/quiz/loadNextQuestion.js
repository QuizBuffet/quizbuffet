// Advances through the session queue — called recursively via handleAnswer callback until queue is exhausted
import { renderQuestion } from '../../components/question/renderQuestion.js';
import { renderResults } from './renderResults.js';
import { handleAnswer } from './handleAnswer.js';

export function loadNextQuestion(queue, index, domainSlug, domainName, backLink, totalCount) {
  if (index >= queue.length) {
    renderResults(queue, domainSlug, backLink, totalCount);
    return;
  }

  const remaining = queue.length - index;
  document.getElementById('quiz-meta').innerHTML =
    `<span>${domainName} · ${remaining} question${remaining !== 1 ? 's' : ''} remaining</span>
     <span class="kbd-hint">1–4 or A–D to answer · Enter / Space to advance</span>`;

  const mid = document.getElementById('ad-mid');
  if (mid) mid.style.display = 'none';
  document.getElementById('explanation').innerHTML = '';

  const q = queue[index];
  renderQuestion(q, chosen =>
    handleAnswer(q, chosen, domainSlug, totalCount, () =>
      loadNextQuestion(queue, index + 1, domainSlug, domainName, backLink, totalCount),
      q._storageKey  // per-question domain key for saves; undefined = same as session key
    ),
    domainSlug
  );
}
