# QuizBuffet — AI Instructions

This file tells AI assistants how to validate, update, and extend cert content. Read it before editing.

---

## Repo layout

```
data/
  certifications/<slug>/<domain-slug>.json   # question banks, ONE per exam domain
  counts.json                                # live cert -> question-count map
  coming-soon.json                           # certs with a page but no questions
  salaries.json                              # cert -> salary metadata

js/data/
  certifications/<slug>.js                   # cert metadata (name, code, domains, weights)
  certifications/index.js                    # registry: import + push every live cert
  acronyms/<slug>.js                         # acronym list rendered on the cert page
  services/<slug>.js                         # in-scope concepts/terms list

<slug>/index.html                            # the cert's static landing page
scripts/
  build-seo.mjs       # regenerates per-cert HTML, OG images, sitemap
  check-weights.mjs   # flags domains under-weighted vs. exam-guide target
  check-salaries.mjs  # validates salaries.json coverage and freshness
```

Every cert has the same set of files. The `slug` (kebab-case) is the link between them.

---

## Domain JSON schema

`data/certifications/<slug>/<domain-slug>.json` — one file per exam domain. Always **minified** on disk.

```json
{"slug":"<domain-slug>","name":"<Domain Name>","cert":"<cert-slug>","version":1,"questions":[
  {
    "id": 1,
    "certification": "<full cert name>",
    "exam_code": "<short code, e.g. CISSP>",
    "domain": "<number, e.g. 1.0>",
    "name": "<Domain Name>",
    "objective": "<sub-objective number, e.g. 1.1>",
    "keyword": "<short topic phrase>",
    "difficulty": "easy|medium|medium-hard|hard",
    "text": "<question text — usually 3 sentences: scenario, connector, prompt>",
    "answers": [
      {"id":"a","text":"..."},
      {"id":"b","text":"..."},
      {"id":"c","text":"..."},
      {"id":"d","text":"..."}
    ],
    "correct": "a|b|c|d",
    "explanations": {"a":"...","b":"...","c":"...","d":"..."}
  }
]}
```

The `objective` field renders inline as `Obj. <value>` in the question UI ([js/components/question/renderQuestion.js](js/components/question/renderQuestion.js)). Keep it short — a number is ideal.

---

## Required checks before reporting a domain JSON done

Run every check below. Do not say "done" until all pass.

### 1. Schema validity

- Valid JSON.
- Top-level keys: `slug`, `name`, `cert`, `version`, `questions`.
- Every question has all 12 required fields above.
- Every question has exactly 4 answers with `id` of `a/b/c/d`.
- Every `correct` is one of `a/b/c/d`.
- `explanations` keys are exactly `a/b/c/d`, all non-empty.
- `cert`/`exam_code`/`domain`/`name` consistent across all questions in the file.

### 2. Distribution balance

- **Difficulty** evenly split across `easy`, `medium`, `medium-hard`, `hard`.
- **Correct-answer position** evenly split across `a`, `b`, `c`, `d` (avoid positional bias).
- Every sub-objective from the official exam outline is covered.

### 3. Phrase repetition (mandatory — content fails the bar without this)

- **Question opening sentences must be unique.** No first-sentence stem (first 10 words, lowercased) may repeat across questions in the same domain.
- **Answer text must be unique.** No answer string (correct or distractor) may appear in more than one question in the same domain.
- Spot-check that correct-answer texts are not duplicated either — duplicates here usually mean the underlying meaning collapsed.

### 4. Minification

- After validation passes, write the file back minified: `json.dumps(d, separators=(',',':'), ensure_ascii=False)`.
- No pretty-printing on disk. Pretty-print during inspection only.

---

## Workflow: scaffolding a new cert

1. **Add cert metadata** at [js/data/certifications/<slug>.js](js/data/certifications/) — slug, name, code, vendor, tagline, about, details, domains (with weights from the official exam guide), affiliates.
2. **Add acronyms** at [js/data/acronyms/<slug>.js](js/data/acronyms/) — `export const acronyms = [{a, d}, ...]`.
3. **Add concepts** at [js/data/services/<slug>.js](js/data/services/) — `export const services = [{a, d}, ...]`.
4. **Create empty domain JSON stubs** at `data/certifications/<slug>/<domain-slug>.json` — one per domain, minified, `questions: []`.
5. **Wire into the registry**: import and push the cert in [js/data/certifications/index.js](js/data/certifications/index.js).
6. **Confirm the page** at `<slug>/index.html` exists.
7. **Remove the cert from [data/coming-soon.json](data/coming-soon.json)** — as soon as work begins, it is no longer "coming soon."

Leave `data/counts.json` alone until the cert has enough questions to flip live.

---

## Workflow: filling questions for a domain

1. Generate or hand-author questions into the domain JSON.
2. Run all four checks above.
3. If question openings or distractors recycle, rewrite them in place. Preserve `id`, `correct`, `explanations`, `objective`, `difficulty`, `keyword`, and metadata exactly. Only the first sentence of `text` and recycled answer strings should change.
4. Minify and save.

---

## Workflow: flipping a cert from "coming soon" to "live"

Run every step. Do not say "ready to deploy" until all of them pass.

### Pre-flight: re-validate every domain file

Before touching counts or SEO, programmatically run the four [Required checks](#required-checks-before-reporting-a-domain-json-done) across **all** domain files for the cert at once — not one file at a time. The script must report, per file:

- Schema validity (top-level keys, all 12 question fields, 4 answers with `a/b/c/d`, valid `correct`, complete `explanations`, consistent cert metadata).
- Difficulty distribution and correct-answer position distribution (both should be roughly even across `a/b/c/d` and `easy/medium/medium-hard/hard`).
- Sub-objective coverage count.
- Duplicate first-10-word stems (must be 0).
- Duplicate answer strings (must be 0).
- Minification (file is a single line; raw text equals `json.dumps(d, separators=(',',':'), ensure_ascii=False)`).

If duplicates exist, fix in place: rewrite duplicate stems by varying only the first sentence, and rewrite duplicate answer strings to preserve meaning (correct stays correct, distractor stays wrong). Preserve `id`, `correct`, `explanations`, `objective`, `difficulty`, `keyword`, and metadata exactly. Re-minify.

### Flip-live steps

1. The cert should already be out of [data/coming-soon.json](data/coming-soon.json) (removed when work began). Confirm it's not there.
2. Add `"<slug>": <total-question-count>` to [data/counts.json](data/counts.json) and update `total`, `liveCerts`, `comingSoonCerts`, `generatedAt`. (`build:seo` will also rewrite this file, but updating it first is a useful sanity check.)
3. Run `npm run check:weights`. The script will flag any domain whose declared weight in the cert metadata doesn't match the actual share of questions on disk. The usual fix is to align the declared weights in [js/data/certifications/<slug>.js](js/data/certifications/) to the actual distribution. Re-run until it passes.
4. Run `npm run build:seo` to regenerate per-cert HTML, OG images, sitemap, llms.txt, feed.xml, and `data/counts.json`. Note: `build:seo` also picks up any other cert that was registered but not in counts — surface this in your report so the user knows what else flipped.
5. Bump the service worker cache version in [sw.js](sw.js) (e.g. `qb-v106` → `qb-v107`).

### Post-flight verification

After the steps above, programmatically confirm:

- [data/counts.json](data/counts.json): `total === sum(perCert)` and `liveCerts === Object.keys(perCert).length`.
- The cert appears in [sitemap.xml](sitemap.xml) (one entry for the landing page plus one per domain quiz).
- The OG image exists at `icons/og/<slug>.svg`.
- The cert is listed in [llms.txt](llms.txt).
- The cert's slug no longer appears in [data/coming-soon.json](data/coming-soon.json).
- [sw.js](sw.js) cache version was bumped.

Only after every check passes is the cert deploy-ready.

---

## Helper scripts

| Command | What it does |
|---|---|
| `npm start` | Local static server |
| `npm run build:seo` | Regenerates per-cert HTML, OG images, sitemap, feed |
| `npm run check:weights` | Flags domains under-weighted vs. official exam targets |
| `npm run check:salaries` | Validates `data/salaries.json` coverage and freshness |

---

## Style rules

- **No emojis** in code, content, or commit messages unless explicitly asked.
- **No prose comments** in JSON. Comments belong in `.md` or code files only.
- One function per file in `js/`; keep files short.
- The user prefers craigslist-simple UI — no decorative additions.
- When validating, run checks programmatically (Python or Node), not by hand.
