import { acronyms } from '../acronyms/comptia-cloud-plus.js';

export const cert = {
  slug: 'comptia-cloud-plus',
  name: 'CompTIA Cloud+',
  code: 'CV0-004',
  vendor: 'CompTIA',
  tagline: 'Cloud infrastructure skills for engineers and sysadmins',
  about: 'Cloud+ validates your ability to deploy, secure, and manage cloud environments across providers. It covers architecture decisions, automation with IaC, backup and recovery, identity management, DevOps pipelines, and troubleshooting real-world cloud issues. Built for professionals with 2–3 years of hands-on cloud or systems experience.',
  details: 'Maximum 90 questions · 90 minutes · Passing score 750/900 · Multiple-choice and performance-based',
  acronyms,
  affiliates: [
    { provider: 'udemy',   label: 'Video Course',     url: '' },
    { provider: 'amazon',  label: 'Shop CompTIA Cloud+ CV0-004 Study Guides on Amazon', url: 'https://www.amazon.com/s?k=comptia+cloud%2B+cv0-004&tag=0003aa-20' },
    { provider: 'comptia', label: 'CertMaster Learn',  url: '' },
  ],
  domains: [
    { slug: 'cloud-architecture',  name: 'Cloud Architecture',  number: '1.0', weight: 23 },
    { slug: 'deployment',          name: 'Deployment',          number: '2.0', weight: 19 },
    { slug: 'operations',          name: 'Operations',          number: '3.0', weight: 17 },
    { slug: 'security',            name: 'Security',            number: '4.0', weight: 19 },
    { slug: 'devops-fundamentals', name: 'DevOps Fundamentals', number: '5.0', weight: 10 },
    { slug: 'troubleshooting',     name: 'Troubleshooting',     number: '6.0', weight: 12 },
  ],
};
