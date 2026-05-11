import { acronyms } from '../acronyms/aws-cloudops-engineer-associate.js';
import { services } from '../services/aws-cloudops-engineer-associate.js';

export const cert = {
  slug: 'aws-cloudops-engineer-associate',
  name: 'AWS Certified CloudOps Engineer – Associate',
  code: 'SOA-C03',
  vendor: 'AWS',
  tagline: 'Deploy, manage, and operate workloads on AWS',
  about: 'AWS Certified CloudOps Engineer – Associate (SOA-C03) validates the ability to deploy, manage, and operate workloads on AWS. It covers monitoring and logging, performance optimization, reliability and business continuity, deployment and automation, security and compliance, and networking and content delivery — including hands-on use of CloudWatch, CloudFormation, Systems Manager, IAM, VPC, and the AWS CLI.',
  details: '65 questions (50 scored + 15 unscored) · 130 minutes · Multiple-choice and multiple-response · Pass score 720/1000',
  udemyCourseUrl: 'https://www.udemy.com/course/aws-certified-cloudops-associate/',
  acronyms,
  services,
  affiliates: [
    { provider: 'udemy',   label: 'Video Course',     url: '' },
    { provider: 'amazon',  label: 'Shop AWS CloudOps Engineer SOA-C03 Study Guides on Amazon', url: 'https://www.amazon.com/s?k=aws+cloudops+engineer+soa-c03&tag=0003aa-20' },
    { provider: 'comptia', label: 'AWS Skill Builder (free official training)',  url: '' },
  ],
  domains: [
    { slug: 'monitoring-logging-analysis-remediation-and-performance-optimization', name: 'Monitoring, Logging, Analysis, Remediation, and Performance Optimization', number: '1.0', weight: 22 },
    { slug: 'reliability-and-business-continuity',                                  name: 'Reliability and Business Continuity',                                  number: '2.0', weight: 22 },
    { slug: 'deployment-provisioning-and-automation',                               name: 'Deployment, Provisioning, and Automation',                             number: '3.0', weight: 22 },
    { slug: 'security-and-compliance',                                              name: 'Security and Compliance',                                              number: '4.0', weight: 16 },
    { slug: 'networking-and-content-delivery',                                      name: 'Networking and Content Delivery',                                      number: '5.0', weight: 18 },
  ],
};
