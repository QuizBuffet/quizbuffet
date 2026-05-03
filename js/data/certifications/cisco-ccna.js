import { acronyms } from '../acronyms/cisco-ccna.js';

export const cert = {
  slug: 'cisco-ccna',
  name: 'Cisco CCNA',
  code: '200-301',
  vendor: 'Cisco',
  tagline: 'The industry-standard entry into network engineering careers',
  about: 'CCNA (Cisco Certified Network Associate, exam 200-301 v1.1) certifies professionals who can install, configure, operate, and troubleshoot small- to medium-sized networks. It covers network fundamentals, network access, IP connectivity (routing, OSPF), IP services (NAT, NTP, DHCP, QoS), security fundamentals, and automation and programmability — including AI/ML in network operations and REST APIs.',
  details: '120 minutes · Multiple-choice and performance-based · Recommended prep: Implementing and Administering Cisco Solutions (CCNA) course',
  acronyms,
  affiliates: [
    { provider: 'udemy',   label: 'Video Course',     url: '' },
    { provider: 'amazon',  label: 'Shop CCNA 200-301 Study Guides on Amazon', url: 'https://www.amazon.com/s?k=ccna+200-301&tag=0003aa-20' },
    { provider: 'comptia', label: 'Cisco Modeling Labs (free hands-on practice)',  url: '' },
  ],
  domains: [
    { slug: 'network-fundamentals',         name: 'Network Fundamentals',         number: '1.0', weight: 20 },
    { slug: 'network-access',               name: 'Network Access',               number: '2.0', weight: 20 },
    { slug: 'ip-connectivity',              name: 'IP Connectivity',              number: '3.0', weight: 25 },
    { slug: 'ip-services',                  name: 'IP Services',                  number: '4.0', weight: 10 },
    { slug: 'security-fundamentals',        name: 'Security Fundamentals',        number: '5.0', weight: 15 },
    { slug: 'automation-and-programmability', name: 'Automation and Programmability', number: '6.0', weight: 10 },
  ],
};
