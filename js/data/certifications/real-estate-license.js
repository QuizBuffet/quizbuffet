import { acronyms } from '../acronyms/real-estate-license.js';
import { services } from '../services/real-estate-license.js';

export const cert = {
  slug: 'real-estate-license',
  name: 'Real Estate Salesperson License',
  code: 'Real Estate License',
  vendor: 'State Real Estate Commissions',
  tagline: 'State-required license to legally represent real estate buyers and sellers',
  about: 'The Real Estate Salesperson License is required by every U.S. state for representing buyers, sellers, landlords, or tenants in real estate transactions for compensation. The national portion of the licensing exam is anchored on the AMP / PSI / Pearson VUE national content outline and covers seven areas: agency relationships and contracts, real property ownership and interest, finance, real property and valuation, marketing regulations, property management, and real estate calculations. State-specific supplements are administered separately by each jurisdiction’s real estate commission. Most states also require pre-license coursework (60–75 hours), a state-administered exam, a sponsoring broker, and an FBI / state criminal history clearance.',
  details: 'State-administered written exam · National + State portions · Pre-license course (60–75 hours) and sponsoring broker required · Renewal and continuing education vary by state',
  acronyms,
  services,
  affiliates: [
    { provider: 'amazon', label: 'Shop Real Estate License Study Guides on Amazon', url: 'https://www.amazon.com/s?k=real+estate+license+exam+prep&tag=0003aa-20' },
    { provider: 'arello', label: 'ARELLO — Association of Real Estate License Law Officials', url: 'https://www.arello.org/' },
    { provider: 'nar',    label: 'National Association of REALTORS®', url: 'https://www.nar.realtor/' },
  ],
  domains: [
    { slug: 'agency-relationships-and-contracts',     name: 'Agency Relationships and Contracts',     number: '1.0', weight: 28 },
    { slug: 'real-property-ownership-and-interest',   name: 'Real Property Ownership and Interest',   number: '2.0', weight: 14 },
    { slug: 'finance',                                name: 'Finance',                                number: '3.0', weight: 15 },
    { slug: 'real-property',                          name: 'Real Property',                          number: '4.0', weight: 14 },
    { slug: 'marketing-regulations',                  name: 'Marketing Regulations',                  number: '5.0', weight: 8  },
    { slug: 'property-management',                    name: 'Property Management',                    number: '6.0', weight: 8  },
    { slug: 'real-estate-calculations',               name: 'Real Estate Calculations',               number: '7.0', weight: 13 },
  ],
};
