import { renderStorageStats } from './renderStorageStats.js';
import { renderStorageView } from './renderStorageView.js';
import { renderResetButtons } from './renderResetButtons.js';
import { setMeta } from '../../components/meta/setMeta.js';

export function init() {
  setMeta('Your Progress', 'Track your quiz scores and progress across all cybersecurity certification domains on QuizBuffet.', { noindex: true });

  function render() {
    renderStorageStats();
    renderStorageView(render);
    renderResetButtons(render);
  }

  render();
}
