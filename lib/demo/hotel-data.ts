export type RoomType = 'Standard' | 'Deluxe' | 'Suite' | 'Presidential Suite';
export type RoomStatus = 'Available' | 'Occupied' | 'Cleaning' | 'Maintenance';

export type Room = {
  id: string;
  number: string;
  floor: number;
  type: RoomType;
  status: RoomStatus;
  price: number;
  grad: string;
  amenities: string[];
  currentGuestId?: string;
  lastCleaned: string;
};

export type Invoice = { id: string; date: string; description: string; amount: number; status: 'Paid' | 'Pending' | 'Refunded'; method: 'Card' | 'Cash' | 'Stripe' };
export type StayRecord = { checkIn: string; checkOut: string; room: string; amount: number };

export type Guest = {
  id: string;
  name: string;
  initials: string;
  nationality: string;
  vip: boolean;
  loyaltyTier: 'Silver' | 'Gold' | 'Platinum';
  loyaltyPoints: number;
  email: string;
  phone: string;
  roomPreferences: string;
  foodPreferences: string;
  specialRequests: string;
  notes: string;
  stayHistory: StayRecord[];
  invoices: Invoice[];
};

export type Reservation = {
  id: string;
  guestId: string;
  guestName: string;
  initials: string;
  roomNumber: string;
  roomType: RoomType;
  checkIn: string;
  checkOut: string;
  nights: number;
  status: 'Confirmed' | 'Pending' | 'Checked In' | 'Checked Out' | 'Cancelled';
  source: 'Direct' | 'Booking.com' | 'Expedia' | 'Airbnb';
  amount: number;
};

export type HousekeepingColumn = 'Dirty' | 'Cleaning' | 'Inspection' | 'Ready';
export type HousekeepingTask = {
  id: string;
  roomNumber: string;
  column: HousekeepingColumn;
  assignee: string;
  assigneeInitials: string;
  priority: 'Low' | 'Medium' | 'High';
};

export const hotel = {
  name: 'FLEXNORA Grand Hotel & Resort',
  location: 'South Malé Atoll, Maldives',
  manager: { name: 'Isabelle Laurent', role: 'General Manager', initials: 'IL', email: 'isabelle.laurent@flexnora-grand.demo' },
};

const ROOM_GRADIENTS = [
  'from-amber/30 to-indigo/20',
  'from-cyan/40 to-indigo/20',
  'from-violet/40 to-cyan/20',
  'from-green/30 to-amber/20',
];

export const rooms: Room[] = [
  { id: 'r-101', number: '101', floor: 1, type: 'Standard', status: 'Occupied', price: 220, grad: ROOM_GRADIENTS[0], amenities: ['Sea View', 'King Bed', 'Free WiFi'], currentGuestId: 'g-001', lastCleaned: '2026-07-04' },
  { id: 'r-102', number: '102', floor: 1, type: 'Standard', status: 'Available', price: 220, grad: ROOM_GRADIENTS[1], amenities: ['Garden View', 'Twin Bed', 'Free WiFi'], lastCleaned: '2026-07-05' },
  { id: 'r-103', number: '103', floor: 1, type: 'Standard', status: 'Cleaning', price: 220, grad: ROOM_GRADIENTS[2], amenities: ['Garden View', 'King Bed', 'Free WiFi'], lastCleaned: '2026-07-03' },
  { id: 'r-104', number: '104', floor: 1, type: 'Standard', status: 'Maintenance', price: 220, grad: ROOM_GRADIENTS[3], amenities: ['Sea View', 'King Bed', 'Free WiFi'], lastCleaned: '2026-07-01' },
  { id: 'r-201', number: '201', floor: 2, type: 'Deluxe', status: 'Occupied', price: 380, grad: ROOM_GRADIENTS[1], amenities: ['Ocean View', 'King Bed', 'Minibar', 'Balcony'], currentGuestId: 'g-002', lastCleaned: '2026-07-04' },
  { id: 'r-202', number: '202', floor: 2, type: 'Deluxe', status: 'Available', price: 380, grad: ROOM_GRADIENTS[2], amenities: ['Ocean View', 'King Bed', 'Minibar', 'Balcony'], lastCleaned: '2026-07-05' },
  { id: 'r-203', number: '203', floor: 2, type: 'Deluxe', status: 'Occupied', price: 380, grad: ROOM_GRADIENTS[0], amenities: ['Ocean View', 'Twin Bed', 'Minibar', 'Balcony'], currentGuestId: 'g-003', lastCleaned: '2026-07-04' },
  { id: 'r-204', number: '204', floor: 2, type: 'Deluxe', status: 'Available', price: 380, grad: ROOM_GRADIENTS[3], amenities: ['Ocean View', 'King Bed', 'Minibar', 'Balcony'], lastCleaned: '2026-07-05' },
  { id: 'r-205', number: '205', floor: 2, type: 'Deluxe', status: 'Cleaning', price: 380, grad: ROOM_GRADIENTS[1], amenities: ['Ocean View', 'King Bed', 'Minibar'], lastCleaned: '2026-07-03' },
  { id: 'r-301', number: '301', floor: 3, type: 'Suite', status: 'Occupied', price: 650, grad: ROOM_GRADIENTS[2], amenities: ['Panoramic View', 'Living Room', 'Jacuzzi', 'Butler Service'], currentGuestId: 'g-004', lastCleaned: '2026-07-04' },
  { id: 'r-302', number: '302', floor: 3, type: 'Suite', status: 'Available', price: 650, grad: ROOM_GRADIENTS[0], amenities: ['Panoramic View', 'Living Room', 'Jacuzzi', 'Butler Service'], lastCleaned: '2026-07-05' },
  { id: 'r-303', number: '303', floor: 3, type: 'Suite', status: 'Occupied', price: 650, grad: ROOM_GRADIENTS[3], amenities: ['Panoramic View', 'Living Room', 'Jacuzzi'], currentGuestId: 'g-005', lastCleaned: '2026-07-04' },
  { id: 'r-304', number: '304', floor: 3, type: 'Suite', status: 'Available', price: 650, grad: ROOM_GRADIENTS[1], amenities: ['Panoramic View', 'Living Room', 'Jacuzzi', 'Butler Service'], lastCleaned: '2026-07-05' },
  { id: 'r-401', number: '401', floor: 4, type: 'Suite', status: 'Cleaning', price: 650, grad: ROOM_GRADIENTS[2], amenities: ['Panoramic View', 'Living Room', 'Jacuzzi'], lastCleaned: '2026-07-03' },
  { id: 'r-402', number: '402', floor: 4, type: 'Suite', status: 'Occupied', price: 650, grad: ROOM_GRADIENTS[0], amenities: ['Panoramic View', 'Living Room', 'Butler Service'], currentGuestId: 'g-006', lastCleaned: '2026-07-04' },
  { id: 'ps-501', number: '501', floor: 5, type: 'Presidential Suite', status: 'Occupied', price: 1800, grad: ROOM_GRADIENTS[3], amenities: ['Private Pool', 'Full Kitchen', 'Cinema Room', 'Dedicated Butler', 'Helipad Access'], currentGuestId: 'g-007', lastCleaned: '2026-07-04' },
  { id: 'ps-502', number: '502', floor: 5, type: 'Presidential Suite', status: 'Available', price: 1800, grad: ROOM_GRADIENTS[1], amenities: ['Private Pool', 'Full Kitchen', 'Cinema Room', 'Dedicated Butler'], lastCleaned: '2026-07-05' },
  { id: 'r-601', number: '601', floor: 6, type: 'Deluxe', status: 'Available', price: 400, grad: ROOM_GRADIENTS[2], amenities: ['Rooftop View', 'King Bed', 'Minibar', 'Balcony'], lastCleaned: '2026-07-05' },
];

export const guests: Guest[] = [
  {
    id: 'g-001', name: 'Julien Moreau', initials: 'JM', nationality: 'France', vip: false, loyaltyTier: 'Silver', loyaltyPoints: 1200,
    email: 'julien.moreau@mail.demo', phone: '+33 6 12 34 56 78',
    roomPreferences: 'High floor, away from elevator', foodPreferences: 'Vegetarian', specialRequests: 'Extra pillows',
    notes: 'Celebrating anniversary — arrange room decoration on arrival.',
    stayHistory: [{ checkIn: '2025-12-10', checkOut: '2025-12-15', room: '204', amount: 1900 }],
    invoices: [{ id: 'inv-001', date: '2026-07-04', description: 'Room 101 · 3 nights', amount: 660, status: 'Paid', method: 'Card' }],
  },
  {
    id: 'g-002', name: 'Amira Al-Farsi', initials: 'AA', nationality: 'UAE', vip: true, loyaltyTier: 'Platinum', loyaltyPoints: 42000,
    email: 'amira.alfarsi@mail.demo', phone: '+971 50 123 4567',
    roomPreferences: 'Ocean-facing, private balcony', foodPreferences: 'Halal, no shellfish', specialRequests: 'Private airport transfer',
    notes: 'Platinum member — complimentary spa credit applies. Prefers minimal housekeeping interruptions.',
    stayHistory: [
      { checkIn: '2025-08-02', checkOut: '2025-08-09', room: '301', amount: 4550 },
      { checkIn: '2026-02-14', checkOut: '2026-02-18', room: 'ps-501', amount: 7200 },
    ],
    invoices: [
      { id: 'inv-002', date: '2026-07-04', description: 'Room 201 · 4 nights', amount: 1520, status: 'Paid', method: 'Stripe' },
      { id: 'inv-003', date: '2026-07-05', description: 'Spa treatment — couples massage', amount: 240, status: 'Pending', method: 'Card' },
    ],
  },
  {
    id: 'g-003', name: 'Kenji Watanabe', initials: 'KW', nationality: 'Japan', vip: false, loyaltyTier: 'Gold', loyaltyPoints: 8600,
    email: 'kenji.watanabe@mail.demo', phone: '+81 90 1234 5678',
    roomPreferences: 'Quiet room, twin beds', foodPreferences: 'No preference', specialRequests: 'Late checkout requested',
    notes: 'Frequent business traveler. Usually books direct.',
    stayHistory: [{ checkIn: '2026-04-01', checkOut: '2026-04-04', room: '203', amount: 1140 }],
    invoices: [{ id: 'inv-004', date: '2026-07-03', description: 'Room 203 · 5 nights', amount: 1900, status: 'Paid', method: 'Card' }],
  },
  {
    id: 'g-004', name: 'Charlotte Bennett', initials: 'CB', nationality: 'United Kingdom', vip: true, loyaltyTier: 'Platinum', loyaltyPoints: 55000,
    email: 'charlotte.bennett@mail.demo', phone: '+44 7700 900123',
    roomPreferences: 'Suite with living room', foodPreferences: 'Gluten-free', specialRequests: 'Fresh flowers daily',
    notes: 'VIP — travels with a personal assistant. Confirm daily flower delivery with concierge.',
    stayHistory: [{ checkIn: '2025-11-20', checkOut: '2025-11-27', room: '301', amount: 4550 }],
    invoices: [{ id: 'inv-005', date: '2026-07-02', description: 'Suite 301 · 6 nights', amount: 3900, status: 'Paid', method: 'Stripe' }],
  },
  {
    id: 'g-005', name: 'Diego Fernández', initials: 'DF', nationality: 'Spain', vip: false, loyaltyTier: 'Silver', loyaltyPoints: 950,
    email: 'diego.fernandez@mail.demo', phone: '+34 612 345 678',
    roomPreferences: 'No preference', foodPreferences: 'Pescatarian', specialRequests: 'None',
    notes: 'First-time guest, booked via Booking.com.',
    stayHistory: [],
    invoices: [{ id: 'inv-006', date: '2026-07-04', description: 'Suite 303 · 3 nights', amount: 1950, status: 'Paid', method: 'Card' }],
  },
  {
    id: 'g-006', name: 'Olivia Chen', initials: 'OC', nationality: 'Singapore', vip: false, loyaltyTier: 'Gold', loyaltyPoints: 12400,
    email: 'olivia.chen@mail.demo', phone: '+65 9123 4567',
    roomPreferences: 'High floor', foodPreferences: 'No pork', specialRequests: 'Early check-in',
    notes: 'Traveling for a corporate offsite, group of 4 rooms.',
    stayHistory: [{ checkIn: '2026-01-05', checkOut: '2026-01-08', room: '402', amount: 1950 }],
    invoices: [{ id: 'inv-007', date: '2026-07-04', description: 'Suite 402 · 4 nights', amount: 2600, status: 'Pending', method: 'Card' }],
  },
  {
    id: 'g-007', name: 'Sheikh Rashid Al-Maktoum', initials: 'RM', nationality: 'UAE', vip: true, loyaltyTier: 'Platinum', loyaltyPoints: 98000,
    email: 'office.rm@mail.demo', phone: '+971 4 123 4567',
    roomPreferences: 'Presidential Suite, full floor privacy', foodPreferences: 'Halal, private chef requested', specialRequests: 'Security detail accommodation, helipad transfer',
    notes: 'Highest-tier VIP. All requests routed directly to General Manager. Confirm helipad slot 48h in advance.',
    stayHistory: [{ checkIn: '2025-06-01', checkOut: '2025-06-10', room: 'ps-501', amount: 16200 }],
    invoices: [{ id: 'inv-008', date: '2026-07-01', description: 'Presidential Suite 501 · 7 nights', amount: 12600, status: 'Paid', method: 'Stripe' }],
  },
];

export const reservations: Reservation[] = [
  { id: 'res-001', guestId: 'g-001', guestName: 'Julien Moreau', initials: 'JM', roomNumber: '101', roomType: 'Standard', checkIn: '2026-07-02', checkOut: '2026-07-06', nights: 4, status: 'Checked In', source: 'Direct', amount: 880 },
  { id: 'res-002', guestId: 'g-002', guestName: 'Amira Al-Farsi', initials: 'AA', roomNumber: '201', roomType: 'Deluxe', checkIn: '2026-07-01', checkOut: '2026-07-08', nights: 7, status: 'Checked In', source: 'Direct', amount: 2660 },
  { id: 'res-003', guestId: 'g-003', guestName: 'Kenji Watanabe', initials: 'KW', roomNumber: '203', roomType: 'Deluxe', checkIn: '2026-06-30', checkOut: '2026-07-05', nights: 5, status: 'Checked In', source: 'Direct', amount: 1900 },
  { id: 'res-004', guestId: 'g-004', guestName: 'Charlotte Bennett', initials: 'CB', roomNumber: '301', roomType: 'Suite', checkIn: '2026-06-29', checkOut: '2026-07-05', nights: 6, status: 'Checked In', source: 'Direct', amount: 3900 },
  { id: 'res-005', guestId: 'g-005', guestName: 'Diego Fernández', initials: 'DF', roomNumber: '303', roomType: 'Suite', checkIn: '2026-07-02', checkOut: '2026-07-05', nights: 3, status: 'Checked In', source: 'Booking.com', amount: 1950 },
  { id: 'res-006', guestId: 'g-006', guestName: 'Olivia Chen', initials: 'OC', roomNumber: '402', roomType: 'Suite', checkIn: '2026-07-01', checkOut: '2026-07-05', nights: 4, status: 'Checked In', source: 'Expedia', amount: 2600 },
  { id: 'res-007', guestId: 'g-007', guestName: 'Sheikh Rashid Al-Maktoum', initials: 'RM', roomNumber: '501', roomType: 'Presidential Suite', checkIn: '2026-06-28', checkOut: '2026-07-06', nights: 8, status: 'Checked In', source: 'Direct', amount: 14400 },
  { id: 'res-008', guestId: 'g-001', guestName: 'Julien Moreau', initials: 'JM', roomNumber: '204', roomType: 'Deluxe', checkIn: '2026-07-06', checkOut: '2026-07-09', nights: 3, status: 'Confirmed', source: 'Direct', amount: 1140 },
  { id: 'res-009', guestId: 'g-003', guestName: 'Kenji Watanabe', initials: 'KW', roomNumber: '601', roomType: 'Deluxe', checkIn: '2026-07-10', checkOut: '2026-07-13', nights: 3, status: 'Confirmed', source: 'Direct', amount: 1200 },
  { id: 'res-010', guestId: 'g-005', guestName: 'Diego Fernández', initials: 'DF', roomNumber: '102', roomType: 'Standard', checkIn: '2026-07-12', checkOut: '2026-07-14', nights: 2, status: 'Pending', source: 'Airbnb', amount: 440 },
  { id: 'res-011', guestId: 'g-006', guestName: 'Olivia Chen', initials: 'OC', roomNumber: '202', roomType: 'Deluxe', checkIn: '2026-07-15', checkOut: '2026-07-18', nights: 3, status: 'Confirmed', source: 'Expedia', amount: 1140 },
  { id: 'res-012', guestId: 'g-002', guestName: 'Amira Al-Farsi', initials: 'AA', roomNumber: 'ps-502', roomType: 'Presidential Suite', checkIn: '2026-08-01', checkOut: '2026-08-06', nights: 5, status: 'Confirmed', source: 'Direct', amount: 9000 },
  { id: 'res-013', guestId: 'g-004', guestName: 'Charlotte Bennett', initials: 'CB', roomNumber: '302', roomType: 'Suite', checkIn: '2026-06-15', checkOut: '2026-06-20', nights: 5, status: 'Checked Out', source: 'Direct', amount: 3250 },
  { id: 'res-014', guestId: 'g-007', guestName: 'Sheikh Rashid Al-Maktoum', initials: 'RM', roomNumber: '104', roomType: 'Standard', checkIn: '2026-07-20', checkOut: '2026-07-21', nights: 1, status: 'Cancelled', source: 'Direct', amount: 220 },
];

export const housekeepingTasks: HousekeepingTask[] = [
  { id: 'hk-001', roomNumber: '103', column: 'Dirty', assignee: 'Maria Santos', assigneeInitials: 'MS', priority: 'High' },
  { id: 'hk-002', roomNumber: '205', column: 'Dirty', assignee: 'Maria Santos', assigneeInitials: 'MS', priority: 'Medium' },
  { id: 'hk-003', roomNumber: '401', column: 'Cleaning', assignee: 'Tomás Reyes', assigneeInitials: 'TR', priority: 'High' },
  { id: 'hk-004', roomNumber: '104', column: 'Cleaning', assignee: 'Tomás Reyes', assigneeInitials: 'TR', priority: 'Low' },
  { id: 'hk-005', roomNumber: '302', column: 'Inspection', assignee: 'Grace Adeyemi', assigneeInitials: 'GA', priority: 'Medium' },
  { id: 'hk-006', roomNumber: '102', column: 'Ready', assignee: 'Grace Adeyemi', assigneeInitials: 'GA', priority: 'Low' },
  { id: 'hk-007', roomNumber: '204', column: 'Ready', assignee: 'Maria Santos', assigneeInitials: 'MS', priority: 'Low' },
  { id: 'hk-008', roomNumber: '601', column: 'Ready', assignee: 'Tomás Reyes', assigneeInitials: 'TR', priority: 'Low' },
  { id: 'hk-009', roomNumber: 'ps-502', column: 'Inspection', assignee: 'Grace Adeyemi', assigneeInitials: 'GA', priority: 'High' },
];

export const staff = [
  { id: 'st-001', name: 'Maria Santos', initials: 'MS', role: 'Housekeeping Lead' },
  { id: 'st-002', name: 'Tomás Reyes', initials: 'TR', role: 'Housekeeping' },
  { id: 'st-003', name: 'Grace Adeyemi', initials: 'GA', role: 'Housekeeping Supervisor' },
];

export const reviews = [
  { id: 'rv-001', guest: 'Charlotte Bennett', initials: 'CB', rating: 5, comment: 'Impeccable service from arrival to departure. The suite exceeded every expectation.', date: '2026-07-01' },
  { id: 'rv-002', guest: 'Kenji Watanabe', initials: 'KW', rating: 5, comment: 'Quiet, professional, and the staff remembered every preference from my last stay.', date: '2026-06-28' },
  { id: 'rv-003', guest: 'Diego Fernández', initials: 'DF', rating: 4, comment: 'Beautiful property. Restaurant was excellent, though the pool was busier than expected.', date: '2026-06-20' },
];

export function getOccupancy() {
  const occupied = rooms.filter((r) => r.status === 'Occupied').length;
  return Math.round((occupied / rooms.length) * 100);
}

export const dashboardStats = {
  occupancy: getOccupancy(),
  availableRooms: rooms.filter((r) => r.status === 'Available').length,
  revenueToday: 18420,
  checkInsToday: reservations.filter((r) => r.checkIn === '2026-07-05').length + 3,
  checkOutsToday: reservations.filter((r) => r.checkOut === '2026-07-05').length,
  housekeepingOpen: housekeepingTasks.filter((t) => t.column !== 'Ready').length,
  avgRating: 4.8,
};

export const monthlyRevenue = [
  { month: 'Jan', revenue: 312000 }, { month: 'Feb', revenue: 298000 }, { month: 'Mar', revenue: 341000 },
  { month: 'Apr', revenue: 356000 }, { month: 'May', revenue: 389000 }, { month: 'Jun', revenue: 412000 },
  { month: 'Jul', revenue: 158000 },
];

export const occupancyTrend = [
  { day: 'Mon', occupancy: 72 }, { day: 'Tue', occupancy: 78 }, { day: 'Wed', occupancy: 81 },
  { day: 'Thu', occupancy: 85 }, { day: 'Fri', occupancy: 92 }, { day: 'Sat', occupancy: 97 },
  { day: 'Sun', occupancy: 89 },
];

export const bookingChannels = [
  { name: 'Direct', value: 48, fill: 'var(--color-indigo)' },
  { name: 'Booking.com', value: 24, fill: 'var(--color-cyan)' },
  { name: 'Expedia', value: 16, fill: 'var(--color-violet)' },
  { name: 'Airbnb', value: 12, fill: 'var(--color-amber)' },
];

export const analyticsStats = {
  adr: 486,
  revpar: 401,
  avgStay: 4.2,
  cancellationRate: 3.8,
};

export const conciergeSuggestedPrompts = [
  'Which VIP guests arrive today?',
  'How many deluxe rooms are available?',
  'What is our revenue this week?',
  'Suggest a room upgrade for a returning guest',
];

const conciergeKnowledge: { match: RegExp; reply: string }[] = [
  {
    match: /vip.*(arrive|today)|arrive.*vip/i,
    reply:
      'Two VIP guests are on property today: Amira Al-Farsi (Platinum, Room 201, checking out Jul 8) and Sheikh Rashid Al-Maktoum (Platinum, Presidential Suite 501, checking out Jul 6). Both have standing requests on file — recommend a courtesy check-in from the GM.',
  },
  {
    match: /deluxe.*(available|room)/i,
    reply: 'You currently have 2 Deluxe rooms available: Room 202 and Room 204, both ocean-facing with balcony. Room 205 is finishing cleaning and will be ready within the hour.',
  },
  {
    match: /revenue.*week|week.*revenue/i,
    reply: "This week's revenue is tracking at $158,000 month-to-date for July, on pace to match June's $412,000. Today alone has generated $18,420 across rooms, spa, and dining.",
  },
  {
    match: /upgrade|returning guest/i,
    reply: 'Kenji Watanabe (Gold tier, 3 stays) is checking in Jul 10 for a Deluxe room — Suite 304 is available that week and would make a strong complimentary upgrade given his loyalty tier and quiet-room preference.',
  },
  {
    match: /occupancy.*report|report.*occupancy/i,
    reply: `Current occupancy is ${getOccupancy()}%, trending upward through the weekend (97% on Saturday). Presidential Suites are fully booked through early August; Standard rooms have the most availability.`,
  },
];

export function getConciergeResponse(input: string): string {
  const found = conciergeKnowledge.find((k) => k.match.test(input));
  if (found) return found.reply;
  return "I've checked current occupancy, reservations, and guest records — everything looks within normal range. Let me know if you'd like me to pull a specific guest file, room status, or revenue breakdown.";
}

export function getRoomById(id: string) {
  return rooms.find((r) => r.id === id);
}

export function getGuestById(id: string) {
  return guests.find((g) => g.id === id);
}
