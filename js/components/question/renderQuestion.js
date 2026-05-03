import { getFlaggedQuestions } from '../../storage/getFlaggedQuestions.js';
import { toggleFlag } from '../../storage/toggleFlag.js';

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function codeBlock(code) {
  return code ? `<pre class="q-code">${escapeHtml(code)}</pre>` : '';
}

export function renderQuestion(question, onAnswer, storageKey) {
  const diff = question.difficulty || '';
  const badge       = diff ? `<span class="badge-difficulty badge-${diff}">${diff}</span>` : '';
  const domainBadge = question._domainName ? `<span class="badge-domain">${question._domainName}</span>` : '';
  const objBadge    = question.objective   ? `<span class="badge-objective">Obj. ${question.objective}</span>` : '';
  const flagged = storageKey && getFlaggedQuestions(storageKey).includes(question.id);

  document.getElementById('question').innerHTML =
    `<div class="question-header">
      <div class="question-badges">${domainBadge}${objBadge}${badge}</div>
      <div class="question-header-right">
        <span class="question-id">#${question.id}</span>
        <button class="flag-btn${flagged ? ' flagged' : ''}" id="flag-btn" title="Flag for review" aria-label="${flagged ? 'Unflag question' : 'Flag question for review'}" aria-pressed="${flagged}">&#9873;</button>
      </div>
    </div>
    <p class="question-text">${question.text}</p>
    ${codeBlock(question.code)}`;

  document.getElementById('answers').innerHTML = question.answers
    .map(a => `<button class="answer-btn" data-id="${a.id}" aria-label="Answer ${a.id.toUpperCase()}: ${a.text}">
      <span>${a.id.toUpperCase()}. ${a.text}${a.code ? `<pre class="q-code q-code-answer">${escapeHtml(a.code)}</pre>` : ''}</span>
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
