export const cert = {
  slug: 'esthetician-license',
  name: 'Esthetician License',
  code: 'Esthetician',
  vendor: 'NIC',
  tagline: 'State-licensed credential for professional skin care services',
  about: 'The Esthetician License is required in every U.S. state to perform professional skin care services for compensation, facials, hair removal, makeup application, skin analysis, chemical exfoliation, and body treatments. State exams typically follow the NIC (National-Interstate Council of State Boards of Cosmetology) National Esthetics Theory blueprint, administered by PSI or similar testing vendors as a written exam plus a hands-on practical. The theory exam covers three domains: scientific concepts (infection control, anatomy and physiology, skin analysis and disorders, chemistry, electricity basics), esthetic services (client consultation, facials, facial massage, hair removal, makeup, body treatments), and the implements, tools, and equipment used in the modern skin care studio.',
  details: 'NIC National Esthetics Theory exam · ~100 weighted items · 90 minutes · State-specific passing score (typically 70-75%) · State-administered hands-on practical exam also required',
  affiliates: [
    { provider: 'amazon', label: 'Shop Milady Standard Esthetics Textbooks on Amazon', url: 'https://www.amazon.com/s?k=milady+standard+esthetics+fundamentals&tag=0003aa-20' },
  ],
  officialSources: [
    { label: 'NIC (nictesting.org)',     url: 'https://www.nictesting.org/' },
    { label: 'Prov CIB Selection App',   url: 'https://apps.provexam.online/sample-apps/cib_selection_app/' },
  ],
  domains: [
    { slug: 'scientific-concepts',           name: 'Scientific Concepts',                number: '1.0', weight: 45 },
    { slug: 'esthetic-services',             name: 'Esthetic Services',                  number: '2.0', weight: 50 },
    { slug: 'implements-tools-and-equipment', name: 'Implements, Tools, and Equipment',   number: '3.0', weight:  5 },
  ],
};
