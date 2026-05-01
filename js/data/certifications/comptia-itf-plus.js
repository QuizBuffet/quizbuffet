export const cert = {
  slug: 'comptia-itf-plus',
  name: 'CompTIA ITF+',
  code: 'FC0-U61',
  vendor: 'CompTIA',
  tagline: 'IT fundamentals for beginners and career changers',
  about: 'ITF+ (IT Fundamentals+) is a pre-professional certification covering core IT concepts for people exploring a career in technology. It covers computing basics, hardware, networking, operating systems, software, databases, and security fundamentals. No prior experience required — ideal for advanced end users and those considering CompTIA A+.',
  details: '75 questions · 60 minutes · Passing score 650/900 · Multiple-choice',
  affiliates: [
    { provider: 'udemy',   label: 'Video Course',     url: '' },
    { provider: 'amazon',  label: 'Study Guide',       url: '' },
    { provider: 'comptia', label: 'CertMaster Learn',  url: '' },
  ],
  domains: [
    { slug: 'it-concepts-and-terminology', name: 'IT Concepts and Terminology', weight: 17 },
    { slug: 'infrastructure',              name: 'Infrastructure',              weight: 22 },
    { slug: 'applications-and-software',   name: 'Applications and Software',   weight: 18 },
    { slug: 'software-development',        name: 'Software Development',        weight: 12 },
    { slug: 'database-fundamentals',       name: 'Database Fundamentals',       weight: 11 },
    { slug: 'security',                    name: 'Security',                    weight: 20 },
  ],
};
