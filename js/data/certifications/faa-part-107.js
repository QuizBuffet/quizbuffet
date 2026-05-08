import { acronyms } from '../acronyms/faa-part-107.js';
import { services } from '../services/faa-part-107.js';

export const cert = {
  slug: 'faa-part-107',
  name: 'FAA Part 107 (Remote Pilot — Small UAS)',
  code: 'Part 107',
  vendor: 'FAA',
  tagline: 'Required certificate for commercial drone operations in the U.S.',
  about: 'FAA Part 107 is the Remote Pilot Certificate with a small Unmanned Aircraft Systems (sUAS) rating, required by 14 CFR Part 107 for any commercial drone operation in the United States. The initial knowledge test (UAG) is administered by PSI at FAA-approved testing centers and consists of 60 multiple-choice questions covering five Areas of Operation from the FAA Airman Certification Standards (FAA-S-ACS-10B): Regulations, Airspace and Operating Requirements, Weather, Loading and Performance, and Operations. Candidates pass with 70% (42 of 60). After August 2024, recurrent currency is satisfied through the free online ALC-677 training every 24 months instead of a recurrent knowledge test.',
  details: '60 multiple-choice items · 2 hours · Pass score 70% · 9 study domains anchored on FAA-S-ACS-10B · Recurrency via free ALC-677 every 24 months',
  acronyms,
  services,
  affiliates: [
    { provider: 'amazon', label: 'Shop FAA Part 107 Study Guides on Amazon', url: 'https://www.amazon.com/s?k=faa+part+107+remote+pilot+study+guide&tag=0003aa-20' },
    { provider: 'faa',    label: 'FAA — Become a Drone Pilot (Part 107)', url: 'https://www.faa.gov/uas/commercial_operators/become_a_drone_pilot' },
    { provider: 'faa',    label: 'FAA Airman Certification Standards (FAA-S-ACS-10B)', url: 'https://www.faa.gov/training_testing/testing/acs' },
    { provider: 'psi',    label: 'PSI Exams — FAA Knowledge Testing', url: 'https://faa.psiexams.com/' },
  ],
  domains: [
    { slug: 'regulations-core',                                  name: 'Regulations — Core',                                  number: '1.0', weight: 14 },
    { slug: 'operations-over-people',                            name: 'Operations Over People',                              number: '2.0', weight: 5  },
    { slug: 'remote-identification',                             name: 'Remote Identification',                               number: '3.0', weight: 3  },
    { slug: 'airspace-classification-and-operational-requirements', name: 'Airspace Classification and Operational Requirements', number: '4.0', weight: 20 },
    { slug: 'weather',                                           name: 'Weather',                                             number: '5.0', weight: 13 },
    { slug: 'loading-and-performance',                           name: 'Loading and Performance',                             number: '6.0', weight: 9  },
    { slug: 'radio-communications-and-airport-operations',       name: 'Radio Communications and Airport Operations',         number: '7.0', weight: 11 },
    { slug: 'emergency-procedures-and-aeronautical-decision-making', name: 'Emergency Procedures and Aeronautical Decision-Making', number: '8.0', weight: 14 },
    { slug: 'physiology-and-maintenance',                        name: 'Physiology and Maintenance',                          number: '9.0', weight: 11 },
  ],
};
