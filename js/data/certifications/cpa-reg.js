export const cert = {
  slug: 'cpa-reg',
  name: 'CPA — Taxation and Regulation (REG)',
  code: 'REG',
  vendor: 'AICPA',
  tagline: 'Core section of the Uniform CPA Examination — U.S. federal taxation, ethics, and business law',
  about: 'The Taxation and Regulation (REG) section is one of three Core sections of the Uniform CPA Examination administered by the AICPA. Every CPA candidate must pass REG regardless of chosen Discipline. The 4-hour exam consists of 72 multiple-choice questions and 8 task-based simulations, weighted 50/50 in scoring. Content covers five areas: Ethics, Professional Responsibilities and Federal Tax Procedures (10–20%) — Treasury Department Circular 230, tax return preparer rules and penalties, state board licensing, IRS audits and appeals, tax authoritative hierarchy, privileged communications; Business Law (15–25%) — agency, contracts (UCC), debtor-creditor relationships, bankruptcy under BAPCPA 2005, employment taxes, qualified health plans, worker classifications, anti-bribery under FCPA 1977, business entity formation and termination; Federal Taxation of Property Transactions (5–15%) — tax basis of purchased and converted assets, gifted and inherited property, wash sales, intangible assets, MACRS depreciation, Section 179, amortization; Federal Taxation of Individuals (22–32%) — Form 1040 gross income inclusions and exclusions, pass-through income, AGI adjustments, itemized deductions, QBI deduction, loss limitations, filing status, tax credits, estimated tax safe harbor; and Federal Taxation of Entities (23–33%) — Schedule M-1/M-3 book-tax differences, C corporation taxable income and state nexus, S corporation eligibility and ordinary business income, partnership separately stated items and partner basis, LLCs, tax-exempt organizations. References include the Internal Revenue Code of 1986 as amended, Treasury Regulations, Uniform Commercial Code, Revised Model Business Corporation Act, FCPA, and ACA.',
  details: 'AICPA Uniform CPA Examination · Core section · 4 hours · 72 MCQs + 8 TBSs · 50/50 MCQ/TBS scoring · Skill mix: 25–35% Remembering & Understanding, 35–45% Application, 25–35% Analysis · Candidates are not tested on specific tax rate percentages indexed to inflation · Effective January 2025 blueprint',
  affiliates: [
    { provider: 'amazon', label: 'Shop Wiley CPAexcel and Becker REG Review Books on Amazon', url: 'https://www.amazon.com/s?k=wiley+cpa+excel+regulation+tax&tag=0003aa-20' },
  ],
  officialSources: [
    { label: 'AICPA Uniform CPA Examination',   url: 'https://www.aicpa-cima.com/resources/landing/uniform-cpa-examination' },
    { label: 'NASBA (cpacentral.nasba.org)',    url: 'https://nasba.org/exams/cpaexam/' },
    { label: 'Prometric Test Centers',          url: 'https://www.prometric.com/test-takers/search/cpa' },
  ],
  domains: [
    { slug: 'ethics-and-federal-tax-procedures',  name: 'Ethics, Professional Responsibilities and Federal Tax Procedures', number: '1.0', weight: 15 },
    { slug: 'business-law',                       name: 'Business Law',                                                    number: '2.0', weight: 20 },
    { slug: 'taxation-of-property-transactions',  name: 'Federal Taxation of Property Transactions',                       number: '3.0', weight: 10 },
    { slug: 'taxation-of-individuals',            name: 'Federal Taxation of Individuals',                                 number: '4.0', weight: 27 },
    { slug: 'taxation-of-entities',               name: 'Federal Taxation of Entities',                                    number: '5.0', weight: 28 },
  ],
};
