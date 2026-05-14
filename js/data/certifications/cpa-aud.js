export const cert = {
  slug: 'cpa-aud',
  name: 'CPA — Auditing and Attestation (AUD)',
  code: 'AUD',
  vendor: 'AICPA',
  tagline: 'Core section of the Uniform CPA Examination — every candidate must pass AUD',
  about: 'The Auditing and Attestation (AUD) section is one of three Core sections of the Uniform CPA Examination administered by the AICPA. Every CPA candidate must pass AUD regardless of their chosen Discipline. The 4-hour exam consists of 78 multiple-choice questions and 7 task-based simulations, weighted 50/50 in scoring. Content covers four areas: Ethics, Professional Responsibilities and General Principles (15–25%) — AICPA Code of Conduct, SEC/PCAOB/GAO/DOL independence, professional skepticism, engagement preconditions, documentation; Assessing Risk and Developing a Planned Response (25–35%) — engagement strategy, the COSO Internal Control – Integrated Framework, IT general controls, SOC 1® reports, materiality and tolerable misstatement, fraud risk, related parties, single audits; Performing Further Procedures and Obtaining Evidence (30–40%) — sampling, tests of controls and details, analytical procedures, external confirmations, audit data analytics, accounting estimates, going concern, subsequent events; and Forming Conclusions and Reporting (10–20%) — audit and attestation reports, opinion types, emphasis-of-matter paragraphs, compilation and review engagements, compliance reporting, special-purpose frameworks, and additional GAO reporting requirements. References include AICPA Statements on Auditing Standards, PCAOB Auditing Standards, GAO Government Auditing Standards, Single Audit Act, OMB 2 CFR 200, and the AICPA Code of Professional Conduct.',
  details: 'AICPA Uniform CPA Examination · Core section · 4 hours · 78 MCQs + 7 TBSs · 50/50 MCQ/TBS scoring · Skill mix: 30–40% Remembering & Understanding, 30–40% Application, 15–25% Analysis, 5–15% Evaluation · Effective January 2025 blueprint',
  affiliates: [
    { provider: 'amazon', label: 'Shop Wiley CPAexcel and Becker CPA Review Books on Amazon', url: 'https://www.amazon.com/s?k=wiley+cpa+excel+auditing+attestation&tag=0003aa-20' },
  ],
  officialSources: [
    { label: 'AICPA Uniform CPA Examination',   url: 'https://www.aicpa-cima.com/resources/landing/uniform-cpa-examination' },
    { label: 'NASBA (cpacentral.nasba.org)',    url: 'https://nasba.org/exams/cpaexam/' },
    { label: 'Prometric Test Centers',          url: 'https://www.prometric.com/test-takers/search/cpa' },
  ],
  domains: [
    { slug: 'ethics-and-general-principles',         name: 'Ethics, Professional Responsibilities and General Principles', number: '1.0', weight: 20 },
    { slug: 'assessing-risk-and-planned-response',   name: 'Assessing Risk and Developing a Planned Response',             number: '2.0', weight: 30 },
    { slug: 'performing-procedures-and-evidence',    name: 'Performing Further Procedures and Obtaining Evidence',         number: '3.0', weight: 28 },
    { slug: 'forming-conclusions-and-reporting',     name: 'Forming Conclusions and Reporting',                            number: '4.0', weight: 22 },
  ],
};
