'use client';
import { LayoutDashboard, CalendarCheck, BedDouble, Users, ClipboardList, Bot, BarChart3, Smartphone, Settings, Hotel } from 'lucide-react';
import { DemoSidebar, type DemoNavItem } from '@/components/demo/DemoSidebar';
import { DemoTopbar } from '@/components/demo/DemoTopbar';
import { hotel } from '@/lib/demo/hotel-data';

const BASE = '/demo/hotel';

const notifications = [
  { title: 'Reservation confirmed', desc: 'Julien Moreau booked Room 204, Jul 6–9', time: '10m ago' },
  { title: 'VIP arrival today', desc: 'Amira Al-Farsi (Platinum) checking in Room 201', time: '35m ago' },
  { title: 'Housekeeping completed', desc: 'Room 102 marked Ready by Grace Adeyemi', time: '1h ago' },
];

const navItems: DemoNavItem[] = [
  { href: `${BASE}/dashboard`, label: 'Dashboard', icon: LayoutDashboard },
  { href: `${BASE}/reservations`, label: 'Reservations', icon: CalendarCheck },
  { href: `${BASE}/rooms`, label: 'Rooms', icon: BedDouble },
  { href: `${BASE}/guests`, label: 'Guests', icon: Users },
  { href: `${BASE}/housekeeping`, label: 'Housekeeping', icon: ClipboardList },
  { href: `${BASE}/concierge`, label: 'AI Concierge', icon: Bot },
  { href: `${BASE}/analytics`, label: 'Analytics', icon: BarChart3 },
  { href: `${BASE}/mobile`, label: 'Mobile App', icon: Smartphone },
  { href: `${BASE}/settings`, label: 'Settings', icon: Settings },
];

export default function HotelAppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <DemoSidebar items={navItems} basePath={BASE} industryLabel="Grand Hotel" industryIcon={Hotel} />
      <div className="lg:pl-64">
        <DemoTopbar items={navItems} user={hotel.manager} basePath={BASE} notifications={notifications} searchPlaceholder="Search reservations, guests, rooms..." />
        <main className="p-5 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
