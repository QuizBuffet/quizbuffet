import { acronyms } from '../acronyms/nmls-mlo.js';
import { services } from '../services/nmls-mlo.js';

export const cert = {
  slug: 'nmls-mlo',
  name: 'NMLS Mortgage Loan Originator (MLO)',
  code: 'SAFE MLO',
  vendor: 'NMLS',
  tagline: 'Federal SAFE Act licensing exam for mortgage loan originators',
  about: 'The SAFE MLO National Test with Uniform State Content is required by the federal SAFE Act for any individual originating residential mortgage loans. The test consists of 120 multiple-choice items (115 scored, 5 unscored) across five content areas: Federal Mortgage-Related Laws (24%), Uniform State Content (11%), General Mortgage Knowledge (20%), Mortgage Loan Origination Activities (27%), and Ethics (18%). Federal coverage is anchored on 12 CFR Parts 1024, 1002, 1026, 1003, 1022, 1016, 1014, and 1008 — RESPA (Reg X), ECOA (Reg B), TILA (Reg Z), HMDA (Reg C), FCRA (Reg V), Privacy (Reg P), MAP advertising (Reg N), and SAFE Act compliance (Reg H).',
  details: 'NMLS-administered · 120 multiple-choice items (115 scored + 5 unscored) · 75% passing score · 20-hour pre-license education · 8-hour annual continuing education · CFPB / HUD oversight',
  acronyms,
  services,
  affiliates: [
    { provider: 'amazon', label: 'Shop SAFE MLO Study Guides on Amazon', url: 'https://www.amazon.com/s?k=safe+mlo+exam+prep&tag=0003aa-20' },
    { provider: 'nmls',   label: 'NMLS Resource Center',                 url: 'https://mortgage.nationwidelicensingsystem.org/Pages/default.aspx' },
    { provider: 'cfpb',   label: 'CFPB Mortgage Rules and Guidance',     url: 'https://www.consumerfinance.gov/compliance/' },
  ],
  domains: [
    { slug: 'federal-mortgage-related-laws',     name: 'Federal Mortgage-Related Laws',          number: '1.0', weight: 24 },
    { slug: 'uniform-state-content',             name: 'Uniform State Content',                  number: '2.0', weight: 11 },
    { slug: 'general-mortgage-knowledge',        name: 'General Mortgage Knowledge',             number: '3.0', weight: 20 },
    { slug: 'mortgage-loan-origination-activities', name: 'Mortgage Loan Origination Activities', number: '4.0', weight: 27 },
    { slug: 'ethics',                            name: 'Ethics',                                 number: '5.0', weight: 18 },
  ],
};
