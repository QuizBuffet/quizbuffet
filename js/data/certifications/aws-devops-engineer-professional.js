import { acronyms } from '../acronyms/aws-devops-engineer-professional.js';
import { services } from '../services/aws-devops-engineer-professional.js';

export const cert = {
  slug: 'aws-devops-engineer-professional',
  name: 'AWS Certified DevOps Engineer – Professional',
  code: 'DOP-C02',
  vendor: 'AWS',
  tagline: 'Provision, operate, and manage distributed systems on AWS at scale',
  about: 'AWS Certified DevOps Engineer – Professional (DOP-C02) validates the ability to provision, operate, and manage distributed systems on AWS. It covers SDLC automation with CI/CD (CodePipeline, CodeBuild, CodeDeploy), configuration management and IaC (CloudFormation, CDK, SAM, Systems Manager), resilient cloud solutions and DR, monitoring and logging with CloudWatch and X-Ray, incident and event response, and security and compliance automation at scale.',
  details: '75 questions (65 scored + 10 unscored) · 180 minutes · Multiple-choice and multiple-response · Pass score 750/1000',
  acronyms,
  services,
  affiliates: [
    { provider: 'udemy',   label: 'Video Course',     url: '' },
    { provider: 'amazon',  label: 'Shop AWS DevOps Engineer DOP-C02 Study Guides on Amazon', url: 'https://www.amazon.com/s?k=aws+devops+engineer+dop-c02&tag=0003aa-20' },
    { provider: 'comptia', label: 'AWS Skill Builder (free official training)',  url: '' },
  ],
  domains: [
    { slug: 'sdlc-automation',                 name: 'SDLC Automation',                 number: '1.0', weight: 22 },
    { slug: 'configuration-management-and-iac', name: 'Configuration Management and IaC', number: '2.0', weight: 17 },
    { slug: 'resilient-cloud-solutions',       name: 'Resilient Cloud Solutions',       number: '3.0', weight: 15 },
    { slug: 'monitoring-and-logging',          name: 'Monitoring and Logging',          number: '4.0', weight: 15 },
    { slug: 'incident-and-event-response',     name: 'Incident and Event Response',     number: '5.0', weight: 14 },
    { slug: 'security-and-compliance',         name: 'Security and Compliance',         number: '6.0', weight: 17 },
  ],
};
