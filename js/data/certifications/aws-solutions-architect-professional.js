import { acronyms } from '../acronyms/aws-solutions-architect-professional.js';
import { services } from '../services/aws-solutions-architect-professional.js';

export const cert = {
  slug: 'aws-solutions-architect-professional',
  name: 'AWS Certified Solutions Architect – Professional',
  code: 'SAP-C02',
  vendor: 'AWS',
  tagline: 'Design optimized AWS solutions across organizations using the Well-Architected Framework',
  about: 'AWS Certified Solutions Architect – Professional (SAP-C02) validates expertise designing complex AWS solutions across multiple accounts and Regions. It covers organizational complexity (Organizations, Control Tower, multi-account governance, hybrid networking), designing new solutions for reliability, performance, security, and cost, continuously improving existing solutions, and accelerating workload migration and modernization (7Rs, AWS Migration Hub, DMS, Application Migration Service, modernization to serverless and containers).',
  details: '75 questions (65 scored + 10 unscored) · 180 minutes · Multiple-choice and multiple-response · Pass score 750/1000',
  udemyCourseUrl: 'https://www.udemy.com/course/aws-solutions-architect-professional/',
  acronyms,
  services,
  affiliates: [
    { provider: 'udemy',   label: 'Video Course',     url: '' },
    { provider: 'amazon',  label: 'Shop AWS Solutions Architect Professional SAP-C02 Study Guides on Amazon', url: 'https://www.amazon.com/s?k=aws+solutions+architect+professional+sap-c02&tag=0003aa-20' },
    { provider: 'comptia', label: 'AWS Skill Builder (free official training)',  url: '' },
  ],
  domains: [
    { slug: 'design-solutions-for-organizational-complexity',  name: 'Design Solutions for Organizational Complexity',  number: '1.0', weight: 26 },
    { slug: 'design-for-new-solutions',                        name: 'Design for New Solutions',                        number: '2.0', weight: 29 },
    { slug: 'continuous-improvement-for-existing-solutions',   name: 'Continuous Improvement for Existing Solutions',   number: '3.0', weight: 25 },
    { slug: 'accelerate-workload-migration-and-modernization', name: 'Accelerate Workload Migration and Modernization', number: '4.0', weight: 20 },
  ],
};
