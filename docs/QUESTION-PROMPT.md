# Question generation prompt

Paste the prompt below into a fresh Claude session and fill in the `{PLACEHOLDERS}`. It writes **one domain at a time** and stops between domains so you can validate each batch before continuing. This avoids the recurring failure modes seen in single-shot 300-question dumps: double-wrap envelopes, naming inconsistency, false-positive acronym "fixes," templated explanation prefixes.

After each domain JSON lands, run:

```bash
python3 docs/validate-domain.py data/certifications/<cert-slug>/<domain-slug>.json
```

The validator checks every rule below. If it reports 0 issues, tell the session to continue; otherwise paste the validator output back and ask for fixes.

---

## The prompt

```
You are writing exam practice questions for the {CERT_NAME} certification
({CERT_CODE}, {VENDOR}).

Source of truth: anchor every fact in {OFFICIAL_SOURCE}. Do not author from
memory. If a claim is ambiguous in the source, omit it.

## READ THIS FIRST — the last 2 batches failed on these exact points

Every recent generation passed content but FAILED structure in the same three
ways. Your output will be rejected and hand-repaired if you repeat any of them.
Do not acknowledge this section; just comply.

1. DOUBLE-WRAP ENVELOPE (happened every time). You wrapped the real question
   array inside questions[0] as a second object carrying keys like
   "domain_name", "weight", "question_count", "correct_distribution",
   "terms_covered", "section", "skill_level". This is WRONG. The file is
   exactly ONE object; "questions" holds question objects DIRECTLY. There is
   no inner object and no summary/metadata keys anywhere. The ONLY top-level
   keys are: slug, name, cert, version, questions. Nothing else, at any level.

2. WRONG FIELD NAMES. You emitted "section", "domain_name", "skill_level" and
   put the sub-objective code (e.g. "1.A.1") into "domain". The schema has NO
   such fields. Map correctly: the domain NUMBER (e.g. "1.0") goes in "domain";
   the canonical domain title goes in "name"; the sub-objective code+label
   goes in "objective". Never emit section / domain_name / skill_level /
   terms_covered / weight / question_count — they are forbidden keys.

3. DIFFICULTY SKEW. Every batch came back ~25% easy / 50% medium /
   25% medium-hard / 0% hard. That is an automatic fail. Assign difficulty so
   the four buckets are as equal as possible (n/4 each, within ±1) and "hard"
   is used as much as the others. Vary it by genuine cognitive load (recall
   vs. multi-step application), not by a fixed ratio. Before writing, count
   your own buckets and rebalance until even — including a full quarter "hard".

Also: do NOT reuse any answer string (correct or distractor) across two
questions — vary distractors per item.

## Handshake before you write (SYN / SYN-ACK / ACK)

We are not paste-relaying — we are connected over WebRTC and both edit the
same files. Before you write a single byte of JSON, complete a three-way
handshake with me. No file is created until ACK lands.

- **SYN** comes from me: I send the batch parameters — cert-slug, domain-slug,
  canonical domain name and number, weight, target question count, term basis
  (concept terms vs. CIB sub-objectives), starting id, and the path to write.
- **SYN-ACK** comes from you: echo every parameter back verbatim and add your
  plan — the term list you will cover, your planned per-bucket difficulty
  split (must include a full quarter "hard"), and your a/b/c/d position plan.
  Raise any disagreement here, not after writing.
- **ACK** comes from me: I confirm the echo bit-for-bit, or reject and re-SYN
  with corrections. ONLY after ACK do you write the file.

After write: I run docs/validate-domain.py. The validator is the arbiter —
either side can edit the file in place to drive issues to 0, then re-validate.
Handshake repeats per domain. Do not infer your own count from sub-objectives;
use what was ACKed.

Write ONE DOMAIN AT A TIME. After you finish a domain, save the file, then
STOP and wait for my confirmation. Do not produce all domains in a single
response.

## File and shape

For each domain, write one minified JSON file to:
  data/certifications/{cert-slug}/{domain-slug}.json

The file is ONE JSON object with these top-level keys exactly:
  { "slug", "name", "cert", "version", "questions" }

"questions" is the array of question objects directly. There is NO nested
envelope inside questions[]. The structure is exactly one level deep.
questions[0] is a QUESTION (has id/text/answers), never a wrapper object.
If you ever write "domain_name", "section", "skill_level", "terms_covered",
"weight", "question_count", or "correct_distribution" anywhere, you have
produced the rejected double-wrap shape — delete it and flatten.

Each question has EXACTLY these 12 fields:
  id, certification, exam_code, domain, name, objective, keyword,
  difficulty, text, answers, correct, explanations

Shape (write minified — single line — on disk):

{"slug":"<domain-slug>","name":"<Domain Name>","cert":"<cert-slug>","version":1,"questions":[
  {
    "id": <int — contiguous across the cert; I will tell you the starting ID>,
    "certification": "{CERT_NAME}",
    "exam_code": "{CERT_CODE}",
    "domain": "<e.g. '1.0'>",
    "name": "<Domain Name — byte-identical to top-level>",
    "objective": "<sub-objective number + short label>",
    "keyword": "<short topic phrase>",
    "difficulty": "easy|medium|medium-hard|hard",
    "text": "<2–3 sentences: scenario, connector, prompt>",
    "answers": [{"id":"a","text":"..."},{"id":"b","text":"..."},{"id":"c","text":"..."},{"id":"d","text":"..."}],
    "correct": "a|b|c|d",
    "explanations": {"a":"...","b":"...","c":"...","d":"..."}
  }
]}

## Naming consistency (critical)

- File top-level "name" MUST be byte-identical to each question's "name".
  Do not switch between "&" and "and" or singular/plural.
- Per-question "certification" MUST be the exact full string I gave, including
  any parenthetical. Copy character for character.
- "exam_code" and "domain" are identical across every question in a file.

## Quality bar (must pass before writing the file)

1. Schema-valid: 12 fields per question, 4 answers (a/b/c/d), valid "correct",
   all 4 explanations non-empty (≥ 15 chars).
2. Difficulty distribution even across easy/medium/medium-hard/hard (within ±1)
   — this means a FULL quarter of "hard". A batch with zero "hard" or with
   "medium" ≥ 40% is an automatic fail. Tally the four counts before saving.
3. Correct-answer position even across a/b/c/d (within ±1).
4. Every sub-objective I list has at least one question.
5. Zero duplicate first-10-word stems within the domain (lowercased compare).
6. Zero duplicate answer strings within the domain (correct or distractor).
7. NO templated prefixes in explanations. Forbidden patterns:
     "X-Y review: ", "X-Y check: ", "X-Y note: ", "X-Y clue: ",
     "X-Y logic: ", "X-Y tip: "
   Each explanation is one substantive sentence that says WHY the answer is
   right or wrong, citing the rule when useful (e.g., "49 CFR 391.41 requires
   a current medical examiner's certificate.").
8. NO stem-stitching. One clean question per "text". No
   "Which action best fits X? <real question>" glue.
9. NO broken acronyms (single lowercase letter followed by uppercase letters).
   Write AED not aED, CPR not cPR, OSHA not oSHA, GFCI not gFCI.
   EXCEPTIONS — these lowercase-then-uppercase tokens are correct and must
   stay as-is: pVT, mGy, kPa, pH, mRNA, tRNA, rRNA, kWh, mAh, dBA. When in
   doubt about another token, leave it.
10. NO capitalized question words after a comma. Write "During X, which Y"
    not "During X, Which Y".
11. Distractors are plausible-but-wrong (off-by-one numeric values, swapped
    definitions, wrong step in a sequence). No joke answers.
12. Numeric facts (thresholds, durations, depths, rates) match the official
    source exactly. Cross-reference each before writing.

## Output

Write the entire question bank for ONE domain as a single minified JSON line
(equivalent to json.dumps(d, separators=(',', ':'), ensure_ascii=False)).
No prose, no markdown, no commentary in or around the JSON.
Save to the path above. Then STOP.

## This cert

CERT_NAME:       {full cert name, e.g. "Certified Associate in Project Management (CAPM)"}
CERT_CODE:       {short code, e.g. "CAPM"}
VENDOR:          {issuing body, e.g. "PMI"}
OFFICIAL_SOURCE: {canonical reference, e.g. "PMI CAPM Exam Content Outline
                 (current edition) and PMBOK Guide 7th edition"}
cert-slug:       {kebab-case slug, e.g. "capm"}

## Domains (slug | name | number | weight | question count | starting ID)

1. {domain-1-slug} | {Domain 1 Name} | 1.0 | {weight}% | {count} | start ID {n}
2. {domain-2-slug} | {Domain 2 Name} | 2.0 | {weight}% | {count} | start ID {n}
...

## Sub-objectives per domain
{paste sub-objective list, one section per domain}

## Start

Begin with domain 1 only. Write the file. STOP. Wait for me before domain 2.
```

---

## Why one domain at a time

A 300-question single-shot dump is what produces the recurring problems:

- The model loses consistent naming across files (uses `&` in one and `and`
  in another, drops the parenthetical from `certification`, etc.).
- Output truncation rolls over silently → double-wrap envelope bug.
- ID counters drift mid-output.
- Systemic issues (e.g., a templated prefix on every explanation) aren't
  caught until 300 questions have already been written.

Domain-by-domain catches every class of bug at 18–66 questions per batch,
which is cheap to validate and cheap to redo.

## Common fixes when validation flags something

| Validator says | Fix |
|---|---|
| `DOUBLE-WRAP: questions[0] is a nested full envelope` | Re-flatten: replace `questions: [...]` with `questions: [...].questions` |
| `name {X} ≠ top-level {Y}` | Pick one phrasing, update everywhere |
| `cert='Basic Life Support'` (or similar generic) | Bulk-replace to the full cert name with parenthetical |
| `broken acronym ['pVT']` (or other medical/technical) | Already whitelisted in validator — re-run; if a new token, add to `ACRONYM_WHITELIST` |
| `1 question short, target ~N/bucket` | Add one question to the under-represented difficulty or position bucket |
| `templated prefix "Adult-CPR logic: …"` | Strip prefix, capitalize the first letter of what remains |
| `stem-stitching detected` | Collapse to just the real question |
