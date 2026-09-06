export const cert = {
  slug: 'tattoo-license',
  name: 'Tattoo Artist License',
  code: 'Tattoo',
  vendor: 'NIC',
  tagline: 'State license for professional tattooing and body art services',
  about: 'A Tattoo Artist License is required in most U.S. states to perform tattooing for compensation. Many states use the NIC (National-Interstate Council of State Boards of Cosmetology) National Tattooing Practical Examination, a six-section, timed performance evaluation administered on a live model. The exam covers six core domains based on the national job analysis: Work Area Set Up (infection control, EPA-registered disinfection, OSHA-mandated disposal containers, supply preparation), Client Preparation and Stencil Application (skin prep, simulated shave, stencil transfer to the forearm), Machine Assembly (presenting sterile packaged tubes and needles, building the machine, power on/off testing), Demonstration of Simulated Tattoo Procedure and Conclusion (pigment dispersal, simulated application, mid-procedure ink-cap addition, conclusion), Breakdown and Conclusion of Tattoo Service (decontaminating the procedural area, completing personal protection procedures), and Work Area Set Up for New Client (re-preparing supplies, demonstrating foot-switch disinfection and transport, completing personal protection). References are anchored on Milady Standard Esthetics Fundamentals + Foundations (12th Edition) and the APP Procedure Manual.',
  details: 'NIC National Tattooing Practical Examination · 6 core domain sections · ~80 timed minutes plus an untimed simulated-procedure section · Hands-on performance evaluation on a live model · State-specific passing score · Required disposal containers (sharps, trash, to-be-disinfected) and EPA-registered disinfectant wipes throughout',
  affiliates: [
    { provider: 'amazon', label: 'Shop Milady Standard Esthetics and Tattooing Textbooks on Amazon', url: 'https://www.amazon.com/s?k=milady+standard+esthetics+tattooing&tag=0003aa-20' },
  ],
  officialSources: [
    { label: 'NIC (nictesting.org)',     url: 'https://www.nictesting.org/' },
    { label: 'Prov CIB Selection App',   url: 'https://apps.provexam.online/sample-apps/cib_selection_app/' },
  ],
  domains: [
    { slug: 'work-area-set-up',              name: 'Work Area Set Up',                                    number: '1.0', weight: 18 },
    { slug: 'client-preparation-stencil',    name: 'Client Preparation and Stencil Application',          number: '2.0', weight: 14 },
    { slug: 'machine-assembly',              name: 'Machine Assembly',                                    number: '3.0', weight: 14 },
    { slug: 'simulated-tattoo-procedure',    name: 'Simulated Tattoo Procedure and Conclusion',           number: '4.0', weight: 23 },
    { slug: 'breakdown-conclusion',          name: 'Breakdown and Conclusion of Tattoo Service',          number: '5.0', weight: 18 },
    { slug: 'work-area-new-client',          name: 'Work Area Set Up for New Client',                     number: '6.0', weight: 13 },
  ],
};
