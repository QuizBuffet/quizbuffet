export const cert = {
  slug: 'barber-no-chemical',
  name: 'Barber 1 (No Chemical) License',
  code: 'Barber 1',
  vendor: 'State Boards',
  tagline: 'Entry-level barber license — haircutting, shaving, and styling with no chemical services',
  about: 'Barber 1 (No Chemical) is an entry-level barber license that authorizes haircutting, shaving, beard and facial-hair design, and basic styling — but NOT chemical services such as color, perms, or relaxers. It requires fewer training hours than a full Barber License and is a common stepping stone toward chemical-services certification. Most states use the NIC (National-Interstate Council of State Boards of Cosmetology) National Barber 1 (No Chemical) Theory Examination — a 60-item (50 weighted), 90-minute written exam. The blueprint covers four domains: scientific concepts (infection control, anatomy and physiology, skin and hair disorders, basic product chemistry — 40%), implements and equipment (razors, shears, clippers, sanitation — 10%), hair care services (consultation, draping, shampoo, cutting, styling — 30%), and facial hair and skin care services (shaving, facial hair design, facials, electrotherapy — 20%).',
  details: 'NIC National Barber 1 (No Chemical) Theory exam · 60 items (50 weighted) · 90 minutes · Written + hands-on practical · State-specific passing score (typically 70–75%)',
  affiliates: [
    { provider: 'amazon', label: 'Shop Milady Standard Barbering Textbooks on Amazon', url: 'https://www.amazon.com/s?k=milady+standard+barbering&tag=0003aa-20' },
  ],
  officialSources: [
    { label: 'NIC (nictesting.org)',     url: 'https://www.nictesting.org/' },
    { label: 'Prov CIB Selection App',   url: 'https://apps.provexam.online/sample-apps/cib_selection_app/' },
  ],
  domains: [
    { slug: 'scientific-concepts',                name: 'Scientific Concepts',                 number: '1.0', weight: 40 },
    { slug: 'implements-and-equipment',           name: 'Implements and Equipment',            number: '2.0', weight: 11 },
    { slug: 'hair-care-services',                 name: 'Hair Care Services',                  number: '3.0', weight: 31 },
    { slug: 'facial-hair-and-skin-care-services', name: 'Facial Hair and Skin Care Services',  number: '4.0', weight: 18 },
  ],
};
