export const cert = {
  slug: 'barber-license',
  name: 'Barber License',
  code: 'Barber',
  vendor: 'State Boards',
  tagline: 'State-licensed credential for haircutting, shaving, and chemical hair services',
  about: 'A Barber License is required in every U.S. state to perform haircutting, shaving, beard design, chemical hair services, and basic skin and scalp care for compensation. Most states use the NIC (National-Interstate Council of State Boards of Cosmetology) National Barber Theory Examination — a 60-item, 90-minute written exam — paired with a hands-on practical, both typically administered by PSI. The theory blueprint covers four domains: scientific concepts (infection control, anatomy and physiology, skin and hair disorders, product chemistry), implements and equipment (razors, shears, clippers, sanitation), hair care services (consultation, draping, shampoo, cutting, styling, chemical services), and facial hair and skin care services (shaving, facial hair design, facials, electrotherapy).',
  details: 'NIC National Barber Theory exam · 60 items (50 weighted) · 90 minutes · Written + hands-on practical · State-specific passing score (typically 70–75%)',
  affiliates: [
    { provider: 'amazon', label: 'Shop Milady Standard Barbering Textbooks on Amazon', url: 'https://www.amazon.com/s?k=milady+standard+barbering&tag=0003aa-20' },
  ],
  officialSources: [
    { label: 'NIC (nictesting.org)',     url: 'https://www.nictesting.org/' },
    { label: 'Prov CIB Selection App',   url: 'https://apps.provexam.online/sample-apps/cib_selection_app/' },
  ],
  domains: [
    { slug: 'scientific-concepts',                name: 'Scientific Concepts',                       number: '1.0', weight: 38 },
    { slug: 'implements-and-equipment',           name: 'Implements and Equipment',                  number: '2.0', weight:  8 },
    { slug: 'hair-care-services',                 name: 'Hair Care Services',                        number: '3.0', weight: 40 },
    { slug: 'facial-hair-and-skin-care-services', name: 'Facial Hair and Skin Care Services',        number: '4.0', weight: 14 },
  ],
};
