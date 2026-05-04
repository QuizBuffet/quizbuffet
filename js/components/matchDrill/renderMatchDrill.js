// Generic matching game — pick N items, show N + EXTRA choices (definitions/purposes).
// Used by both Acronym Match and Service Match. Each item is {a, d}: term and what to match it to.
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const ROUND = 5;
const EXTRA = 5;

export function renderMatchDrill({ mountId, heading, items, hintNoun = 'term' }) {
  const el = document.getElementById(mountId);
  if (!el || !items || items.length < ROUND + EXTRA) return;

  const pool = shuffle([...items]);
  let poolIdx = 0;
  let targets = [];
  let choices = [];
  let matched = new Set();
  let selected = null;
  let wrongThisRound = 0;
  let score = { rounds: 0, perfect: 0 };

  function loadRound() {
    if (poolIdx + ROUND > pool.length) { shuffle(pool); poolIdx = 0; }
    targets = pool.slice(poolIdx, poolIdx + ROUND);
    poolIdx += ROUND;
    const targetDefs = new Set(targets.map(x => x.d));
    const extras = shuffle(pool.filter(x => !targetDefs.has(x.d))).slice(0, EXTRA);
    choices = shuffle([...targets, ...extras]);
    matched = new Set();
    selected = null;
    wrongThisRound = 0;
  }

  function render() {
    const done = matched.size === ROUND;
    el.innerHTML = `<h3 class="acronym-toggle">${heading}</h3>${renderBody(done)}`;
    bind(done);
  }

  function renderBody(done) {
    if (done) {
      return `
        <div class="acr-wrap">
          <p class="acr-result">${wrongThisRound === 0 ? '★ Perfect round!' : '✓ Round complete'}</p>
          <p class="acr-score-line">${score.perfect} perfect · ${score.rounds} round${score.rounds !== 1 ? 's' : ''}</p>
          <button class="random-btn" data-next>Next round →</button>
        </div>`;
    }

    const remaining = ROUND - matched.size;
    const hint = selected !== null
      ? `Match <strong>${targets[selected].a}</strong> — choose its match below`
      : `${remaining} left · tap a ${hintNoun}, then its match`;

    const termBtns = targets.map((t, i) => {
      const cls = matched.has(i) ? ' matched' : selected === i ? ' selected' : '';
      return `<button class="acr-term${cls}" data-i="${i}"${matched.has(i) ? ' disabled' : ''}>${t.a}</button>`;
    }).join('');

    const defBtns = choices.map((c, ci) => {
      const isMatched = [...matched].some(ti => targets[ti].d === c.d);
      return `<button class="acr-def${isMatched ? ' matched' : ''}" data-ci="${ci}"${isMatched ? ' disabled' : ''}>${c.d}</button>`;
    }).join('');

    return `
      <div class="acr-wrap">
        <p class="acr-hint">${hint}</p>
        <div class="acr-terms">${termBtns}</div>
        <div class="acr-defs">${defBtns}</div>
      </div>`;
  }

  function bind(done) {
    if (done) {
      el.querySelector('[data-next]')?.addEventListener('click', () => { loadRound(); render(); });
      return;
    }

    el.querySelectorAll('.acr-term').forEach(btn => {
      btn.addEventListener('click', () => {
        const i = parseInt(btn.dataset.i);
        selected = selected === i ? null : i;
        el.querySelectorAll('.acr-term').forEach(b => {
          b.classList.toggle('selected', parseInt(b.dataset.i) === selected && !matched.has(parseInt(b.dataset.i)));
        });
        el.querySelector('.acr-hint').innerHTML = selected !== null
          ? `Match <strong>${targets[selected].a}</strong> — choose its match below`
          : `${ROUND - matched.size} left · tap a ${hintNoun}, then its match`;
      });
    });

    el.querySelectorAll('.acr-def').forEach(btn => {
      btn.addEventListener('click', () => {
        if (selected === null || btn.disabled) return;
        const ci = parseInt(btn.dataset.ci);
        if (targets[selected].d === choices[ci].d) {
          matched.add(selected);
          const ti = selected;
          selected = null;
          const tEl = el.querySelector(`.acr-term[data-i="${ti}"]`);
          tEl.classList.remove('selected');
          tEl.classList.add('matched');
          tEl.disabled = true;
          btn.classList.add('matched');
          btn.disabled = true;
          if (matched.size === ROUND) {
            score.rounds++;
            if (wrongThisRound === 0) score.perfect++;
            render();
          } else {
            el.querySelector('.acr-hint').innerHTML =
              `${ROUND - matched.size} left · tap a ${hintNoun}, then its match`;
          }
        } else {
          wrongThisRound++;
          btn.classList.add('wrong');
          setTimeout(() => btn.classList.remove('wrong'), 500);
        }
      });
    });
  }

  loadRound();
  render();
}
