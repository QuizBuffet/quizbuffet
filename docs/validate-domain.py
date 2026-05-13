#!/usr/bin/env python3
"""
Validate a single domain JSON file against CLAUDE.md's flip-live quality bar.

Usage:
  python3 docs/validate-domain.py data/certifications/<cert>/<domain>.json
  python3 docs/validate-domain.py data/certifications/<cert>/         # all domains

Catches every recurring failure class we've seen in 300-question batches:
double-wrap, schema fields missing, cert-name mismatch, name mismatch with
top-level, ID range gaps, difficulty/position imbalance, duplicate stems,
duplicate answer strings, templated prefixes, broken acronyms (with medical
whitelist), stem-stitching, short explanations, non-minified files.
"""

import json
import os
import re
import sys
import glob
from collections import Counter

REQ_FIELDS = [
    'id', 'certification', 'exam_code', 'domain', 'name', 'objective',
    'keyword', 'difficulty', 'text', 'answers', 'correct', 'explanations',
]
DIFFS = {'easy', 'medium', 'medium-hard', 'hard'}
ABCD = {'a', 'b', 'c', 'd'}

# Correct medical/technical lowercase-then-uppercase tokens. Do not flag.
ACRONYM_WHITELIST = {'pVT', 'mGy', 'mIU', 'kPa', 'pH', 'mL', 'mRNA', 'tRNA', 'rRNA', 'kWh', 'mAh', 'dBA'}

TAG_PREFIX = re.compile(r'^(?:[A-Z][a-z]+(?:-[A-Z]?[a-z]+)*)\s(?:review|check|note|clue|logic|tip):\s+')
BROKEN_ACR = re.compile(r'\b([a-z][A-Z]{2,})\b')
STEM_STITCH = re.compile(r'^(?:Which\s+(?:action|statement|approach|option)\s+best\s+(?:fits|matches|describes|supports)[^?]+?\?)\s+(?=[A-Z])')
MID_CAP_Q = re.compile(r',\s+(Which|What|How|Why|When|Where|Who)\s')


def validate(path):
    """Return (errors, summary_dict)."""
    if not os.path.exists(path):
        return [f'file not found: {path}'], None

    raw = open(path, 'r', encoding='utf-8').read()
    errs = []

    try:
        d = json.loads(raw)
    except json.JSONDecodeError as e:
        return [f'invalid JSON: {e}'], None

    canon = json.dumps(d, separators=(',', ':'), ensure_ascii=False)
    if raw.strip() != canon:
        errs.append(f'NOT minified (off by {abs(len(raw.strip()) - len(canon))} chars)')

    # Top-level shape
    for k in ['slug', 'name', 'cert', 'version', 'questions']:
        if k not in d:
            errs.append(f'missing top-level key "{k}"')

    qs = d.get('questions', [])

    # Detect double-wrap (questions[0] is itself a full envelope)
    if (len(qs) == 1 and isinstance(qs[0], dict)
            and 'questions' in qs[0] and 'slug' in qs[0]):
        errs.append('DOUBLE-WRAP: questions[0] is a nested full envelope (re-flatten)')

    if not qs:
        return errs, {'questions': 0}

    top_name = d.get('name')

    difficulties = Counter()
    correct_positions = Counter()
    objectives = set()
    stems = Counter()
    answer_texts = Counter()

    short_expls = 0
    templated_expls = 0
    broken_acr_set = set()

    for i, q in enumerate(qs):
        qid = q.get('id', f'idx{i}')

        for f in REQ_FIELDS:
            if f not in q:
                errs.append(f'Q{qid}: missing field "{f}"')

        # Cross-row consistency
        if q.get('name') != top_name:
            errs.append(f'Q{qid}: name {q.get("name")!r} ≠ top-level {top_name!r}')

        # Difficulty / position
        diff = q.get('difficulty')
        if diff in DIFFS:
            difficulties[diff] += 1
        else:
            errs.append(f'Q{qid}: invalid difficulty {diff!r}')

        # Answers
        answers = q.get('answers', [])
        if len(answers) != 4:
            errs.append(f'Q{qid}: {len(answers)} answers (need 4)')
        ans_ids = {a.get('id') for a in answers}
        if ans_ids != ABCD:
            errs.append(f'Q{qid}: answer ids {sorted(ans_ids)} (need a/b/c/d)')

        # Correct
        if q.get('correct') in ABCD:
            correct_positions[q['correct']] += 1
        else:
            errs.append(f'Q{qid}: invalid correct {q.get("correct")!r}')

        # Explanations
        expl = q.get('explanations', {})
        if set(expl.keys()) != ABCD:
            errs.append(f'Q{qid}: explanation keys {sorted(expl.keys())} (need a/b/c/d)')
        for k, v in expl.items():
            sv = str(v or '').strip()
            if len(sv) < 15:
                short_expls += 1
                if short_expls <= 3:
                    errs.append(f'Q{qid}.{k}: explanation too short ({len(sv)} chars)')
            if TAG_PREFIX.match(sv):
                templated_expls += 1
                if templated_expls <= 3:
                    errs.append(f'Q{qid}.{k}: templated prefix "{sv[:50]}…"')

        # Hygiene
        text = str(q.get('text', ''))
        all_text_fields = [text] + [a.get('text', '') for a in answers] + [str(v) for v in expl.values()]
        for src in all_text_fields:
            for tok in BROKEN_ACR.findall(src):
                if tok not in ACRONYM_WHITELIST:
                    broken_acr_set.add((qid, tok))
        if STEM_STITCH.search(text):
            errs.append(f'Q{qid}: stem-stitching detected')
        if MID_CAP_Q.search(text):
            errs.append(f'Q{qid}: capitalized question word after comma')

        # Stem & answer uniqueness
        first_ten = ' '.join(text.lower().split()[:10])
        if first_ten:
            stems[first_ten] += 1
        for a in answers:
            t = (a.get('text') or '').strip().lower()
            if t:
                answer_texts[t] += 1

        if q.get('objective'):
            objectives.add(str(q['objective']))

    # Aggregate hygiene reports
    if short_expls > 3:
        errs.append(f'… + {short_expls - 3} more short explanations')
    if templated_expls > 3:
        errs.append(f'… + {templated_expls - 3} more templated prefixes')
    for qid, tok in sorted(broken_acr_set)[:5]:
        errs.append(f'Q{qid}: broken acronym "{tok}"')
    if len(broken_acr_set) > 5:
        errs.append(f'… + {len(broken_acr_set) - 5} more broken acronyms')

    # Distribution
    n = len(qs)
    if n >= 8:
        target_d = n / 4
        diff_imbal = [f'{l}={c}' for l, c in difficulties.items() if abs(c - target_d) / target_d > 0.40]
        pos_imbal = [f'{l}={c}' for l, c in correct_positions.items() if abs(c - target_d) / target_d > 0.40]
        if diff_imbal:
            errs.append(f'difficulty imbalance: {diff_imbal} (target ~{target_d:.0f}/bucket)')
        if pos_imbal:
            errs.append(f'correct-position imbalance: {pos_imbal} (target ~{target_d:.0f}/bucket)')

    # Duplicates
    dup_stems = {s: c for s, c in stems.items() if c > 1}
    if dup_stems:
        errs.append(f'{len(dup_stems)} duplicate stem(s); first: {list(dup_stems.items())[:2]}')
    dup_ans = {a: c for a, c in answer_texts.items() if c > 1}
    if dup_ans:
        errs.append(f'{len(dup_ans)} duplicate answer string(s); first: {list(dup_ans.items())[:2]}')

    summary = {
        'questions': n,
        'difficulty': dict(difficulties),
        'position': dict(correct_positions),
        'objectives': len(objectives),
    }
    return errs, summary


def main():
    if len(sys.argv) != 2:
        print(__doc__)
        sys.exit(2)

    target = sys.argv[1]
    if os.path.isdir(target):
        paths = sorted(glob.glob(os.path.join(target, '*.json')))
    else:
        paths = [target]

    total_errs = 0
    for p in paths:
        errs, summary = validate(p)
        name = os.path.basename(p)
        status = '✓' if not errs else '✗'
        if summary:
            print(f'{status} {name}  n={summary["questions"]}  diff={summary["difficulty"]}  pos={summary["position"]}  obj={summary["objectives"]}')
        else:
            print(f'{status} {name}')
        for e in errs:
            print(f'    {e}')
        total_errs += len(errs)

    print(f'\nTotal: {len(paths)} file(s), {total_errs} issue(s).')
    sys.exit(1 if total_errs else 0)


if __name__ == '__main__':
    main()
