export const cert = {
  slug: 'aws-advanced-networking-specialty',
  name: 'AWS Certified Advanced Networking Specialty',
  code: 'ANS-C01',
  seoName: 'AWS Advanced Networking Specialty',
  vendor: 'AWS',
  tagline: 'Design, implement, manage, and secure AWS and hybrid networks at scale',
  about: 'AWS Certified Advanced Networking Specialty (ANS-C01) validates expertise designing and operating complex AWS networking solutions. It covers edge services and global traffic management (CloudFront, Global Accelerator, Route 53), hybrid connectivity with Direct Connect and Site-to-Site VPN, BGP routing, multi-VPC and multi-account designs (Transit Gateway, PrivateLink, VPC peering, RAM), DNS architectures including DNSSEC, network monitoring (VPC Flow Logs, Traffic Mirroring, Reachability Analyzer, Transit Gateway Network Manager), and network security with WAF, Shield, Network Firewall, and Firewall Manager.',
  details: '65 questions (50 scored + 15 unscored) · 170 minutes · Multiple-response and matching · Pass score 700/1000',
  udemyCourseUrl: 'https://www.udemy.com/course/aws-certified-advanced-networking-specialty-ans/',
  affiliates: [
    { provider: 'udemy',   label: 'Video Course',     url: '' },
    { provider: 'amazon',  label: 'Shop AWS Advanced Networking ANS-C01 Study Guides on Amazon', url: 'https://www.amazon.com/s?k=aws+advanced+networking+ans-c01&tag=0003aa-20' },
    { provider: 'comptia', label: 'AWS Skill Builder (free official training)',  url: '' },
  ],
  domains: [
    { slug: 'network-design',                           name: 'Network Design',                           number: '1.0', weight: 30 },
    { slug: 'network-implementation',                   name: 'Network Implementation',                   number: '2.0', weight: 26 },
    { slug: 'network-management-and-operation',         name: 'Network Management and Operation',         number: '3.0', weight: 20 },
    { slug: 'network-security-compliance-and-governance', name: 'Network Security, Compliance, and Governance', number: '4.0', weight: 24 },
  ],
};
