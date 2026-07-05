import { Home, CalendarDays, MessageCircle, User, Bell, ChevronRight, Video, Pill, Activity, Plus } from 'lucide-react';
import { PhoneFrame } from '@/components/demo/PhoneFrame';
import { patients, appointments } from '@/lib/demo/healthcare-data';

const patient = patients[1];
const upcoming = appointments.find((a) => a.patientId === patient.id) ?? appointments[0];

function BottomNav({ active }: { active: 'home' | 'appointments' | 'chat' | 'profile' }) {
  const items = [
    { key: 'home', icon: Home, label: 'Home' },
    { key: 'appointments', icon: CalendarDays, label: 'Visits' },
    { key: 'chat', icon: MessageCircle, label: 'Chat' },
    { key: 'profile', icon: User, label: 'Profile' },
  ] as const;
  return (
    <div className="absolute inset-x-0 bottom-0 flex items-center justify-around border-t border-border bg-background/95 py-3 backdrop-blur-xl">
      {items.map((item) => (
        <div key={item.key} className={`flex flex-col items-center gap-1 ${active === item.key ? 'text-indigo' : 'text-muted-foreground'}`}>
          <item.icon className="h-5 w-5" />
          <span className="text-[0.6rem] font-semibold">{item.label}</span>
        </div>
      ))}
    </div>
  );
}

function PhoneStatusHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-between px-5 pb-3 pt-8">
      <p className="font-display text-lg font-bold text-foreground">{title}</p>
      <div className="relative rounded-full bg-muted p-2 text-muted-foreground">
        <Bell className="h-4 w-4" />
        <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-red-500" />
      </div>
    </div>
  );
}

export default function MobileAppPreviewPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="font-display text-2xl font-bold text-foreground">Patient Mobile App</h2>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
          The companion app patients use to book visits, message their care team, and track their health —
          shown here on real device frames.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-10">
        <PhoneFrame label="Home">
          <PhoneStatusHeader title={`Hi, ${patient.name.split(' ')[0]}`} />
          <div className="px-5">
            <div className="rounded-2xl bg-gradient-to-br from-indigo to-cyan p-4 text-white shadow-lg">
              <p className="text-xs font-medium text-white/80">Upcoming visit</p>
              <p className="mt-1 text-sm font-bold">{upcoming.type}</p>
              <p className="mt-0.5 text-xs text-white/80">
                {upcoming.date} · {upcoming.time}
              </p>
              <button className="mt-3 flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1.5 text-xs font-semibold backdrop-blur-sm">
                <Video className="h-3 w-3" /> Join Video Call
              </button>
            </div>

            <p className="mb-2 mt-5 text-xs font-bold uppercase tracking-wide text-muted-foreground">Quick Actions</p>
            <div className="grid grid-cols-3 gap-2">
              {[
                { icon: CalendarDays, label: 'Book' },
                { icon: Pill, label: 'Refills' },
                { icon: MessageCircle, label: 'Message' },
              ].map((a) => (
                <div key={a.label} className="flex flex-col items-center gap-1.5 rounded-xl border border-border bg-card p-3">
                  <a.icon className="h-4 w-4 text-indigo" />
                  <span className="text-[0.65rem] font-semibold text-foreground">{a.label}</span>
                </div>
              ))}
            </div>

            <p className="mb-2 mt-5 text-xs font-bold uppercase tracking-wide text-muted-foreground">Health Summary</p>
            {patient.vitals.slice(0, 3).map((v) => (
              <div key={v.label} className="mb-2 flex items-center justify-between rounded-xl border border-border bg-card px-3.5 py-2.5">
                <div className="flex items-center gap-2">
                  <Activity className="h-3.5 w-3.5 text-cyan" />
                  <span className="text-xs font-medium text-foreground">{v.label}</span>
                </div>
                <span className="text-xs font-bold text-foreground">{v.value}</span>
              </div>
            ))}
          </div>
          <BottomNav active="home" />
        </PhoneFrame>

        <PhoneFrame label="Appointments">
          <PhoneStatusHeader title="My Visits" />
          <div className="space-y-3 px-5">
            {appointments.slice(0, 4).map((a) => (
              <div key={a.id} className="flex items-center gap-3 rounded-xl border border-border bg-card p-3">
                <div className="flex h-10 w-10 flex-col items-center justify-center rounded-lg bg-indigo/10 text-[0.6rem] font-bold text-indigo">
                  {a.time}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-bold text-foreground">{a.type}</p>
                  <p className="truncate text-[0.65rem] text-muted-foreground">{a.date}</p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            ))}
            <button className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-dashed border-border py-3 text-xs font-semibold text-indigo">
              <Plus className="h-3.5 w-3.5" /> Book New Visit
            </button>
          </div>
          <BottomNav active="appointments" />
        </PhoneFrame>

        <PhoneFrame label="Profile">
          <PhoneStatusHeader title="Profile" />
          <div className="px-5">
            <div className="mb-5 flex flex-col items-center gap-2 py-2">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo/10 text-lg font-bold text-indigo">
                {patient.initials}
              </div>
              <p className="text-sm font-bold text-foreground">{patient.name}</p>
              <p className="text-xs text-muted-foreground">{patient.email}</p>
            </div>
            {['Personal Information', 'Insurance Details', 'Emergency Contact', 'Notification Settings', 'Privacy & Security'].map((item) => (
              <div key={item} className="flex items-center justify-between border-b border-border py-3 text-xs font-semibold text-foreground">
                {item}
                <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
              </div>
            ))}
          </div>
          <BottomNav active="profile" />
        </PhoneFrame>
      </div>
    </div>
  );
}
