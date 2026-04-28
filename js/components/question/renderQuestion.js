import { getFlaggedQuestions } from '../../storage/getFlaggedQuestions.js';
import { toggleFlag } from '../../storage/toggleFlag.js';

export function renderQuestion(question, onAnswer, storageKey) {
  const diff = question.difficulty || '';
  const badge = diff ? `<span class="badge-difficulty badge-${diff}">${diff}</span>` : '';
  const domainBadge = question._domainName ? `<span class="badge-domain">${question._domainName}</span>` : '';
  const flagged = storageKey && getFlaggedQuestions(storageKey).includes(question.id);

  document.getElementById('question').innerHTML =
    `<div class="question-header">
      <div class="question-badges">${badge}${domainBadge}</div>
      <button class="flag-btn${flagged ? ' flagged' : ''}" id="flag-btn" title="Flag for review" aria-label="${flagged ? 'Unflag question' : 'Flag question for review'}" aria-pressed="${flagged}">&#9873;</button>
    </div>
    <p class="question-text">${question.text}</p>`;

  document.getElementById('answers').innerHTML = question.answers
    .map(a => `<button class="answer-btn" data-id="${a.id}" aria-label="Answer ${a.id.toUpperCase()}: ${a.text}">
      <span>${a.id.toUpperCase()}. ${a.text}</span>
      <kbd class="answer-key">${a.id.toUpperCase()}</kbd>
    </button>`)
    .join('');

  document.querySelectorAll('.answer-btn').forEach(btn => {
    btn.addEventListener('click', () => onAnswer(btn.dataset.id));
  });

  if (storageKey) {
    document.getElementById('flag-btn').addEventListener('click', () => {
      const nowFlagged = toggleFlag(storageKey, question.id);
      const btn = document.getElementById('flag-btn');
      btn.classList.toggle('flagged', nowFlagged);
      btn.setAttribute('aria-label', nowFlagged ? 'Unflag question' : 'Flag question for review');
      btn.setAttribute('aria-pressed', nowFlagged);
    });
  }
}
