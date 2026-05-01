export const cert = {
  slug: 'comptia-data-plus',
  name: 'CompTIA Data+',
  code: 'DA0-002',
  vendor: 'CompTIA',
  tagline: 'Data acquisition, analysis, and governance for data-driven decision making',
  about: 'Data+ certifies professionals who can translate business requirements into data-driven decisions by acquiring, preparing, and transforming data, applying statistical methods, creating visualizations, and adhering to governance and quality standards throughout the data life cycle.',
  details: 'Multiple-choice and performance-based · Recommended 1.5–2 years of experience with databases, analytical tools, statistics, and data visualization',
  affiliates: [
    { provider: 'udemy',   label: 'Video Course',     url: '' },
    { provider: 'amazon',  label: 'Shop CompTIA Data+ Study Guides on Amazon', url: 'https://www.amazon.com/s?k=comptia+data%2B&tag=0003aa-20' },
    { provider: 'comptia', label: 'CertMaster Learn',  url: '' },
  ],
  domains: [
    { slug: 'data-concepts-and-environments',  name: 'Data Concepts and Environments',  weight: 20 },
    { slug: 'data-acquisition-and-preparation', name: 'Data Acquisition and Preparation', weight: 22 },
    { slug: 'data-analysis',                   name: 'Data Analysis',                   weight: 24 },
    { slug: 'visualization-and-reporting',     name: 'Visualization and Reporting',     weight: 20 },
    { slug: 'data-governance',                 name: 'Data Governance',                 weight: 14 },
  ],
};
