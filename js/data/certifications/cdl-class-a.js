export const cert = {
  slug: 'cdl-class-a',
  name: 'CDL Class A',
  code: 'CDL-A',
  vendor: 'FMCSA / State DMV',
  tagline: 'Federal license required to drive tractor-trailers and large combination vehicles',
  about: 'CDL Class A licensing is governed by 49 CFR Part 383 and administered by state DMVs under the Federal Motor Carrier Safety Administration (FMCSA). The knowledge component covers driver qualifications and disqualifications, hours of service, safe driving and hazard recognition, cargo securement, the air brake system and 7-step inspection, combination vehicles and coupling/uncoupling, the pre-trip vehicle inspection, and basic vehicle control maneuvers. A Class A CDL is required to operate any combination vehicle with a gross combination weight rating (GCWR) over 26,001 pounds when the towed unit exceeds 10,000 pounds.',
  details: 'State-administered written tests + skills test · Federal CDL standard · Endorsements: H, N, P, S, T, X · 49 CFR Parts 383, 391, 392, 393, 395, 396',
  affiliates: [
    { provider: 'amazon',  label: 'Shop CDL Study Guides on Amazon', url: 'https://www.amazon.com/s?k=cdl+class+a+study+guide&tag=0003aa-20' },
    { provider: 'fmcsa',   label: 'FMCSA Commercial Driver\'s License Manual', url: 'https://www.fmcsa.dot.gov/registration/commercial-drivers-license' },
    { provider: 'aamva',   label: 'AAMVA Model CDL Manual',         url: 'https://www.aamva.org/' },
  ],
  domains: [
    { slug: 'driver-qualifications-and-cdl-fundamentals', name: 'Driver Qualifications and CDL Fundamentals', number: '1.0', weight: 6  },
    { slug: 'driving-safely-and-on-road-operation',       name: 'Driving Safely and On-Road Operation',      number: '2.0', weight: 25 },
    { slug: 'transporting-cargo-safely',                  name: 'Transporting Cargo Safely',                 number: '3.0', weight: 10 },
    { slug: 'air-brakes',                                 name: 'Air Brakes',                                number: '4.0', weight: 20 },
    { slug: 'combination-vehicles',                       name: 'Combination Vehicles',                      number: '5.0', weight: 15 },
    { slug: 'pre-trip-vehicle-inspection',                name: 'Pre-Trip Vehicle Inspection',               number: '6.0', weight: 15 },
    { slug: 'basic-vehicle-control-and-maneuvering',      name: 'Basic Vehicle Control and Maneuvering',     number: '7.0', weight: 9  },
  ],
};
