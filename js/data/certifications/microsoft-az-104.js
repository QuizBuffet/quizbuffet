export const cert = {
  slug: 'microsoft-az-104',
  name: 'Microsoft Azure Administrator',
  seoName: 'AZ-104 Azure Administrator',
  code: 'AZ-104',
  vendor: 'Microsoft',
  tagline: 'Day-to-day administration of Azure infrastructure at the associate level',
  about: 'Microsoft Azure Administrator (AZ-104) validates skills for managing Azure subscriptions, identities and governance (Microsoft Entra ID, RBAC, Azure Policy, management groups), storage (storage accounts, Azure Files, Blob Storage, redundancy, lifecycle), compute (virtual machines, Container Instances, Container Apps, App Service, scale sets, ARM/Bicep), virtual networking (VNets, NSGs, Bastion, peering, private endpoints, load balancing, DNS), and monitoring with Azure Monitor and backup with Recovery Services and Site Recovery.',
  details: '40-60 questions · 120 minutes · Multiple-choice and case-study formats · Pass score 700/1000',
  udemyCourseUrl: 'https://www.udemy.com/course/70533-azure/',
  affiliates: [
    { provider: 'udemy',   label: 'Video Course',     url: '' },
    { provider: 'amazon',  label: 'Shop Microsoft AZ-104 Study Guides on Amazon', url: 'https://www.amazon.com/s?k=microsoft+az-104+azure+administrator&tag=0003aa-20' },
    { provider: 'comptia', label: 'Microsoft Learn (free official training)',  url: '' },
  ],
  domains: [
    { slug: 'manage-azure-identities-and-governance',         name: 'Manage Azure identities and governance',         number: '1.0', weight: 23 },
    { slug: 'implement-and-manage-storage',                    name: 'Implement and manage storage',                    number: '2.0', weight: 18 },
    { slug: 'deploy-and-manage-azure-compute-resources',       name: 'Deploy and manage Azure compute resources',       number: '3.0', weight: 22 },
    { slug: 'implement-and-manage-virtual-networking',         name: 'Implement and manage virtual networking',         number: '4.0', weight: 18 },
    { slug: 'monitor-and-maintain-azure-resources',            name: 'Monitor and maintain Azure resources',            number: '5.0', weight: 19 },
  ],
};
