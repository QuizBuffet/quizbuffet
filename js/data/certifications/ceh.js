export const cert = {
  slug: 'ceh',
  name: 'Certified Ethical Hacker (CEH)',
  code: 'CEH',
  vendor: 'EC-Council',
  tagline: 'EC-Council\'s ethical hacking certification — penetration testing, vulnerability assessment, and offensive security',
  about: 'Certified Ethical Hacker (CEH) from EC-Council validates offensive security skills for penetration testers, SOC analysts, and security engineers. The current blueprint (v5.0) covers nine domains: Information Security and Ethical Hacking Overview (6%) — methodologies, frameworks, controls, laws; Reconnaissance Techniques (17%) — footprinting, network scanning, enumeration; System Hacking Phases and Attack Techniques (15%) — vulnerability analysis, system hacking, malware threats; Network and Perimeter Hacking (24%) — sniffing, social engineering, denial-of-service, session hijacking, evading IDS/firewalls/honeypots; Web Application Hacking (14%) — web servers, web applications, SQL injection; Wireless Network Hacking (5%); Mobile Platform, IoT, and OT Hacking (10%); Cloud Computing (5%) — container, serverless, cloud security; and Cryptography (5%). CEH is ANSI/ISO 17024 accredited and DoD 8570/8140 baseline approved for several cybersecurity roles. Often compared with OSCP (more hands-on offensive) and CompTIA PenTest+ (vendor-neutral).',
  details: 'EC-Council CEH v13 (Blueprint v5.0) · 125 multiple-choice questions · 4 hours · Computer-based · ANSI/ISO 17024 accredited · DoD 8570/8140 approved · Companion CEH Practical (6-hour hands-on lab)',
  affiliates: [
    { provider: 'amazon', label: 'Certified Ethical Hacker 2025-2026 Guide (Amazon)', url: 'https://www.amazon.com/CERTIFIED-ETHICAL-HACKER-2025-2026-GUIDE-ebook/dp/B0FG82B873?tag=0003aa-20' },
    { provider: 'amazon', label: 'Shop CEH v13 Study Guides on Amazon',                url: 'https://www.amazon.com/s?k=certified+ethical+hacker+v13&tag=0003aa-20' },
  ],
  officialSources: [
    { label: 'EC-Council CEH program',     url: 'https://www.eccouncil.org/programs/certified-ethical-hacker-ceh/' },
    { label: 'CEH Exam Blueprint v5.0',    url: 'https://www.eccouncil.org/wp-content/uploads/2024/CEH-Exam-Blueprint-v5.pdf' },
    { label: 'EC-Council Aspen portal',    url: 'https://aspen.eccouncil.org/' },
  ],
  domains: [
    { slug: 'information-security-overview',  name: 'Information Security and Ethical Hacking Overview', number: '1.0', weight: 6  },
    { slug: 'reconnaissance-techniques',      name: 'Reconnaissance Techniques',                          number: '2.0', weight: 17 },
    { slug: 'system-hacking',                 name: 'System Hacking Phases and Attack Techniques',        number: '3.0', weight: 15 },
    { slug: 'network-and-perimeter-hacking',  name: 'Network and Perimeter Hacking',                      number: '4.0', weight: 23 },
    { slug: 'web-application-hacking',        name: 'Web Application Hacking',                            number: '5.0', weight: 14 },
    { slug: 'wireless-network-hacking',       name: 'Wireless Network Hacking',                           number: '6.0', weight: 5  },
    { slug: 'mobile-iot-and-ot-hacking',      name: 'Mobile Platform, IoT, and OT Hacking',               number: '7.0', weight: 10 },
    { slug: 'cloud-computing',                name: 'Cloud Computing',                                    number: '8.0', weight: 5  },
    { slug: 'cryptography',                   name: 'Cryptography',                                       number: '9.0', weight: 5  },
  ],
};
