export const cert = {
  slug: 'comptia-a-plus-core-2',
  name: 'CompTIA A+ Core 2',
  code: '220-1202',
  vendor: 'CompTIA',
  tagline: 'Operating systems, security, and troubleshooting for IT support technicians',
  about: 'A+ Core 2 (220-1202) is the second of two exams required for the CompTIA A+ certification. It covers operating systems, security, software troubleshooting, and operational procedures for IT support specialists.',
  details: 'Maximum 90 questions · 90 minutes · Multiple-choice and performance-based · Recommended 12 months hands-on experience · Passing score 700/900',
  affiliates: [
    { provider: 'udemy',   label: 'Video Course',     url: '' },
    { provider: 'amazon',  label: 'Study Guide',       url: '' },
    { provider: 'comptia', label: 'CertMaster Learn',  url: '' },
  ],
  domains: [
    { slug: 'operating-systems',        name: 'Operating Systems',        weight: 28 },
    { slug: 'security',                 name: 'Security',                 weight: 28 },
    { slug: 'software-troubleshooting', name: 'Software Troubleshooting', weight: 23  },
    { slug: 'operational-procedures',   name: 'Operational Procedures',   weight: 21 },
  ],
};
