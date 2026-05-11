import { acronyms } from '../acronyms/aws-developer-associate.js';
import { services } from '../services/aws-developer-associate.js';

export const cert = {
  slug: 'aws-developer-associate',
  name: 'AWS Certified Developer – Associate',
  code: 'DVA-C02',
  vendor: 'AWS',
  tagline: 'Develop, deploy, and debug cloud-based applications on AWS',
  about: 'AWS Certified Developer – Associate (DVA-C02) validates the ability to develop, test, deploy, and debug AWS cloud-based applications. It covers application development with Lambda, API Gateway, SDKs, DynamoDB and other data stores, security (IAM, KMS, Cognito, secrets), CI/CD with CodeBuild/CodePipeline/CodeDeploy and SAM/CloudFormation, plus troubleshooting and optimization with CloudWatch and X-Ray.',
  details: '65 questions (50 scored + 15 unscored) · 130 minutes · Multiple-choice and multiple-response · Pass score 720/1000',
  udemyCourseUrl: 'https://www.udemy.com/course/aws-certified-developer-associate-practice-tests-dva-c01/',
  acronyms,
  services,
  affiliates: [
    { provider: 'udemy',   label: 'Video Course',     url: '' },
    { provider: 'amazon',  label: 'Shop AWS Developer DVA-C02 Study Guides on Amazon', url: 'https://www.amazon.com/s?k=aws+certified+developer+dva-c02&tag=0003aa-20' },
    { provider: 'comptia', label: 'AWS Skill Builder (free official training)',  url: '' },
  ],
  domains: [
    { slug: 'development-with-aws-services',     name: 'Development with AWS Services',     number: '1.0', weight: 32 },
    { slug: 'security',                          name: 'Security',                          number: '2.0', weight: 26 },
    { slug: 'deployment',                        name: 'Deployment',                        number: '3.0', weight: 24 },
    { slug: 'troubleshooting-and-optimization',  name: 'Troubleshooting and Optimization',  number: '4.0', weight: 18 },
  ],
};
