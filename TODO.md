# QuizBuffet TODO

Audit date: 2026-09-06. Site ranks around position 68 for head terms. Search Console shows impressions on ~250 queries and 0 clicks. Ads campaign is about to start.

Completed items are collapsed to "Done (removed, number kept)" so numbering stays stable for everyone working from this file.

Priority key: **P1** = do before ads spend. **P2** = next 30 days. **P3** = ongoing.
After any change to `scripts/build-seo.mjs` or cert metadata: run `npm run build:seo`, bump the cache version in `sw.js`, and spot-check one cert page, one domain page, and the home page.

Sections:
A. Ads readiness (P1)
B. Titles, H1s, descriptions (P1)
C. Search Console query fixes, per cert (P1)
D. Freshness and dates (P1)
E. Home page (P1)
F. Cert pages (P2)
G. Domain pages (P2)
H. Content data quality (P2)
I. Coming-soon and empty certs (P2)
J. Technical SEO and performance (P2)
K. Authority and off-site (P2/P3)
L. Product features that match search intent (P2/P3)
M. Process and maintenance (P3)
N. Search Console page analysis
O. Search Console country analysis
P. Search Console device analysis
Q. Search Console daily trend analysis
R. SERP inspection of the CPR/AED page
S. Brand query analysis

---

## A. Ads readiness (P1, block spend until done)

### A1. [PARTIAL: trackConversion.js wired at quiz_start/domain_complete/answered_10, labels still REPLACE_ME (inert until set) pending real conversion actions from Google Ads; Q4's value/currency stripped from the page-view snippet, still needs Secondary marked in the Google Ads UI] Add Google Ads conversion events
**Problem.** `index.html` and every generated page load `AW-17221241617` but only call `gtag('config', 'AW-17221241617')`. No conversion is ever sent. Every click will be unmeasured.

**Fix.**
1. In Google Ads: Goals > Conversions > New conversion action > Website > "Add a conversion action manually". Create three:
   - `quiz_start` (category: Page view or Other; count: One per click; value: none).
   - `domain_complete` (category: Sign-up or Other; count: One; this is the primary).
   - `answered_10` (secondary, for optimization if completes are rare).
   Copy each conversion label (looks like `AW-17221241617/AbC-dEfGhIjK`).
2. Create `js/analytics/trackConversion.js` (one function per file rule):
   ```js
   // Fires a Google Ads conversion. Labels come from Google Ads > Goals > Conversions.
   const LABELS = {
     quiz_start: 'AW-17221241617/REPLACE_ME',
     domain_complete: 'AW-17221241617/REPLACE_ME',
     answered_10: 'AW-17221241617/REPLACE_ME',
   };
   export function trackConversion(name) {
     if (typeof gtag !== 'function' || !LABELS[name]) return;
     gtag('event', 'conversion', { send_to: LABELS[name] });
   }
   ```
3. Call sites:
   - `js/pages/quiz/initQuiz.js`: call `trackConversion('quiz_start')` once per session per domain (guard with `sessionStorage` key `qb_conv_start_<domainSlug>`).
   - `js/pages/quiz/handleAnswer.js:41`: next to the existing `gtag('event','domain_complete', ...)`, add `trackConversion('domain_complete')`.
   - `js/pages/quiz/handleAnswer.js`: keep a per-session answer counter in `sessionStorage` (`qb_answered`), fire `trackConversion('answered_10')` when it reaches 10, once.
4. Verify with Google Tag Assistant on a live page: the conversion ping must show `send_to` with the label.

### A2. Done (removed, number kept)

### A3. [PARTIAL: Accept grants ad consent; banner still shows to all regions] Show the consent banner only where consent is denied by default
**Problem.** After A2, non-EEA visitors are granted by default but `js/components/consent/renderConsent.js` still shows the banner to everyone and its text says "no ads".

**Fix.**
1. In `renderConsent.js`, before rendering, check the resolved consent state. Simplest approach: in the head block, set `window.__qbNeedsConsent = true` only inside a region match. Since gtag does not expose region matching to page JS, use `Intl.DateTimeFormat().resolvedOptions().timeZone` prefix `Europe/` as the proxy, or call a free geo endpoint. Timezone proxy is acceptable and has no network cost.
2. Update banner copy: "We use Google Analytics and Google Ads measurement cookies. They are off until you choose." Remove "no ads".
3. On Accept, grant `analytics_storage`, `ad_storage`, `ad_user_data`, `ad_personalization`. On Decline keep all denied.
4. Update `privacy/index.html`: add Google Ads (`AW-17221241617`) to the list of services, describe the conversion cookie, and keep the "reset cookie choice" control.
5. Update `CLAUDE.md`: the rule "never grant ad_storage" becomes "grant ad consent only through the banner Accept path or the non-EEA default".

### A4. Done (removed, number kept)

### A5. Link GA4 to Google Ads
In GA4 Admin > Product links > Google Ads links, link the account. Mark `domain_complete` as a key event in GA4 (Admin > Events > toggle). Import it in Google Ads as a backup conversion. This survives even if A1 labels are misconfigured.

### A6. Choose landing pages
- Send every ad group to its cert page (`/comptia-security-plus/`), never to `/`. Cert pages have 1000+ words and match the query. Home has 72 crawlable words.
- For the CPR/AED and BLS ad groups, land on the new AED page from C1 once it exists.
- Add `?utm_source=google&utm_medium=cpc&utm_campaign=<cert>` in the final URL suffix at the account level.

### A7. Confirm gclid survives the SPA path restore
`404.html:34` stores `location.pathname + location.search` and `index.html` restores it via `history.replaceState`. gtag runs in `<head>` before the restore and reads `location.search` of the 404 page URL, which still has the gclid. Verify once with a test URL `/comptia-security-plus/?gclid=test` in Tag Assistant. If the conversion cookie `_gcl_aw` is set, nothing to do.

### A8. Done (removed, number kept)

### B1. Done (removed, number kept)

### B2. Done (removed, number kept)

### B3. Done (removed, number kept)

### B4. Done (removed, number kept)

### B5. [PARTIAL: template now keeps "free" and "online" inside 155 chars on all 50; zero custom seoDescription authored] Meta descriptions per cert
**File.** `scripts/build-seo.mjs:278-280`. All 51 share one template.
**Fix.** Add an optional `seoDescription` field to cert metadata. Template fallback becomes:
`Free ${seoName} practice test with ${total} exam-style questions across ${cert.domains.length} domains. Instant feedback, explanations, no signup. Study online for the ${cert.code} exam.`
Write custom `seoDescription` values for the 16 certs in section C first. Each must name the cert, say "free", say "practice test" or "practice exam", and say "online". Max 155 characters.

### B6. Done (removed, number kept)

### B7. Done (removed, number kept)

### B8. Done (removed, number kept)

### C1. Done except content: raise `cpr-aed/aed-operation` from 55 to 100+ questions (number kept)

### C2. BLS (about 25 impressions: "basic life support exam/quiz/practice test", "bls mock test", "aha bls online test", "basic life support exam a")
**File.** `js/data/certifications/bls.js`.
1. `seoName`: "BLS (Basic Life Support)". Title becomes "BLS (Basic Life Support) Practice Test: 300+ Free Questions".
2. `faq`: "What is on the AHA BLS exam?", "What is BLS Exam A vs Exam B?" (AHA issues two equivalent 25-question versions), "What is the passing score for BLS?" (84 percent), "Is the BLS test online?", "How long is BLS valid?", "Is BLS the same as CPR?", "How many questions are on the BLS exam?" (25), "Can I take a BLS mock test for free?".
3. Intro paragraph must include "mock test" and "online".

### C3. QuickBooks ProAdvisor (about 90 impressions; dominant intent "is it free", "how to get it free from Intuit")
**File.** `js/data/certifications/quickbooks-proadvisor.js`.
1. Title is clipped mid-phrase ("...No"). With B1 it becomes "QuickBooks Online ProAdvisor Practice Test: 200+ Free Questions".
2. `faq`: "Is the QuickBooks ProAdvisor certification free?" (yes, free through the ProAdvisor program in QuickBooks Online Accountant), "How do I get QuickBooks ProAdvisor certification for free?", "What is on the ProAdvisor exam?" (sections, ~75 questions, 80 percent pass, 3 attempts), "How long does the ProAdvisor exam take?", "Do you need to be an accountant?", "How long is ProAdvisor certification valid?" (annual recertification), "What is the difference between ProAdvisor and Advanced ProAdvisor?", "Is there a QuickBooks proficiency test?".
3. Add an `about` paragraph that says "free" in the first sentence and names "Intuit" and "QuickBooks Online Accountant".
4. Fill the `reports` domain (14 questions) to at least 30.

### C4. AWS Developer Associate (about 230 impressions across 15 phrasings, the largest single-cert opportunity)
**File.** `js/data/certifications/aws-developer-associate.js`.
1. `seoName`: "AWS Certified Developer Associate". Title: "AWS Certified Developer Associate Practice Exam: 500+ Free Questions".
2. Use "practice exam" as the primary noun on this page (queries say exam more than test). H1: "AWS Certified Developer Associate Practice Exam and Practice Tests (DVA-C02)".
3. `faq`: "How many questions are on the DVA-C02 exam?" (65, 130 minutes), "What is the passing score?" (720 of 1000), "How much does the AWS Developer Associate exam cost?" ($150), "Is the AWS Developer Associate hard?", "Is this a free AWS developer practice exam?", "How long is the certification valid?" (3 years), "What is the difference between Developer Associate and Solutions Architect Associate?", "Is there a mock test with a timer?" (link to the mock exam mode from L1 once built).
4. Build the timed mock exam mode (L1) and link it from the top of this page; "practice exam" intent is not satisfied by a question bank.
5. Raise question count toward 1000. It is the highest-demand AWS page and has 500.

### C5. CompTIA Project+ (about 80 impressions: "project+", "comptia project", "project+ study", "project+ practice questions", "pk0-005 exam voucher")
**File.** `js/data/certifications/comptia-project-plus.js`.
1. `seoName`: "CompTIA Project+". Title: "CompTIA Project+ Practice Test: 812+ Free Questions (PK0-005)".
2. Add a "Project+ Study Guide" section: a study plan by domain, recommended order, and links to the four domain quizzes. Implement as an optional `studyGuide` field (array of paragraphs) rendered by `build-seo.mjs` under an H2 "Project+ Study Guide and Study Material".
3. `faq` already exists; add "How much is the PK0-005 exam voucher?" ($358 list; verify) and "Is Project+ worth it vs CAPM?".

### C6. CompTIA PenTest+ (about 45 impressions: "comptia pentest+", "pentest+ exam", "pt0-003 exam voucher", "pentest+ exam objectives", "pentest+ free training")
**File.** `js/data/certifications/comptia-pentest-plus.js`.
1. `seoName`: "CompTIA PenTest+". Title: "CompTIA PenTest+ Practice Test: 2160+ Free Questions (PT0-003)".
2. Add an "Exam Objectives" H2 that lists the PT0-003 domains with weights (the `domains` array already has this; render it as a table with the official objective names).
3. `faq`: voucher price, "Is PenTest+ harder than Security+?", "Is there free PenTest+ training?" (answer: this site plus CompTIA's free objectives PDF), "How many questions and how long?" (max 90, 165 minutes), "Passing score?" (750 of 900), "Does PenTest+ expire?" (3 years).

### C7. CISSP (about 60 impressions: "cissp test", "cissp exam", "cissp certification exam", "isc2 cissp practice test")
**File.** `js/data/certifications/isc2-cissp.js`.
1. `seoName`: "CISSP (ISC2)". Title: "CISSP (ISC2) Practice Test: 800+ Free Questions".
2. The H1 is the full 60-character expansion. Change to "CISSP Practice Test: ISC2 Certified Information Systems Security Professional".
3. `faq`: "How hard is the CISSP?", "How many questions?" (CAT: 100 to 150, 3 hours; verify current), "Passing score?" (700 of 1000), "Cost?" ($749), "Do you need 5 years experience?", "CISSP vs Security+", "How long is CISSP valid?", "Is a free CISSP practice test enough?".

### C8. AZ-104 (about 20 impressions: "az-104 online exam", "az 104 test", "azure administrator cert free")
`seoName`: "AZ-104 Azure Administrator". Title: "AZ-104 Azure Administrator Practice Test: 500+ Free Questions". Add "online" to the description and `faq` on cost ($165), passing (700), renewal (annual free online assessment, which directly answers "azure administrator cert free").

### C9. OSHA 10 and OSHA 30 (about 30 impressions: "osha 10 practice exam/test", "osha 30 test/exam", "osha test", "osha certification test")
`seoName` set in B2. Titles become "OSHA 10 Construction Practice Test: 400+ Free Questions". `faq` for each: "Is there a final exam for OSHA 10?" (yes, 20 questions, 70 percent to pass, 3 attempts on most providers), "Can you fail OSHA 30?", "Is OSHA 10 online?", "How long does the OSHA 10 card last?" (does not expire federally; some states and employers require renewal), "How much does OSHA 10 cost?".

### C10. Forklift (about 25 impressions: "osha forklift test", "forklift operator certification test", "free forklift certification test online", "29 cfr 1910.178")
**File.** `js/data/certifications/forklift-certification.js`.
1. `seoName`: "OSHA Forklift Certification". Title: "OSHA Forklift Certification Practice Test: 300+ Free Questions". The current title leads with "OSHA 1910.178", which nobody searches except one query.
2. H1: "Forklift Operator Certification Test Practice (OSHA 29 CFR 1910.178)".
3. `faq`: "Is the OSHA forklift test free?", "Can you get forklift certified online?" (written part yes, hands-on evaluation must be in person per 1910.178(l)), "How many questions on the forklift test?", "What does 29 CFR 1910.178 require?", "How often do you need forklift recertification?" (every 3 years), "What is a passing score?".

### C11. NMLS / SAFE MLO (about 35 impressions across "safe mlo", "nmls", "mlo", "loan originator", "safe mlo national test practice")
**File.** `js/data/certifications/nmls-mlo.js`.
1. `seoName`: "NMLS SAFE MLO". Title: "NMLS SAFE MLO Practice Test: 300+ Free Questions".
2. H1 currently "NMLS Mortgage Loan Originator (MLO) (SAFE MLO) Free Practice Test", with a doubled parenthetical. Change to "SAFE MLO National Test Practice: NMLS Mortgage Loan Originator Exam".
3. `faq`: "What is on the SAFE MLO national test?" (120 scored questions, 190 minutes), "Passing score?" (75 percent), "Cost?" ($110), "How many times can you take the SAFE test?", "Is there a free NMLS practice test?", "What is the UST (Uniform State Test)?", "How hard is the SAFE MLO exam?", "How long do I have to wait to retake?" (30 days, then 180 after 3 fails).

### C12. NASM CPT (about 20 impressions: "nasm certification test", "nasm cpt practice test", "nasm personal trainer test", "nasm practice questions")
`seoName`: "NASM CPT Personal Trainer". Title: "NASM CPT Personal Trainer Practice Test: 900+ Free Questions". `faq`: question count (120, 2 hours), passing score (70 percent scaled), cost, retake policy, "Is NASM CPT hard?", "NASM vs ACE", validity (2 years), "Are these NASM practice questions free?".

### C13. ITIL 4 Foundation (about 25 impressions: "itil 4 practice exam", "itil mock exam", "itil 4 foundation practice test", "examen itil quiz", "simulado itil")
`seoName`: "ITIL 4 Foundation". Title: "ITIL 4 Foundation Practice Test: 400+ Free Mock Exam Questions". Put "mock exam" in the title; three queries use it. `faq`: 40 questions, 60 minutes, 26 to pass (65 percent), cost, "ITIL 4 vs ITIL v3", "Is there a free ITIL mock exam?", validity (3 years since 2023 scheme), "Is ITIL Foundation hard?". Spanish and Portuguese queries exist; note for later (K6).

### C14. CDL Class A (about 6 impressions: "class a cdl pretest", "class a combination practice test")
`seoName`: "CDL Class A". Title: "CDL Class A Practice Test: 300+ Free Pretest Questions". Add "pretest" and "permit test" to the description. Confirm a Combination Vehicles domain exists; if not, create one. `faq`: general knowledge question count (50), combination test (20), air brakes (25), passing (80 percent), "Is the CDL pretest the same as the permit test?", "Can I take the CDL test online?".

### C15. Georgia Real Estate (queries: "amp real estate exam georgia", "georgia real estate practice test free")
`seoName`: "Georgia Real Estate". Title: "Georgia Real Estate Practice Test: 300+ Free Questions". The H1 already says Georgia; the title does not. `faq`: "Who administers the Georgia real estate exam?" (PSI, formerly AMP), question count (152: 100 national, 52 state), passing (75 percent), cost ($121), "Is the Georgia exam hard?", retake rules. Later: per-state pages (K7).

### C16. CPA AUD (queries: "aud exam", "aud cpa", "cpa audit exam", "aud cpa exam format", "aicpa aud blueprint")
`seoName`: "CPA AUD (Auditing and Attestation)". H1 currently has an em-dash. Add an "AUD Exam Format" section: 78 MCQs and 7 TBSs, 4 hours, scoring 75, and a link to the AICPA Blueprint PDF. Fill AUD to 300+ questions (286 now) and REG, BAR, TCP to 300+ (100 to 124 now).

### C17. Cosmetology, Barber (queries: "barber quiz", "barber test", "cosmetology quiz", "cosmetology practice test free", "questions about cosmetology")
Put "Quiz" in the titles: "Cosmetology State Board Practice Test and Quiz: 300+ Free Questions". Low competition; the vocabulary fix alone should move these.

### C18. FAA Part 107 (query: "is the part 107 test multiple choice")
`faq` item: "Is the Part 107 test multiple choice?" (yes, 60 questions, 2 hours, 70 percent). `seoName`: "FAA Part 107 Drone".

### C19. Security+ (queries: "comptia security+ quiz", "security+ quiz", "sy0-701 practice test", "comptia security plus practice test free", "security plus 701 practice test")
Title from B1: "CompTIA Security+ Practice Test: 1900+ Free Questions". Add the word "quiz" in the intro. Already has an FAQ. Add "Is this Security+ practice test free?" and "Are these real SY0-701 exam questions?" (no, exam-style, not dumps; say so, it builds trust and avoids "actual test" dump-seeker traffic).

### C20. Voucher and price queries (dop-c02, soa-c03, pt0-003, pk0-005 "exam voucher")
`cert-prices.csv` has an `exam_fee_usd` column, mostly empty. Fill it for all 51 live certs from official sources, then render an "Exam cost" line in the details block and an FAQ item "How much does the X exam cost and where do you buy a voucher?" per cert. Consider an affiliate link where one exists (CompTIA store, Pearson VUE).

### C21. Cross-cutting modifiers
- "free" must appear in title, H1 or first sentence, and description. Titles have it after B1 ("Free Questions").
- "online" appears in 8 queries. Add to descriptions (B5) and the intro (B6).
- "mock test", "mock exam" appear for AWS, BLS, ITIL, CISSP. Add to intro (B6) and build L1.
- "practice questions" is used mostly for Project+ and NASM; keep it as a secondary phrase, not the title noun.

### C22. Brand
"coursebuffet" and "brainbuffet sign up" show the brand is not yet remembered. No on-site fix. Off-site brand mentions (K) are the cure.

---

## D. Freshness and dates (P1)

### D1. Done (removed, number kept)

### D2. Done (removed, number kept)

### D3. [DONE] Sitemap changefreq and priority
In `buildSitemap` (`build-seo.mjs:1317`): home `weekly/1.0`, cert pages `monthly/0.8`, domain pages `monthly/0.6`, cpa hub `monthly/0.7`, privacy `yearly/0.1`. Google mostly ignores these, but uniform 0.9/0.8 on 300 pages is noise.

### D4. Done (removed, number kept)

---

## E. Home page (P1)

### E1. Done (removed, number kept)

### E2. Done (removed, number kept)

### E3. "Most practiced" section
Hand-pick 10 certs with the highest impressions or volume: Security+, A+ Core 1, CCNA, AWS Cloud Practitioner, AWS Developer Associate, CISSP, CDL Class A, CPR/AED, ServSafe Manager, NASM CPT. Static HTML links above the full grid.

### E4. Category landing pages
Create `/it-certifications/`, `/cybersecurity-certifications/`, `/cloud-certifications/`, `/healthcare-certifications/`, `/trade-licenses/`, `/beauty-licenses/`, `/finance-certifications/`, `/safety-certifications/`. Generate them in `build-seo.mjs` from the category map: title "Free <Category> Practice Tests", 300 words of intro, the cert list with counts, `ItemList` JSON-LD, breadcrumb. Add them to the sitemap and link them from the home grid headings and the footer. These target "it certification practice tests" style queries and give the home page fewer, stronger internal links.

### E5. Done (removed, number kept)

### E6. Done (removed, number kept)

### E7. `Organization` schema
`index.html` JSON-LD has `"sameAs": []`. Fill with real profile URLs once K4 is done. Add `"logo"` pointing at a 512px PNG (`/android-icon-192x192.png` is acceptable now).

### E8. Done (removed, number kept)

### E9. Done (removed, number kept)

### F1. `faq` for every live cert
Only 4 of 51 have one (`grep -l "faq:" js/data/certifications/*.js`). Order of work: the 16 certs in section C, then the remaining 35. Each FAQ: 6 to 8 items, second person, no em-dashes, facts verified against the official source. Standard set: how hard, how many questions and time, passing score, cost, prerequisites, validity and renewal, is it worth it, how long to study. Add one "Is this practice test free?" item per cert because "free" is in most queries.

### F2. Exam logistics table
Add an optional `exam` object to cert metadata:
```js
exam: { questions: 90, minutes: 90, passing: '750 of 900', cost: '$404', delivery: 'Pearson VUE, online or test center', validity: '3 years', prerequisites: 'None required; Network+ and 2 years recommended', retake: 'No wait for first retake, 14 days after second', source: 'https://www.comptia.org/...' }
```
Render as a two-column table under an H2 "Exam at a glance" in `buildCertHtml`. This replaces the free-text `details` string over time. Also feeds `cert-prices.csv` (C20).

### F3. Related certifications on live pages
`pickRelatedLive` (`build-seo.mjs:855`) is only used on coming-soon pages. Call it in `buildCertHtml` too and render 3 to 4 same-category certs under "Related practice tests". Internal links between certs in the same category are cheap authority.

### F4. Study plan section
Optional `studyGuide` field (array of strings) rendered under "Study guide" (C5). Start with Project+, PenTest+, Security+, AWS Developer.

### F5. `Course` schema review
Cert pages emit `Course` + `CourseInstance`. Google's Course rich result is for actual courses; a quiz page is a stretch and could be flagged. Options: (a) keep `Course` but ensure `hasCourseInstance.courseMode: "online"` and `courseWorkload` are present so it validates, or (b) replace with `LearningResource` + `Quiz`. Test both in the Rich Results Test and keep whichever validates with no warnings. Do the same for domain pages (they emit `Quiz` + `Course`).

### F6. Salary block
`data/salaries.json` covers 51 of 51. Confirm every cert page renders the salary paragraph with the source name and year; add `"source"` and `"asOf"` to entries that lack them.

### F7. Trust signals on every cert page
Add a one-line "How these questions are written" link to the About page, and a "Report a question" link in the quiz UI (H6).

---

## G. Domain pages (P2, largest volume of thin pages)

### G1. Raise word count from ~300 to 500+
273 domain pages, median 301 words, min 93. Add an optional `objectives` array per domain in cert metadata:
```js
{ slug: 'general-security-concepts', name: '...', number: '1.0', weight: 12,
  objectives: ['1.1 Compare and contrast various types of security controls', '1.2 Summarize fundamental security concepts', ...],
  summary: 'Two or three sentences on what this domain tests and where candidates lose points.' }
```
Render `summary` under the H1 and `objectives` as a list under "What this domain covers". Source the objective text from the official exam objectives PDF for each cert. Start with the 16 certs in section C.

### G2. [DONE] Show 8 to 10 sample questions instead of 3
`build-seo.mjs:595` slices 3. Change to 8, mixed difficulty (2 easy, 3 medium, 2 medium-hard, 1 hard), rendered as `<details>` blocks with the question, the four answers, and the correct answer plus explanation inside. Keep the `FAQPage` JSON-LD at 3 to 5 items (Google truncates long FAQ schema anyway). Remove em-dashes from the rendered sample text at render time (H1 fixes the source).

### G3. [DONE: 220/271 domain pages, limited to the 42 certs with a services file] Key terms block
Pull `js/data/services/<slug>.js` (concept list) and show the 10 entries whose `a` or `d` text matches the domain name or keywords, under "Key terms in this domain". Static HTML, generated in `build-seo.mjs`.

### G4. [DONE] Sibling and parent links
"Other <code> Domains" exists but sits below the fold. Move a compact horizontal domain nav under the H1, and keep the full list at the bottom.

### G5. Domains under 30 questions
46 live domain files have fewer than 30 questions. List them with:
```bash
python3 -c "import json,glob;[print(f,len(json.load(open(f))['questions'])) for f in glob.glob('data/certifications/*/*.json') if len(json.load(open(f))['questions'])<30]"
```
Fill each to 30+ using the QUESTION-PROMPT workflow, or merge two tiny domains into one where the exam guide allows. Tattoo (6 domains of 12 to 20), Barber no-chemical, and QuickBooks Reports first.

### G6. `npm run check:weights` fails on 10 live certs (pre-existing, found 2026-09-06 verification)
ANS-C01 has an empty domain (`network-management-and-operation.json`, 0 questions, page noindexed) and nine CompTIA certs (A+ Core 1 and 2, Cloud+, CySA+, Data+, ITF+, Network+, PenTest+, Security+) have domains under their declared exam weight. Two fixes, per CLAUDE.md: author questions to bring each flagged domain up to weight (ANS-C01 needs 120 for the empty domain), or align the declared `weight` values in `js/data/certifications/<slug>.js` to the on-disk share. Re-run until the script exits 0. This predates all of today's work; nothing marked done depends on it.

---

## H. Content data quality (P2)

### H1. Remove em-dashes from question data
58,280 occurrences across `data/certifications/*/*.json`. Scripted pass:
1. For each file, load JSON, walk `text`, every `answers[].text`, every `explanations` value.
2. Replace ` — ` and ` – ` with `, ` when both sides are lowercase clauses; with `. ` when the right side starts with a capital letter and the left side ends a clause; with ` (` ... `)` only when the fragment is short and parenthetical. A simple safe default: ` — ` -> `, ` and `—` (no spaces) -> `, `.
3. Collapse doubled punctuation (`,,`, `, ,`, `.,`).
4. Re-run `docs/validate-domain.py` on every file; re-minify. Commit in batches per cert so diffs are reviewable.

### H2. Done (removed, number kept)

### H3. Fill thin certs
tattoo-license (88), cpa-bar (100), cpa-reg (112), cpa-tcp (124), quickbooks-proadvisor (200). Target 300+ for any cert you will advertise.

### H4. Run the validator across everything
```bash
for f in data/certifications/*/*.json; do python3 docs/validate-domain.py "$f" || echo "FAIL $f"; done
```
Fix every reported issue (templated prefixes, broken acronyms, duplicate stems, duplicate answers, difficulty skew, minification).

### H5. Factual spot-check on the top 10 traffic certs
Sample 30 questions per cert (Security+, A+ Core 1 and 2, CCNA, AWS CCP, AWS Developer, CISSP, CPR/AED, BLS, CDL-A) and verify correct answers against the official guideline. Wrong answers cause bounces and bad Reddit mentions.

### H6. "Report a question" link
In `js/components/question/renderQuestion.js`, add a small "Report this question" link: `mailto:` (address in href only) with subject `QuizBuffet question <cert>/<domain>#<id>`. Cheap trust signal and a real QA channel.

---

## I. Coming-soon and empty certs (P2)

### I1. 40 coming-soon certs
They are correctly `noindex` and excluded from the sitemap (`buildSitemap` comments confirm). They still link from the home marquee. Decide per cert: ship or delete. Prioritize by demand: PMP, CNA, ServSafe Manager (if not live), CAPM, AZ-305, Google certificates, EMT, Phlebotomy, Medical Assistant. Delete the rest of the folders so they stop consuming crawl budget via internal links.

### I2. Coming-soon marquee
`#cs-marquee` on the home page promotes pages that cannot be indexed. Replace with the "Most practiced" section (E3) or drop it.

---

## J. Technical SEO and performance (P2)

### J1. OG images: SVG to PNG
All 368 files in `icons/og/` are SVG. Facebook, X, LinkedIn, Slack, iMessage, and Discord do not render SVG `og:image`. Every share shows a blank card.
1. `npm i -D @resvg/resvg-js` (or `sharp`).
2. In `build-seo.mjs`, after writing each SVG, render it to `icons/og/<name>.png` at 1200x630. Cache by content hash so unchanged images are not re-rendered on every build.
3. Point `og:image` and `twitter:image` at the `.png`. Add `og:image:width` 1200, `og:image:height` 630, `og:image:type` image/png.
4. Keep the SVGs as source but do not link them. Add `*.png` in `icons/og/` to git (they are needed on Pages).

### J2. Done (removed, number kept)

### J3. Split the cert metadata bundle
`js/data/certifications/index.js` is 129 KB and loads on every page. Change `scripts/build-certs.mjs` to emit a light index (slug, name, code, vendor, category, domain slugs and names) plus one `js/data/certifications/full/<slug>.js` per cert with `about`, `details`, `faq`, `affiliates`. Load the full file lazily in `initCertification.js`, the same way acronyms are loaded. Update the regex-based bundler accordingly.

### J4. CSS
`css/style.min.css` is 155 KB. Run Chrome DevTools Coverage on home, cert, domain, and quiz pages. Remove dead rules. If the file still exceeds 60 KB, split into `core.css` + `quiz.css` and load quiz CSS on the quiz route only. Keep the preload-as-style pattern.

### J5. Fonts
Three Google font families with three woff2 preloads on every page. Self-host Nunito (subset Latin, weights 400/600/700) under `/assets/fonts/`, drop Playfair and IM Fell on domain and quiz pages, keep them on home only if the design needs them. Preload only the one font used above the fold.

### J6. Lighthouse baseline
Run mobile Lighthouse on `/`, `/comptia-security-plus/`, `/comptia-security-plus/general-security-concepts/`, and a quiz route. Record Performance, LCP, CLS, INP, and SEO scores in this file. Target 90+ performance, 100 SEO. Re-run after J3 to J5.

### J7. Search Console hygiene
- Pages report: confirm 0 "Soft 404", 0 "Crawled, not indexed" on cert pages. Domain pages that are "Crawled, not indexed" are the thin-content problem (G1, G2).
- Request indexing for the 16 cert pages in section C after titles change.
- Submit the sitemap again after D1 so lastmod dates are real.
- Enhancements: check FAQ, Breadcrumb, and Course reports for errors after F5.

### J8. Feed and llms files
Validate `feed.xml` at validator.w3.org/feed. Make sure `feed.xml` items use per-page dates from D1, not `TODAY`. Same for `llms.txt` "Last updated".

### J9. Canonicals on query-string URLs
`/?cert=x` and `?q=` variants must canonicalize to the clean path. Check `index.html` canonical is absolute and unchanged when the SPA restores a path (it is set statically, so it is fine; confirm domain pages set their own).

---

## K. Authority and off-site (P2/P3)

At position 68, authority is the ceiling once on-page is fixed. Nothing in the repo addresses this.

### K1. Community listings
Post the specific domain quiz (not the home page) where the question is already being asked: r/CompTIA, r/AWSCertifications, r/cissp, r/ITCareerQuestions, r/Truckers (CDL), r/EMS and r/nursing (BLS/CPR), r/Cosmetology, r/barbers, r/personaltraining, r/Accounting (CPA), r/loanoriginators (MLO), r/drones (Part 107). Ask moderators to add the site to subreddit wikis and sidebars.

### K2. Answer questions with links
Quora, Reddit, and Stack Exchange threads on "free X practice test". Two or three per week. Link to the exact domain page that answers the question.

### K3. Guides section
Add `/guides/` generated by `build-seo.mjs` from `content/guides/*.md` (add a tiny markdown-to-HTML step, or write them as HTML fragments). First eight, chosen from the query list:
1. "How hard is Security+ in 2026, with a 6-week plan"
2. "AWS Developer Associate vs Solutions Architect Associate: which first"
3. "Is the QuickBooks ProAdvisor certification really free (and how to get it)"
4. "CPR test passing score and what the AHA written exam looks like"
5. "SAFE MLO national test: format, passing score, and retake rules"
6. "OSHA 10 vs OSHA 30: which card do you need"
7. "CDL Class A pretest: general knowledge, combination, and air brakes explained"
8. "CISSP CAT exam: how adaptive scoring works"
Each guide links to its cert page and 2 to 3 domain pages. Add to sitemap and feed.

### K4. Social profiles
Create X, LinkedIn page, and YouTube (short "5 questions in 60 seconds" clips per cert). Fill `sameAs` (E7).

### K5. Embeddable quiz and link snippet
On each domain page add "Embed this quiz" with an iframe snippet to `/embed/<slug>/<domain>/` (a minimal quiz shell) and a "Link to this quiz" text box. Bootcamps and instructors embed and link.

### K6. Non-English demand
ITIL queries in Spanish and Portuguese ("examen itil quiz", "simulado itil"). Later: translate the ITIL and CCNA intro copy and FAQ into es and pt-BR under `/es/itil-foundation/` with `hreflang`. Only after English is ranking.

### K7. Per-state pages
Real estate, cosmetology, barber, and MLO are state-licensed. "georgia real estate practice test" is already appearing. Add state variants (`/real-estate-license/georgia/`, `/texas/`, ...) generated from a state table (exam vendor, question count, passing score, fee) with the same question bank plus state-specific FAQs. Large long-tail opportunity; do after the core is fixed.

---

## L. Product features that match search intent (P2/P3)

### L1. Timed full-length mock exam mode
The majority of impressions are for "practice exam" and "mock test". A per-domain question bank does not satisfy that intent. Add a "Mock exam" button on each cert page that starts a timed session: question count and minutes from `exam` metadata (F2), questions sampled across domains proportional to weight, no explanations until the end, a score and pass/fail against the real passing score, and a per-domain breakdown. Route: `/<slug>/mock/`. Generate a static page for it in `build-seo.mjs` (title "<seoName> Mock Exam: Timed Practice Exam Simulator") so it can rank for "mock exam" queries. Fire `trackConversion('mock_complete')`.

### L2. Results share card
After a mock exam, render a PNG (canvas) with score and cert name and a "Share" button. Social proof and occasional links.

### L3. Progress export and import
Progress is localStorage-only. Add "Export progress" (JSON download) and "Import". Optional email-less sync keeps the "no signup" promise.

### L4. Study reminders (optional)
An optional email field for a weekly reminder. Do not gate anything behind it.

### L5. Accessibility pass on the quiz
Keyboard navigation exists (`initKeyboard.js`). Verify focus order, ARIA on answer buttons, and screen reader announcement of correct/incorrect. Run axe.

---

## M. Process and maintenance (P3)

### M1. Ship weekly
No commits between mid-June and September. After D1, lastmod dates are honest, so they only help if content actually changes. One domain fill or one guide per week is enough.

### M2. `npm run audit`
Add `scripts/audit.mjs` that fails on: any live cert with 0 questions; any live domain under 30 questions; any cert page title missing `seoName || cert.name`; any OG PNG missing; any em-dash in generated HTML; any `dateModified` equal to `TODAY` for a page whose git date is older; validator failures. Run it before `build:seo` in the npm script.

### M3. Monthly Search Console export
Save the top-queries CSV to `docs/gsc/YYYY-MM.csv`. Use it to pick the next FAQs and guides. Compare click-through by page after each title change.

### M4. Update `CLAUDE.md`
After A2, A3, B1, D1, and J1: document the consent two-call shape, the `seoName`/`seoDescription`/`exam`/`objectives` metadata fields, the per-page git-date rule, and the PNG OG requirement, so future sessions do not regress them.

### M5. Keep this file current
Check off items with the commit hash that closed them. Delete items that turn out to be wrong rather than leaving them unchecked.

---

## N. Search Console page analysis (2026-09-06)

Top pages by impressions: cpr-aed 205 (4 clicks), aws-developer-associate 205, quickbooks-proadvisor 160, comptia-project-plus 103, isc2-cissp 55, comptia-pentest-plus 54, comptia-security-plus 54, nmls-mlo 53, itil-foundation 40, bls 30, microsoft-az-104 24, forklift 23, nasm 21, cpa-far 19, home 19, osha-30 18, osha-10 18, cpa-aud 13.

### N1. Cert pages carry all the impressions; domain pages carry almost none
273 domain pages share roughly 60 impressions in total, and most have zero. Google has indexed them but does not consider them answers to anything. Causes: titles are the cert template plus a domain name (no query language), ~300 words, 3 sample questions, and near-identical structure across 273 pages. Fixes are B3, G1, G2, G3. Prioritize the domain pages that already show impressions: cpr-aed/aed-operation, cpr-aed/adult-cpr, cpr-aed/assessment-and-recognition, cpr-aed/special-situations-and-recovery, faa-part-107/operations-over-people, cpa-aud/forming-conclusions-and-reporting, cpa-far/select-balance-sheet-accounts, bls/pediatric-bls-children-and-infants, aws-solutions-architect-associate/design-high-performing-architectures, cdl-class-a/combination-vehicles, osha-10-construction/struck-by, nmls-mlo/mortgage-loan-origination-activities.

### N2. The home page barely surfaces (19 impressions, 0 clicks)
For a 51-cert site the home page should be the strongest URL. It has 72 crawlable words and no crawlable cert links (E1, E2). Until fixed, do not send ads there (A6).

### N3. CPR/AED is the only page that clicks
Click-through on cpr-aed is 4 of 222 impressions (under 2 percent), which means average position around 8 to 12. It is the closest page to page one. Do C1 first; it is the fastest win on the site.

### N4. AWS Developer Associate: 205 impressions, 0 clicks
Same impression volume as CPR/AED with zero clicks means it sits lower (position 15+). The DVA-C02 title is the likely cause. C4 and B2 first, then L1 (mock exam) because the query is "practice exam".

### N5. QuickBooks ProAdvisor: 160 impressions, 0 clicks
Query intent is "is it free". The page title is clipped and does not answer that. C3.

### N6. Pages with impressions but not in the query list
cpa-far (19), aws-security-specialty (11), micropigmentation (9), tattoo-license (9), aws-solutions-architect-associate (9). These have demand the query export truncated. Apply B1/B2 and write FAQs for cpa-far ("far cpa exam", "far exam format") and aws-security-specialty ("scs-c02 practice exam"). Micropigmentation and tattoo share beauty-license intent; use "quiz" and "state board" in titles (C17).

### N7. Domain page slugs that match real queries
- `cdl-class-a/combination-vehicles` (2 impressions) matches "class a combination practice test". `seoTitle`: "CDL Combination Vehicles Practice Test: Free Class A Questions".
- `bls/pediatric-bls-children-and-infants` (3). `seoTitle`: "Pediatric BLS Quiz: Child and Infant Basic Life Support Practice".
- `aws-solutions-architect-associate/design-high-performing-architectures` (3) matches "design high-performing architectures aws". Keep the objective name first in the title.
- `faa-part-107/operations-over-people` (4). `seoTitle`: "Part 107 Operations Over People Quiz: Category 1 to 4 Rules".
- `osha-10-construction/struck-by` (2). `seoTitle`: "OSHA Struck-By Hazards Quiz: Focus Four Practice Questions".
Add these as `seoTitle` overrides when doing B3.

### N8. body-piercing-license and ear-piercing-license each got 1 impression
Body piercing has 0 questions (H2) and is noindexed; the impression is stale. Ear piercing: confirm it has questions and a non-template title.

---

## O. Search Console country analysis (2026-09-06)

Totals: about 1,210 impressions, 2 clicks. United States 655 (54 percent), India 112, Canada 71, Netherlands 50, United Kingdom 47, Australia 34, Belgium 32, Philippines 23, Turkey 19, Vietnam 18. EEA countries combined about 115, plus UK 47, so roughly 13 percent of impressions come from places where consent must be denied by default. The other 87 percent are currently denied for no legal reason.

### O1. Consent scoping is confirmed worth doing (A2, A3)
87 percent of impressions are outside the EEA and UK. Every one of those visitors currently gets analytics and ads cookies denied and sees a consent banner they do not need. After A2 they are granted by default and see no banner. This directly improves ads measurement (US is the ads audience) and removes a layout element from the first paint for most visitors.

### O2. Google Ads geo-targeting
- Target United States, Canada, United Kingdom, Australia, New Zealand, Ireland only. Use "Presence" not "Presence or interest".
- Exclude India, Philippines, Vietnam, Bangladesh, Pakistan, Indonesia, Turkey, and the MENA countries from paid campaigns. Their impressions are for global IT certs (AWS, CompTIA, ITIL, CISSP) and they will click cheap ads at high volume without converting. Keep them for organic.
- US-only certs (CPR/AED, BLS, CDL, NMLS MLO, real estate, cosmetology, barber, OSHA, forklift, insurance, EPA 608) get US-only ad groups.
- Set the account time zone and currency to US before creating campaigns; it cannot be changed later.

### O3. Say "United States" on US-licensed cert pages
State- and federally-licensed certs (CPR/AED, BLS, CDL, MLO, real estate, cosmetology, barber, tattoo, OSHA, forklift, EPA 608, insurance, FAA) should name the country in the intro and in one FAQ ("Is this the US CPR test?"). It helps Google match US queries and reduces irrelevant impressions from India and the Philippines for those pages. Add a `country: 'US'` field to those cert metadata files and have `build-seo.mjs` render "United States" in the first paragraph and set `"areaServed": "US"` in the JSON-LD.

### O4. India (112 impressions, second market)
Impressions are for AWS, CompTIA, ITIL, and CISSP. Cheap, useful organic traffic. Two small additions per global IT cert FAQ: exam fee in local terms ("$150 USD, paid to AWS through Pearson VUE, available in India") and "Can I take the exam online from outside the US?" (yes, OnVUE). No hreflang, no translation; Indian searchers use English.

### O5. Canada (71 impressions)
Canadian searchers land on US-specific pages that will not match their exam. CPR in Canada is Red Cross or Heart and Stroke Foundation, forklift is CSA B335, CDL is provincial. Later (with K7 per-state pages): add `/cpr-aed/canada/` style variants, or at minimum a one-line note on those pages that the content follows US (AHA, OSHA, FMCSA) standards.

### O6. Netherlands and Belgium (82 combined) are anomalously high
For a US-focused English site, NL and BE at 50 and 32 impressions each exceed Germany (8) and France (4). Likely causes: ITIL and AWS demand (both are large certification markets there), or your own testing traffic. Check Search Console Queries filtered to Netherlands. If it is ITIL, the ITIL page (C13) gains a small "Is ITIL 4 Foundation available in Dutch?" FAQ. If it is your own browsing, ignore.

### O7. Spanish-speaking countries (Mexico 12, Spain 11, Argentina 2, Colombia 1) plus "examen itil quiz"
Small but consistent. Ties to K6. Do nothing until English pages rank.

### O8. No hreflang needed
All content is English for a single market. Do not add hreflang or country subfolders until per-country content exists (O5, K6).

---

## P. Search Console device analysis (2026-09-06)

Desktop 1,133 impressions (94 percent), mobile 68 (6 percent), tablet 1. Certification practice-test queries are normally 50 to 70 percent mobile. A 94 percent desktop share means Google is largely not showing the site on mobile, or ranks it much lower there. Some of the top certs (AWS Developer, CISSP, QuickBooks) skew desktop, but not enough to explain this.

### P1. Done (removed, number kept)

### P2. Check mobile Core Web Vitals in Search Console
Open Experience > Core Web Vitals > Mobile. If URLs are "Poor" or "Needs improvement", the causes are J3 (129 KB cert bundle on every page), J4 (155 KB CSS), and J5 (three font families with preloads). Record LCP, INP, and CLS for a cert page and a domain page here before and after those fixes.

### P3. Run the mobile-friendly checks
- Lighthouse mobile on `/`, `/cpr-aed/`, `/cpr-aed/aed-operation/`, and a quiz route (J6). Look specifically for tap targets too close, text too small, and content wider than the screen.
- Check the coming-soon marquee, sponsor block, and empty ad slots on a 375px viewport; anything that pushes the H1 below the fold on mobile hurts.
- Confirm the quiz answer buttons are at least 44px tall on mobile.

### P4. Verify mobile rendering matches desktop
Google indexes the mobile render. Use URL Inspection > Test Live URL > View tested page on a cert page and confirm the FAQ section, domain list, and sample questions are present in the rendered HTML. If anything is hidden on mobile by CSS (`display:none` under a max-width query), Google may discount it.

### P5. Ads implication
Until P2 and P3 are clean, run the first campaigns with a desktop bid adjustment of +0 and mobile at -30 percent, then revisit after mobile vitals improve. A poor mobile landing page experience lowers Quality Score and raises CPC on mobile.

---

## Q. Search Console daily trend analysis (Jun 5 to Sep 4, 2026)

### Q1. No weekday or weekend effect
Mean impressions per day: Mon 12.5, Tue 11.2, Wed 16.3, Thu 14.5, Fri 10.7, Sat 12.0, Sun 14.5. Weekday average 13.0, weekend average 13.2. There is no day-of-week correlation. Do not schedule ads or content around weekdays; volume is flat across the week.

### Q2. There is a strong time trend that tracks the commit history
Weekly impression totals:

| Week of | Impressions |
|---|---|
| Jun 8 | 167 |
| Jun 15 | 176 |
| Jun 22 | 107 |
| Jun 29 | 109 |
| Jul 6 | 90 |
| Jul 13 | 79 |
| Jul 20 | 46 |
| Jul 27 | 60 |
| Aug 3 | 64 |
| Aug 10 | 56 |
| Aug 17 | 77 |
| Aug 24 | 110 |
| Aug 31 | 28 (partial, Search Console lags 2 to 3 days) |

The peak (Jun 11 to Jul 2, about 23 per day) starts right after the Jun 6, Jun 14, and Jun 17 commits that added FAQs for Project+, Security+, and AWS Developer and updated titles and descriptions. Then there were zero commits from Jun 17 to Sep 6, and impressions fell 74 percent over five weeks to about 9.5 per day through July and August. Google tested the updated pages, found no further change, and let them drift down. This is the clearest evidence in all the reports that content updates move rankings on this site.

The late-August rebound (week of Aug 24, 110) is seasonal. Certification exam demand rises after Labor Day and at the start of academic terms; it is not from any site change.

### Q3. What to do with this
- Ship the section B title changes and the section C FAQs in one deploy, then watch the next two weeks. Expect a bump similar to mid-June, then hold it with weekly changes (M1).
- Add the FAQ to the certs that already carry impressions but have no FAQ: cpr-aed, quickbooks-proadvisor, isc2-cissp, comptia-pentest-plus, nmls-mlo, itil-foundation, bls, microsoft-az-104, forklift-certification, personal-trainer-nasm, cpa-far, cpa-aud, osha-10, osha-30. The three that got FAQs in June (Project+, Security+, AWS Developer) are three of the top seven pages by impressions now.
- Ads timing: the seasonal demand window is open now (late August through October). Start campaigns as soon as section A is done rather than waiting for every P2 item.
- Baseline for measuring the next changes: 9.5 impressions per day (Jul 3 to Aug 24), 16.7 per day in the last full week of August.

### Q4. Done (removed, number kept)

---

## R. SERP inspection of quizbuffet.com/cpr-aed/ (2026-09-06, Google, Stonecrest GA)

### R1. Google is rewriting the titles it does not like
On-disk title for the CPR page is "300+ Free CPR/AED Practice Questions, No Signup". Google displays "CPR / AED Certification (CPR/AED) Free Practice Test", which is the H1. Same for NASM ("Certified Personal Trainer (NASM-CPT) - QuizBuffet"), CPA AUD ("CPA — Auditing and Attestation (AUD) - QuizBuffet"), OSHA 30 ("OSHA 30-Hour Construction - QuizBuffet"), and the home page ("QuizBuffet: Free Practice Tests for IT, Cloud, Cybersecurity ..."). Google rewrites titles it judges as boilerplate, keyword-led, or not descriptive of the page. It kept the template only for BLS and ANS-C01. Conclusion: the "N+ Free CODE Practice Questions, No Signup" template is being rejected by Google on most pages, which independently confirms B1. When Google substitutes the H1, the H1 quality matters as much as the title; B4 applies.

### R2. The index is stale: last crawl mid-June to early July
Snippet bylines read "Jun 17, 2026" and "Jul 2, 2026". Those are the visible "Last updated" bylines of the indexed copies. Domain-page titles in the SERP ("Adult CPR — CPR / AED Certification (CPR/AED) Free Practice Test") are from a build older than the current template. Google has not recrawled these pages in two months despite the sitemap claiming every URL changed today. That is the D1 problem in practice: a sitemap where every lastmod is always today gets ignored. After the week-one deploy, use URL Inspection > Request indexing on the 16 section-C cert pages; do not wait for the sitemap.

### R3. Doubled code parentheticals in indexed copies
"Certified Personal Trainer (NASM-CPT) (NASM-CPT) practice test" and "CPR / AED Certification (CPR/AED)" appear in indexed descriptions. The current build has a `codeTag` dedupe, so this is fixed on disk but not in the index. Confirm after recrawl. Also confirm `cert.name` values never embed the code themselves.

### R4. Done (removed, number kept)

### R5. "People also ask" for this query, verbatim
- Where can I find free CPR test questions and answers?
- Can you do CPR and AED training online?
- What to know to pass a CPR test?
- Which comes first, CPR or AED?
Add all four to the cpr-aed `faq` (C1) with these exact phrasings as the `q`. The first one is the site's whole value proposition; answer it in two sentences and name the page.

### R6. Commercial competition on CPR queries
The sponsored results are certification sellers (cprcare.com at $9.99 to $14.95, local AHA class providers). Searchers on "cpr certification" want a card, not practice. For the ads campaign, bid on "cpr practice test", "cpr test questions", "aed quiz", "cpr exam questions", and add "certification", "classes", "near me", "online course", "wallet card" as negative keywords. Same negative-keyword pattern for BLS, OSHA, and forklift, where course sellers dominate.

### R7. Breadcrumbs and favicon render correctly
"quizbuffet.com › CPR / AED Certification" shows the BreadcrumbList is working and the favicon is picked up. No action.

---

## S. Brand query: "quiz buffet" does not return the site (2026-09-06)

Searching the domain itself, Google rewrote the query to "quiz buffet" and showed BuzzFeed, Quotev, Sporcle, and ProProfs food-quiz pages. quizbuffet.com was not on page one for its own name. The home page has 19 impressions in Search Console. This is the clearest sign the home page has no authority and the brand is not an entity Google recognizes.

### S1. Why it fails
- **Name collision.** "Quiz buffet" as two words is a generic food-quiz phrase with a decade of BuzzFeed content behind it. The AI Overview treats the query as food quizzes. Nothing on the site ever spells the name as two words, so Google has no reason to connect the query to the domain.
- **Brand missing from the home title.** The B7 rewrite made it "Free Certification Practice Tests: CompTIA, AWS, CISSP, CDL, CPR" with no brand. Fixed today: title is now "QuizBuffet: Free Certification Practice Tests" (og and twitter titles too).
- **No entity signals.** `sameAs` is empty, there is no About page, no social profiles, no listings on Crunchbase, LinkedIn, Product Hunt, or GitHub that name the site. Google builds brand entities from consistent third-party mentions; there are none.
- **Home page is thin and unlinked.** 72 crawlable words, zero crawlable cert links (E1, E2). Every cert page links to home only through the nav.
- **Zero external links.** Position 68 site-wide is consistent with no backlink profile at all.

### S2. Fixes, in order
3. Fill `sameAs` (E7) with real profiles: X, LinkedIn company page, YouTube, GitHub org, Crunchbase. Use the exact name "QuizBuffet" and the URL on every profile.
7. Get five to ten external mentions that use the brand name: Reddit wiki entries (K1), a Product Hunt launch, a Hacker News "Show HN", and directory listings. Brand search results move fastest on mentions, not on-page work.
8. Google Business Profile is not applicable (no address). Skip.
9. Track the brand query in Search Console monthly. Target: quizbuffet.com at position 1 for "quizbuffet" within 30 days, and page one for "quiz buffet" within 90.

### S3. Naming consideration
If the brand query still loses to BuzzFeed after S2, the name itself is the problem: "buffet" carries food intent Google will not drop. Options are to lean into a distinct one-word brand everywhere ("QuizBuffet" with a tagline that says certifications in the first three words) or to rename. Do not decide this before S2 has had 90 days.

---

## Suggested order of execution

Week 1 (before ads): A1, A2, A3, A4, A5, B1, B2, B3, B4, B5, B6, B8, C1 (the one page that already clicks), D1, D2, J2, E9. Rebuild, bump `sw.js`, request indexing on the 16 section-C certs.
Week 2: C1 to C21 FAQs and per-cert fields for the 16 certs, E1, E2, E3, J1, F3.
Weeks 3 and 4: G1, G2 for the 16 certs, L1 mock exam, E4 category pages, E5 About, K1, K2, K3 first two guides.
Ongoing: F1 for remaining certs, G5 and H3 fills, H1 em-dash pass, J3 to J5 performance, K4 to K7, M1 to M3.
