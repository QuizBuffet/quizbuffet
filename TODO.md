# QuizBuffet TODO

Audit date: 2026-09-06. Site ranks around position 68 for head terms. Search Console shows impressions on ~250 queries and 0 clicks. Ads campaign is about to start.

Scope (owner decision 2026-09-06): this list is about visibility (search, ads, brand, off-site). The question banks, answers, explanations, and app behavior are final and tested; nothing here may change them.

Renumbered 2026-09-06 after removing every completed, decided, and out-of-scope item. Analysis notes are kept at the end for reference.

Priority key: **P1** = do before ads spend. **P2** = next 30 days. **P3** = ongoing.
After any change to `scripts/build-seo.mjs` or cert metadata: run `npm run build:seo` and `npm run audit`, then spot-check one cert page, one domain page, and the home page. The deploy workflow stamps the service worker version automatically.

---

Sections:
A. Ads readiness (P1, block spend until done)
B. Home page (P1)
C. Technical SEO and performance (P2)
D. Authority and off-site (P2/P3)
E. Process and maintenance (P3)
F. Search Console page analysis (2026-09-06)
G. Search Console country analysis (2026-09-06)
H. Search Console device analysis (2026-09-06)
I. Search Console daily trend analysis (Jun 5 to Sep 4, 2026)
J. SERP inspection of quizbuffet.com/cpr-aed/ (2026-09-06, Google, Stonecrest GA)
K. Brand query: "quiz buffet" does not return the site (2026-09-06)

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

### A2. Link GA4 to Google Ads
In GA4 Admin > Product links > Google Ads links, link the account. Mark `domain_complete` as a key event in GA4 (Admin > Events > toggle). Import it in Google Ads as a backup conversion. This survives even if A1 labels are misconfigured.

### A3. Choose landing pages
- Send every ad group to its cert page (`/comptia-security-plus/`), never to `/`. Cert pages have 1000+ words and match the query. Home has 72 crawlable words.
- For the CPR/AED and BLS ad groups, land on the new AED page from C1 once it exists.
- Add `?utm_source=google&utm_medium=cpc&utm_campaign=<cert>` in the final URL suffix at the account level.

---

## B. Home page (P1)

### B1. [PARTIAL: logo added; sameAs stays empty until D3 (social profiles) exists] `Organization` schema
`index.html` JSON-LD has `"sameAs": []`. Fill with real profile URLs once K4 is done. Add `"logo"` pointing at a 512px PNG (`/android-icon-192x192.png` is acceptable now).

---

## C. Technical SEO and performance (P2)

### C1. Owner action after recrawl. In Search Console: request indexing for the home page, /practice-tests/, /guides/, and the 16 section-C cert pages; check Pages for "Crawled, currently not indexed" on domain pages two weeks after; confirm the FAQ and Breadcrumb enhancement reports show no errors; resubmit the sitemap once.

---

## D. Authority and off-site (P2/P3)

At position 68, authority is the ceiling once on-page is fixed. Nothing in the repo addresses this.
### D1. Community listings
Post the specific domain quiz (not the home page) where the question is already being asked: r/CompTIA, r/AWSCertifications, r/cissp, r/ITCareerQuestions, r/Truckers (CDL), r/EMS and r/nursing (BLS/CPR), r/Cosmetology, r/barbers, r/personaltraining, r/Accounting (CPA), r/loanoriginators (MLO), r/drones (Part 107). Ask moderators to add the site to subreddit wikis and sidebars.

### D2. Answer questions with links
Quora, Reddit, and Stack Exchange threads on "free X practice test". Two or three per week. Link to the exact domain page that answers the question.

### D3. Social profiles
Create X, LinkedIn page, and YouTube (short "5 questions in 60 seconds" clips per cert). Fill `sameAs` (E7).

### D4. Non-English demand
ITIL queries in Spanish and Portuguese ("examen itil quiz", "simulado itil"). Later: translate the ITIL and CCNA intro copy and FAQ into es and pt-BR under `/es/itil-foundation/` with `hreflang`. Only after English is ranking.

### D5. Per-state pages
Real estate, cosmetology, barber, and MLO are state-licensed. "georgia real estate practice test" is already appearing. Add state variants (`/real-estate-license/georgia/`, `/texas/`, ...) generated from a state table (exam vendor, question count, passing score, fee) with the same question bank plus state-specific FAQs. Large long-tail opportunity; do after the core is fixed.

---

---

## E. Process and maintenance (P3)

### E1. Ship weekly
No commits between mid-June and September. After D1, lastmod dates are honest, so they only help if content actually changes. One domain fill or one guide per week is enough.

### E2. Monthly Search Console export
Save the top-queries CSV to `docs/gsc/YYYY-MM.csv`. Use it to pick the next FAQs and guides. Compare click-through by page after each title change.

### E3. Keep this file current
Check off items with the commit hash that closed them. Delete items that turn out to be wrong rather than leaving them unchecked.

---

---

## F. Search Console page analysis (2026-09-06)

Top pages by impressions: cpr-aed 205 (4 clicks), aws-developer-associate 205, quickbooks-proadvisor 160, comptia-project-plus 103, isc2-cissp 55, comptia-pentest-plus 54, comptia-security-plus 54, nmls-mlo 53, itil-foundation 40, bls 30, microsoft-az-104 24, forklift 23, nasm 21, cpa-far 19, home 19, osha-30 18, osha-10 18, cpa-aud 13.

### F1. Cert pages carry all the impressions; domain pages carry almost none
273 domain pages share roughly 60 impressions in total, and most have zero. Google has indexed them but does not consider them answers to anything. Causes: titles are the cert template plus a domain name (no query language), ~300 words, 3 sample questions, and near-identical structure across 273 pages. Fixes are B3, G1, G2, G3. Prioritize the domain pages that already show impressions: cpr-aed/aed-operation, cpr-aed/adult-cpr, cpr-aed/assessment-and-recognition, cpr-aed/special-situations-and-recovery, faa-part-107/operations-over-people, cpa-aud/forming-conclusions-and-reporting, cpa-far/select-balance-sheet-accounts, bls/pediatric-bls-children-and-infants, aws-solutions-architect-associate/design-high-performing-architectures, cdl-class-a/combination-vehicles, osha-10-construction/struck-by, nmls-mlo/mortgage-loan-origination-activities.

### F2. The home page barely surfaces (19 impressions, 0 clicks)
For a 51-cert site the home page should be the strongest URL. It has 72 crawlable words and no crawlable cert links (done). Until fixed, do not send ads there (A6).

### F3. CPR/AED is the only page that clicks
Click-through on cpr-aed is 4 of 222 impressions (under 2 percent), which means average position around 8 to 12. It is the closest page to page one. Do C1 first; it is the fastest win on the site.

### F4. AWS Developer Associate: 205 impressions, 0 clicks
Same impression volume as CPR/AED with zero clicks means it sits lower (position 15+). The DVA-C02 title is the likely cause. The title and FAQ fixes are done; a timed mock exam would match the "practice exam" intent but is out of scope for now.

### F5. QuickBooks ProAdvisor: 160 impressions, 0 clicks
Query intent is "is it free". The page title is clipped and does not answer that. C3.

### F6. Pages with impressions but not in the query list
cpa-far (19), aws-security-specialty (11), micropigmentation (9), tattoo-license (9), aws-solutions-architect-associate (9). These have demand the query export truncated. Apply B1/B2 and write FAQs for cpa-far ("far cpa exam", "far exam format") and aws-security-specialty ("scs-c02 practice exam"). Micropigmentation and tattoo share beauty-license intent; use "quiz" and "state board" in titles (C17).

### F7. Domain page slugs that match real queries
- `cdl-class-a/combination-vehicles` (2 impressions) matches "class a combination practice test". `seoTitle`: "CDL Combination Vehicles Practice Test: Free Class A Questions".
- `bls/pediatric-bls-children-and-infants` (3). `seoTitle`: "Pediatric BLS Quiz: Child and Infant Basic Life Support Practice".
- `aws-solutions-architect-associate/design-high-performing-architectures` (3) matches "design high-performing architectures aws". Keep the objective name first in the title.
- `faa-part-107/operations-over-people` (4). `seoTitle`: "Part 107 Operations Over People Quiz: Category 1 to 4 Rules".
- `osha-10-construction/struck-by` (2). `seoTitle`: "OSHA Struck-By Hazards Quiz: Focus Four Practice Questions".
Add these as `seoTitle` overrides when doing B3.

### F8. body-piercing-license and ear-piercing-license each got 1 impression
Body piercing has 0 questions (H2) and is noindexed; the impression is stale. Ear piercing: confirm it has questions and a non-template title.

---

---

## G. Search Console country analysis (2026-09-06)

Totals: about 1,210 impressions, 2 clicks. United States 655 (54 percent), India 112, Canada 71, Netherlands 50, United Kingdom 47, Australia 34, Belgium 32, Philippines 23, Turkey 19, Vietnam 18. EEA countries combined about 115, plus UK 47, so roughly 13 percent of impressions come from places where consent must be denied by default. The other 87 percent are currently denied for no legal reason.

### G1. Consent scoping is confirmed worth doing (done)
87 percent of impressions are outside the EEA and UK. Every one of those visitors currently gets analytics and ads cookies denied and sees a consent banner they do not need. After A2 they are granted by default and see no banner. This directly improves ads measurement (US is the ads audience) and removes a layout element from the first paint for most visitors.

### G2. Google Ads geo-targeting
- Target United States, Canada, United Kingdom, Australia, New Zealand, Ireland only. Use "Presence" not "Presence or interest".
- Exclude India, Philippines, Vietnam, Bangladesh, Pakistan, Indonesia, Turkey, and the MENA countries from paid campaigns. Their impressions are for global IT certs (AWS, CompTIA, ITIL, CISSP) and they will click cheap ads at high volume without converting. Keep them for organic.
- US-only certs (CPR/AED, BLS, CDL, NMLS MLO, real estate, cosmetology, barber, OSHA, forklift, insurance, EPA 608) get US-only ad groups.
- Set the account time zone and currency to US before creating campaigns; it cannot be changed later.

### G3. Say "United States" on US-licensed cert pages
State- and federally-licensed certs (CPR/AED, BLS, CDL, MLO, real estate, cosmetology, barber, tattoo, OSHA, forklift, EPA 608, insurance, FAA) should name the country in the intro and in one FAQ ("Is this the US CPR test?"). It helps Google match US queries and reduces irrelevant impressions from India and the Philippines for those pages. Add a `country: 'US'` field to those cert metadata files and have `build-seo.mjs` render "United States" in the first paragraph and set `"areaServed": "US"` in the JSON-LD.

### G4. India (112 impressions, second market)
Impressions are for AWS, CompTIA, ITIL, and CISSP. Cheap, useful organic traffic. Two small additions per global IT cert FAQ: exam fee in local terms ("$150 USD, paid to AWS through Pearson VUE, available in India") and "Can I take the exam online from outside the US?" (yes, OnVUE). No hreflang, no translation; Indian searchers use English.

### G5. Canada (71 impressions)
Canadian searchers land on US-specific pages that will not match their exam. CPR in Canada is Red Cross or Heart and Stroke Foundation, forklift is CSA B335, CDL is provincial. Later (with K7 per-state pages): add `/cpr-aed/canada/` style variants, or at minimum a one-line note on those pages that the content follows US (AHA, OSHA, FMCSA) standards.

### G6. Netherlands and Belgium (82 combined) are anomalously high
For a US-focused English site, NL and BE at 50 and 32 impressions each exceed Germany (8) and France (4). Likely causes: ITIL and AWS demand (both are large certification markets there), or your own testing traffic. Check Search Console Queries filtered to Netherlands. If it is ITIL, the ITIL page (C13) gains a small "Is ITIL 4 Foundation available in Dutch?" FAQ. If it is your own browsing, ignore.

### G7. Spanish-speaking countries (Mexico 12, Spain 11, Argentina 2, Colombia 1) plus "examen itil quiz"
Small but consistent. Ties to K6. Do nothing until English pages rank.

### G8. No hreflang needed
All content is English for a single market. Do not add hreflang or country subfolders until per-country content exists (O5, K6).

---

---

## H. Search Console device analysis (2026-09-06)

Desktop 1,133 impressions (94 percent), mobile 68 (6 percent), tablet 1. Certification practice-test queries are normally 50 to 70 percent mobile. A 94 percent desktop share means Google is largely not showing the site on mobile, or ranks it much lower there. Some of the top certs (AWS Developer, CISSP, QuickBooks) skew desktop, but not enough to explain this.

### H1. Check mobile Core Web Vitals in Search Console
Open Experience > Core Web Vitals > Mobile. If URLs are "Poor" or "Needs improvement", the causes are J3 (129 KB cert bundle on every page), J4 (155 KB CSS), and J5 (three font families with preloads). Record LCP, INP, and CLS for a cert page and a domain page here before and after those fixes.

### H2. Run the mobile-friendly checks
- Lighthouse mobile on `/`, `/cpr-aed/`, `/cpr-aed/aed-operation/`, and a quiz route (J6). Look specifically for tap targets too close, text too small, and content wider than the screen.
- Check the coming-soon marquee, sponsor block, and empty ad slots on a 375px viewport; anything that pushes the H1 below the fold on mobile hurts.
- Confirm the quiz answer buttons are at least 44px tall on mobile.

### H3. Verify mobile rendering matches desktop
Google indexes the mobile render. Use URL Inspection > Test Live URL > View tested page on a cert page and confirm the FAQ section, domain list, and sample questions are present in the rendered HTML. If anything is hidden on mobile by CSS (`display:none` under a max-width query), Google may discount it.

### H4. Ads implication
Until P2 and P3 are clean, run the first campaigns with a desktop bid adjustment of +0 and mobile at -30 percent, then revisit after mobile vitals improve. A poor mobile landing page experience lowers Quality Score and raises CPC on mobile.

---

---

## I. Search Console daily trend analysis (Jun 5 to Sep 4, 2026)

### I1. No weekday or weekend effect
Mean impressions per day: Mon 12.5, Tue 11.2, Wed 16.3, Thu 14.5, Fri 10.7, Sat 12.0, Sun 14.5. Weekday average 13.0, weekend average 13.2. There is no day-of-week correlation. Do not schedule ads or content around weekdays; volume is flat across the week.

### I2. There is a strong time trend that tracks the commit history
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

### I3. What to do with this
- Ship the section B title changes and the section C FAQs in one deploy, then watch the next two weeks. Expect a bump similar to mid-June, then hold it with weekly changes (E1).
- Add the FAQ to the certs that already carry impressions but have no FAQ: cpr-aed, quickbooks-proadvisor, isc2-cissp, comptia-pentest-plus, nmls-mlo, itil-foundation, bls, microsoft-az-104, forklift-certification, personal-trainer-nasm, cpa-far, cpa-aud, osha-10, osha-30. The three that got FAQs in June (Project+, Security+, AWS Developer) are three of the top seven pages by impressions now.
- Ads timing: the seasonal demand window is open now (late August through October). Start campaigns as soon as section A is done rather than waiting for every P2 item.
- Baseline for measuring the next changes: 9.5 impressions per day (Jul 3 to Aug 24), 16.7 per day in the last full week of August.

---

## J. SERP inspection of quizbuffet.com/cpr-aed/ (2026-09-06, Google, Stonecrest GA)

### J1. Google is rewriting the titles it does not like
On-disk title for the CPR page is "300+ Free CPR/AED Practice Questions, No Signup". Google displays "CPR / AED Certification (CPR/AED) Free Practice Test", which is the H1. Same for NASM ("Certified Personal Trainer (NASM-CPT) - QuizBuffet"), CPA AUD ("CPA — Auditing and Attestation (AUD) - QuizBuffet"), OSHA 30 ("OSHA 30-Hour Construction - QuizBuffet"), and the home page ("QuizBuffet: Free Practice Tests for IT, Cloud, Cybersecurity ..."). Google rewrites titles it judges as boilerplate, keyword-led, or not descriptive of the page. It kept the template only for BLS and ANS-C01. Conclusion: the "N+ Free CODE Practice Questions, No Signup" template is being rejected by Google on most pages, which independently confirms B1. When Google substitutes the H1, the H1 quality matters as much as the title; B4 applies.

### J2. The index is stale: last crawl mid-June to early July
Snippet bylines read "Jun 17, 2026" and "Jul 2, 2026". Those are the visible "Last updated" bylines of the indexed copies. Domain-page titles in the SERP ("Adult CPR — CPR / AED Certification (CPR/AED) Free Practice Test") are from a build older than the current template. Google has not recrawled these pages in two months despite the sitemap claiming every URL changed today. That is the D1 problem in practice: a sitemap where every lastmod is always today gets ignored. After the week-one deploy, use URL Inspection > Request indexing on the 16 section-C cert pages; do not wait for the sitemap.

### J3. Doubled code parentheticals in indexed copies
"Certified Personal Trainer (NASM-CPT) (NASM-CPT) practice test" and "CPR / AED Certification (CPR/AED)" appear in indexed descriptions. The current build has a `codeTag` dedupe, so this is fixed on disk but not in the index. Confirm after recrawl. Also confirm `cert.name` values never embed the code themselves.

### J4. "People also ask" for this query, verbatim
- Where can I find free CPR test questions and answers?
- Can you do CPR and AED training online?
- What to know to pass a CPR test?
- Which comes first, CPR or AED?
Add all four to the cpr-aed `faq` (C1) with these exact phrasings as the `q`. The first one is the site's whole value proposition; answer it in two sentences and name the page.

### J5. Commercial competition on CPR queries
The sponsored results are certification sellers (cprcare.com at $9.99 to $14.95, local AHA class providers). Searchers on "cpr certification" want a card, not practice. For the ads campaign, bid on "cpr practice test", "cpr test questions", "aed quiz", "cpr exam questions", and add "certification", "classes", "near me", "online course", "wallet card" as negative keywords. Same negative-keyword pattern for BLS, OSHA, and forklift, where course sellers dominate.

### J6. Breadcrumbs and favicon render correctly
"quizbuffet.com › CPR / AED Certification" shows the BreadcrumbList is working and the favicon is picked up. No action.

---

---

## K. Brand query: "quiz buffet" does not return the site (2026-09-06)

Searching the domain itself, Google rewrote the query to "quiz buffet" and showed BuzzFeed, Quotev, Sporcle, and ProProfs food-quiz pages. quizbuffet.com was not on page one for its own name. The home page has 19 impressions in Search Console. This is the clearest sign the home page has no authority and the brand is not an entity Google recognizes.

### K1. Why it fails
- **Name collision.** "Quiz buffet" as two words is a generic food-quiz phrase with a decade of BuzzFeed content behind it. The AI Overview treats the query as food quizzes. Nothing on the site ever spells the name as two words, so Google has no reason to connect the query to the domain.
- **Brand missing from the home title.** The B7 rewrite made it "Free Certification Practice Tests: CompTIA, AWS, CISSP, CDL, CPR" with no brand. Fixed today: title is now "QuizBuffet: Free Certification Practice Tests" (og and twitter titles too).
- **No entity signals.** `sameAs` is empty, there is no About page, no social profiles, no listings on Crunchbase, LinkedIn, Product Hunt, or GitHub that name the site. Google builds brand entities from consistent third-party mentions; there are none.
- **Home page is thin and unlinked.** 72 crawlable words, zero crawlable cert links (done). Every cert page links to home only through the nav.
- **Zero external links.** Position 68 site-wide is consistent with no backlink profile at all.

### K2. Fixes, in order
3. Fill `sameAs` (E7) with real profiles: X, LinkedIn company page, YouTube, GitHub org, Crunchbase. Use the exact name "QuizBuffet" and the URL on every profile.
7. Get five to ten external mentions that use the brand name: Reddit wiki entries (D1), a Product Hunt launch, a Hacker News "Show HN", and directory listings. Brand search results move fastest on mentions, not on-page work.
8. Google Business Profile is not applicable (no address). Skip.
9. Track the brand query in Search Console monthly. Target: quizbuffet.com at position 1 for "quizbuffet" within 30 days, and page one for "quiz buffet" within 90.

### K3. Naming consideration
If the brand query still loses to BuzzFeed after S2, the name itself is the problem: "buffet" carries food intent Google will not drop. Options are to lean into a distinct one-word brand everywhere ("QuizBuffet" with a tagline that says certifications in the first three words) or to rename. Do not decide this before S2 has had 90 days.

---
