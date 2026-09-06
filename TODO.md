# QuizBuffet TODO

Audit date: 2026-09-06. Site ranks around position 68 for head terms. Search Console shows impressions on ~250 queries and 0 clicks. Ads campaign is about to start.

Completed items are collapsed to "Done (removed, number kept)" so numbering stays stable for everyone working from this file.

Scope (owner decision 2026-09-06): this list is about visibility (search, ads, brand, off-site). The question banks, answers, explanations, and app behavior are final and tested; nothing here may change them.

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

### A7. Verified correct at the code level; live Tag Assistant confirmation with a real click still worth doing but not expected to find anything. Read the actual line order in index.html rather than assuming: the `gh_spa_path` restore (`history.replaceState`, line 41) runs BEFORE every meaningful gtag call (`gtag('js', ...)`/`gtag('config', ...)` at lines 74-77, the conversion event at lines 81-86) — the opposite of what this item's original wording worried about ("gtag runs in `<head>` before the restore"). By the time gtag reads `location.search` to capture `gclid` for `_gcl_aw`, the URL has already been restored to the real path with the query string intact. If you want to double-check with a live click, `/comptia-security-plus/?gclid=test` in Tag Assistant should show `_gcl_aw` set, but the code path already confirms it should be.

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

### C1. Done (removed, number kept)

### C2. Done (removed, number kept)

### C3. Done (removed, number kept). Question fill is out of scope. QuickBooks ProAdvisor (about 90 impressions; dominant intent "is it free", "how to get it free from Intuit")
**File.** `js/data/certifications/quickbooks-proadvisor.js`.
1. Title is clipped mid-phrase ("...No"). With B1 it becomes "QuickBooks Online ProAdvisor Practice Test: 200+ Free Questions".
2. `faq`: "Is the QuickBooks ProAdvisor certification free?" (yes, free through the ProAdvisor program in QuickBooks Online Accountant), "How do I get QuickBooks ProAdvisor certification for free?", "What is on the ProAdvisor exam?" (sections, ~75 questions, 80 percent pass, 3 attempts), "How long does the ProAdvisor exam take?", "Do you need to be an accountant?", "How long is ProAdvisor certification valid?" (annual recertification), "What is the difference between ProAdvisor and Advanced ProAdvisor?", "Is there a QuickBooks proficiency test?".
3. Add an `about` paragraph that says "free" in the first sentence and names "Intuit" and "QuickBooks Online Accountant".
4. Fill the `reports` domain (14 questions) to at least 30.

### C4. Done (removed, number kept). Mock exam and question fill are out of scope. AWS Developer Associate (about 230 impressions across 15 phrasings, the largest single-cert opportunity)
**File.** `js/data/certifications/aws-developer-associate.js`.
1. `seoName`: "AWS Certified Developer Associate". Title: "AWS Certified Developer Associate Practice Exam: 500+ Free Questions".
2. Use "practice exam" as the primary noun on this page (queries say exam more than test). H1: "AWS Certified Developer Associate Practice Exam and Practice Tests (DVA-C02)".
3. `faq`: "How many questions are on the DVA-C02 exam?" (65, 130 minutes), "What is the passing score?" (720 of 1000), "How much does the AWS Developer Associate exam cost?" ($150), "Is the AWS Developer Associate hard?", "Is this a free AWS developer practice exam?", "How long is the certification valid?" (3 years), "What is the difference between Developer Associate and Solutions Architect Associate?", "Is there a mock test with a timer?" (link to the mock exam mode from L1 once built).
4. Build the timed mock exam mode (L1) and link it from the top of this page; "practice exam" intent is not satisfied by a question bank.
5. Raise question count toward 1000. It is the highest-demand AWS page and has 500.

### C5. [PARTIAL: faq additions done (voucher price, vs CAPM); studyGuide field/render feature not built] CompTIA Project+ (about 80 impressions: "project+", "comptia project", "project+ study", "project+ practice questions", "pk0-005 exam voucher")
**File.** `js/data/certifications/comptia-project-plus.js`.
1. `seoName`: "CompTIA Project+". Title: "CompTIA Project+ Practice Test: 812+ Free Questions (PK0-005)".
2. Add a "Project+ Study Guide" section: a study plan by domain, recommended order, and links to the four domain quizzes. Implement as an optional `studyGuide` field (array of paragraphs) rendered by `build-seo.mjs` under an H2 "Project+ Study Guide and Study Material".
3. `faq` already exists; add "How much is the PK0-005 exam voucher?" ($358 list; verify) and "Is Project+ worth it vs CAPM?".

### C6. [PARTIAL: faq built from scratch (voucher, difficulty vs Security+, free training, format, passing score, expiry); exam-objectives table not rendered] CompTIA PenTest+ (about 45 impressions: "comptia pentest+", "pentest+ exam", "pt0-003 exam voucher", "pentest+ exam objectives", "pentest+ free training")
**File.** `js/data/certifications/comptia-pentest-plus.js`.
1. `seoName`: "CompTIA PenTest+". Title: "CompTIA PenTest+ Practice Test: 2160+ Free Questions (PT0-003)".
2. Add an "Exam Objectives" H2 that lists the PT0-003 domains with weights (the `domains` array already has this; render it as a table with the official objective names).
3. `faq`: voucher price, "Is PenTest+ harder than Security+?", "Is there free PenTest+ training?" (answer: this site plus CompTIA's free objectives PDF), "How many questions and how long?" (max 90, 165 minutes), "Passing score?" (750 of 900), "Does PenTest+ expire?" (3 years).

### C7. Done (removed, number kept)

### C8. Done (removed, number kept)

### C9. Done (removed, number kept)

### C10. Done (removed, number kept)

### C11. Done (removed, number kept)

### C12. Done (removed, number kept)

### C13. Done (removed, number kept)

### C14. Done (removed, number kept)

### C15. Done (removed, number kept)

### C16. CPA AUD (queries: "aud exam", "aud cpa", "cpa audit exam", "aud cpa exam format", "aicpa aud blueprint")
`seoName`: "CPA AUD (Auditing and Attestation)". H1 currently has an em-dash. Add an "AUD Exam Format" section: 78 MCQs and 7 TBSs, 4 hours, scoring 75, and a link to the AICPA Blueprint PDF. Fill AUD to 300+ questions (286 now) and REG, BAR, TCP to 300+ (100 to 124 now).

### C17. Done (removed, number kept)

### C18. Done (removed, number kept)

### C19. Done (removed, number kept)

### C20. Voucher and price queries (dop-c02, soa-c03, pt0-003, pk0-005 "exam voucher")
`cert-prices.csv` has an `exam_fee_usd` column, mostly empty. Fill it for all 51 live certs from official sources, then render an "Exam cost" line in the details block and an FAQ item "How much does the X exam cost and where do you buy a voucher?" per cert. Consider an affiliate link where one exists (CompTIA store, Pearson VUE).

### C21. Cross-cutting modifiers
- "free" must appear in title, H1 or first sentence, and description. Titles have it after B1 ("Free Questions").
- "online" appears in 8 queries. Add to descriptions (B5) and the intro (B6).
- "mock test", "mock exam" appear for AWS, BLS, ITIL, CISSP. Add to intro (B6) and build L1.
- "practice questions" is used mostly for Project+ and NASM; keep it as a secondary phrase, not the title noun.

### C22. Out of scope by owner decision 2026-09-06: questions, answers, and app behavior are final and tested. This list covers visibility only. (number kept)

---

## D. Freshness and dates (P1)

### D1. Done (removed, number kept)

### D2. Done (removed, number kept)

### D3. Done (removed, number kept)

### D4. Done (removed, number kept)

---

## E. Home page (P1)

### E1. Done (removed, number kept)

### E2. Done (removed, number kept)

### E3. Done (removed, number kept)

### E4. Category landing pages
Create `/it-certifications/`, `/cybersecurity-certifications/`, `/cloud-certifications/`, `/healthcare-certifications/`, `/trade-licenses/`, `/beauty-licenses/`, `/finance-certifications/`, `/safety-certifications/`. Generate them in `build-seo.mjs` from the category map: title "Free <Category> Practice Tests", 300 words of intro, the cert list with counts, `ItemList` JSON-LD, breadcrumb. Add them to the sitemap and link them from the home grid headings and the footer. These target "it certification practice tests" style queries and give the home page fewer, stronger internal links.

### E5. Done (removed, number kept)

### E6. Done (removed, number kept)

### E7. [PARTIAL: logo added; sameAs stays empty until K4 (off-site profiles) exists] `Organization` schema
`index.html` JSON-LD has `"sameAs": []`. Fill with real profile URLs once K4 is done. Add `"logo"` pointing at a 512px PNG (`/android-icon-192x192.png` is acceptable now).

### E8. Done (removed, number kept)

### E9. Done (removed, number kept)

### F1. Done (removed, number kept)

### F2. Done (removed, number kept). 47 certs render the table with an official source link; OSHA 10/30 and micropigmentation skipped by design.

### F3. Done (removed, number kept)

### F4. Study plan section
Optional `studyGuide` field (array of strings) rendered under "Study guide" (C5). Start with Project+, PenTest+, Security+, AWS Developer.

### F5. Markup confirmed correct against Google's documented requirements; rich-result eligibility itself needs Search Console monitoring, not more code. Checked the actual generated JSON-LD directly (option (a) from the original note): cert pages' `Course` already has `hasCourseInstance` with both `courseMode: "online"` and `courseWorkload` set, plus `name`/`description`/`provider`/`isAccessibleForFree`, everything Google's Course structured-data reference lists as required or recommended. Domain pages emit `Quiz`/`LearningResource` combined via `"@type": ["Quiz", "LearningResource"]` with `numberOfQuestions`/`educationalLevel`/`learningResourceType` set. Google's Rich Results Test itself is a JS-driven interactive tool with no scriptable API (confirmed: fetching it returns only the static tool shell, not a test result for a given URL), so the remaining open question here, whether Google's algorithm actually grants a rich result for quiz-shaped Course content, is a POLICY/eligibility judgment made after indexing, not a markup-validity question a script can answer. Track it in Search Console's Enhancements report over time instead (already noted in J7).

### F6. Done (removed, number kept)

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

### G2. Done (removed, number kept)

### G3. Done for the 42 certs with a services file; 52 domain pages on 8 certs without one have no key-terms block (number kept)

### G4. Done (removed, number kept)

### G5. Out of scope by owner decision 2026-09-06: questions, answers, and app behavior are final and tested. This list covers visibility only. (number kept)

### G6. Out of scope by owner decision 2026-09-06: questions, answers, and app behavior are final and tested. This list covers visibility only. (number kept)

---

## H. Content data quality (P2)

### H1. Out of scope by owner decision 2026-09-06: questions, answers, and app behavior are final and tested. This list covers visibility only. (number kept)

### H2. Done (removed, number kept)

### H3. Out of scope by owner decision 2026-09-06: questions, answers, and app behavior are final and tested. This list covers visibility only. (number kept)

### H4. Out of scope by owner decision 2026-09-06: questions, answers, and app behavior are final and tested. This list covers visibility only. (number kept)

### H5. Out of scope by owner decision 2026-09-06: questions, answers, and app behavior are final and tested. This list covers visibility only. (number kept)

### H6. Out of scope by owner decision 2026-09-06: questions, answers, and app behavior are final and tested. This list covers visibility only. (number kept)

---

## I. Coming-soon and empty certs (P2)

### I1. 40 coming-soon stubs (visibility only: keep noindexed or delete; filling questions is out of scope)
Note (2026-09-06): CompTIA ITF+ (FC0-U61) retired July 31, 2025 and was replaced by Tech+ (FC0-U71). The ITF+ page now says so in its FAQ. Add Tech+ as a cert (new metadata, reuse the ITF+ bank as a starting point, add AI/cloud/modern-device objectives) and consider redirecting or cross-linking ITF+ to it.
They are correctly `noindex` and excluded from the sitemap (`buildSitemap` comments confirm). They still link from the home marquee. Decide per cert: ship or delete. Prioritize by demand: PMP, CNA, ServSafe Manager (if not live), CAPM, AZ-305, Google certificates, EMT, Phlebotomy, Medical Assistant. Delete the rest of the folders so they stop consuming crawl budget via internal links.

### I2. Coming-soon marquee
`#cs-marquee` on the home page promotes pages that cannot be indexed. Replace with the "Most practiced" section (E3) or drop it.

---

## J. Technical SEO and performance (P2)

### J1. Done (removed, number kept). Also fixed a pre-existing overflow bug uncovered along the way: long cert/domain names (CISSP's full name, CPA/AWS domain titles up to 75 chars) ran off the right edge of the 1200x630 canvas at fixed font sizes. Added a shared greedy word-wrap so long titles drop to a smaller size and wrap instead of clipping off-canvas, in all three OG builders (live cert, domain, coming-soon).

### J2. Done (removed, number kept)

### J3. Done (removed, number kept). `index.js` had grown to 226 KB raw / 51 KB gzipped by the time this ran (more fields added this session than when the TODO was written), and every one of the 13 browser files that import it was traced field-by-field first (see the session's investigation) to confirm which fields are read while scanning ALL certs (home grid, nav count, related-certs matching, progress views) versus only after narrowing to ONE cert. `scripts/build-certs.mjs` was rewritten from a regex text-splice to a real per-cert dynamic import so it can field-pick: `index.js` now carries only `slug, name, code, vendor, category, tagline, domains` (54 KB raw / 9.8 KB gzipped, an 81% cut on every single page), and a new `js/data/certifications/full/<slug>.js` per cert (about, details, officialSources, affiliates, udemyCourseUrl, extraUdemyCourses; ~200 KB total across all 50, never fetched together) is lazy-loaded exactly like acronyms/services, in `initCertification.js` and in the home-grid hover preview (`certPreview.js`, which read `about`/`details` too and needed the same treatment). `exam`, `faq`, `guide`, and the `seo*` override fields are read only by `build-seo.mjs` at build time, never by any browser file, so they stay out of both bundles entirely; `build-seo.mjs` now reads the per-cert source files directly instead of the (now-light) generated bundle. Verified with a local dev server under headless Chrome: cert pages fetch the light bundle plus their own full/<slug>.js (confirmed 200 in the network log) and render the same About/affiliate content as before; domain pages (271 of the site's pages) fetch only the light bundle and never touch any full/<slug>.js at all. Zero console/runtime errors on either.

### J4. Assessed, deliberately not done this pass. The 155 KB figure in this item is the uncompressed on-disk size; Cloudflare already gzips it to ~29.5 KB transferred (confirmed via curl during J6/J11), so the real network cost is much smaller than it looks. Lighthouse's `unused-css-rules` audit on a cert page confirms 24.3 KB of that 29.5 KB (82%) goes unused on that specific page, which is a real, non-trivial number, but splitting the file safely (core vs. per-page-type CSS) requires the same kind of exhaustive cross-theme, cross-page-type verification that J5's font work needed three rounds and two sessions to get right (`.section-title`/`.domain-weight`/the SPA shell's runtime-injected classes all turned out to be less obviously scoped than a first read of css/style.css suggested). Given 24 KB is smaller than the wins already banked this session (56 KB font, ~41 KB JS) and the verification cost is comparably high, this is lower priority than it looks from the raw KB figure alone. Worth doing with the same rigor as J5 if picked up later, not a quick pass.

### J5. Done (removed, number kept). Final resolution 2026-09-06: static grep misses it, but the SPA cert shell (`js/app.js` SHELLS.cert) injects `<h2 class="section-title">Exam Domains</h2>` on every cert page and `.domain-weight` badges use the same font, confirmed in the live runtime DOM. So home and the 50 cert pages keep IM Fell English SC; domain, quiz, and coming-soon pages (312) omit it. Any further font work is self-hosting, not removal.

### J6. Baseline recorded 2026-09-06 (mobile Lighthouse, simulated throttling, against production). Re-run after J3 to J5, target 90+ performance / 100 SEO.
| Page | Perf | SEO | LCP | FCP | CLS | TBT | Speed Index |
|---|---|---|---|---|---|---|---|
| `/` | 60 | 92 | 7.4s | 4.9s | 0 | 80ms | 6.6s |
| `/comptia-security-plus/` | 69 | 92 | 6.2s | 3.8s | 0 | 50ms | 3.8s |
| `/comptia-security-plus/general-security-concepts/` | 65 | 92 | 6.8s | 4.3s | 0 | 90ms | 4.3s |
| `/comptia-security-plus/general-security-concepts/quiz/` | 65 | 92 | 6.8s | 4.1s | 0 | 70ms | 4.9s |

SEO stuck at 92 on every page for one reason only: the `robots-txt is not valid` audit, caused entirely by Cloudflare's injected robots.txt (see J10), not fixable from this repo.

**Re-run after J3 + J5 (partial), same methodology, against production once both had deployed:**
| Page | Perf | LCP | FCP | TBT | Speed Index |
|---|---|---|---|---|---|
| `/` | 65 | 7.3s | 3.8s | 90ms | 5.3s |
| `/comptia-security-plus/` | 64 | 7.3s | 4.1s | 40ms | 5.3s |
| `/comptia-security-plus/general-security-concepts/` | 66 | 6.6s | 4.3s | 60ms | 4.3s |

J11 (found investigating why cert dipped above) landed after this table was recorded and is the real story: local before/after under J11 itself showed cert 64→94 perf / 6.4s→2.7s LCP and domain 66→99 perf / 6.6s→2.1s LCP. Worth one more production re-run once J11 has deployed and propagated, to get a final, honest end-of-session number instead of the mid-fix snapshot above.

Home and domain nudged up; cert nudged down (69→64) despite J3 provably cutting its JS payload (confirmed: `js/data/certifications/index.js` really is 54 KB vs 226 KB on disk, verified live). Do not read that as J3 regressing anything: see J11, the actual cause. Re-ran the cert page twice to rule out a fluke; both runs landed at 64 with the same root cause each time.

Diagnosis on `/` (69 requests, 605 KB transferred): LCP element is the hero headline text (`p.hero-headline`), not an image, so this is a text-render delay, not image weight. No single audit is red (render-blocking-resources and font-display both score 1, longest critical chain is 782ms/depth 5), so this reads as death-by-many-requests under throttling rather than one blocking villain. By resource type: Script 33 requests / 378 KB (unused-javascript audit estimates 130 KB of it is never used on this page), Font 6 requests / 182 KB, Stylesheet 2 requests / 31 KB transferred (the 155 KB figure in J4 is uncompressed on-disk size; Cloudflare already gzips it to 29 KB over the wire, confirmed via curl, so J4 has much less real-world impact than it looks and should rank behind J3 and J5). JS execution itself is cheap (bootup-time 0.4s, mainthread-work 2.4s) so the cost is fetch/waterfall overhead from 33 separate script requests, not CPU. This points at J3 (fewer, larger JS payloads) and J5 (182 KB of fonts) as the two fixes actually worth doing before re-measuring; J4 is real but lower-leverage than assumed.

### J7. Search Console hygiene
- Pages report: confirm 0 "Soft 404", 0 "Crawled, not indexed" on cert pages. Domain pages that are "Crawled, not indexed" are the thin-content problem (G1, G2).
- Request indexing for the 16 cert pages in section C after titles change.
- Submit the sitemap again after D1 so lastmod dates are real.
- Enhancements: check FAQ, Breadcrumb, and Course reports for errors after F5.

### J8. Done (removed, number kept). Validated feed.xml at the W3C feed validator: valid RSS, 0 errors, 0 warnings. Confirmed items already carry per-page pubDate from D1 (varied dates, not all TODAY). llms.txt/llms-full.txt "Last updated" is a single whole-file timestamp, not a per-page freshness claim like sitemap lastmod, so D1's "don't stamp every page TODAY" concern doesn't apply there; left as is.

### J9. Done (removed, number kept). Confirmed the legacy `/cert?cert=x`, `/domain?cert=x&domain=y`, `/quiz?cert=x&domain=y` shapes (js/app.js getPage()) are not real static files, so GitHub Pages serves them through 404.html, which returns HTTP 404 and carries `noindex, follow` with no canonical tag of its own, before the client-side history.replaceState to the clean URL ever runs. Google never indexes the query-string shape. index.html's own canonical is a static absolute `https://quizbuffet.com/`, unaffected by any query string on the root path. check:canonicals already confirms every real cert/domain page is self-referential and unique. No code change needed.

### J10. Done (removed, number kept). Cloudflare managed robots.txt turned off by the owner 2026-09-06; live robots.txt now serves the repo file only (verified with a cache-busted fetch: no GPTBot/ClaudeBot/CCBot disallows, no managed block). AI assistants can read the site and llms.txt again. The edge cache may serve the old file for up to 4 hours to some visitors.

### J11. Done (removed, number kept). The re-measurement in J6 showed cert-page performance dip slightly (69→64) even though J3 verifiably shrank its JS payload, and digging into why surfaced a real, pre-existing bug: **on cert and domain pages, Lighthouse reports the LCP (Largest Contentful Paint) element as the cookie-consent banner text (`body > div#qb-consent > p`, "We use Google Analytics..."), not any actual page content.** Confirmed with the `largest-contentful-paint-element` audit on both page types, two separate runs each. Home page is unaffected (its LCP element is correctly `p.hero-headline`).
Root cause, traced through the actual markup and CSS: cert/domain pages render real, crawlable content into `<section id="seo-static">` in the static HTML (H1, exam table, domain list, all immediately present, TTFB-fast) specifically for SEO and no-JS visitors. But `css/style.css:11` has `html.js #seo-static { display: none; }` — the instant JS is detected as running (essentially every real visitor), that entire section is hidden, and the visitor has to wait for the SPA's JS to boot and rebuild equivalent content into the empty `<div id="app">` sibling from scratch. The cookie-consent banner is deliberately rendered from an idle callback (`js/app.js`, documented in CLAUDE.md) so it never blocks anything important, but on these two page types the "real" replacement content is evidently even slower to appear than that idle-deferred banner, so Lighthouse (and, more importantly, Google's real Core Web Vitals field data, which is a confirmed ranking factor) ends up measuring the site's LCP against a 384x78px cookie notice instead of the page's actual content. Render Delay alone accounts for 93% of the reported LCP time (~6s) on cert pages; TTFB is a non-issue (450-480ms).
This is not something J3/J5 caused (neither touches `#seo-static`, `#app`, or the consent banner) and explains the cert-page score noise in J6 as measurement instability, not a real regression: whichever incidental small element happens to be "largest so far" wins LCP when the page's real content is already this slow to reappear post-hydration, for reasons that predate this session.

**Fixed 2026-09-06, option (a) from the original note.** Traced exactly what sets `html.js`: an inline `<head>` script that runs synchronously, before any page content exists, on every cert/domain/coming-soon page (`document.documentElement.classList.add('js')`). Removed that call from the cert and domain `<head>` templates in build-seo.mjs (left it untouched on coming-soon, where it's a no-op either way: `html.js[data-coming-soon] #seo-static{display:block}` cancels the hide, per line 12). Added the same `classList.add('js')` call instead to `js/pages/certification/initCertification.js` and `js/pages/domain/initDomain.js`, right after each page's first real write to `#app` (both the success path and the "not found" fallback path in each). Net effect: `#seo-static`'s real, fast, TTFB-present content stays visible as the initial paint instead of disappearing into a blank gap, and only gets swapped out once the SPA has something real to replace it with, all in one JS tick.
Verified against a local server that serves literal files (no SPA-fallback rewriting, matching how GitHub Pages actually behaves), before/after, same methodology as the rest of J6:
| Page | Perf before → after | LCP before → after | FCP before → after | CLS |
|---|---|---|---|---|
| `/comptia-security-plus/` | 64 → 94 | 6.4s → 2.7s | 4.1s → 2.1s | 0 → 0 |
| `/comptia-security-plus/general-security-concepts/` | 66 → 99 | 6.6s → 2.1s | 4.3s → 1.5s | 0 → 0 |

Zero console/runtime errors, zero failed network requests, home page unaffected (99 perf, 2.0s LCP, unchanged), coming-soon page confirmed still shows its static content immediately (unaffected). LCP's reported element is still the consent banner even after this fix, not `#seo-static`'s content, likely because the browser stops counting an element as a valid LCP candidate once it is later hidden (which still happens, just much sooner after real content exists instead of immediately at boot) — worth a follow-up look, but the wall-clock numbers above are the real, user-facing win regardless of which element gets the LCP attribution credit.

**Production deploy confirmed live, and a more honest production number.** Chased what looked like a stuck deploy for a while: repeat `grep -c "classList.add('js')"` checks against production kept returning a false positive, because the explanatory comment this fix added to build-seo.mjs's `<head>` template literally contains the string `classList.add('js')` while describing what not to do there. Grepping for the actual executable pattern (`<script>document.documentElement.classList.add('js');try`) confirmed 0 matches in both the local file and production — the fix was live well before the owner's Cloudflare cache purge, which likely fixed nothing that was actually broken (but did no harm).
With the deploy confirmed live, ran Lighthouse against production 5 times to get a real (not single-sample) picture:
| Run | Perf | LCP | LCP element |
|---|---|---|---|
| 1 | 63 | 7.7s | consent banner |
| 2 | 57 | 4.0s | real `#seo-static h1` |
| 3 | 76 | 1.1s | real `#seo-static h1` |
| 4 | 68 | 5.9s | consent banner |
| 5 | 76 | 1.7s | real `#seo-static h1` |

Median: 68 perf / 4.0s LCP, with real content winning the LCP race in 3 of 5 runs — a result that never occurred in any pre-fix production run tested earlier in this session (every one showed the consent banner). Real, but smaller and noisier than the clean 94-99 perf / 2.1-2.7s seen on a local, zero-latency test server: that number was optimistic specifically because it had none of production's real DNS/TLS/CDN-routing latency to compound across the ~40 script requests a cert page still makes. The fix removes the *guaranteed*-bad case (real content hidden immediately, every single load); it does not remove the *possible*-bad case where an unusually slow network run still lets the idle-deferred consent banner win the race before `#app` finishes rendering. Narrowing that further means fewer/smaller JS requests specifically (J3's lever, not J11's) — worth revisiting with more data if this variance still matters.

### J12. NEW FINDING, information/decision only, not a bug to fix in code. Broke down the "~378 KB / 44 script requests" figure that has anchored J3/J5/J11's diagnosis all session, by resource, on a real production run. Two requests dominate everything else combined: `googletagmanager.com/gtag/js?id=G-YRKFB3WT9C` (190 KB gzipped) and the Google Ads conversion extension it loads on top for `AW-17221241617` (163 KB gzipped) — 353 KB of the ~378 KB total. Every one of this session's own first-party JS files (all ~35 of them: `js/app.js`, every `render*.js`, every loader/util) is under 5 KB, most near-zero. Confirmed this is not the "second gtag.js copy" bug CLAUDE.md's consent section warns about: there is exactly one `<script src="...gtag/js...">` tag in the HTML; the second, larger fetch is the base library's own dynamic Ads-conversion extension, loaded because `gtag('config', 'AW-17221241617')` is called, not a hand-authored duplicate.
This means: the dominant cost on every page's JS weight is Google's own GA4 + Ads library code, which cannot be minified, split, or otherwise reduced from this repo — it is fixed overhead of using gtag.js for both GA4 and Ads conversion tracking together (the exact setup A1-A7 exist to get working correctly). J3 and J5's real, verified savings (81 KB and 56 KB respectively) were both real wins, but against this backdrop they were trimming a comparatively small slice of total page weight; the ~350 KB of Google-owned script was never in scope for either fix and explains why the site's own performance work has a ceiling that further first-party trimming cannot cross.
The one lever that IS within this repo's control is *when* this script loads and executes, not its size — currently `async`, which is already reasonable. Deferring it further (e.g., past first paint, or behind a longer idle window) could shave real time off LCP/TBT, but Google's own Consent Mode v2 and conversion-tracking guidance wants consent signals and config calls sent as early as possible for compliance and attribution accuracy — the same accuracy this session's A-section (Ads readiness, blocking ad spend) treats as the higher priority. This is a real speed-vs-measurement-accuracy tradeoff, not a free optimization, and CLAUDE.md explicitly flags this whole area "do not regress" — flagging for the owner to decide rather than changing the loading strategy unilaterally.

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

### L1. Out of scope by owner decision 2026-09-06: questions, answers, and app behavior are final and tested. This list covers visibility only. (number kept)

### L2. Out of scope by owner decision 2026-09-06: questions, answers, and app behavior are final and tested. This list covers visibility only. (number kept)

### L3. Out of scope by owner decision 2026-09-06: questions, answers, and app behavior are final and tested. This list covers visibility only. (number kept)

### L4. Out of scope by owner decision 2026-09-06: questions, answers, and app behavior are final and tested. This list covers visibility only. (number kept)

### L5. Out of scope by owner decision 2026-09-06: questions, answers, and app behavior are final and tested. This list covers visibility only. (number kept)

---

## M. Process and maintenance (P3)

### M1. Ship weekly
No commits between mid-June and September. After D1, lastmod dates are honest, so they only help if content actually changes. One domain fill or one guide per week is enough.

### M2. Done. Added `scripts/audit.mjs` / `npm run audit`. My first version also hard-failed on 0-question domains and warned on under-30 ones; a later pass in this same session (1cf39aa8) correctly dropped both, on the grounds that question-bank content is out of scope entirely per the owner's decision, and even a non-blocking warning about it is still commenting on something this list isn't supposed to touch. Current version hard-fails only on build-integrity issues: a missing domain JSON file, a missing OG PNG, an em-dash/en-dash in generated HTML, a cert page `<title>` that doesn't reference the cert's own name/seoName/code, or a `dateModified` of `TODAY` when the underlying source file's real git date is older (catches exactly the stale-freshness regression D1 fixed). The same pass also discovered `.github/workflows/deploy.yml` already stamps `sw.js` with the commit short-SHA on every push to `main` — the manual "bump sw.js" step in the flip-live workflow (CLAUDE.md) was never actually necessary and has been replaced there with "run `npm run audit`".

### M3. Monthly Search Console export
Save the top-queries CSV to `docs/gsc/YYYY-MM.csv`. Use it to pick the next FAQs and guides. Compare click-through by page after each title change.

### M4. Done (removed, number kept). Consent two-call shape was already documented from an earlier pass. Added: the `certifications/index.js` light/full split and its `LIGHT_FIELDS`/`FULL_FIELDS` contract (J3), a real "Exam field" subsection for `seoName`/`seoTitle`/`seoH1`/`seoDescription`/`exam` (the cert-scaffolding step 1 already referenced "Exam at a Glance" without it existing anywhere), the PNG OG requirement (J1), the `html.js`/`#seo-static` timing rule so a future page template does not reintroduce the bug J11 just fixed, and a new "Per-page freshness dates" section explaining the `lastCommitDate`/`firstPublishDate` mechanism and why `llms.txt` is a deliberate exception to it. `objectives` was not documented since it does not exist as a real field anywhere in the codebase (G1's proposal, never implemented, and G1 itself is out of scope per the owner's no-new-content decision).

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
