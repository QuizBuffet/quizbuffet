export const cert = {
  slug: 'comptia-a-plus-core-1',
  name: 'CompTIA A+ Core 1',
  code: '220-1101',
  vendor: 'CompTIA',
  tagline: 'Hardware, networking, and troubleshooting for IT support technicians',
  about: 'A+ Core 1 (220-1101) is the first of two exams required for the CompTIA A+ certification. It covers mobile devices, networking, hardware, virtualization, cloud computing, and hardware troubleshooting.',
  details: 'Maximum 90 questions · 90 minutes · Multiple-choice and performance-based · Recommended 12 months hands-on experience · Passing score 675/900',
  affiliates: [
    { provider: 'udemy',   label: 'Video Course',     url: '' },
    { provider: 'amazon',  label: 'Study Guide',       url: '' },
    { provider: 'comptia', label: 'CertMaster Learn',  url: '' },
  ],
  domains: [
    { slug: 'mobile-devices',                        name: 'Mobile Devices',                        weight: 15 },
    { slug: 'networking',                            name: 'Networking',                            weight: 20 },
    { slug: 'hardware',                              name: 'Hardware',                              weight: 25 },
    { slug: 'virtualization-and-cloud-computing',    name: 'Virtualization and Cloud Computing',    weight: 11 },
    { slug: 'hardware-and-network-troubleshooting',  name: 'Hardware and Network Troubleshooting',  weight: 29 },
  ],
};
