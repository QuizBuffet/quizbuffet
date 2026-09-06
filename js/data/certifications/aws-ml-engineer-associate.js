export const cert = {
  slug: 'aws-ml-engineer-associate',
  name: 'AWS Certified Machine Learning Engineer Associate',
  code: 'MLA-C01',
  seoName: 'AWS ML Engineer Associate',
  vendor: 'AWS',
  tagline: 'Build, deploy, and operate ML solutions on AWS',
  about: 'AWS Certified Machine Learning Engineer Associate (MLA-C01) validates the ability to build, deploy, and operationalize ML solutions on AWS. It covers data preparation, model development, deployment and orchestration of ML workflows, and ongoing monitoring, maintenance, and security of ML solutions in production.',
  details: '65 questions · 130 minutes · Multiple-choice and multiple-response · Pass score 720/1000',
  udemyCourseUrl: 'https://www.udemy.com/course/aws-certified-machine-learning-engineer-associate-mla-c01/',
  affiliates: [
    { provider: 'udemy',   label: 'Video Course',     url: '' },
    { provider: 'amazon',  label: 'Shop AWS ML Engineer Associate MLA-C01 Study Guides on Amazon', url: 'https://www.amazon.com/s?k=aws+machine+learning+engineer+mla-c01&tag=0003aa-20' },
    { provider: 'comptia', label: 'AWS Skill Builder (free official training)',  url: '' },
  ],
  domains: [
    { slug: 'data-preparation-for-machine-learning',                        name: 'Data Preparation for Machine Learning',                        number: '1.0', weight: 28 },
    { slug: 'ml-model-development',                                         name: 'ML Model Development',                                         number: '2.0', weight: 26 },
    { slug: 'deployment-and-orchestration-of-ml-workflows',                 name: 'Deployment and Orchestration of ML Workflows',                 number: '3.0', weight: 22 },
    { slug: 'ml-solution-monitoring-maintenance-and-security',              name: 'ML Solution Monitoring, Maintenance, and Security',            number: '4.0', weight: 24 },
  ],
};
