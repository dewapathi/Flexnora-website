import { Home, ClipboardList, MessageCircle, User, Bell, ChevronRight, CheckCircle2, LogIn, BedDouble } from 'lucide-react';
import { PhoneFrame } from '@/components/demo/PhoneFrame';
import { housekeepingTasks, reservations, rooms } from '@/lib/demo/hotel-data';

const todaysTasks = housekeepingTasks.filter((t) => t.column !== 'Ready').slice(0, 4);
const arrivals = reservations.filter((r) => r.status === 'Confirmed').slice(0, 3);

function BottomNav({ active }: { active: 'home' | 'tasks' | 'chat' | 'profile' }) {
  const items = [
    { key: 'home', icon: Home, label: 'Home' },
    { key: 'tasks', icon: ClipboardList, label: 'Tasks' },
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

export default function HotelMobilePreviewPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="font-display text-2xl font-bold text-foreground">Staff Mobile App</h2>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
          The app hotel staff use on the floor — today&apos;s tasks, quick check-in, and room status —
          shown here on real device frames.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-10">
        <PhoneFrame label="Today's Tasks">
          <PhoneStatusHeader title="Good morning" />
          <div className="px-5">
            <div className="rounded-2xl bg-gradient-to-br from-indigo to-cyan p-4 text-white shadow-lg">
              <p className="text-xs font-medium text-white/80">Open tasks</p>
              <p className="mt-1 text-2xl font-extrabold">{todaysTasks.length}</p>
              <p className="mt-0.5 text-xs text-white/80">Across housekeeping today</p>
            </div>

            <p className="mb-2 mt-5 text-xs font-bold uppercase tracking-wide text-muted-foreground">Assigned to you</p>
            {todaysTasks.map((t) => (
              <div key={t.id} className="mb-2 flex items-center justify-between rounded-xl border border-border bg-card px-3.5 py-2.5">
                <div className="flex items-center gap-2">
                  <BedDouble className="h-3.5 w-3.5 text-indigo" />
                  <span className="text-xs font-medium text-foreground">Room {t.roomNumber}</span>
                </div>
                <span className="text-[0.65rem] font-semibold text-muted-foreground">{t.column}</span>
              </div>
            ))}
          </div>
          <BottomNav active="tasks" />
        </PhoneFrame>

        <PhoneFrame label="Check-in">
          <PhoneStatusHeader title="Arrivals Today" />
          <div className="space-y-3 px-5">
            {arrivals.map((r) => (
              <div key={r.id} className="flex items-center gap-3 rounded-xl border border-border bg-card p-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo/10 text-xs font-bold text-indigo">{r.initials}</div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-bold text-foreground">{r.guestName}</p>
                  <p className="truncate text-[0.65rem] text-muted-foreground">
                    Room {r.roomNumber} · {r.checkIn}
                  </p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            ))}
            <button className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-dashed border-border py-3 text-xs font-semibold text-indigo">
              <LogIn className="h-3.5 w-3.5" /> Scan Guest ID
            </button>
          </div>
          <BottomNav active="home" />
        </PhoneFrame>

        <PhoneFrame label="Room Status">
          <PhoneStatusHeader title="Rooms" />
          <div className="grid grid-cols-2 gap-2.5 px-5">
            {rooms.slice(0, 8).map((room) => (
              <div key={room.id} className="rounded-xl border border-border bg-card p-3">
                <p className="text-xs font-bold text-foreground">Room {room.number}</p>
                <p className="mt-1 flex items-center gap-1 text-[0.65rem] text-muted-foreground">
                  <CheckCircle2 className="h-3 w-3" /> {room.status}
                </p>
              </div>
            ))}
          </div>
          <BottomNav active="profile" />
        </PhoneFrame>
      </div>
    </div>
  );
}
