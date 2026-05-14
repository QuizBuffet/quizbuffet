export const cert = {
  slug: 'bls',
  name: 'Basic Life Support (BLS)',
  code: 'BLS',
  vendor: 'American Heart Association',
  tagline: 'Required CPR-level credential for healthcare professionals',
  about: 'BLS (Basic Life Support) certifies healthcare professionals to deliver high-quality CPR, use an AED, provide ventilation with barrier devices and bag-mask, relieve choking, and work as part of a high-performance resuscitation team for adults, children, and infants. Required for nurses, physicians, EMTs, paramedics, dental and respiratory professionals, and most clinical roles. Built around the AHA Chain of Survival, 2020 BLS Guidelines (with 2023 focused updates), and the AHA BLS Provider course; renewal is typically every two years.',
  details: '25-question multiple-choice exam · Pass score 84% (21 of 25) · 2-year certification · Hands-on skills test required for in-person card',
  udemyCourseUrl: 'https://www.udemy.com/course/cpr-aed/?couponCode=KEEPLEARNING',
  affiliates: [
    { provider: 'amazon', label: 'Shop AHA BLS Provider Manuals on Amazon', url: 'https://www.amazon.com/s?k=aha+bls+provider+manual&tag=0003aa-20' },
  ],
  domains: [
    { slug: 'course-concepts-and-chain-of-survival',     name: 'Course Concepts and Chain of Survival',     number: '1.0', weight: 6  },
    { slug: 'assessment-and-high-performance-teams',     name: 'Assessment and High-Performance Teams',     number: '2.0', weight: 12 },
    { slug: 'adult-bls-1-and-2-rescuer',                 name: 'Adult BLS (1- and 2-Rescuer)',              number: '3.0', weight: 22 },
    { slug: 'pediatric-bls-children-and-infants',        name: 'Pediatric BLS (Children and Infants)',      number: '4.0', weight: 18 },
    { slug: 'aed-for-all-ages',                          name: 'AED for All Ages',                          number: '5.0', weight: 16 },
    { slug: 'alternate-ventilation-and-advanced-airways',name: 'Alternate Ventilation and Advanced Airways',number: '6.0', weight: 8  },
    { slug: 'choking-relief-across-ages',                name: 'Choking Relief Across Ages',                number: '7.0', weight: 10 },
    { slug: 'special-emergencies-and-recovery',          name: 'Special Emergencies and Recovery',          number: '8.0', weight: 8  },
  ],
};
