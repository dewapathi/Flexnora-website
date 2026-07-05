'use client';
import Link from 'next/link';
import { Area, AreaChart, CartesianGrid, XAxis, Pie, PieChart, Cell } from 'recharts';
import { Users, CalendarCheck, FileClock, Smile, ArrowRight, Video } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { StatCard } from '@/components/demo/StatCard';
import { ChartCard } from '@/components/demo/ChartCard';
import { patients, appointments, dashboardStats, monthlyVisits, appointmentTypeBreakdown } from '@/lib/demo/healthcare-data';

const chartConfig = {
  visits: { label: 'Visits', color: 'var(--color-indigo)' },
} satisfies ChartConfig;

const todayAppointments = appointments.filter((a) => a.date === '2026-07-05');
const recentPatients = [...patients].sort((a, b) => (a.lastVisit < b.lastVisit ? 1 : -1)).slice(0, 5);

const STATUS_BADGE: Record<string, string> = {
  Stable: 'bg-green/10 text-green border-green/20',
  Critical: 'bg-red-500/10 text-red-500 border-red-500/20',
  Recovering: 'bg-cyan/10 text-cyan border-cyan/20',
  Scheduled: 'bg-amber/10 text-amber border-amber/20',
};

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="font-display text-2xl font-bold text-foreground">Good morning, Dr. Wickramasinghe</h2>
        <p className="mt-1 text-sm text-muted-foreground">Here&apos;s what&apos;s happening across your practice today.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Users} label="Total Patients" value={dashboardStats.totalPatients} delta="+3 this month" trend="up" accent="indigo" />
        <StatCard icon={CalendarCheck} label="Today's Appointments" value={dashboardStats.todayAppointments} delta="2 video visits" trend="up" accent="cyan" />
        <StatCard icon={FileClock} label="Pending Reports" value={dashboardStats.pendingReports} delta="2 overdue" trend="down" accent="amber" />
        <StatCard icon={Smile} label="Satisfaction" value={dashboardStats.satisfaction} suffix="%" delta="+1.2% vs last month" trend="up" accent="green" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ChartCard title="Patient Visits" description="Monthly volume, last 7 months">
            <ChartContainer config={chartConfig} className="aspect-auto h-64 w-full">
              <AreaChart data={monthlyVisits} margin={{ left: -20, right: 10 }}>
                <defs>
                  <linearGradient id="fillVisits" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-indigo)" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="var(--color-indigo)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area dataKey="visits" type="monotone" stroke="var(--color-indigo)" fill="url(#fillVisits)" strokeWidth={2} />
              </AreaChart>
            </ChartContainer>
          </ChartCard>
        </div>

        <ChartCard title="Appointment Types" description="This week's breakdown">
          <ChartContainer config={chartConfig} className="mx-auto aspect-square h-64">
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent hideLabel />} />
              <Pie data={appointmentTypeBreakdown} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} strokeWidth={4}>
                {appointmentTypeBreakdown.map((entry) => (
                  <Cell key={entry.name} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>
          <div className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-1.5">
            {appointmentTypeBreakdown.map((e) => (
              <div key={e.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="h-2 w-2 rounded-full" style={{ background: e.fill }} />
                {e.name}
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <h3 className="text-base font-bold text-foreground">Recent Patients</h3>
            <Link href="/demo/healthcare/patients" className="flex items-center gap-1 text-sm font-semibold text-indigo hover:gap-1.5">
              View all <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="divide-y divide-border">
            {recentPatients.map((p) => (
              <Link
                key={p.id}
                href={`/demo/healthcare/patients/${p.id}`}
                className="flex items-center gap-4 px-5 py-3.5 transition-colors hover:bg-muted/60"
              >
                <Avatar className="h-9 w-9">
                  <AvatarFallback className="bg-indigo/10 text-xs font-bold text-indigo">{p.initials}</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-foreground">{p.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{p.condition}</p>
                </div>
                <Badge variant="outline" className={STATUS_BADGE[p.status]}>
                  {p.status}
                </Badge>
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card shadow-sm">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <h3 className="text-base font-bold text-foreground">Today&apos;s Schedule</h3>
            <span className="text-xs font-medium text-muted-foreground">{todayAppointments.length} total</span>
          </div>
          <div className="divide-y divide-border">
            {todayAppointments.map((a) => (
              <div key={a.id} className="flex items-center gap-3 px-5 py-3.5">
                <div className="flex h-9 w-9 shrink-0 flex-col items-center justify-center rounded-lg bg-indigo/10 text-[0.65rem] font-bold leading-none text-indigo">
                  {a.time}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-foreground">{a.patientName}</p>
                  <p className="truncate text-xs text-muted-foreground">{a.type}</p>
                </div>
                {a.mode === 'Video' && <Video className="h-4 w-4 shrink-0 text-cyan" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
