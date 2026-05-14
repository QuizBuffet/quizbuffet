export const cert = {
  slug: 'microsoft-az-900',
  name: 'Microsoft Azure Fundamentals',
  code: 'AZ-900',
  vendor: 'Microsoft',
  tagline: 'Foundational Azure knowledge for cloud beginners and decision-makers',
  about: 'Microsoft Azure Fundamentals (AZ-900) is the entry-level Azure certification. It covers cloud concepts (IaaS/PaaS/SaaS, public/private/hybrid, shared responsibility, consumption-based pricing), core Azure architecture and services (regions, availability zones, compute, networking, storage, databases, identity), and Azure management and governance (cost management, Microsoft Entra, role-based access control, Azure Policy, monitoring, support).',
  details: '40–60 questions · 60 minutes · Multiple-choice and case-study formats · Pass score 700/1000',
  udemyCourseUrl: 'https://www.udemy.com/course/microsoft-az-900-fundamentals/?couponCode=KEEPLEARNING',
  affiliates: [
    { provider: 'udemy',   label: 'Video Course',     url: '' },
    { provider: 'amazon',  label: 'Shop Microsoft AZ-900 Study Guides on Amazon', url: 'https://www.amazon.com/s?k=microsoft+az-900+azure+fundamentals&tag=0003aa-20' },
    { provider: 'comptia', label: 'Microsoft Learn (free official training)',  url: '' },
  ],
  domains: [
    { slug: 'describe-cloud-concepts',                    name: 'Describe cloud concepts',                    number: '1.0', weight: 27 },
    { slug: 'describe-azure-architecture-and-services',   name: 'Describe Azure architecture and services',   number: '2.0', weight: 37 },
    { slug: 'describe-azure-management-and-governance',   name: 'Describe Azure management and governance',   number: '3.0', weight: 36 },
  ],
};
