export const cert = {
  slug: 'aws-security-specialty',
  name: 'AWS Certified Security – Specialty',
  code: 'SCS-C03',
  vendor: 'AWS',
  tagline: 'Secure AWS workloads end-to-end: detection, identity, data protection, and governance',
  about: 'AWS Certified Security – Specialty (SCS-C03) validates expertise securing cloud solutions on AWS. It covers detection (GuardDuty, Security Hub, Macie, Security Lake, CloudTrail, CloudWatch), incident response, infrastructure security across edge and compute (WAF, Shield, Network Firewall, Inspector), identity and access management at scale (IAM, IAM Identity Center, Cognito, Verified Permissions), data protection in transit and at rest (KMS, CloudHSM, ACM, Secrets Manager), and multi-account security governance (Organizations, Control Tower, Config, Audit Manager).',
  details: '65 questions (50 scored + 15 unscored) · 170 minutes · Multiple-choice, multiple-response, ordering, matching · Pass score 750/1000',
  udemyCourseUrl: 'https://www.udemy.com/course/ultimate-aws-certified-security-specialty/',
  affiliates: [
    { provider: 'udemy',   label: 'Video Course',     url: '' },
    { provider: 'amazon',  label: 'Shop AWS Security Specialty SCS-C03 Study Guides on Amazon', url: 'https://www.amazon.com/s?k=aws+security+specialty+scs-c03&tag=0003aa-20' },
    { provider: 'comptia', label: 'AWS Skill Builder (free official training)',  url: '' },
  ],
  domains: [
    { slug: 'detection',                            name: 'Detection',                            number: '1.0', weight: 16 },
    { slug: 'incident-response',                    name: 'Incident Response',                    number: '2.0', weight: 14 },
    { slug: 'infrastructure-security',              name: 'Infrastructure Security',              number: '3.0', weight: 18 },
    { slug: 'identity-and-access-management',       name: 'Identity and Access Management',       number: '4.0', weight: 20 },
    { slug: 'data-protection',                      name: 'Data Protection',                      number: '5.0', weight: 18 },
    { slug: 'security-foundations-and-governance',  name: 'Security Foundations and Governance',  number: '6.0', weight: 14 },
  ],
};
