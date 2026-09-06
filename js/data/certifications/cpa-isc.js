export const cert = {
  slug: 'cpa-isc',
  name: 'CPA Information Systems and Controls (ISC)',
  code: 'ISC',
  vendor: 'AICPA',
  tagline: 'Discipline section of the Uniform CPA Examination, IT audit, security, and SOC engagements',
  about: 'The Information Systems and Controls (ISC) section is one of three Discipline sections of the Uniform CPA Examination administered by the AICPA. Candidates pass three Core sections (AUD, FAR, REG) plus one Discipline of their choice, ISC is most often selected by candidates planning a career in IT audit, cybersecurity, or System and Organization Controls (SOC) attestation. The 4-hour exam consists of 82 multiple-choice questions and 6 task-based simulations, weighted 60% MCQ / 40% TBS in scoring (the only section without 50/50 split). Content covers three areas: Information Systems and Data Management (35-45%): IT infrastructure components, cloud computing models (IaaS, PaaS, SaaS), enterprise and accounting information systems, system availability, business continuity and disaster recovery, IT change management, data management, relational databases, SQL queries, data warehouses and lakes, and business process modeling; Security, Confidentiality and Privacy (35-45%): HIPAA Security and Privacy Rules, GDPR Articles 4-34, PCI DSS, NIST CSF and Privacy Framework, NIST SP 800-53, CIS Controls v8.1, COBIT 2019, threat types and cyber-attack stages, identification/authentication/authorization controls, encryption, Data Loss Prevention, security testing, and incident response; and Considerations for SOC Engagements (15-25%): purpose and intended users of SOC 1®, SOC 2®, SOC 3®, and SOC for Cybersecurity reports, Trust Services Criteria, system description criteria, complementary user entity controls (CUECs) and complementary subservice organization controls (CSOCs), report opinions and modifications. References include the AICPA Trust Services Criteria, NIST frameworks, HIPAA 45 CFR Part 164, GDPR, PCI DSS, COSO ERM, and COBIT 2019.',
  details: 'AICPA Uniform CPA Examination · Discipline section · 4 hours · 82 MCQs + 6 TBSs · 60% MCQ / 40% TBS scoring (only section not 50/50) · Skill mix: 55-65% Remembering & Understanding, 20-30% Application, 10-20% Analysis · Most aligned with IT audit, cybersecurity, and SOC attestation career tracks · Effective January 2025 blueprint',
  affiliates: [
    { provider: 'amazon', label: 'Shop Wiley CPAexcel and Becker ISC Discipline Review Books on Amazon', url: 'https://www.amazon.com/s?k=wiley+cpa+excel+information+systems+controls&tag=0003aa-20' },
  ],
  officialSources: [
    { label: 'AICPA Uniform CPA Examination',   url: 'https://www.aicpa-cima.com/resources/landing/uniform-cpa-examination' },
    { label: 'NASBA (cpacentral.nasba.org)',    url: 'https://nasba.org/exams/cpaexam/' },
    { label: 'Prometric Test Centers',          url: 'https://www.prometric.com/test-takers/search/cpa' },
  ],
  domains: [
    { slug: 'information-systems-and-data-management',  name: 'Information Systems and Data Management',                  number: '1.0', weight: 37 },
    { slug: 'security-confidentiality-and-privacy',     name: 'Security, Confidentiality and Privacy',                    number: '2.0', weight: 37 },
    { slug: 'soc-engagements',                          name: 'Considerations for System and Organization Controls (SOC) Engagements', number: '3.0', weight: 26 },
  ],
};
