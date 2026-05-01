import { acronyms } from '../acronyms/comptia-network-plus.js';

export const cert = {
  slug: 'comptia-network-plus',
  name: 'CompTIA Network+',
  code: 'N10-009',
  vendor: 'CompTIA',
  tagline: 'Core networking skills for IT infrastructure professionals',
  about: 'Network+ certifies professionals who can deploy wired and wireless networks, configure network services, implement security hardening, and troubleshoot performance and availability issues. It covers networking concepts, IP addressing, routing, switching, wireless, cloud connectivity, and network troubleshooting. Recommended for professionals with 9–12 months of networking experience.',
  details: 'Maximum 90 questions · 90 minutes · Passing score 720/900 · Multiple-choice and performance-based',
  acronyms,
  affiliates: [
    { provider: 'udemy',   label: 'Video Course',     url: '' },
    { provider: 'amazon',  label: 'Study Guide',       url: '' },
    { provider: 'comptia', label: 'CertMaster Learn',  url: '' },
  ],
  domains: [
    { slug: 'networking-concepts',     name: 'Networking Concepts',     number: '1.0', weight: 23 },
    { slug: 'network-implementation',  name: 'Network Implementation',  number: '2.0', weight: 20 },
    { slug: 'network-operations',      name: 'Network Operations',      number: '3.0', weight: 19 },
    { slug: 'network-security',        name: 'Network Security',        number: '4.0', weight: 14 },
    { slug: 'network-troubleshooting', name: 'Network Troubleshooting', number: '5.0', weight: 24 },
  ],
};
