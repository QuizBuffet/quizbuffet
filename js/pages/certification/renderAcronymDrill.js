// Acronym matching game — pick 5 acronyms, show 10 definitions (5 correct + 5 distractors)
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const ROUND  = 5;   // acronyms per round
const EXTRA  = 5;   // distractor definitions

export function renderAcronymDrill(cert) {
  const el = document.getElementById('acronym-drill');
  if (!el || !cert.acronyms || cert.acronyms.length < ROUND + EXTRA) return;

  const pool = shuffle([...cert.acronyms]);
  let poolIdx = 0;
  let targets = [];
  let choices = [];
  let matched = new Set(); // indices into targets[]
  let selected = null;     // index into targets[], or null
  let wrongThisRound = 0;
  let score = { rounds: 0, perfect: 0 };

  function loadRound() {
    if (poolIdx + ROUND > pool.length) { shuffle(pool); poolIdx = 0; }
    targets = pool.slice(poolIdx, poolIdx + ROUND);
    poolIdx += ROUND;
    const targetDefs = new Set(targets.map(x => x.d));
    const extras = shuffle(pool.filter(x => !targetDefs.has(x.d))).slice(0, EXTRA);
    choices  = shuffle([...targets, ...extras]);
    matched  = new Set();
    selected = null;
    wrongThisRound = 0;
  }

  function render() {
    const done = matched.size === ROUND;
    el.innerHTML = `
      <h3 class="acronym-toggle">Acronym Match</h3>
      ${renderBody(done)}`;
    bind(done);
  }

  function renderBody(done) {
    if (done) {
      return `
        <div class="acr-wrap">
          <p class="acr-result">${wrongThisRound === 0 ? '★ Perfect round!' : '✓ Round complete'}</p>
          <p class="acr-score-line">${score.perfect} perfect · ${score.rounds} round${score.rounds !== 1 ? 's' : ''}</p>
          <button class="random-btn" id="acr-next">Next round →</button>
        </div>`;
    }

    const remaining = ROUND - matched.size;
    const hint = selected !== null
      ? `Match <strong>${targets[selected].a}</strong> — choose its definition below`
      : `${remaining} left · tap an acronym, then its definition`;

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
      document.getElementById('acr-next')?.addEventListener('click', () => { loadRound(); render(); });
      return;
    }

    document.querySelectorAll('.acr-term').forEach(btn => {
      btn.addEventListener('click', () => {
        const i = parseInt(btn.dataset.i);
        selected = selected === i ? null : i; // toggle off if tapped again
        document.querySelectorAll('.acr-term').forEach(b => {
          b.classList.toggle('selected', parseInt(b.dataset.i) === selected && !matched.has(parseInt(b.dataset.i)));
        });
        document.querySelector('.acr-hint').innerHTML = selected !== null
          ? `Match <strong>${targets[selected].a}</strong> — choose its definition below`
          : `${ROUND - matched.size} left · tap an acronym, then its definition`;
      });
    });

    document.querySelectorAll('.acr-def').forEach(btn => {
      btn.addEventListener('click', () => {
        if (selected === null || btn.disabled) return;
        const ci = parseInt(btn.dataset.ci);
        if (targets[selected].d === choices[ci].d) {
          matched.add(selected);
          const ti = selected;
          selected = null;
          // lock both matched items in-place without a full re-render
          document.querySelector(`.acr-term[data-i="${ti}"]`).classList.remove('selected');
          document.querySelector(`.acr-term[data-i="${ti}"]`).classList.add('matched');
          document.querySelector(`.acr-term[data-i="${ti}"]`).disabled = true;
          btn.classList.add('matched');
          btn.disabled = true;
          if (matched.size === ROUND) {
            score.rounds++;
            if (wrongThisRound === 0) score.perfect++;
            render(); // show done screen
          } else {
            document.querySelector('.acr-hint').innerHTML =
              `${ROUND - matched.size} left · tap an acronym, then its definition`;
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
