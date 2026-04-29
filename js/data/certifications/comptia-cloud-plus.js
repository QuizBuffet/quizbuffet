import { acronyms } from '../acronyms/comptia-cloud-plus.js';
import { questions } from '../questions/comptia-cloud-plus.js';

export const cert = {
  slug: 'comptia-cloud-plus',
  name: 'CompTIA Cloud+',
  code: 'CV0-004',
  vendor: 'CompTIA',
  tagline: 'Cloud infrastructure skills for engineers and sysadmins',
  about: 'Cloud+ validates your ability to deploy, secure, and manage cloud environments across providers. It covers architecture decisions, automation with IaC, backup and recovery, identity management, DevOps pipelines, and troubleshooting real-world cloud issues. Built for professionals with 2–3 years of hands-on cloud or systems experience.',
  details: 'Maximum 90 questions · 90 minutes · Passing score 750/900 · Multiple-choice and performance-based',
  acronyms,
  questions,
  domains: [
    { slug: 'cloud-architecture',  name: 'Cloud Architecture',  number: '1.0', weight: 23, count: 384 },
    { slug: 'deployment',          name: 'Deployment',          number: '2.0', weight: 19, count: 208 },
    { slug: 'operations',          name: 'Operations',          number: '3.0', weight: 17, count: 195 },
    { slug: 'security',            name: 'Security',            number: '4.0', weight: 19, count: 232 },
    { slug: 'devops-fundamentals', name: 'DevOps Fundamentals', number: '5.0', weight: 10, count: 112 },
    { slug: 'troubleshooting',     name: 'Troubleshooting',     number: '6.0', weight: 12, count:  96 },
  ],
};
