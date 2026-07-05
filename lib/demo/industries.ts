import { Hotel, ShoppingCart, HeartPulse, Building2, Home, UtensilsCrossed, type LucideIcon } from 'lucide-react';

export type Industry = {
  slug: string;
  name: string;
  icon: LucideIcon;
  grad: string;
  status: 'live' | 'soon';
  tagline: string;
  features: string[];
  stack: string[];
};

export const industries: Industry[] = [
  {
    slug: 'healthcare',
    name: 'Healthcare',
    icon: HeartPulse,
    grad: 'from-green/40 to-cyan/20',
    status: 'live',
    tagline: 'A full doctor-facing platform — patient records, appointments, video consultations, and an AI medical assistant.',
    features: ['Patient records & vitals', 'Appointment calendar', 'Video consultation UI', 'AI medical assistant', 'Analytics & reports', 'Patient mobile app'],
    stack: ['Next.js', 'React Query', 'Recharts', 'Zustand'],
  },
  {
    slug: 'hotel',
    name: 'Hotel & Hospitality',
    icon: Hotel,
    grad: 'from-indigo/40 to-violet/20',
    status: 'soon',
    tagline: 'Guest dashboard, room booking calendar, housekeeping board, and a reception analytics view.',
    features: ['Guest dashboard', 'Room booking calendar', 'Housekeeping board', 'Invoices', 'Restaurant orders', 'Guest mobile app'],
    stack: ['Next.js', 'PostgreSQL', 'Stripe'],
  },
  {
    slug: 'ecommerce',
    name: 'E-commerce',
    icon: ShoppingCart,
    grad: 'from-cyan/40 to-indigo/20',
    status: 'soon',
    tagline: 'A luxury storefront paired with seller and warehouse dashboards.',
    features: ['Luxury storefront', 'Product listing & details', 'Cart & checkout', 'Seller dashboard', 'Warehouse view', 'Sales analytics'],
    stack: ['Next.js', 'Django', 'Redis'],
  },
  {
    slug: 'erp',
    name: 'ERP / CRM',
    icon: Building2,
    grad: 'from-violet/40 to-indigo/20',
    status: 'soon',
    tagline: 'Sales pipeline, inventory, payroll, and purchase orders in one operations console.',
    features: ['Sales pipeline', 'Inventory management', 'HR & payroll', 'Purchase orders', 'Invoices', 'Analytics'],
    stack: ['React', 'Node.js', 'PostgreSQL'],
  },
  {
    slug: 'real-estate',
    name: 'Real Estate',
    icon: Home,
    grad: 'from-amber/30 to-violet/20',
    status: 'soon',
    tagline: 'Luxury property search with an interactive map and a full agent CRM.',
    features: ['Property search & map', 'Listing details', 'Agent dashboard', 'Mortgage calculator', 'Lead CRM', 'Mobile app'],
    stack: ['Next.js', 'Django', 'MongoDB'],
  },
  {
    slug: 'restaurant',
    name: 'Restaurant',
    icon: UtensilsCrossed,
    grad: 'from-cyan/40 to-green/20',
    status: 'soon',
    tagline: 'Ordering, kitchen display, POS, and reservations in a single system.',
    features: ['Online ordering', 'Kitchen display system', 'POS', 'Reservations', 'Driver tracking', 'Customer app'],
    stack: ['React Native', 'Node.js', 'Redis'],
  },
];

export function getIndustry(slug: string) {
  return industries.find((i) => i.slug === slug);
}
