export const cert = {
  slug: 'aws-ai-practitioner',
  name: 'AWS Certified AI Practitioner',
  code: 'AIF-C01',
  vendor: 'AWS',
  tagline: 'Foundational AI, ML, and generative-AI knowledge for the AWS Cloud',
  about: 'AWS Certified AI Practitioner (AIF-C01) validates foundational understanding of AI, machine learning, and generative AI on AWS, including foundation models, prompt engineering, responsible AI, and security for AI workloads. It is designed for professionals who use, evaluate, or work alongside AI/ML systems but are not necessarily building them.',
  details: '65 questions · 90 minutes · Multiple-choice and multiple-response · Pass score 700/1000',
  udemyCourseUrl: 'https://www.udemy.com/course/aws-ai-practitioner-certified/',
  affiliates: [
    { provider: 'udemy',   label: 'Video Course',     url: '' },
    { provider: 'amazon',  label: 'Shop AWS AI Practitioner AIF-C01 Study Guides on Amazon', url: 'https://www.amazon.com/s?k=aws+ai+practitioner+aif-c01&tag=0003aa-20' },
    { provider: 'comptia', label: 'AWS Skill Builder (free official training)',  url: '' },
  ],
  domains: [
    { slug: 'fundamentals-of-ai-and-ml',                       name: 'Fundamentals of AI and ML',                       number: '1.0', weight: 20 },
    { slug: 'fundamentals-of-generative-ai',                   name: 'Fundamentals of Generative AI',                   number: '2.0', weight: 24 },
    { slug: 'applications-of-foundation-models',               name: 'Applications of Foundation Models',               number: '3.0', weight: 28 },
    { slug: 'guidelines-for-responsible-ai',                   name: 'Guidelines for Responsible AI',                   number: '4.0', weight: 14 },
    { slug: 'security-compliance-and-governance-for-ai',       name: 'Security, Compliance, and Governance for AI Solutions', number: '5.0', weight: 14 },
  ],
};
