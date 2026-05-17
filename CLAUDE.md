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

1. **Add cert metadata** at [js/data/certifications/<slug>.js](js/data/certifications/) — slug, name, code, vendor, tagline, about, details, domains (with weights from the official exam guide), affiliates. File must be pure data: `export const cert = { ... };` and **no imports** — the bundler relies on a regex match against that exact shape.
2. **Add acronyms** at [js/data/acronyms/<slug>.js](js/data/acronyms/) — `export const acronyms = [{a, d}, ...]`. Lazy-loaded by [initCertification.js](js/pages/certification/initCertification.js) via `import(\`../../data/acronyms/${cert.slug}.js\`)` — do NOT import it from the cert metadata file (would put it on the critical path).
3. **Add concepts** at [js/data/services/<slug>.js](js/data/services/) — `export const services = [{a, d}, ...]`. Same lazy-load contract as acronyms — never imported eagerly from the cert metadata file.
4. **Create empty domain JSON stubs** at `data/certifications/<slug>/<domain-slug>.json` — one per domain, minified, `questions: []`.
5. **Append the slug to [_manifest.js](js/data/certifications/_manifest.js)** in the position you want it to appear in the home cert list.
6. **Run `npm run build:certs`** (or `npm run build:seo`, which calls it first) to regenerate the bundled [js/data/certifications/index.js](js/data/certifications/index.js). `index.js` is GENERATED — never hand-edit it. Per-cert files are still the authoring source; the bundle just inlines them so the browser sees one request instead of 49.
7. **Confirm the page** at `<slug>/index.html` exists.
8. **Remove the cert from [data/coming-soon.json](data/coming-soon.json)** — as soon as work begins, it is no longer "coming soon."

Leave `data/counts.json` alone until the cert has enough questions to flip live.

---

## Workflow: filling questions for a domain

**For generating fresh batches in a separate Claude session**, paste the hardened prompt from [docs/QUESTION-PROMPT.md](docs/QUESTION-PROMPT.md) into a new chat. The prompt is preconfigured to:

- Emit ONE domain at a time and STOP, so each batch is small enough to validate before the next one is written (avoids the 300-question single-shot dumps that caused recurring schema bugs).
- Explicitly forbid the **double-wrap envelope** (`questions[0]` containing another full schema object).
- Force byte-identical `name`, `certification`, `exam_code`, and `domain` across every question in a file.
- Whitelist legitimate medical/technical lowercase-then-uppercase tokens (`pVT`, `mGy`, `kPa`, `pH`, `mRNA`, etc.) so they aren't "fixed" into broken uppercase.
- List the templated-prefix patterns and stem-stitching shapes to avoid up front.

After each domain JSON is written, run:

```bash
python3 docs/validate-domain.py data/certifications/<cert-slug>/<domain-slug>.json
```

The validator (see [docs/validate-domain.py](docs/validate-domain.py)) runs every CLAUDE.md flip-live check on the file: schema, distribution balance, sub-objective coverage, duplicate stems, duplicate answer strings, templated prefixes, broken acronyms (with the whitelist applied), stem-stitching, short explanations, and minification.

**Manual fix workflow when a batch fails validation:**

1. Generate or hand-author questions into the domain JSON.
2. Run `docs/validate-domain.py` against the file.
3. **Cleanup pass for auto-generated content** — strip templated prefixes, fix broken acronyms (skipping whitelist), collapse stem-stitching, lowercase capitalized question words after commas. Run this before the dedupe pass: collapsing redundant openers can create new duplicate stems that the dedupe pass then resolves.
4. If question openings or distractors recycle after cleanup, rewrite them in place. Preserve `id`, `correct`, `explanations`, `objective`, `difficulty`, `keyword`, and metadata exactly. Only the first sentence of `text` and recycled answer strings should change.
5. Minify and save (`json.dumps(d, separators=(',',':'), ensure_ascii=False)`).
6. Re-run the validator until it reports 0 issues.

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
4. Run `npm run build:seo` to regenerate per-cert HTML, **per-domain HTML** (one file per `<slug>/<domain-slug>/index.html`), per-cert and per-domain OG images, sitemap, llms.txt, feed.xml, `data/counts.json`, **and the root [index.html](index.html)** (the script auto-syncs the home page's title cert count, meta description, og/twitter tags, `WebApplication.offers.offerCount`, the FAQ "Which certifications does QuizBuffet cover?" answer, and the `ItemList` of all live certs — so you never have to hand-edit those blocks when adding or removing certs). The console output reports per-cert and total domain-page counts — confirm the new cert's domains all generated. Note: `build:seo` also picks up any other cert that was registered but not in counts — surface this in your report so the user knows what else flipped.
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
| `npm run build:certs` | Bundles all per-cert metadata files into `js/data/certifications/index.js` |
| `npm run build:css` | Minifies `css/style.css` → `css/style.min.css` (the file the site actually serves) |
| `npm run build:seo` | Runs `build:certs` + `build:css`, then regenerates per-cert HTML, OG images, sitemap, feed, `data/build.json` (SW version + build date for the footer stamp), and `data/counts.json` |
| `npm run check:weights` | Flags domains under-weighted vs. official exam targets |
| `npm run check:salaries` | Validates `data/salaries.json` coverage and freshness |

---

## Analytics consent (GDPR/EEA — do not regress)

Google Analytics (gtag, `G-YRKFB3WT9C`) is gated by **Consent Mode v2**. The `<head>` gtag block defines `dataLayer`/`gtag`, calls `gtag('consent','default', {... all 'denied' except security_storage, wait_for_update:500})`, restores a prior `qb_consent==='granted'` choice, *then* loads `gtag.js` and `gtag('config')`. This satisfies the EEA/UK/GDPR consent requirement and Google's EU User Consent Policy. **Never replace it with a bare `gtag('config')`** — that ships GA cookies before consent and is non-compliant.

The consent block lives in **five** places, all of which must stay in sync:

1. `scripts/build-seo.mjs` — **three** templated copies (cert, coming-soon, domain/home heads); regenerates all ~360 generated pages on `build:seo`.
2. Root `index.html` (hand-maintained — `build:seo` does not rewrite its gtag block).
3. `cpa/index.html` (hand-built hub).
4. `privacy/index.html` (hand-built policy page).

The banner UI is `js/components/consent/renderConsent.js`, rendered from `js/app.js`'s idle callback. Accept → `gtag('consent','update',{analytics_storage:'granted'})` + `localStorage.qb_consent='granted'`; Decline → stays denied. The site is analytics-only — never grant `ad_storage`/`ad_user_data`/`ad_personalization`. `/privacy/` is the policy page (footer-linked; registered in `buildSitemap()` so it survives `build:seo`) and has a "reset cookie choice" control. If you add a new hand-built top-level page that loads gtag, copy the Consent Mode block verbatim.

---

## Style rules

- **No emojis** in code, content, or commit messages unless explicitly asked.
- **No prose comments** in JSON. Comments belong in `.md` or code files only.
- One function per file in `js/`; keep files short.
- The user prefers craigslist-simple UI — no decorative additions.
- When validating, run checks programmatically (Python or Node), not by hand.
- **Never expose the contact email as visible text.** Use a `mailto:` link labeled "Contact us" / "Contact Us →" (the address may live in the `href`, never in the rendered text). Applies to new pages, the footer, and any generated/static template.
