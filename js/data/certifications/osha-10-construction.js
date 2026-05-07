import { acronyms } from '../acronyms/osha-10-construction.js';
import { services } from '../services/osha-10-construction.js';

export const cert = {
  slug: 'osha-10-construction',
  name: 'OSHA 10-Hour Construction',
  code: 'OSHA 10',
  vendor: 'OSHA',
  tagline: 'Required entry-level safety training for construction workers',
  about: 'OSHA 10-Hour Construction is a voluntary outreach training program covering worker rights and employer responsibilities, the OSHA Focus Four hazards (falls, electrocution, struck-by, caught-in or between), personal protective equipment, and health hazards in construction. Many states and contractors require it before allowing workers on a construction site, and it is the most common entry credential in the U.S. construction industry.',
  details: 'Voluntary 10-hour outreach training · No formal exam · Required by many states and contractors',
  acronyms,
  services,
  affiliates: [
    { provider: 'udemy',  label: 'Video Course', url: '' },
    { provider: 'amazon', label: 'Shop OSHA 10 Construction Study Guides on Amazon', url: 'https://www.amazon.com/s?k=osha+10+construction+study+guide&tag=0003aa-20' },
    { provider: 'osha',   label: 'OSHA Outreach Training Program', url: 'https://www.osha.gov/training/outreach' },
  ],
  domains: [
    { slug: 'introduction-to-osha',           name: 'Introduction to OSHA',           number: '1.0', weight: 10 },
    { slug: 'falls',                          name: 'Falls (Focus Four)',             number: '2.0', weight: 18 },
    { slug: 'electrocution',                  name: 'Electrocution (Focus Four)',     number: '3.0', weight: 11 },
    { slug: 'struck-by',                      name: 'Struck-By Hazards (Focus Four)', number: '4.0', weight: 11 },
    { slug: 'caught-in-or-between',           name: 'Caught-In or Between (Focus Four)', number: '5.0', weight: 11 },
    { slug: 'personal-protective-equipment',  name: 'Personal Protective Equipment',  number: '6.0', weight: 9  },
    { slug: 'health-hazards',                 name: 'Health Hazards in Construction', number: '7.0', weight: 9  },
    { slug: 'site-safety-electives',          name: 'Site Safety and Elective Topics', number: '8.0', weight: 21 },
  ],
};
