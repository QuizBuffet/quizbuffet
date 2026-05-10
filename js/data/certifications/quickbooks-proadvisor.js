import { acronyms } from '../acronyms/quickbooks-proadvisor.js';
import { services } from '../services/quickbooks-proadvisor.js';

export const cert = {
  slug: 'quickbooks-proadvisor',
  name: 'QuickBooks ProAdvisor (Online Certification)',
  code: 'QuickBooks ProAdvisor',
  vendor: 'Intuit',
  tagline: 'Intuit-certified credential for QuickBooks Online and Desktop',
  about: 'The QuickBooks ProAdvisor program is Intuit\'s free certification for accounting and bookkeeping professionals. The QuickBooks Online (QBO) Certification exam tests practical knowledge of subscription selection, navigation and company settings, list and product/service management, the chart of accounts, customer and sales workflows, vendor and purchase workflows, banking and bank-feed reconciliation, reports, and payroll basics. Certification is delivered through training courses on QuickBooks Online Accountant; candidates pass each module quiz at 80% and the final exam at 80%, with three attempts per module. The Advanced ProAdvisor Certification builds on the basic certification with deeper QBO functionality and advisory workflows.',
  details: 'Free Intuit certification · ~50 questions per module · Pass score 80% · 3 attempts per module · Online via QuickBooks Online Accountant',
  acronyms,
  services,
  affiliates: [
    { provider: 'amazon', label: 'Shop QuickBooks ProAdvisor Study Guides on Amazon', url: 'https://www.amazon.com/s?k=quickbooks+proadvisor+certification+study+guide&tag=0003aa-20' },
    { provider: 'intuit', label: 'QuickBooks Online Accountant — ProAdvisor Program', url: 'https://quickbooks.intuit.com/accountants/proadvisor/' },
    { provider: 'intuit', label: 'Intuit Tax Pro Center — Education Resources', url: 'https://accountants.intuit.com/training-certification/' },
  ],
  domains: [
    { slug: 'setup-and-subscriptions',         name: 'QBO Setup & Subscriptions',                number: '1.0', weight: 8  },
    { slug: 'navigation-and-settings',         name: 'Navigation & Settings',                    number: '2.0', weight: 12 },
    { slug: 'list-management',                 name: 'List Management',                          number: '3.0', weight: 10 },
    { slug: 'chart-of-accounts-and-products',  name: 'Chart of Accounts & Products/Services',    number: '4.0', weight: 10 },
    { slug: 'customers-and-sales',             name: 'Customers & Sales Transactions',           number: '5.0', weight: 20 },
    { slug: 'vendors-and-purchases',           name: 'Vendors & Purchase Transactions',          number: '6.0', weight: 15 },
    { slug: 'banking-and-reconciliation',      name: 'Banking, Feeds & Reconciliation',          number: '7.0', weight: 15 },
    { slug: 'reports',                         name: 'Reports',                                  number: '8.0', weight: 7  },
    { slug: 'payroll',                         name: 'Payroll',                                  number: '9.0', weight: 3  },
  ],
};
