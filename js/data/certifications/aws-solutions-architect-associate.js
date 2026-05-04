import { acronyms } from '../acronyms/aws-solutions-architect-associate.js';
import { services } from '../services/aws-solutions-architect-associate.js';

export const cert = {
  slug: 'aws-solutions-architect-associate',
  name: 'AWS Certified Solutions Architect – Associate',
  code: 'SAA-C03',
  vendor: 'AWS',
  tagline: 'The most popular cloud certification for designing AWS workloads',
  about: 'AWS Certified Solutions Architect – Associate (SAA-C03) validates the ability to design solutions on AWS that are secure, resilient, high-performing, and cost-optimized — based on the AWS Well-Architected Framework. Aimed at candidates with at least 1 year of hands-on experience designing cloud solutions on AWS.',
  details: '50 scored questions + 15 unscored · Multiple-choice and multiple-response · Pass score 720/1000',
  acronyms,
  services,
  affiliates: [
    { provider: 'udemy',   label: 'Video Course',     url: '' },
    { provider: 'amazon',  label: 'Shop AWS Solutions Architect SAA-C03 Study Guides on Amazon', url: 'https://www.amazon.com/s?k=aws+solutions+architect+saa-c03&tag=0003aa-20' },
    { provider: 'comptia', label: 'AWS Skill Builder (free official training)',  url: '' },
  ],
  domains: [
    { slug: 'design-secure-architectures',          name: 'Design Secure Architectures',          number: '1.0', weight: 30 },
    { slug: 'design-resilient-architectures',       name: 'Design Resilient Architectures',       number: '2.0', weight: 26 },
    { slug: 'design-high-performing-architectures', name: 'Design High-Performing Architectures', number: '3.0', weight: 24 },
    { slug: 'design-cost-optimized-architectures',  name: 'Design Cost-Optimized Architectures',  number: '4.0', weight: 20 },
  ],
};
