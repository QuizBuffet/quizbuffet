import { acronyms } from '../acronyms/comptia-security-plus.js';

export const cert = {
  slug: 'comptia-security-plus',
  name: 'CompTIA Security+',
  code: 'SY0-701',
  vendor: 'CompTIA',
  tagline: 'Core security skills for IT professionals defending enterprise environments',
  about: 'Security+ certifies professionals who can assess enterprise security posture, monitor hybrid environments, operate within governance and compliance frameworks, and identify and respond to security incidents.',
  details: 'Maximum 90 questions · 90 minutes · Multiple-choice and performance-based · Recommended 2 years IT administration with security focus',
  acronyms,
  affiliates: [
    { provider: 'udemy',   label: 'Video Course',     url: '' },
    { provider: 'amazon',  label: 'Study Guide',       url: '' },
    { provider: 'comptia', label: 'CertMaster Learn',  url: '' },
  ],
  domains: [
    { slug: 'general-security-concepts',                  name: 'General Security Concepts',                  number: '1.0', weight: 12 },
    { slug: 'threats-vulnerabilities-and-mitigations',    name: 'Threats, Vulnerabilities, and Mitigations',  number: '2.0', weight: 22 },
    { slug: 'security-architecture',                      name: 'Security Architecture',                      number: '3.0', weight: 18 },
    { slug: 'security-operations',                        name: 'Security Operations',                        number: '4.0', weight: 28 },
    { slug: 'security-program-management-and-oversight',  name: 'Security Program Management and Oversight',  number: '5.0', weight: 20 },
  ],
};
