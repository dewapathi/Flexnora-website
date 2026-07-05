export type Vital = { label: string; value: string; trend: 'up' | 'down' | 'flat'; normal: boolean };
export type HistoryEntry = { date: string; title: string; description: string; doctor: string };
export type Prescription = { name: string; dosage: string; frequency: string; prescribedOn: string; status: 'Active' | 'Completed' };
export type DemoDocument = { name: string; type: string; date: string; size: string };

export type Patient = {
  id: string;
  name: string;
  initials: string;
  age: number;
  gender: 'Male' | 'Female';
  condition: string;
  status: 'Stable' | 'Critical' | 'Recovering' | 'Scheduled';
  lastVisit: string;
  bloodType: string;
  phone: string;
  email: string;
  address: string;
  insurance: string;
  vitals: Vital[];
  history: HistoryEntry[];
  prescriptions: Prescription[];
  documents: DemoDocument[];
};

export type Appointment = {
  id: string;
  patientId: string;
  patientName: string;
  initials: string;
  type: string;
  date: string;
  time: string;
  duration: string;
  status: 'Confirmed' | 'Pending' | 'Completed' | 'Cancelled';
  mode: 'In-person' | 'Video';
};

export const doctor = {
  name: 'Dr. Amara Wickramasinghe',
  role: 'Senior Cardiologist',
  email: 'amara.w@flexnora-health.demo',
  initials: 'AW',
  license: 'MD-48213',
  hospital: 'FLEXNORA General Hospital',
};

export const patients: Patient[] = [
  {
    id: 'p-001', name: 'Nathan Perera', initials: 'NP', age: 54, gender: 'Male',
    condition: 'Hypertension', status: 'Stable', lastVisit: '2026-06-28', bloodType: 'O+',
    phone: '+1 (415) 555-0182', email: 'nathan.perera@mail.demo', address: '482 Bayview Terrace, San Francisco, CA',
    insurance: 'BlueShield Premier',
    vitals: [
      { label: 'Blood Pressure', value: '128/82 mmHg', trend: 'down', normal: true },
      { label: 'Heart Rate', value: '74 bpm', trend: 'flat', normal: true },
      { label: 'Blood Glucose', value: '96 mg/dL', trend: 'flat', normal: true },
      { label: 'BMI', value: '26.4', trend: 'down', normal: true },
    ],
    history: [
      { date: '2026-06-28', title: 'Routine Follow-up', description: 'Blood pressure well controlled on current medication. Continue lisinopril 10mg.', doctor: 'Dr. Amara Wickramasinghe' },
      { date: '2026-03-12', title: 'Annual Physical', description: 'General checkup. Recommended increased physical activity and reduced sodium intake.', doctor: 'Dr. Amara Wickramasinghe' },
      { date: '2025-11-02', title: 'Hypertension Diagnosis', description: 'Diagnosed with stage 1 hypertension. Started on ACE inhibitor.', doctor: 'Dr. Ravi Kapoor' },
    ],
    prescriptions: [
      { name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', prescribedOn: '2026-06-28', status: 'Active' },
      { name: 'Aspirin', dosage: '81mg', frequency: 'Once daily', prescribedOn: '2025-11-02', status: 'Active' },
    ],
    documents: [
      { name: 'Blood Panel Results.pdf', type: 'Lab Report', date: '2026-06-28', size: '842 KB' },
      { name: 'ECG Scan.pdf', type: 'Imaging', date: '2026-03-12', size: '1.2 MB' },
    ],
  },
  {
    id: 'p-002', name: 'Isabelle Moreau', initials: 'IM', age: 32, gender: 'Female',
    condition: 'Pregnancy — 2nd Trimester', status: 'Stable', lastVisit: '2026-07-01', bloodType: 'A-',
    phone: '+1 (628) 555-0143', email: 'isabelle.moreau@mail.demo', address: '19 Rue de la Paix, San Francisco, CA',
    insurance: 'Kaiser Permanente',
    vitals: [
      { label: 'Blood Pressure', value: '112/70 mmHg', trend: 'flat', normal: true },
      { label: 'Heart Rate', value: '82 bpm', trend: 'up', normal: true },
      { label: 'Weight', value: '68 kg', trend: 'up', normal: true },
      { label: 'Fetal Heart Rate', value: '148 bpm', trend: 'flat', normal: true },
    ],
    history: [
      { date: '2026-07-01', title: '24-Week Checkup', description: 'Fetal development on track. Glucose screening scheduled for next visit.', doctor: 'Dr. Amara Wickramasinghe' },
      { date: '2026-05-18', title: 'Anatomy Scan', description: 'Detailed ultrasound completed, no abnormalities detected.', doctor: 'Dr. Priya Nair' },
    ],
    prescriptions: [
      { name: 'Prenatal Vitamins', dosage: '1 tablet', frequency: 'Once daily', prescribedOn: '2026-01-10', status: 'Active' },
      { name: 'Iron Supplement', dosage: '65mg', frequency: 'Once daily', prescribedOn: '2026-05-18', status: 'Active' },
    ],
    documents: [
      { name: 'Anatomy Scan Report.pdf', type: 'Imaging', date: '2026-05-18', size: '3.1 MB' },
    ],
  },
  {
    id: 'p-003', name: 'Marcus Webb', initials: 'MW', age: 67, gender: 'Male',
    condition: 'Coronary Artery Disease', status: 'Critical', lastVisit: '2026-07-03', bloodType: 'B+',
    phone: '+1 (510) 555-0197', email: 'marcus.webb@mail.demo', address: '7710 Ridgeline Dr, Oakland, CA',
    insurance: 'Medicare + Supplement',
    vitals: [
      { label: 'Blood Pressure', value: '154/96 mmHg', trend: 'up', normal: false },
      { label: 'Heart Rate', value: '98 bpm', trend: 'up', normal: false },
      { label: 'Cholesterol (LDL)', value: '168 mg/dL', trend: 'up', normal: false },
      { label: 'Oxygen Saturation', value: '94%', trend: 'down', normal: false },
    ],
    history: [
      { date: '2026-07-03', title: 'Emergency Admission', description: 'Presented with chest pain and shortness of breath. Angioplasty scheduled.', doctor: 'Dr. Amara Wickramasinghe' },
      { date: '2026-02-14', title: 'Stress Test', description: 'Abnormal results indicating reduced blood flow to the heart.', doctor: 'Dr. Amara Wickramasinghe' },
    ],
    prescriptions: [
      { name: 'Atorvastatin', dosage: '40mg', frequency: 'Once daily', prescribedOn: '2026-02-14', status: 'Active' },
      { name: 'Clopidogrel', dosage: '75mg', frequency: 'Once daily', prescribedOn: '2026-07-03', status: 'Active' },
      { name: 'Metoprolol', dosage: '25mg', frequency: 'Twice daily', prescribedOn: '2026-07-03', status: 'Active' },
    ],
    documents: [
      { name: 'Angiogram Results.pdf', type: 'Imaging', date: '2026-07-03', size: '4.6 MB' },
      { name: 'Stress Test Report.pdf', type: 'Lab Report', date: '2026-02-14', size: '1.1 MB' },
    ],
  },
  {
    id: 'p-004', name: 'Aiko Tanaka', initials: 'AT', age: 8, gender: 'Female',
    condition: 'Asthma', status: 'Stable', lastVisit: '2026-06-15', bloodType: 'A+',
    phone: '+1 (415) 555-0166', email: 'family.tanaka@mail.demo', address: '221 Willow Ave, San Francisco, CA',
    insurance: 'Anthem Blue Cross',
    vitals: [
      { label: 'Respiratory Rate', value: '18/min', trend: 'flat', normal: true },
      { label: 'Oxygen Saturation', value: '98%', trend: 'flat', normal: true },
      { label: 'Peak Flow', value: '280 L/min', trend: 'up', normal: true },
    ],
    history: [
      { date: '2026-06-15', title: 'Asthma Review', description: 'Well controlled with inhaler. No exacerbations in the last 6 months.', doctor: 'Dr. Lena Ostrowski' },
    ],
    prescriptions: [
      { name: 'Albuterol Inhaler', dosage: '90mcg', frequency: 'As needed', prescribedOn: '2025-09-20', status: 'Active' },
    ],
    documents: [
      { name: 'Spirometry Results.pdf', type: 'Lab Report', date: '2026-06-15', size: '620 KB' },
    ],
  },
  {
    id: 'p-005', name: 'Priya Raman', initials: 'PR', age: 41, gender: 'Female',
    condition: 'Type 2 Diabetes', status: 'Recovering', lastVisit: '2026-06-30', bloodType: 'AB+',
    phone: '+1 (650) 555-0121', email: 'priya.raman@mail.demo', address: '55 Redwood Ct, Palo Alto, CA',
    insurance: 'UnitedHealthcare',
    vitals: [
      { label: 'Blood Glucose', value: '142 mg/dL', trend: 'down', normal: false },
      { label: 'HbA1c', value: '6.8%', trend: 'down', normal: true },
      { label: 'Blood Pressure', value: '122/78 mmHg', trend: 'flat', normal: true },
    ],
    history: [
      { date: '2026-06-30', title: 'Quarterly Review', description: 'HbA1c improved from 7.9% to 6.8% since dietary changes and metformin adjustment.', doctor: 'Dr. Amara Wickramasinghe' },
    ],
    prescriptions: [
      { name: 'Metformin', dosage: '500mg', frequency: 'Twice daily', prescribedOn: '2026-01-15', status: 'Active' },
    ],
    documents: [
      { name: 'HbA1c Lab Results.pdf', type: 'Lab Report', date: '2026-06-30', size: '410 KB' },
    ],
  },
  {
    id: 'p-006', name: 'George Okafor', initials: 'GO', age: 29, gender: 'Male',
    condition: 'Sports Injury — ACL Tear', status: 'Recovering', lastVisit: '2026-06-20', bloodType: 'O-',
    phone: '+1 (415) 555-0155', email: 'george.okafor@mail.demo', address: '900 Marina Blvd, San Francisco, CA',
    insurance: 'Cigna PPO',
    vitals: [
      { label: 'Blood Pressure', value: '118/76 mmHg', trend: 'flat', normal: true },
      { label: 'Heart Rate', value: '64 bpm', trend: 'flat', normal: true },
      { label: 'Range of Motion', value: '95°', trend: 'up', normal: true },
    ],
    history: [
      { date: '2026-06-20', title: 'Post-Op Follow-up', description: 'ACL reconstruction healing well. Cleared for stage 2 physical therapy.', doctor: 'Dr. Samuel Okoye' },
      { date: '2026-04-02', title: 'ACL Reconstruction Surgery', description: 'Successful arthroscopic ACL reconstruction using hamstring graft.', doctor: 'Dr. Samuel Okoye' },
    ],
    prescriptions: [
      { name: 'Ibuprofen', dosage: '400mg', frequency: 'As needed', prescribedOn: '2026-04-02', status: 'Completed' },
    ],
    documents: [
      { name: 'Post-Op MRI.pdf', type: 'Imaging', date: '2026-06-20', size: '2.8 MB' },
    ],
  },
  {
    id: 'p-007', name: 'Sofia Alvarez', initials: 'SA', age: 45, gender: 'Female',
    condition: 'Migraine Disorder', status: 'Stable', lastVisit: '2026-06-25', bloodType: 'B-',
    phone: '+1 (925) 555-0134', email: 'sofia.alvarez@mail.demo', address: '312 Vine St, Walnut Creek, CA',
    insurance: 'Aetna Choice',
    vitals: [
      { label: 'Blood Pressure', value: '116/74 mmHg', trend: 'flat', normal: true },
      { label: 'Heart Rate', value: '70 bpm', trend: 'flat', normal: true },
    ],
    history: [
      { date: '2026-06-25', title: 'Neurology Follow-up', description: 'Migraine frequency reduced from 8 to 2 per month on current preventive treatment.', doctor: 'Dr. Lena Ostrowski' },
    ],
    prescriptions: [
      { name: 'Topiramate', dosage: '50mg', frequency: 'Twice daily', prescribedOn: '2026-03-01', status: 'Active' },
      { name: 'Sumatriptan', dosage: '50mg', frequency: 'As needed', prescribedOn: '2025-08-10', status: 'Active' },
    ],
    documents: [],
  },
  {
    id: 'p-008', name: 'Daniel Kim', initials: 'DK', age: 5, gender: 'Male',
    condition: 'Routine Pediatric Checkup', status: 'Scheduled', lastVisit: '2026-05-10', bloodType: 'A+',
    phone: '+1 (408) 555-0189', email: 'family.kim@mail.demo', address: '48 Cherry Blossom Ln, San Jose, CA',
    insurance: 'Blue Shield of CA',
    vitals: [
      { label: 'Height', value: '112 cm', trend: 'up', normal: true },
      { label: 'Weight', value: '19 kg', trend: 'up', normal: true },
    ],
    history: [
      { date: '2026-05-10', title: 'Vaccination', description: 'Received scheduled MMR booster. No adverse reaction observed.', doctor: 'Dr. Lena Ostrowski' },
    ],
    prescriptions: [],
    documents: [],
  },
  {
    id: 'p-009', name: 'Fatima Al-Sayed', initials: 'FA', age: 58, gender: 'Female',
    condition: 'Osteoarthritis', status: 'Stable', lastVisit: '2026-06-18', bloodType: 'O+',
    phone: '+1 (510) 555-0176', email: 'fatima.alsayed@mail.demo', address: '1500 Grand Ave, Piedmont, CA',
    insurance: 'Medicare',
    vitals: [
      { label: 'Blood Pressure', value: '130/84 mmHg', trend: 'flat', normal: true },
      { label: 'Joint Pain Score', value: '3/10', trend: 'down', normal: true },
    ],
    history: [
      { date: '2026-06-18', title: 'Rheumatology Review', description: 'Pain well managed with current NSAID regimen and physical therapy.', doctor: 'Dr. Samuel Okoye' },
    ],
    prescriptions: [
      { name: 'Naproxen', dosage: '250mg', frequency: 'Twice daily', prescribedOn: '2026-01-05', status: 'Active' },
    ],
    documents: [
      { name: 'Knee X-Ray.pdf', type: 'Imaging', date: '2026-06-18', size: '1.4 MB' },
    ],
  },
  {
    id: 'p-010', name: 'Lucas Bergström', initials: 'LB', age: 36, gender: 'Male',
    condition: 'Anxiety Disorder', status: 'Stable', lastVisit: '2026-06-22', bloodType: 'A-',
    phone: '+1 (415) 555-0148', email: 'lucas.b@mail.demo', address: '77 Lombard St, San Francisco, CA',
    insurance: 'Kaiser Permanente',
    vitals: [
      { label: 'Blood Pressure', value: '120/78 mmHg', trend: 'flat', normal: true },
      { label: 'Heart Rate', value: '72 bpm', trend: 'flat', normal: true },
    ],
    history: [
      { date: '2026-06-22', title: 'Therapy + Medication Review', description: 'Reports improved sleep and reduced panic episodes since starting sertraline.', doctor: 'Dr. Priya Nair' },
    ],
    prescriptions: [
      { name: 'Sertraline', dosage: '50mg', frequency: 'Once daily', prescribedOn: '2026-04-11', status: 'Active' },
    ],
    documents: [],
  },
  {
    id: 'p-011', name: 'Grace Nakamura', initials: 'GN', age: 73, gender: 'Female',
    condition: 'Atrial Fibrillation', status: 'Critical', lastVisit: '2026-07-02', bloodType: 'B+',
    phone: '+1 (650) 555-0199', email: 'grace.nakamura@mail.demo', address: '210 Sunset Way, Menlo Park, CA',
    insurance: 'Medicare + Supplement',
    vitals: [
      { label: 'Heart Rate', value: '132 bpm (irregular)', trend: 'up', normal: false },
      { label: 'Blood Pressure', value: '148/92 mmHg', trend: 'up', normal: false },
      { label: 'Oxygen Saturation', value: '95%', trend: 'flat', normal: true },
    ],
    history: [
      { date: '2026-07-02', title: 'Cardioversion Procedure', description: 'Electrical cardioversion performed to restore normal sinus rhythm.', doctor: 'Dr. Amara Wickramasinghe' },
    ],
    prescriptions: [
      { name: 'Warfarin', dosage: '5mg', frequency: 'Once daily', prescribedOn: '2026-07-02', status: 'Active' },
      { name: 'Diltiazem', dosage: '120mg', frequency: 'Once daily', prescribedOn: '2026-07-02', status: 'Active' },
    ],
    documents: [
      { name: 'Cardioversion Report.pdf', type: 'Procedure', date: '2026-07-02', size: '1.9 MB' },
    ],
  },
  {
    id: 'p-012', name: 'Ethan Brooks', initials: 'EB', age: 19, gender: 'Male',
    condition: 'Wisdom Teeth Consultation', status: 'Scheduled', lastVisit: '2026-04-05', bloodType: 'O+',
    phone: '+1 (925) 555-0112', email: 'ethan.brooks@mail.demo', address: '65 College Ave, Berkeley, CA',
    insurance: 'Delta Dental + Anthem',
    vitals: [
      { label: 'Blood Pressure', value: '118/72 mmHg', trend: 'flat', normal: true },
    ],
    history: [
      { date: '2026-04-05', title: 'Initial Consultation', description: 'Referred to oral surgery for wisdom teeth extraction evaluation.', doctor: 'Dr. Priya Nair' },
    ],
    prescriptions: [],
    documents: [],
  },
];

export const appointments: Appointment[] = [
  { id: 'a-001', patientId: 'p-003', patientName: 'Marcus Webb', initials: 'MW', type: 'Emergency Consultation', date: '2026-07-05', time: '08:30', duration: '45 min', status: 'Confirmed', mode: 'In-person' },
  { id: 'a-002', patientId: 'p-001', patientName: 'Nathan Perera', initials: 'NP', type: 'Follow-up', date: '2026-07-05', time: '10:00', duration: '20 min', status: 'Confirmed', mode: 'In-person' },
  { id: 'a-003', patientId: 'p-002', patientName: 'Isabelle Moreau', initials: 'IM', type: 'Prenatal Checkup', date: '2026-07-05', time: '11:15', duration: '30 min', status: 'Confirmed', mode: 'Video' },
  { id: 'a-004', patientId: 'p-005', patientName: 'Priya Raman', initials: 'PR', type: 'Diabetes Review', date: '2026-07-05', time: '13:30', duration: '20 min', status: 'Pending', mode: 'Video' },
  { id: 'a-005', patientId: 'p-011', patientName: 'Grace Nakamura', initials: 'GN', type: 'Post-Procedure Check', date: '2026-07-05', time: '15:00', duration: '30 min', status: 'Confirmed', mode: 'In-person' },
  { id: 'a-006', patientId: 'p-007', patientName: 'Sofia Alvarez', initials: 'SA', type: 'Neurology Follow-up', date: '2026-07-06', time: '09:00', duration: '20 min', status: 'Confirmed', mode: 'In-person' },
  { id: 'a-007', patientId: 'p-009', patientName: 'Fatima Al-Sayed', initials: 'FA', type: 'Rheumatology Review', date: '2026-07-06', time: '10:30', duration: '25 min', status: 'Pending', mode: 'In-person' },
  { id: 'a-008', patientId: 'p-010', patientName: 'Lucas Bergström', initials: 'LB', type: 'Therapy Session', date: '2026-07-06', time: '14:00', duration: '45 min', status: 'Confirmed', mode: 'Video' },
  { id: 'a-009', patientId: 'p-006', patientName: 'George Okafor', initials: 'GO', type: 'Physical Therapy Review', date: '2026-07-07', time: '09:30', duration: '30 min', status: 'Confirmed', mode: 'In-person' },
  { id: 'a-010', patientId: 'p-008', patientName: 'Daniel Kim', initials: 'DK', type: 'Pediatric Checkup', date: '2026-07-07', time: '11:00', duration: '20 min', status: 'Confirmed', mode: 'In-person' },
  { id: 'a-011', patientId: 'p-012', patientName: 'Ethan Brooks', initials: 'EB', type: 'Oral Surgery Consult', date: '2026-07-08', time: '13:00', duration: '30 min', status: 'Cancelled', mode: 'In-person' },
  { id: 'a-012', patientId: 'p-004', patientName: 'Aiko Tanaka', initials: 'AT', type: 'Asthma Review', date: '2026-07-03', time: '10:00', duration: '20 min', status: 'Completed', mode: 'In-person' },
];

export const dashboardStats = {
  totalPatients: patients.length,
  todayAppointments: appointments.filter((a) => a.date === '2026-07-05').length,
  pendingReports: 6,
  satisfaction: 97,
};

export const monthlyVisits = [
  { month: 'Jan', visits: 186 }, { month: 'Feb', visits: 205 }, { month: 'Mar', visits: 198 },
  { month: 'Apr', visits: 221 }, { month: 'May', visits: 234 }, { month: 'Jun', visits: 259 },
  { month: 'Jul', visits: 142 },
];

export const appointmentTypeBreakdown = [
  { name: 'Follow-up', value: 34, fill: 'var(--color-indigo)' },
  { name: 'Consultation', value: 26, fill: 'var(--color-cyan)' },
  { name: 'Video Visit', value: 22, fill: 'var(--color-violet)' },
  { name: 'Emergency', value: 8, fill: 'var(--color-amber)' },
  { name: 'Procedure', value: 10, fill: 'var(--color-green)' },
];

export const weeklyLoad = [
  { day: 'Mon', appointments: 14 }, { day: 'Tue', appointments: 18 }, { day: 'Wed', appointments: 12 },
  { day: 'Thu', appointments: 20 }, { day: 'Fri', appointments: 16 }, { day: 'Sat', appointments: 6 },
  { day: 'Sun', appointments: 2 },
];

export const aiSuggestedPrompts = [
  'Summarize Marcus Webb’s cardiac history',
  'What are the drug interactions for Warfarin?',
  'Draft a follow-up note for a hypertension patient',
  'Explain the latest ACC guidelines for AFib management',
];

const aiKnowledge: { match: RegExp; reply: string }[] = [
  {
    match: /marcus|webb|cardiac history/i,
    reply:
      'Marcus Webb (67M) has a history of coronary artery disease. Latest angiogram (Jul 3) showed reduced blood flow; currently on clopidogrel, metoprolol, and atorvastatin. Blood pressure and LDL remain above target — consider reviewing statin dosage at next visit.',
  },
  {
    match: /warfarin|interaction/i,
    reply:
      'Warfarin has notable interactions with NSAIDs (increased bleeding risk), amiodarone (potentiates effect), and many antibiotics. Recommend INR monitoring within 3-5 days of any new medication changes for patients on warfarin, such as Grace Nakamura.',
  },
  {
    match: /follow-up note|hypertension/i,
    reply:
      'Draft: "Patient presents for routine hypertension follow-up. Blood pressure well-controlled at 128/82 mmHg on lisinopril 10mg daily. No adverse effects reported. Continue current regimen, recheck in 3 months, reinforce low-sodium diet."',
  },
  {
    match: /afib|atrial fibrillation|guideline/i,
    reply:
      'Current guidance emphasizes early rhythm control for symptomatic AFib, especially within 12 months of diagnosis. For Grace Nakamura, post-cardioversion anticoagulation with warfarin should continue for at least 4 weeks, with INR maintained between 2.0–3.0.',
  },
];

export function getAIResponse(input: string): string {
  const found = aiKnowledge.find((k) => k.match.test(input));
  if (found) return found.reply;
  return "I've reviewed the available patient records. Based on current data, everything appears within expected parameters — let me know if you'd like me to pull a specific chart, lab result, or medication history.";
}

export const satisfactionTrend = [
  { month: 'Jan', score: 92 }, { month: 'Feb', score: 93 }, { month: 'Mar', score: 91 },
  { month: 'Apr', score: 94 }, { month: 'May', score: 95 }, { month: 'Jun', score: 97 },
];

export const topConditions = [
  { name: 'Hypertension', count: 18, share: 22 },
  { name: 'Type 2 Diabetes', count: 14, share: 17 },
  { name: 'Coronary Artery Disease', count: 9, share: 11 },
  { name: 'Anxiety Disorder', count: 8, share: 10 },
  { name: 'Osteoarthritis', count: 7, share: 9 },
];

export const reportStats = {
  avgConsultTime: 24,
  readmissionRate: 3.2,
  reportTurnaround: 1.4,
  retention: 94,
};

export function getPatientById(id: string) {
  return patients.find((p) => p.id === id);
}
