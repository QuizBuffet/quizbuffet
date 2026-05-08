import { acronyms } from '../acronyms/real-estate-license.js';
import { services } from '../services/real-estate-license.js';

export const cert = {
  slug: 'real-estate-license',
  name: 'Georgia Real Estate Salesperson License',
  code: 'Real Estate License',
  vendor: 'Georgia Real Estate Commission / AMP',
  tagline: 'Georgia license to represent real estate buyers and sellers',
  about: 'The Georgia Real Estate Salesperson Examination is administered by AMP for the Georgia Real Estate Commission (GREC). The full exam is 152 multiple-choice items combining the National Real Estate portion (100 items across seven content areas: agency relationships and contracts, real property ownership and interest, finance, real property and valuation, marketing regulations, property management, and real estate calculations) with the Georgia Salesperson Supplement (52 items covering state laws and rules, real estate practice in Georgia, and finance and closing). Candidates must complete a 75-hour Georgia-approved prelicense course, pass the exam at 75%, secure a sponsoring broker for active licensure, and complete a 25-hour postlicense course in their first year.',
  details: '152 multiple-choice items · National + Georgia Supplement · 75-hour prelicense + 25-hour postlicense · Pass score 75% · Administered by AMP',
  acronyms,
  services,
  affiliates: [
    { provider: 'amazon', label: 'Shop Georgia Real Estate License Study Guides on Amazon', url: 'https://www.amazon.com/s?k=georgia+real+estate+license+exam+prep&tag=0003aa-20' },
    { provider: 'grec',   label: 'Georgia Real Estate Commission (GREC)', url: 'https://grec.state.ga.us/' },
    { provider: 'amp',    label: 'AMP — Real Estate Examination Program', url: 'https://www.goamp.com/' },
  ],
  domains: [
    { slug: 'agency-relationships-and-contracts',     name: 'Agency Relationships and Contracts',     number: '1.0',  weight: 19 },
    { slug: 'real-property-ownership-and-interest',   name: 'Real Property Ownership and Interest',   number: '2.0',  weight: 9  },
    { slug: 'finance',                                name: 'Finance',                                number: '3.0',  weight: 10 },
    { slug: 'real-property',                          name: 'Real Property',                          number: '4.0',  weight: 9  },
    { slug: 'marketing-regulations',                  name: 'Marketing Regulations',                  number: '5.0',  weight: 5  },
    { slug: 'property-management',                    name: 'Property Management',                    number: '6.0',  weight: 5  },
    { slug: 'real-estate-calculations',               name: 'Real Estate Calculations',               number: '7.0',  weight: 9  },
    { slug: 'state-laws-and-rules-ga',                name: 'State Laws & Rules (Georgia)',           number: '8.0',  weight: 11 },
    { slug: 'real-estate-practice-in-georgia',        name: 'Real Estate Practice in Georgia',        number: '9.0',  weight: 14 },
    { slug: 'finance-and-closing-ga',                 name: 'Finance & Closing (Georgia)',            number: '10.0', weight: 9  },
  ],
};
