'use client';
import { LayoutDashboard, Users, CalendarDays, Video, Sparkles, BarChart3, Smartphone, Settings, HeartPulse } from 'lucide-react';
import { DemoSidebar, type DemoNavItem } from '@/components/demo/DemoSidebar';
import { DemoTopbar } from '@/components/demo/DemoTopbar';
import { doctor } from '@/lib/demo/healthcare-data';

const BASE = '/demo/healthcare';

const notifications = [
  { title: 'Lab results ready', desc: 'Marcus Webb — Angiogram results uploaded', time: '5m ago' },
  { title: 'Appointment reminder', desc: 'Isabelle Moreau in 45 minutes (Video)', time: '20m ago' },
  { title: 'New message', desc: 'Nurse station flagged a medication refill request', time: '1h ago' },
];

const navItems: DemoNavItem[] = [
  { href: `${BASE}/dashboard`, label: 'Dashboard', icon: LayoutDashboard },
  { href: `${BASE}/patients`, label: 'Patients', icon: Users },
  { href: `${BASE}/appointments`, label: 'Appointments', icon: CalendarDays },
  { href: `${BASE}/consultation`, label: 'Consultation', icon: Video },
  { href: `${BASE}/ai-assistant`, label: 'AI Assistant', icon: Sparkles },
  { href: `${BASE}/reports`, label: 'Reports', icon: BarChart3 },
  { href: `${BASE}/mobile`, label: 'Mobile App', icon: Smartphone },
  { href: `${BASE}/settings`, label: 'Settings', icon: Settings },
];

export default function HealthcareAppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <DemoSidebar items={navItems} basePath={BASE} industryLabel="Health Portal" industryIcon={HeartPulse} />
      <div className="lg:pl-64">
        <DemoTopbar items={navItems} user={doctor} basePath={BASE} notifications={notifications} searchPlaceholder="Search patients, appointments..." />
        <main className="p-5 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
