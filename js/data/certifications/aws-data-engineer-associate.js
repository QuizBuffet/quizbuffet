export const cert = {
  slug: 'aws-data-engineer-associate',
  name: 'AWS Certified Data Engineer – Associate',
  code: 'DEA-C01',
  vendor: 'AWS',
  tagline: 'Implement, monitor, and optimize data pipelines on AWS',
  about: 'AWS Certified Data Engineer – Associate (DEA-C01) validates the ability to implement data pipelines and to monitor, troubleshoot, and optimize cost and performance issues. It covers data ingestion and transformation, data store choice and management, data cataloging and schema evolution, pipeline orchestration and automation, programming concepts, data quality and analysis, and data security, governance, and privacy on AWS.',
  details: '65 questions (50 scored + 15 unscored) · 130 minutes · Multiple-choice and multiple-response · Pass score 720/1000',
  udemyCourseUrl: 'https://www.udemy.com/course/aws-data-engineer/',
  affiliates: [
    { provider: 'udemy',   label: 'Video Course',     url: '' },
    { provider: 'amazon',  label: 'Shop AWS Data Engineer DEA-C01 Study Guides on Amazon', url: 'https://www.amazon.com/s?k=aws+data+engineer+dea-c01&tag=0003aa-20' },
    { provider: 'comptia', label: 'AWS Skill Builder (free official training)',  url: '' },
  ],
  domains: [
    { slug: 'data-ingestion-and-transformation', name: 'Data Ingestion and Transformation', number: '1.0', weight: 34 },
    { slug: 'data-store-management',             name: 'Data Store Management',             number: '2.0', weight: 26 },
    { slug: 'data-operations-and-support',       name: 'Data Operations and Support',       number: '3.0', weight: 22 },
    { slug: 'data-security-and-governance',      name: 'Data Security and Governance',      number: '4.0', weight: 18 },
  ],
};
