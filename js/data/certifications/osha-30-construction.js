import { acronyms } from '../acronyms/osha-30-construction.js';
import { services } from '../services/osha-30-construction.js';

export const cert = {
  slug: 'osha-30-construction',
  name: 'OSHA 30-Hour Construction',
  code: 'OSHA 30',
  vendor: 'OSHA',
  tagline: 'Supervisor-level construction safety certification',
  about: 'OSHA 30-Hour Construction is a voluntary outreach training program for supervisors and workers with safety responsibilities. It covers everything in OSHA 10 plus managing safety and health, the OSHA Focus Four hazards in greater depth, expanded electives, and Foundations for Safety Leadership. Many states, contractors, and project labor agreements require OSHA 30 for foremen, superintendents, and site safety personnel.',
  details: 'Voluntary 30-hour outreach training · No formal exam · Required by many states, GCs, and PLAs for supervisors',
  acronyms,
  services,
  affiliates: [
    { provider: 'udemy',  label: 'Video Course', url: '' },
    { provider: 'amazon', label: 'Shop OSHA 30 Construction Study Guides on Amazon', url: 'https://www.amazon.com/s?k=osha+30+construction+study+guide&tag=0003aa-20' },
    { provider: 'osha',   label: 'OSHA Outreach Training Program', url: 'https://www.osha.gov/training/outreach' },
  ],
  domains: [
    { slug: 'introduction-to-osha',          name: 'Introduction to OSHA',              number: '1.0',  weight: 7  },
    { slug: 'managing-safety-and-health',    name: 'Managing Safety and Health',        number: '2.0',  weight: 8  },
    { slug: 'falls',                         name: 'Focus Four: Falls',                 number: '3.0',  weight: 12 },
    { slug: 'electrocution',                 name: 'Focus Four: Electrocution',         number: '4.0',  weight: 8  },
    { slug: 'struck-by',                     name: 'Focus Four: Struck-By',             number: '5.0',  weight: 7  },
    { slug: 'caught-in-or-between',          name: 'Focus Four: Caught-In or Between',  number: '6.0',  weight: 8  },
    { slug: 'personal-protective-equipment', name: 'Personal Protective Equipment',     number: '7.0',  weight: 7  },
    { slug: 'health-hazards',                name: 'Health Hazards in Construction',    number: '8.0',  weight: 7  },
    { slug: 'stairways-and-ladders',         name: 'Stairways and Ladders',             number: '9.0',  weight: 6  },
    { slug: 'elective-construction-topics',  name: 'Elective Construction Topics',      number: '10.0', weight: 30 },
  ],
};
