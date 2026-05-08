export const acronyms = [
  // Regulatory bodies and core programs
  { a: 'FAA',     d: 'Federal Aviation Administration' },
  { a: 'NTSB',    d: 'National Transportation Safety Board (accident reporting authority)' },
  { a: 'NOTAM',   d: 'Notice to Air Missions (formerly Notice to Airmen)' },
  { a: 'TFR',     d: 'Temporary Flight Restriction' },
  { a: 'CFR',     d: 'Code of Federal Regulations (Part 107 lives in 14 CFR Part 107)' },

  // The aircraft and the pilot
  { a: 'UAS',     d: 'Unmanned Aircraft System' },
  { a: 'sUAS',    d: 'small Unmanned Aircraft System (under 55 lb / 25 kg)' },
  { a: 'UA',      d: 'Unmanned Aircraft (the airframe itself)' },
  { a: 'RPIC',    d: 'Remote Pilot in Command' },
  { a: 'PIC',     d: 'Pilot in Command' },
  { a: 'VO',      d: 'Visual Observer' },
  { a: 'VLOS',    d: 'Visual Line of Sight' },
  { a: 'BVLOS',   d: 'Beyond Visual Line of Sight' },
  { a: 'FPV',     d: 'First-Person View' },

  // Identification and authorization
  { a: 'Remote ID', d: 'Remote Identification (14 CFR Part 89) — broadcast ID required for most sUAS operations' },
  { a: 'FRIA',    d: 'FAA-Recognized Identification Area (geographic area where Remote ID is not required)' },
  { a: 'LAANC',   d: 'Low Altitude Authorization and Notification Capability' },
  { a: 'COA',     d: 'Certificate of Waiver or Authorization' },
  { a: 'UAG',     d: 'Unmanned Aircraft General — Small (the initial Part 107 knowledge test code)' },
  { a: 'IACRA',   d: 'Integrated Airman Certification and Rating Application (FAA online application portal)' },
  { a: 'TRUST',   d: 'The Recreational UAS Safety Test (for hobby flyers under §44809, NOT Part 107)' },

  // Airspace classes and reference
  { a: 'Class A', d: '18,000 ft MSL up to FL600 — sUAS operations not allowed under Part 107' },
  { a: 'Class B', d: 'Surface to 10,000 ft MSL around busiest airports — ATC authorization required' },
  { a: 'Class C', d: 'Surface to 4,000 ft AGL around busy airports — ATC authorization required' },
  { a: 'Class D', d: 'Surface to 2,500 ft AGL around towered airports — ATC authorization required' },
  { a: 'Class E', d: 'Controlled airspace not A/B/C/D — authorization required at the surface' },
  { a: 'Class G', d: 'Uncontrolled airspace — no ATC authorization needed under Part 107' },
  { a: 'SFRA',    d: 'Special Flight Rules Area (e.g., Washington DC SFRA)' },
  { a: 'MOA',     d: 'Military Operations Area' },
  { a: 'MTR',     d: 'Military Training Route (IR/VR)' },
  { a: 'ADIZ',    d: 'Air Defense Identification Zone' },
  { a: 'CFA',     d: 'Controlled Firing Area' },
  { a: 'NSA',     d: 'National Security Area' },

  // Altitudes and reference systems
  { a: 'AGL',     d: 'Above Ground Level' },
  { a: 'MSL',     d: 'Mean Sea Level' },
  { a: 'FL',      d: 'Flight Level (e.g., FL180 = 18,000 ft MSL)' },
  { a: 'AAE',     d: 'Above Airport Elevation' },

  // Weather products
  { a: 'METAR',   d: 'Aviation Routine Weather Report (current observed conditions)' },
  { a: 'TAF',     d: 'Terminal Aerodrome Forecast (forecast for an airport area)' },
  { a: 'AIRMET',  d: 'Airmen\'s Meteorological Information (less severe than SIGMET)' },
  { a: 'SIGMET',  d: 'Significant Meteorological Information (severe weather hazards)' },
  { a: 'PIREP',   d: 'Pilot Report (in-flight observed weather)' },
  { a: 'AWOS',    d: 'Automated Weather Observing System' },
  { a: 'ASOS',    d: 'Automated Surface Observing System' },
  { a: 'FSS',     d: 'Flight Service Station (1-800-WX-BRIEF)' },
  { a: 'CB',      d: 'Cumulonimbus (thunderstorm cloud)' },
  { a: 'TCU',     d: 'Towering Cumulus' },
  { a: 'IMC',     d: 'Instrument Meteorological Conditions (Part 107 operations not permitted)' },
  { a: 'VMC',     d: 'Visual Meteorological Conditions' },
  { a: 'SM',      d: 'Statute Miles (visibility unit)' },
  { a: 'NM',      d: 'Nautical Miles (1 NM ≈ 1.15 SM)' },

  // Sectional chart and navigation
  { a: 'VFR Sectional', d: 'Visual Flight Rules sectional chart (1:500,000) — primary chart for Part 107' },
  { a: 'CTAF',    d: 'Common Traffic Advisory Frequency' },
  { a: 'UNICOM',  d: 'Universal Communication (non-towered airport advisory)' },
  { a: 'ATIS',    d: 'Automatic Terminal Information Service' },
  { a: 'VOR',     d: 'Very High Frequency Omnidirectional Range (navigation aid shown as compass rose)' },
  { a: 'GPS',     d: 'Global Positioning System' },
  { a: 'TRSA',    d: 'Terminal Radar Service Area' },

  // Performance, loading, physiology
  { a: 'CG',      d: 'Center of Gravity' },
  { a: 'LiPo',    d: 'Lithium Polymer (battery chemistry common to drones)' },
  { a: 'DA',      d: 'Density Altitude (pressure altitude corrected for non-standard temperature)' },
  { a: 'PA',      d: 'Pressure Altitude (altitude above standard 29.92 inHg datum)' },
  { a: 'ISA',     d: 'International Standard Atmosphere (15°C / 29.92 inHg at sea level)' },
  { a: 'CRM',     d: 'Crew Resource Management' },
  { a: 'ADM',     d: 'Aeronautical Decision Making' },
  { a: 'IMSAFE',  d: 'Illness · Medication · Stress · Alcohol · Fatigue · Emotion (self-assessment)' },
  { a: 'PAVE',    d: 'Pilot · Aircraft · enVironment · External pressures (preflight risk model)' },
  { a: '5P',      d: 'Plan · Plane · Pilot · Passengers · Programming (in-flight risk model)' },
  { a: 'DECIDE',  d: 'Detect · Estimate · Choose · Identify · Do · Evaluate (decision-making model)' },
  { a: '3P',      d: 'Perceive · Process · Perform (situational risk-management loop)' },

  // Reporting and currency
  { a: 'ALC-677', d: 'Free FAA online recurrent training course (replaces the Part 107 recurrent knowledge test)' },
  { a: 'TSA',     d: 'Transportation Security Administration (vetting of remote pilot applicants)' },
  { a: '49 USC §44807', d: 'Statutory authority allowing Part 107 commercial sUAS operations' },
  { a: '14 CFR Part 107', d: 'Small Unmanned Aircraft Systems — the core Part 107 rule' },
  { a: '14 CFR Part 89',  d: 'Remote Identification of Unmanned Aircraft' },
  { a: '14 CFR §44809',   d: 'Exception for limited recreational operations of unmanned aircraft' },
];
