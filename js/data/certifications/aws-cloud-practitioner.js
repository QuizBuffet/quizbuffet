import { acronyms } from '../acronyms/aws-cloud-practitioner.js';

export const cert = {
  slug: 'aws-cloud-practitioner',
  name: 'AWS Certified Cloud Practitioner',
  code: 'CLF-C02',
  vendor: 'AWS',
  tagline: 'Foundational AWS knowledge for technical and non-technical professionals',
  about: 'AWS Certified Cloud Practitioner (CLF-C02) validates foundational understanding of the AWS Cloud — value proposition and design principles, the shared responsibility model, security and compliance, core services across compute, storage, database, networking, AI/ML and analytics, plus pricing, billing, and support. Designed for individuals with up to 6 months of AWS exposure, it does not expect coding, architecture design, or troubleshooting skills.',
  details: '50 scored questions + 15 unscored · Multiple-choice and multiple-response · Pass score 700/1000',
  acronyms,
  affiliates: [
    { provider: 'udemy',   label: 'Video Course',     url: '' },
    { provider: 'amazon',  label: 'Shop AWS Cloud Practitioner CLF-C02 Study Guides on Amazon', url: 'https://www.amazon.com/s?k=aws+certified+cloud+practitioner+clf-c02&tag=0003aa-20' },
    { provider: 'comptia', label: 'AWS Skill Builder (free official training)',  url: '' },
  ],
  domains: [
    { slug: 'cloud-concepts',                  name: 'Cloud Concepts',                  number: '1.0', weight: 24 },
    { slug: 'security-and-compliance',         name: 'Security and Compliance',         number: '2.0', weight: 30 },
    { slug: 'cloud-technology-and-services',   name: 'Cloud Technology and Services',   number: '3.0', weight: 34 },
    { slug: 'billing-pricing-and-support',     name: 'Billing, Pricing, and Support',   number: '4.0', weight: 12 },
  ],
};
