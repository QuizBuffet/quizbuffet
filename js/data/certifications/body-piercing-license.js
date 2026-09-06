export const cert = {
  slug: 'body-piercing-license',
  name: 'Body Piercing License',
  code: 'Body Piercing',
  vendor: 'State Boards',
  tagline: 'State-licensed credential for body piercing: sterilization, anatomy, jewelry, and safe procedure technique',
  about: 'A Body Piercing License authorizes piercing of the ear cartilage, nose, lip, tongue, navel, nipple, and other body sites for compensation. Most states use the NIC (National-Interstate Council of State Boards of Cosmetology) National Body Piercing Theory Examination, a 110-item (100 weighted), 90-minute written exam, paired with a hands-on practical. The theory blueprint covers two domains: scientific concepts (microbiology, infection control levels and methods, Standard Precautions, blood exposure and needle-stick procedures, anatomy and physiology, skin histology, anomalies and disorders, jewelry materials, 55%) and piercing procedures and services (client consultation and consent, outcomes and complications, tools and equipment, jewelry suitability, skin prep and placement marking, piercing technique, jewelry changes and stretching, aftercare, 45%). References include Milady, the APP Procedure Manual, the Body Art Model Code, and The Piercing Bible.',
  details: 'NIC National Body Piercing Theory exam · 110 items (100 weighted) · 90 minutes · Written + hands-on practical · State-specific passing score (typically 70-75%)',
  affiliates: [
    { provider: 'amazon', label: 'Shop The Piercing Bible and Body Piercing Study Guides on Amazon', url: 'https://www.amazon.com/s?k=the+piercing+bible+body+piercing&tag=0003aa-20' },
  ],
  officialSources: [
    { label: 'NIC (nictesting.org)',                 url: 'https://www.nictesting.org/' },
    { label: 'Association of Professional Piercers',  url: 'https://safepiercing.org/' },
    { label: 'NEHA Body Art Model Code',              url: 'https://www.neha.org/body-art-model-code' },
  ],
  domains: [
    { slug: 'scientific-concepts',              name: 'Scientific Concepts',              number: '1.0', weight: 55 },
    { slug: 'piercing-procedures-and-services', name: 'Piercing Procedures and Services', number: '2.0', weight: 45 },
  ],
};
