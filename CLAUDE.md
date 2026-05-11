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
<slug>/<domain-slug>/index.html             # static per-domain quiz page (pre-rendered by build-seo)
icons/og/<slug>.svg                          # OG image for the cert landing page
icons/og/<slug>-<domain-slug>.svg            # OG image for each domain page
scripts/
  build-seo.mjs       # regenerates per-cert HTML, per-domain HTML, OG images, sitemap, llms.txt, feed.xml
  check-weights.mjs   # flags domains under-weighted vs. exam-guide target
  check-salaries.mjs  # validates salaries.json coverage and freshness
```

**Why per-domain HTML exists:** GitHub Pages serves `404.html` with HTTP status 404 for any path that has no static file. Without pre-rendered domain pages, every `/cert/domain/` URL in the sitemap 404s, and Google Search Console reports hundreds of "Not found (404)" and "Soft 404" errors — even though the SPA renders the quiz fine in a browser. `build:seo` solves this by generating a real static HTML file at `<slug>/<domain-slug>/index.html` for every domain of every live cert. Each page has its own title/description/canonical, BreadcrumbList + Quiz + FAQPage JSON-LD, 3 sample questions, and an `#app` mount so the SPA hydrates on click. **Never remove domain URLs from the sitemap to "fix" 404s** — re-run `build:seo` instead.

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

### 4. Question, answer, and explanation hygiene (mandatory)

Auto-generated questions consistently carry generator artifacts. Scan and fix every one of these before reporting a domain done:

- **No templated topic-tag prefixes in explanations.** Match and strip patterns like `"<Word>(-<Word>)*\s(?:review|check|note|clue|logic|tip):\s+"` (e.g., `"Scene-safety review: "`, `"Adult-CPR logic: "`, `"Hand-placement clue: "`). Strip the prefix and capitalize the first letter of what remains.
- **No broken acronyms** from lowercase-first-letter scripts: `aED → AED`, `cPR → CPR`, `pPE → PPE`, `oSHA → OSHA`, `gFCI → GFCI`, `aHA → AHA`, etc. Apply word-boundary find/replace across question text, answer text, and all four explanations.
- **No stem-stitching** in question text. Generators sometimes glue two prompts together (e.g., `"Which action best fits X? <real question>"`). Collapse to just the real question. Pattern: `^(?:Which\s+(?:action|statement|approach|option)\s+best\s+(?:fits|matches|describes|supports)[^?]+?\?)\s+(?=[A-Z])`.
- **No mid-sentence capitalized question words** after a comma intro. Lowercase `, Which/What/How/Why/When/Where/Who` after a setup phrase like `"During X, Which Y"` → `"During X, which Y"`.
- **No empty or very short explanations** (< 15 chars) after cleanup — those usually mean a prefix strip removed everything substantive.
- **Spot-check medical/technical accuracy** of correct answers and the substantive content of distractor explanations. Cross-reference the official guideline (AHA Guidelines, OSHA CFR, NEC, etc.) for the canonical fact. The cleanup pass cannot fix factual errors — those need human review.
- **Watch for scope drift.** If a question references content that belongs to a different cert (e.g., healthcare-provider pulse checks in a lay-rescuer CPR cert), flag it for the user; do not silently keep or remove.

### 5. Minification

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
2. Run all five checks above.
3. **Cleanup pass for auto-generated content** — strip templated prefixes, fix broken acronyms, collapse stem-stitching, lowercase capitalized question words after commas. Run this before the dedupe pass: collapsing redundant openers can create new duplicate stems that the dedupe pass then resolves.
4. If question openings or distractors recycle after cleanup, rewrite them in place. Preserve `id`, `correct`, `explanations`, `objective`, `difficulty`, `keyword`, and metadata exactly. Only the first sentence of `text` and recycled answer strings should change.
5. Minify and save.

---

## Workflow: flipping a cert from "coming soon" to "live"

Run every step. Do not say "ready to deploy" until all of them pass.

### Pre-flight: re-validate every domain file

Before touching counts or SEO, programmatically run the five [Required checks](#required-checks-before-reporting-a-domain-json-done) across **all** domain files for the cert at once — not one file at a time. The script must report, per file:

- Schema validity (top-level keys, all 12 question fields, 4 answers with `a/b/c/d`, valid `correct`, complete `explanations`, consistent cert metadata).
- Difficulty distribution and correct-answer position distribution (both should be roughly even across `a/b/c/d` and `easy/medium/medium-hard/hard`).
- Sub-objective coverage count.
- Duplicate first-10-word stems (must be 0).
- Duplicate answer strings (must be 0).
- Explanation hygiene: zero remaining templated topic-tag prefixes, zero broken acronyms, zero stem-stitching artifacts, zero empty/short explanations.
- Minification (file is a single line; raw text equals `json.dumps(d, separators=(',',':'), ensure_ascii=False)`).

If hygiene issues or duplicates exist, fix in place: cleanup pass first (strip prefixes, fix acronyms, collapse stitching), then dedupe pass (rewrite duplicate stems by varying only the first sentence; rewrite duplicate answer strings preserving meaning so correct stays correct and distractors stay wrong). Preserve `id`, `correct`, `explanations`, `objective`, `difficulty`, `keyword`, and metadata exactly. Re-minify.

### Flip-live steps

1. The cert should already be out of [data/coming-soon.json](data/coming-soon.json) (removed when work began). Confirm it's not there.
2. Add `"<slug>": <total-question-count>` to [data/counts.json](data/counts.json) and update `total`, `liveCerts`, `comingSoonCerts`, `generatedAt`. (`build:seo` will also rewrite this file, but updating it first is a useful sanity check.)
3. Run `npm run check:weights`. The script will flag any domain whose declared weight in the cert metadata doesn't match the actual share of questions on disk. The usual fix is to align the declared weights in [js/data/certifications/<slug>.js](js/data/certifications/) to the actual distribution. Re-run until it passes.
4. Run `npm run build:seo` to regenerate per-cert HTML, **per-domain HTML** (one file per `<slug>/<domain-slug>/index.html`), per-cert and per-domain OG images, sitemap, llms.txt, feed.xml, and `data/counts.json`. The console output reports both per-cert and total domain-page counts — confirm the new cert's domains all generated. Note: `build:seo` also picks up any other cert that was registered but not in counts — surface this in your report so the user knows what else flipped.
5. Bump the service worker cache version in [sw.js](sw.js) (e.g. `qb-v106` → `qb-v107`).

### Post-flight verification

After the steps above, programmatically confirm:

- [data/counts.json](data/counts.json): `total === sum(perCert)` and `liveCerts === Object.keys(perCert).length`.
- The cert appears in [sitemap.xml](sitemap.xml) (one entry for the landing page plus one per domain quiz).
- The cert OG image exists at `icons/og/<slug>.svg`.
- **Every domain has a static HTML file** at `<slug>/<domain-slug>/index.html` and a matching OG image at `icons/og/<slug>-<domain-slug>.svg`. A missing domain HTML file means that URL will 404 on Google and tank SEO — re-run `build:seo` if any are missing.
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
