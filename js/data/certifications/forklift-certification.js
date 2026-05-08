import { acronyms } from '../acronyms/forklift-certification.js';
import { services } from '../services/forklift-certification.js';

export const cert = {
  slug: 'forklift-certification',
  name: 'Forklift Operator Certification',
  code: 'OSHA 1910.178',
  vendor: 'OSHA',
  tagline: 'Required certification for operating powered industrial trucks',
  about: 'Forklift Operator Certification is mandated by 29 CFR 1910.178 for any worker operating a powered industrial truck on the job. Training covers truck types and capacities, the physics of stability (fulcrum, center of gravity, stability triangle, load center), pre-operation inspection, safe load handling, operating around pedestrians, lifting personnel on work platforms, and the employer’s duty to evaluate and certify each operator at least every three years.',
  details: 'Employer-administered certification · Required by 29 CFR 1910.178 · Re-evaluation every 3 years',
  acronyms,
  services,
  affiliates: [
    { provider: 'udemy',  label: 'Video Course', url: '' },
    { provider: 'amazon', label: 'Shop Forklift Operator Study Guides on Amazon', url: 'https://www.amazon.com/s?k=forklift+operator+certification+study+guide&tag=0003aa-20' },
    { provider: 'osha',   label: '29 CFR 1910.178 (OSHA Powered Industrial Trucks)', url: 'https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.178' },
  ],
  domains: [
    { slug: 'forklift-fundamentals',              name: 'Forklift Fundamentals and Markings',           number: '1.0', weight: 12 },
    { slug: 'components-and-protective-features', name: 'Components and Protective Features',           number: '2.0', weight: 10 },
    { slug: 'stability-and-load-center',          name: 'Stability and Load Center',                    number: '3.0', weight: 20 },
    { slug: 'seat-belt-and-operating-conditions', name: 'Seat Belt Safety and Operating Conditions',    number: '4.0', weight: 10 },
    { slug: 'safe-operation',                     name: 'Safe Operation: Loads, Travel, and Shutdown',  number: '5.0', weight: 20 },
    { slug: 'pedestrian-safety-and-work-platforms', name: 'Pedestrian Safety and Work Platforms',       number: '6.0', weight: 11 },
    { slug: 'training-evaluation-and-certification', name: 'Training, Evaluation, and Certification',  number: '7.0', weight: 17 },
  ],
};
