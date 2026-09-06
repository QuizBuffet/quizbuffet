export const cert = {
  slug: 'micropigmentation',
  name: 'Advanced Practice Micropigmentation',
  code: 'Micropigmentation',
  vendor: 'NIC',
  tagline: 'NIC national theory exam for permanent makeup, paramedical, and cosmetic tattoo procedures',
  about: 'The NIC National Advanced Practice Micropigmentation Theory Examination is the licensure theory exam for advanced cosmetic tattoo procedures (permanent makeup, paramedical micropigmentation, scalp pigmentation, areola restoration, scar repigmentation) authored by the National-Interstate Council of State Boards of Cosmetology (NIC) and adopted by participating state boards. The blueprint covers three domains: Scientific Concepts (infection control, skin and tissue structure, human anatomy and physiology, skin disorders, equipment and pigment storage), Micropigmentation Procedures (client communication and documentation, skin preparation, color theory, pre-application design, and application technique), and Side Effects and Possible Complications. Candidates are expected to anchor their knowledge in the Society of Permanent Cosmetic Professionals (SPCP) standards, NIC Infection Control and Safety Standards, and Milady\'s Aesthetician Series Permanent Makeup: Tips and Techniques.',
  details: '110 items (100 weighted) · 90 minutes · Multiple-choice · Adopted by participating state boards under NIC',
  faq: [
    { q: 'What is on the micropigmentation theory exam?',
      a: '110 multiple-choice items (100 weighted for scoring) in 90 minutes, covering infection control, anatomy and physiology, and the procedures and complications specific to permanent makeup, paramedical, and cosmetic tattoo work.' },
    { q: 'What is the passing score for the micropigmentation exam?',
      a: 'Your state board sets the exact cutoff, since NIC exams are adopted state by state; most states require 70 to 75%.' },
    { q: 'Is there a hands-on exam for micropigmentation too?',
      a: 'Most states require a hands-on practical evaluation in addition to the written theory exam, similar to tattoo and cosmetology licensing.' },
    { q: 'Is micropigmentation the same as permanent makeup?',
      a: 'They overlap heavily. "Micropigmentation" is the broader technical term for depositing pigment in the skin (covering permanent makeup, paramedical work like areola restoration, and cosmetic tattooing); some states license these separately, others combine them.' },
    { q: 'Is this micropigmentation practice test free?',
      a: 'Yes. All micropigmentation practice questions on QuizBuffet are free, organized by domain, with explanations for every answer and no signup.' },
    { q: 'How do you qualify to sit for the micropigmentation exam?',
      a: 'It depends on your state. Most require an existing cosmetology, esthetics, or tattoo license plus a state-approved micropigmentation course, often in the range of 100 to 300 hours, before you can apply for the NIC theory and practical exams. Check your state board for its exact prerequisite.' },
    { q: 'How much does the micropigmentation exam cost?',
      a: "Fees are set by your state board and its testing vendor, typically $100 to $200 for the theory and practical exams combined, plus a license application fee. Your state board's candidate bulletin lists the exact amounts." },
  ],
  affiliates: [
    { provider: 'amazon', label: 'Shop Micropigmentation and Permanent Makeup Textbooks on Amazon', url: 'https://www.amazon.com/s?k=permanent+makeup+micropigmentation+training&tag=0003aa-20' },
  ],
  officialSources: [
    { label: 'NIC (nictesting.org)',     url: 'https://www.nictesting.org/' },
    { label: 'Prov CIB Selection App',   url: 'https://apps.provexam.online/sample-apps/cib_selection_app/' },
  ],
  domains: [
    { slug: 'scientific-concepts',                 name: 'Scientific Concepts',                          number: '1.0', weight: 46 },
    { slug: 'micropigmentation-procedures',         name: 'Micropigmentation Procedures',                 number: '2.0', weight: 50 },
    { slug: 'side-effects-and-complications',       name: 'Side Effects and Possible Complications',      number: '3.0', weight:  4 },
  ],

  // Hand-written long-form sections from the NIC CIB. Overrides the auto-template
  // for this cert so the page surfaces the actual exam scope, references, and
  // procedure-specific risks instead of generic boilerplate.
  guide: {
    whyItMatters:
      'Permanent makeup and paramedical micropigmentation are some of the fastest-growing service categories in the beauty industry, and many states have moved them from generic tattoo licensing into a separate Advanced Practice Micropigmentation credential. The NIC National Advanced Practice Micropigmentation Theory Examination is the standardized theory test that participating boards (Florida, Tennessee, Arizona, Illinois, and others) use to license practitioners. Passing it certifies that you understand bloodborne pathogen control, skin and tissue anatomy, pigment chemistry, color theory for skin undertones, and the complications that can occur weeks or years after the procedure, knowledge that protects both clients and your business.',
    whoShouldTake:
      'This exam is for practicing or aspiring permanent makeup artists, paramedical micropigmentation specialists, and cosmetic tattoo artists who serve clients in states that recognize the NIC Advanced Practice Micropigmentation license. Typical procedures within the scope include microblading, powder/ombré brows, lip blush, eyeliner, scalp micropigmentation, areola restoration, scar repigmentation, and vitiligo camouflage. Estheticians and cosmetologists who already hold a primary license often add this credential to expand their service menu and command higher per-session rates than core esthetics work.',
    examStructure:
      'The exam has 110 items, of which 100 are weighted toward the final score (10 are unscored pilot items). You have 90 minutes. The blueprint splits content across three domains: <strong>Scientific Concepts (40%)</strong> covers infection control, skin and tissue structure, anatomy of the head and eye, skin disorders, and equipment and pigment storage, this is the biggest single category, anchored heavily on the OSHA Bloodborne Pathogen Standard. <strong>Micropigmentation Procedures (55%)</strong> is the heart of the exam: client documentation and consultation, skin preparation, color theory for skin undertones, pre-application design and approval, needle selection, lining, shading, and repigmentation technique. <strong>Side Effects and Possible Complications (5%)</strong> is a small but high-stakes domain covering allergic reactions, granulomas, migration, scarring, and MRI considerations for iron-oxide pigments. References for the test are anchored on Milady\'s Aesthetician Series Permanent Makeup, Milady Standard Esthetics Fundamentals, Society of Permanent Cosmetic Professionals (SPCP) materials, and the NIC Infection Control and Safety Standards.',
    studyPlan:
      'A four-step plan tuned to the NIC blueprint:',
    studyPlanSteps: [
      'Master the OSHA Bloodborne Pathogen Standard (29 CFR 1910.1030) cold. Roughly a quarter of the Scientific Concepts domain references infection control, exposure control plans, and Universal Precautions. Memorizing this CFR section single-handedly carries 10-15 questions.',
      'Drill the Scientific Concepts domain using QuizBuffet questions weighted 40% (88 of 220 questions). Get to 80% on infection control, skin layers, mucosal tissue, and pigment storage before moving to procedures.',
      'Work through Micropigmentation Procedures (55% / 121 questions) by sub-section: client documentation → skin prep → color theory → pre-application design → application technique. Color theory and needle/technique items together are roughly half this domain.',
      'Finish with Side Effects and Possible Complications (11 questions), small but every miss here is high-stakes because complications questions are scenario-based and often map to actual liability cases. Once every domain is at 80%+, take the Mix Quiz to simulate exam timing under the 90-minute clock.',
    ],
    career:
      'Permanent makeup and paramedical micropigmentation are among the highest hourly-rate services in the beauty industry. Practitioners in licensed states typically charge $400 to $900 per session for permanent brows and $500 to $1,200 for full lip blush or full eyeliner; paramedical procedures (areola restoration, scar repigmentation, vitiligo camouflage) command $600 to $1,500 per session. With 4-8 clients per week, a working specialist earns $80,000 to $200,000 annually in major metros. The Advanced Practice license is what unlocks the higher-paying medical-spa, dermatology, and oncology-collaboration referrals.',
    pitfalls:
      'Five traps that fail Advanced Practice Micropigmentation candidates: (1) Skipping the OSHA BBP Standard memorization, the infection-control questions are not optional. (2) Confusing organic and inorganic pigments: know that iron oxides are inorganic and can interact with MRI fields, while carbon-based pigments are organic and fade differently. (3) Missing the depth-of-implantation question: pigment in the reticular dermis causes blue/gray shift; pigment in the epidermis fades fast; the papillary dermis is the target. (4) Underestimating Side Effects despite the 5% weight, granuloma, migration, allergic reaction, hypertrophic vs. keloid scarring, and MRI artifact are all examined and each appears on the practical exam too. (5) Not memorizing contraindications (pregnancy, blood thinners, isotretinoin, keloid history, active skin infection), multiple-choice items here are pure recall.',
  },
};
