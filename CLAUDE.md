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
  certifications/<slug>.js                   # cert metadata (name, code, domains, weights, faq, exam, ...) — the authoring source, always full
  certifications/index.js                    # GENERATED, light: only slug/name/code/vendor/category/tagline/domains, eager on every page
  certifications/full/<slug>.js              # GENERATED, heavy: about/details/officialSources/affiliates/udemyCourseUrl/extraUdemyCourses, lazy-loaded only on that cert's own page
  acronyms/<slug>.js                         # acronym list rendered on the cert page
  services/<slug>.js                         # in-scope concepts/terms list

<slug>/index.html                            # the cert's static landing page
<slug>/<domain-slug>/index.html             # static per-domain quiz page (pre-rendered by build-seo)
icons/og/<slug>.svg                          # OG image SOURCE for the cert landing page (not linked from any page)
icons/og/<slug>.png                          # OG image actually referenced by og:image/twitter:image (SVG isn't rendered by any share-preview crawler)
icons/og/<slug>-<domain-slug>.svg            # OG image SOURCE for each domain page
icons/og/<slug>-<domain-slug>.png            # OG image actually referenced for the domain page
data/og-png-cache.json                       # GENERATED: SVG content hash -> already-rendered, so unchanged OG images skip PNG re-encoding on every build
scripts/
  build-seo.mjs       # regenerates per-cert HTML, per-domain HTML, OG PNGs, sitemap, llms.txt, feed.xml. Reads cert data from the per-cert SOURCE files directly (js/data/certifications/<slug>.js), not the light index.js, since it needs every field for every cert
  build-certs.mjs     # regenerates js/data/certifications/index.js (light) and full/<slug>.js (heavy) from the per-cert source files
  check-weights.mjs   # flags domains under-weighted vs. exam-guide target
  check-salaries.mjs  # validates salaries.json coverage and freshness
  check-seo-duplicates.mjs  # flags exact-duplicate <title>/meta description across generated pages
  check-canonicals.mjs      # validates every generated page has one self-referential, unique canonical
```

**The `certifications/index.js` split (added when the bundle grew to 226 KB / 51 KB gzipped and was loaded eagerly on every page, including the 271 domain pages that never read any of it):** `index.js` only carries the fields every page needs while scanning ALL certs at once (home grid, nav domain count, related-certs matching, progress views). Everything else — `about`, `details`, `officialSources`, `affiliates`, `udemyCourseUrl`, `extraUdemyCourses` — only gets read once a page has narrowed to ONE specific cert, so it lives in `certifications/full/<slug>.js` instead, lazy-loaded exactly like `acronyms/<slug>.js`/`services/<slug>.js` (see `initCertification.js` and `certPreview.js`). `exam`, `faq`, `guide`, and the `seo*` override fields below are read only by `build-seo.mjs` at build time and never by any browser file, so they are never duplicated into either generated bundle at all. **If you add a new field to a cert's `<slug>.js` and a browser-side component needs to read it, add the field name to `LIGHT_FIELDS` or `FULL_FIELDS` in `build-certs.mjs`** — otherwise it silently never reaches the file that component imports, even though it's sitting right there in the source file.

**Why per-domain HTML exists:** GitHub Pages serves `404.html` with HTTP status 404 for any path that has no static file. Without pre-rendered domain pages, every `/cert/domain/` URL in the sitemap 404s, and Google Search Console reports hundreds of "Not found (404)" and "Soft 404" errors — even though the SPA renders the quiz fine in a browser. `build:seo` solves this by generating a real static HTML file at `<slug>/<domain-slug>/index.html` for every domain of every live cert. Each page has its own title/description/canonical, BreadcrumbList + Quiz + FAQPage JSON-LD, 3 sample questions, and an `#app` mount so the SPA hydrates on click. **Never remove domain URLs from the sitemap to "fix" 404s** — re-run `build:seo` instead.

**Never eagerly hide `#seo-static` in a new page template.** Cert and domain pages carry real, crawlable content in `<section id="seo-static">` for SEO and no-JS visitors, hidden by `css/style.css`'s `html.js #seo-static{display:none}` once the SPA has real content of its own to show in the empty `<div id="app">` sibling. The class add (`document.documentElement.classList.add('js')`) happens in `initCertification.js`/`initDomain.js`, right after each page's first real write to `#app` — **not** in the page's `<head>` script. Adding it eagerly in `<head>` (as it used to be, and as `buildComingSoonHtml`'s template still does, where it's a no-op since `html.js[data-coming-soon] #seo-static{display:block}` cancels the hide) hides the fast, real content before the SPA has anything to replace it with, leaving a blank page for as long as the JS bundle takes to boot — confirmed via Lighthouse to cost several seconds of LCP on both page types, since it also means Google's Core Web Vitals field data ends up measuring the site's LCP against the cookie-consent banner instead of any real content. If you add a new page template that reads real page content into `#seo-static`, add the `classList.add('js')` call to that page's own `init()` the same way, right after its own first real `#app` write, not to its `<head>` script.

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

1. **Add cert metadata** at [js/data/certifications/<slug>.js](js/data/certifications/) — slug, name, code, vendor, tagline, about, details, domains (with weights from the official exam guide), affiliates, and optionally `faq` (see "FAQ field" below), `exam` (see "Exam at a Glance" below), `officialSources`, `udemyCourseUrl`/`extraUdemyCourses`, `guide`, and the `seoName`/`seoTitle`/`seoH1`/`seoDescription` title/H1 overrides (used only by `build-seo.mjs` at build time; see the `codeTag`/title-tiering logic in `buildCertHtml` before assuming a plain string is enough — long names need the tiered-fallback treatment already there). File must be pure data: `export const cert = { ... };` and **no imports** — `build-certs.mjs` dynamically imports it and reads `.cert` directly, so any field you add is visible to that script immediately, but reaching a **browser-side** component still requires listing the field in `LIGHT_FIELDS` or `FULL_FIELDS` in `build-certs.mjs` (see the repo layout section above).
2. **Add acronyms** at [js/data/acronyms/<slug>.js](js/data/acronyms/) — `export const acronyms = [{a, d}, ...]`. Lazy-loaded by [initCertification.js](js/pages/certification/initCertification.js) via `import(\`../../data/acronyms/${cert.slug}.js\`)` — do NOT import it from the cert metadata file (would put it on the critical path).
3. **Add concepts** at [js/data/services/<slug>.js](js/data/services/) — `export const services = [{a, d}, ...]`. Same lazy-load contract as acronyms — never imported eagerly from the cert metadata file.
4. **Create empty domain JSON stubs** at `data/certifications/<slug>/<domain-slug>.json` — one per domain, minified, `questions: []`.
5. **Append the slug to [_manifest.js](js/data/certifications/_manifest.js)** in the position you want it to appear in the home cert list.
6. **Run `npm run build:certs`** (or `npm run build:seo`, which calls it first) to regenerate [js/data/certifications/index.js](js/data/certifications/index.js) (light, all certs) and `js/data/certifications/full/<slug>.js` (heavy, this one cert). Both are GENERATED — never hand-edit either. Per-cert files are still the authoring source.
7. **Confirm the page** at `<slug>/index.html` exists.
8. **Remove the cert from [data/coming-soon.json](data/coming-soon.json)** — as soon as work begins, it is no longer "coming soon."

Leave `data/counts.json` alone until the cert has enough questions to flip live.

### FAQ field (search-intent Q&A for SEO)

A cert may optionally define a `faq` array on its metadata. This is the lever for winning Google "People also ask" placements and informational queries — author the **real questions people search** (check the cert's "People also ask" box in a Google SERP and the Search Console query list), not exam-bank questions.

```js
faq: [
  { q: 'How hard is the <exam> exam?', a: 'Plain-English answer, 1-3 sentences.' },
  // ...
],
```

How it's wired in [scripts/build-seo.mjs](scripts/build-seo.mjs):

- `pickFaqQuestions(cert)` **prefers `cert.faq`** when present (maps `{q,a}` → `{question,answer}`); otherwise it falls back to seeding the `FAQPage` JSON-LD from easy exam questions (schema only, not rendered).
- When `cert.faq` exists, `buildFaqHtml` renders a **visible** FAQ section inside `.cert-guide-content`, and the same Q&A seeds the `FAQPage` JSON-LD — so the visible text matches the schema (Google's requirement for FAQ/PAA eligibility). Certs without `cert.faq` render no visible FAQ block.

Authoring rules:

- **Answers must be accurate.** Cross-reference passing scores, question counts, validity periods, and prerequisites against the official source. Spot-check medical/technical facts (same bar as question content).
- **Speak to the reader** (second person) and **no em-dashes** (see [[feedback_no_em_dashes]] in style rules — use commas/periods/parens).
- 6-8 questions is a good range. Lead with the highest-intent queries (difficulty, question count, passing score, "is it worth it", validity).
- After editing, run `npm run build:seo` and confirm the visible `<section class="cert-faq">` and the `FAQPage` JSON-LD both carry the authored questions.

### Exam field ("Exam at a Glance" table)

A cert may optionally define an `exam` object on its metadata. When present, `build-seo.mjs` renders a visible `<table class="cert-exam-table">` on the cert landing page with whichever of these keys are set (any can be omitted; the row is skipped rather than shown empty): `questions`, `minutes` (rendered as "`<minutes>` minutes"), `passing`, `cost`, `delivery`, `validity`, `prerequisites`, `retake`, plus `source` (a URL, rendered separately below the table as "Source: official exam page").

```js
exam: { questions: 90, minutes: 90, passing: '750 of 900', cost: '~$404',
  delivery: 'Pearson VUE, online or test center', validity: '3 years',
  prerequisites: 'None required; Network+ and 2 years of security-focused IT experience recommended',
  retake: 'No wait for first retake; 14-day wait after each subsequent attempt',
  source: 'https://www.comptia.org/en-us/certifications/security/' },
```

Authoring rules: **verify every value against the vendor's own current candidate bulletin or exam page, don't guess or pattern-match from a similar cert** (retake policy especially: vendors differ a lot — flat N-day wait, escalating wait by attempt count, no wait at all, and a naive guess based on another vendor's pattern is a common, real mistake). `exam` (like `faq`) is build-time only — no browser-side component reads it, so it never needs to be listed in `build-certs.mjs`'s `LIGHT_FIELDS`/`FULL_FIELDS`. Certs with no formal standardized exam (e.g. OSHA 10/30-Hour, which end in a certificate of completion, not a pass/fail test) should omit `exam` entirely rather than force-fitting one.

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

**Instructions to give the question-generating session.** These are the standing rules the generator must follow — paste them with the prompt, and refuse a batch that violates any of them. They mirror the "READ THIS FIRST" block at the top of [docs/QUESTION-PROMPT.md](docs/QUESTION-PROMPT.md); both must stay in sync. Recent batches (comptia-project-plus, barber-no-chemical) violated points 1–3 even though the prompt forbade them, so reinforce explicitly:

1. **No double-wrap envelope.** The file is exactly ONE object with top-level keys `slug`, `name`, `cert`, `version`, `questions` — and nothing else, at any level. `questions[0]` is a QUESTION (has `id`/`text`/`answers`), never a wrapper. Forbidden keys anywhere in the file: `domain_name`, `section`, `skill_level`, `terms_covered`, `weight`, `question_count`, `correct_distribution`. Writing any of them is the rejected double-wrap shape.
2. **Exact field names per question** — `id`, `certification`, `exam_code`, `domain`, `name`, `objective`, `keyword`, `difficulty`, `text`, `answers`, `correct`, `explanations`. The domain NUMBER (e.g. `1.0`) goes in `domain`; the canonical domain TITLE goes in `name` (byte-identical to the file's top-level `name`); the sub-objective code+label goes in `objective`. Never put the sub-objective code in `domain`.
3. **Even difficulty including a full quarter `hard`.** Assign `easy`/`medium`/`medium-hard`/`hard` so the four buckets are equal (n/4 each, within ±1). A batch with zero `hard` or with `medium` ≥ 40% is an automatic fail — observed pattern is ~25/50/25/0, which is the failure shape to avoid. Vary difficulty by genuine cognitive load, not a fixed ratio. Tally the four counts before saving.
4. **No reused answer strings.** No answer text (correct or distractor) may appear in more than one question in the same domain.
5. **Confirm count and term basis before generating.** Do not infer the question count from sub-objectives. Use the per-domain count and term basis (concept terms vs. CIB sub-objectives) given up front; if it isn't given, ask.

Plus the existing rules already in the prompt: unique first-10-word stems, no templated explanation prefixes, no stem-stitching, no broken acronyms (respect the whitelist), correct-answer position even across `a/b/c/d`, every sub-objective covered, minified output, one domain at a time then STOP.

**Session-to-session handshake (SYN / SYN-ACK / ACK).** The in-repo session and the generation session are connected over WebRTC and both edit the same files — this is collaborative editing, not a paste relay. Before either side writes a single byte of JSON, lock parameters with a three-way handshake. No JSON is written until ACK lands.

- **SYN** (in-repo → generator) — proposes the batch parameters: `cert-slug`, `domain-slug`, canonical domain `name` and number, `weight`, target question count, term basis (concepts vs. CIB sub-objectives), starting `id`, and the path to write. Quote the schema's exact top-level keys to pre-empt the double-wrap.
- **SYN-ACK** (generator → in-repo) — echoes every proposed parameter verbatim and adds its plan: the term list it will cover, its planned per-bucket difficulty split (must include a full quarter `hard`), and its `a/b/c/d` position plan. Any disagreement is raised here, not after writing.
- **ACK** (in-repo → generator) — confirms the echoed parameters bit-for-bit (or rejects and re-SYNs with corrections). Only after ACK does the generator write the file.

After write: run `docs/validate-domain.py`. The validator is the arbiter — either side can edit in place to drive issues to 0, then re-validate. The handshake repeats per domain.

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
5. Run `npm run audit`. It fails on a broken title, a missing OG PNG, a dash in generated HTML, or a fake-fresh `dateModified`. The service worker cache version needs no manual bump: `.github/workflows/deploy.yml` stamps `sw.js` with the commit hash on every push to `main`.

### Post-flight verification

After the steps above, programmatically confirm:

- [data/counts.json](data/counts.json): `total === sum(perCert)` and `liveCerts === Object.keys(perCert).length`.
- The cert appears in [sitemap.xml](sitemap.xml) (one entry for the landing page plus one per domain quiz).
- The cert OG image exists at `icons/og/<slug>.png` (the `.svg` is source only; `og:image`/`twitter:image` point at the `.png`, since Facebook, X, Slack, iMessage, and Discord do not render SVG `og:image` — see `writeOgImage()` in `build-seo.mjs`).
- **Every domain has a static HTML file** at `<slug>/<domain-slug>/index.html` and a matching OG image at `icons/og/<slug>-<domain-slug>.png`. A missing domain HTML file means that URL will 404 on Google and tank SEO — re-run `build:seo` if any are missing.
- The cert is listed in [llms.txt](llms.txt).
- The cert's slug no longer appears in [data/coming-soon.json](data/coming-soon.json).
- `npm run audit` passes. (Do not hand-bump `sw.js`; the deploy workflow stamps it with the commit hash.)

Only after every check passes is the cert deploy-ready.

---

## Helper scripts

| Command | What it does |
|---|---|
| `npm start` | Local static server (note: `npx serve -s .` SPA-fallback mode serves `index.html`'s bytes for every path, which is fine for testing client-side routing/rendering but means you cannot verify a specific generated file's own `<head>` tags this way — use `npx serve .` (no `-s`) or `curl` a literal path instead, matching how GitHub Pages actually serves files) |
| `npm run build:certs` | Regenerates `js/data/certifications/index.js` (light) and `js/data/certifications/full/<slug>.js` (heavy, one per cert) from the per-cert metadata files |
| `npm run build:css` | Minifies `css/style.css` → `css/style.min.css` (the file the site actually serves) |
| `npm run build:seo` | Runs `build:certs` + `build:css`, then regenerates per-cert HTML, per-domain HTML, OG PNGs, sitemap, feed, llms.txt, `data/build.json` (SW version + build date for the footer stamp), and `data/counts.json` |
| `npm run check:weights` | Flags domains under-weighted vs. official exam targets |
| `npm run check:salaries` | Validates `data/salaries.json` coverage and freshness |
| `npm run check:seo-duplicates` | Flags exact-duplicate `<title>`/meta description across all generated pages |
| `npm run check:canonicals` | Validates every generated page has exactly one self-referential, unique canonical tag |

---

## Per-page freshness dates (do not regress to a `TODAY` stamp)

Every generated page's visible byline and `dateModified`/`datePublished` JSON-LD come from real git history, not the day the build ran: `lastCommitDate(relPath)` in `build-seo.mjs` runs `git log -1 --format=%cs -- <path>` for the page's underlying source file (falling back to `TODAY` only if the path has uncommitted changes right now, or git has no history for it yet, e.g. a brand-new page), and `firstPublishDate(key, relPath)` does the same with `git log --diff-filter=A` for a stable `datePublished`, cached in `data/published.json` so it is never recomputed once seeded. `bylineHtml()` shows "Last updated" for anything touched within 365 days and falls back to "Published" (with the original date) for anything older, since claiming a page was "just updated" when it has not actually changed in over a year reads as a manipulated freshness signal, not an honest one, both to a human reader and to Google's recrawl-scheduling.

**Why this matters:** a sitemap or RSS feed where every single page shows today's date on every build is a well-known anti-pattern Google's crawler has learned to discount as a recrawl signal, since it carries no real information about what actually changed. Stamping every page with `new Date()` at build time (which is what `data/build.json`'s `builtAt` and `counts.json`'s `generatedAt` legitimately do, since those genuinely describe "when this build ran," not "when this page's content changed") would silently reintroduce that exact problem for every per-page date if applied to cert/domain pages, `sitemap.xml`'s `lastmod`, or `feed.xml`'s per-item `pubDate`. `llms.txt`/`llms-full.txt` are a deliberate exception: their single whole-file "Last updated" line really is a build-time fact (there is no per-item claim being made there for Google to distrust), so a plain `TODAY` stamp is correct and honest for those two files specifically.

---

## Analytics + Ads consent (GDPR/EEA — do not regress)

Google Analytics (gtag, `G-YRKFB3WT9C`) and Google Ads conversion tracking (gtag, `AW-17221241617`) share one gtag/dataLayer pipeline, gated by **Consent Mode v2**. The `<head>` block defines `dataLayer`/`gtag`, calls **two** `gtag('consent','default', ...)` commands — a region-scoped one for EEA/UK (`ad_storage`/`ad_user_data`/`ad_personalization` denied, `region: [...EEA+UK codes]`) and a global fallback for everyone else (same three ad signals granted by default — opt-in ad consent isn't legally required outside EEA/UK) — restores a prior `qb_consent==='granted'` choice (now also re-granting `ad_storage`/`ad_user_data` on top of `analytics_storage`), *then* loads `gtag.js` once and calls `gtag('config')` twice (once per tag ID), followed by the Ads page-view conversion event snippet. `analytics_storage` stays denied by default **everywhere**, regardless of region, until Accept. This satisfies the EEA/UK/GDPR consent requirement and Google's EU User Consent Policy. **Never replace it with a bare `gtag('config')`**, and never load a second copy of `gtag.js` or redeclare `function gtag()` for a second tag ID — that duplicates the library and is exactly the bug this section warns against; add another `gtag('config', 'AW-...')` call to the existing block instead.

The whole block (both `gtag('consent','default',...)` calls, the `qb_consent` restore, the single `gtag.js` load, both `gtag('config',...)` calls, and the Ads conversion event) is generated by **one** shared function, `buildConsentGtagBlock()` in `scripts/build-seo.mjs` — call it, don't inline it. It's used by all three page-type builders (`buildCertHtml`, `buildDomainHtml`, `buildComingSoonHtml`), so it regenerates consistently across all ~360 generated pages on `build:seo`. It still needs to be kept in sync **by hand** in the pages `build:seo` doesn't touch:

1. Root `index.html` (hand-maintained — `build:seo` does not rewrite its gtag block).
2. `cpa/index.html` (hand-built hub).
3. `privacy/index.html` (hand-built policy page) — also carries the human-readable explanation of this same policy in its "Analytics, ads, and cookies" section; keep that prose in sync with any behavior change here.
4. `404.html` — gets the same **region-split consent-default block** (so consent state is consistent even if a visitor lands on a 404 first), but deliberately **not** the Ads `config`/conversion-event lines — an error page is not a conversion point.

The banner UI is `js/components/consent/renderConsent.js` (shown only where `needsConsent()` judges the visitor to be in the EEA/UK/CH, by timezone and browser language; elsewhere the head grants analytics and ad measurement by default and no banner renders), rendered from `js/app.js`'s idle callback. Accept → `gtag('consent','update',{analytics_storage:'granted', ad_storage:'granted', ad_user_data:'granted'})` + `localStorage.qb_consent='granted'`; Decline → stays at whatever the region-based default already was (EEA/UK: denied; elsewhere: both ad consent and analytics are granted by default and no banner renders). **The banner's Accept action never grants `ad_personalization`** — only `analytics_storage`, `ad_storage`, and `ad_user_data`. Outside the EEA/UK, `ad_personalization` is granted by the region-split *default* (same as `ad_storage`/`ad_user_data`, per the region-split above); inside the EEA/UK it stays denied permanently, banner or no banner, unless a future change explicitly decides otherwise. Net effect: nothing on this site is currently used to build remarketing or personalized-ad audiences for EEA/UK visitors. `/privacy/` is the policy page (footer-linked; registered in `buildSitemap()` so it survives `build:seo`) and has a "reset cookie choice" control that also revokes `ad_storage`/`ad_user_data` immediately (not just on next load). If you add a new hand-built top-level page that loads gtag, copy `buildConsentGtagBlock()`'s output verbatim (and decide, as with `404.html`, whether it should carry the Ads config/conversion lines).

---

## Style rules

- **No em-dashes or en-dashes anywhere in rendered output.** This means every `<p>`, heading, title, meta description, JSON-LD string, FAQ answer, cert metadata field (`name`, `tagline`, `about`, `details`, `faq`), `data/coming-soon.json`, `data/salaries.json`, acronym/service lists, and UI strings in `js/`. Use a comma, period, colon, or parentheses instead; use a plain hyphen for numeric ranges (`40-60 questions`). `scripts/build-seo.mjs` runs every generated file through `noDash()` as a safety net, but fix the source too; the sanitizer is not a license to write them. Dashes hide as entities and escapes too (`&mdash;`, `&ndash;`, `&#8212;`, `&#8211;`, `\u2014`, `\u2013`); those count. Verify with `grep -rlE '—|–|&mdash;|&ndash;|&#8212;|&#8211;|\\u201[34]' --include=index.html --include=*.js --include=*.json . ` (must print nothing outside `node_modules` and the `noDash` function itself) before reporting a build done.
- **No emojis** in code, content, or commit messages unless explicitly asked.
- **No prose comments** in JSON. Comments belong in `.md` or code files only.
- One function per file in `js/`; keep files short.
- The user prefers craigslist-simple UI — no decorative additions.
- When validating, run checks programmatically (Python or Node), not by hand.
- **Never expose the contact email as visible text.** Use a `mailto:` link labeled "Contact us" / "Contact Us →" (the address may live in the `href`, never in the rendered text). Applies to new pages, the footer, and any generated/static template.
