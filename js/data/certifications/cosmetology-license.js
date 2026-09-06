export const cert = {
  slug: 'cosmetology-license',
  name: 'Cosmetology License',
  code: 'Cosmetology',
  vendor: 'State Boards',
  tagline: 'State-licensed credential for hair, skin, and nail services',
  about: 'A Cosmetology License is required in every U.S. state to perform haircutting, chemical services, skin care, and nail care for compensation. State exams typically follow the NIC (National-Interstate Council of State Boards of Cosmetology) National Theory blueprint, administered by PSI or a similar testing vendor as a written exam plus a hands-on practical. The written exam covers four areas: scientific concepts (infection control, anatomy and physiology, chemistry, electricity), hair care and services (cutting, styling, color, chemical texture, hair structure), skin care and services (facials, hair removal, skin analysis), and nail care and services (manicures, pedicures, enhancements, nail disorders).',
  details: 'NIC National Theory written exam · ~90-110 questions · 1.5-2 hours · State-specific passing score (typically 70-75%) · State-administered hands-on practical exam also required',
  affiliates: [
    { provider: 'amazon', label: 'Shop Milady Standard Cosmetology Textbooks on Amazon', url: 'https://www.amazon.com/s?k=milady+standard+cosmetology&tag=0003aa-20' },
  ],
  officialSources: [
    { label: 'NIC (nictesting.org)',     url: 'https://www.nictesting.org/' },
    { label: 'Prov CIB Selection App',   url: 'https://apps.provexam.online/sample-apps/cib_selection_app/' },
  ],
  domains: [
    { slug: 'scientific-concepts',     name: 'Scientific Concepts',     number: '1.0', weight: 31 },
    { slug: 'hair-care-and-services',  name: 'Hair Care and Services',  number: '2.0', weight: 37 },
    { slug: 'skin-care-and-services',  name: 'Skin Care and Services',  number: '3.0', weight: 17 },
    { slug: 'nail-care-and-services',  name: 'Nail Care and Services',  number: '4.0', weight: 15 },
  ],
};
