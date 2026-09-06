export const acronyms = [
  // Certifying body and credentials
  { a: 'NASM',     d: 'National Academy of Sports Medicine' },
  { a: 'CPT',      d: 'Certified Personal Trainer' },
  { a: 'NCCA',     d: 'National Commission for Certifying Agencies (the accrediting body for NASM-CPT)' },
  { a: 'CES',      d: 'Corrective Exercise Specialist (NASM advanced credential)' },
  { a: 'PES',      d: 'Performance Enhancement Specialist (NASM advanced credential)' },
  { a: 'FNS',      d: 'Fitness Nutrition Specialist (NASM advanced credential)' },
  { a: 'BCS',      d: 'Behavior Change Specialist (NASM advanced credential)' },

  // Core programming framework
  { a: 'OPT',      d: 'Optimum Performance Training: NASM\'s 5-phase periodized programming model' },
  { a: 'Phase 1',  d: 'OPT Stabilization Endurance: high reps, low load, unstable surface emphasis' },
  { a: 'Phase 2',  d: 'OPT Strength Endurance: superset stable + unstable strength' },
  { a: 'Phase 3',  d: 'OPT Hypertrophy: moderate-high volume, moderate-heavy load' },
  { a: 'Phase 4',  d: 'OPT Maximal Strength: heavy load, low reps, longer rest' },
  { a: 'Phase 5',  d: 'OPT Power: heavy + explosive supersets' },

  // Anatomy / kinesiology
  { a: 'ROM',      d: 'Range of Motion' },
  { a: 'COG',      d: 'Center of Gravity' },
  { a: 'LOG',      d: 'Line of Gravity' },
  { a: 'BOS',      d: 'Base of Support' },
  { a: 'LPHC',     d: 'Lumbo-Pelvic-Hip Complex (the core)' },
  { a: 'CNS',      d: 'Central Nervous System' },
  { a: 'PNS',      d: 'Peripheral Nervous System' },
  { a: 'SAID',     d: 'Specific Adaptation to Imposed Demands' },
  { a: 'GAS',      d: 'General Adaptation Syndrome (Selye): alarm, resistance, exhaustion' },

  // Energy systems / physiology
  { a: 'ATP',      d: 'Adenosine Triphosphate (the energy currency of cells)' },
  { a: 'ATP-PC',   d: 'ATP-Phosphocreatine system: primary energy for ≤10 seconds of all-out effort' },
  { a: 'EPOC',     d: 'Excess Post-exercise Oxygen Consumption' },
  { a: 'VO2max',   d: 'Maximal Oxygen Uptake: gold-standard measure of cardiorespiratory fitness' },
  { a: 'RER',      d: 'Respiratory Exchange Ratio (CO₂ produced / O₂ consumed)' },
  { a: 'BMR',      d: 'Basal Metabolic Rate' },
  { a: 'RMR',      d: 'Resting Metabolic Rate' },
  { a: 'TEF',      d: 'Thermic Effect of Food' },
  { a: 'TDEE',     d: 'Total Daily Energy Expenditure' },
  { a: 'HRR',      d: 'Heart Rate Reserve (HRmax − HRrest)' },
  { a: 'MHR',      d: 'Maximum Heart Rate' },
  { a: 'RHR',      d: 'Resting Heart Rate' },
  { a: 'RPE',      d: 'Rating of Perceived Exertion (Borg scale 6-20 or modified 0-10)' },

  // Cardio / training zones
  { a: 'HIIT',     d: 'High-Intensity Interval Training' },
  { a: 'MCT',      d: 'Moderate Continuous Training' },
  { a: 'LSD',      d: 'Long Slow Distance training' },
  { a: 'AT',       d: 'Anaerobic Threshold' },
  { a: 'VT1',      d: 'Ventilatory Threshold 1 (talk test transition)' },
  { a: 'VT2',      d: 'Ventilatory Threshold 2 (sustainable max effort transition)' },
  { a: 'Zone 1',   d: 'Cardio Zone 1: below VT1, conversational pace, 65-75% HRmax' },
  { a: 'Zone 2',   d: 'Cardio Zone 2: between VT1 and VT2, broken-conversation pace, 76-85% HRmax' },
  { a: 'Zone 3',   d: 'Cardio Zone 3: above VT2, very hard, 86-95% HRmax' },

  // Strength / loading
  { a: '1RM',      d: 'One-Repetition Maximum' },
  { a: 'Reps',     d: 'Repetitions' },
  { a: 'TUT',      d: 'Time Under Tension' },
  { a: 'DOMS',     d: 'Delayed Onset Muscle Soreness' },
  { a: 'PRE',      d: 'Progressive Resistance Exercise' },

  // Movement and assessment
  { a: 'OHSA',     d: 'Overhead Squat Assessment (NASM\'s primary movement screen)' },
  { a: 'SLSA',     d: 'Single-Leg Squat Assessment' },
  { a: 'PPA',      d: 'Pushing Pulling Assessment' },
  { a: 'Davis\'s Law', d: 'Soft tissue remodels along lines of stress' },
  { a: 'Wolff\'s Law', d: 'Bone remodels along lines of stress' },
  { a: 'Sherrington\'s Law', d: 'Reciprocal inhibition: when an agonist contracts, its antagonist relaxes' },
  { a: 'Pattern overload', d: 'Repetitive movement in the same plane causing dysfunction' },

  // Postural distortion patterns (CES framework, common on the CPT exam)
  { a: 'PDS',      d: 'Pronation Distortion Syndrome: feet flatten, knees adduct/internally rotate' },
  { a: 'LPCS',     d: 'Lower Crossed Syndrome: anterior pelvic tilt, tight hip flexors and erectors, weak glutes and abs' },
  { a: 'UCS',      d: 'Upper Crossed Syndrome: forward head, rounded shoulders, tight upper traps/pecs, weak deep neck flexors and lower traps' },

  // Flexibility / mobility
  { a: 'SMR',      d: 'Self-Myofascial Release (foam rolling)' },
  { a: 'PNF',      d: 'Proprioceptive Neuromuscular Facilitation stretching' },
  { a: 'AIS',      d: 'Active Isolated Stretching' },
  { a: 'GTO',      d: 'Golgi Tendon Organ: autogenic inhibition response' },

  // Vital signs / screening
  { a: 'BP',       d: 'Blood Pressure (systolic / diastolic in mmHg)' },
  { a: 'BMI',      d: 'Body Mass Index = weight (kg) / height (m)²' },
  { a: 'WHR',      d: 'Waist-to-Hip Ratio' },
  { a: 'BF%',      d: 'Body Fat Percentage' },
  { a: 'PAR-Q+',   d: 'Physical Activity Readiness Questionnaire (revised): pre-exercise screening' },
  { a: 'HRA',      d: 'Health-Risk Assessment' },

  // Behavior change / coaching
  { a: 'TTM',      d: 'Transtheoretical Model (Stages of Change): precontemplation, contemplation, preparation, action, maintenance' },
  { a: 'SDT',      d: 'Self-Determination Theory: autonomy, competence, relatedness' },
  { a: 'SMART',    d: 'Specific · Measurable · Attainable · Realistic · Timely (goal-setting)' },
  { a: 'OARS',     d: 'Open questions · Affirmations · Reflective listening · Summaries (motivational interviewing)' },

  // Nutrition
  { a: 'AMDR',     d: 'Acceptable Macronutrient Distribution Range: carbs 45-65%, protein 10-35%, fat 20-35%' },
  { a: 'RDA',      d: 'Recommended Dietary Allowance' },
  { a: 'DRI',      d: 'Dietary Reference Intake' },
  { a: 'kcal',     d: 'Kilocalorie (a dietary "Calorie"): protein 4 kcal/g, carbs 4 kcal/g, fat 9 kcal/g, alcohol 7 kcal/g' },

  // Professional / scope
  { a: 'SOAP',     d: 'Subjective · Objective · Assessment · Plan documentation format' },
  { a: 'HIPAA',    d: 'Health Insurance Portability and Accountability Act (privacy of health information)' },
  { a: 'ACSM',     d: 'American College of Sports Medicine (issues exercise guidelines)' },
  { a: 'AHA',      d: 'American Heart Association' },
  { a: 'ADA',      d: 'Americans with Disabilities Act' },
];
