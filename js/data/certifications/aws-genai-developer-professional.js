import { acronyms } from '../acronyms/aws-genai-developer-professional.js';
import { services } from '../services/aws-genai-developer-professional.js';

export const cert = {
  slug: 'aws-genai-developer-professional',
  name: 'AWS Certified Generative AI Developer – Professional',
  code: 'AIP-C01',
  vendor: 'AWS',
  tagline: 'Build, integrate, and operate production GenAI solutions on AWS',
  about: 'AWS Certified Generative AI Developer – Professional (AIP-C01) validates the ability to integrate foundation models into applications and business workflows, including RAG and vector store design, agentic AI, prompt engineering and management, FM API integration, model deployment strategies, AI safety and governance, performance and cost optimization, and evaluation, monitoring, and troubleshooting of GenAI applications.',
  details: '75 questions (65 scored + 10 unscored) · 180 minutes · Multiple-choice and multiple-response · Pass score 750/1000',
  acronyms,
  services,
  affiliates: [
    { provider: 'udemy',   label: 'Video Course',     url: '' },
    { provider: 'amazon',  label: 'Shop AWS GenAI Developer Professional AIP-C01 Study Guides on Amazon', url: 'https://www.amazon.com/s?k=aws+generative+ai+developer+aip-c01&tag=0003aa-20' },
    { provider: 'comptia', label: 'AWS Skill Builder (free official training)',  url: '' },
  ],
  domains: [
    { slug: 'foundation-model-integration-data-management-and-compliance',     name: 'Foundation Model Integration, Data Management, and Compliance', number: '1.0', weight: 31 },
    { slug: 'implementation-and-integration',                                  name: 'Implementation and Integration',                                number: '2.0', weight: 26 },
    { slug: 'ai-safety-security-and-governance',                               name: 'AI Safety, Security, and Governance',                           number: '3.0', weight: 20 },
    { slug: 'operational-efficiency-and-optimization-for-genai-applications',  name: 'Operational Efficiency and Optimization for GenAI Applications', number: '4.0', weight: 12 },
    { slug: 'testing-validation-and-troubleshooting',                          name: 'Testing, Validation, and Troubleshooting',                      number: '5.0', weight: 11 },
  ],
};
