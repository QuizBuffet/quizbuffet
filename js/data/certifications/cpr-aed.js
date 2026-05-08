import { acronyms } from '../acronyms/cpr-aed.js';
import { services } from '../services/cpr-aed.js';

export const cert = {
  slug: 'cpr-aed',
  name: 'CPR / AED Certification',
  code: 'CPR/AED',
  vendor: 'American Red Cross / AHA',
  tagline: 'Lifesaving cardiac and breathing emergency skills',
  about: 'CPR / AED Certification is the lay-rescuer credential for responding to sudden cardiac arrest, choking, and other breathing emergencies. The knowledge component is standardized across the American Heart Association and American Red Cross and is built on the AHA Guidelines for CPR & ECC: scene safety, the Chain of Survival, recognition of cardiac arrest, high-quality compressions and ventilations for adults, children, and infants, AED operation, choking response, and special situations such as opioid overdose, drowning, and pregnancy. Required for many healthcare, education, fitness, lifeguard, and child-care roles, and broadly recommended for any responsible adult.',
  details: 'Hands-only and full-CPR pathways · AED skill check required · 2-year certification cycle (AHA / ARC)',
  acronyms,
  services,
  affiliates: [
    { provider: 'amazon', label: 'Shop CPR/AED Study Guides on Amazon', url: 'https://www.amazon.com/s?k=cpr+aed+certification+study+guide&tag=0003aa-20' },
    { provider: 'aha',    label: 'AHA CPR & ECC Guidelines (free)',     url: 'https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines' },
    { provider: 'redcross', label: 'American Red Cross First Aid / CPR / AED', url: 'https://www.redcross.org/take-a-class/cpr' },
  ],
  domains: [
    { slug: 'introduction-and-chain-of-survival', name: 'Introduction and Chain of Survival',     number: '1.0', weight: 8  },
    { slug: 'assessment-and-recognition',         name: 'Assessment and Recognition',             number: '2.0', weight: 12 },
    { slug: 'adult-cpr',                          name: 'Adult CPR',                              number: '3.0', weight: 22 },
    { slug: 'child-and-infant-cpr',               name: 'Child and Infant CPR',                   number: '4.0', weight: 18 },
    { slug: 'aed-operation',                      name: 'AED Operation',                          number: '5.0', weight: 18 },
    { slug: 'choking-and-airway-obstruction',     name: 'Choking and Airway Obstruction',         number: '6.0', weight: 12 },
    { slug: 'special-situations-and-recovery',    name: 'Special Situations and Recovery',        number: '7.0', weight: 10 },
  ],
};
