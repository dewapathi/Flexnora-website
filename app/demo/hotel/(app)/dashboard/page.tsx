'use client';
import Link from 'next/link';
import { Area, AreaChart, CartesianGrid, XAxis, Bar, BarChart } from 'recharts';
import {
  BedDouble, DoorOpen, DollarSign, LogIn, LogOut, ClipboardList, Star, ArrowRight, Sun, Crown,
} from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { StatCard } from '@/components/demo/StatCard';
import { ChartCard } from '@/components/demo/ChartCard';
import { reservations, guests, reviews, dashboardStats, monthlyRevenue, occupancyTrend } from '@/lib/demo/hotel-data';

const revenueConfig = { revenue: { label: 'Revenue', color: 'var(--color-indigo)' } } satisfies ChartConfig;
const occupancyConfig = { occupancy: { label: 'Occupancy', color: 'var(--color-cyan)' } } satisfies ChartConfig;

const STATUS_BADGE: Record<string, string> = {
  Confirmed: 'bg-cyan/10 text-cyan border-cyan/20',
  Pending: 'bg-amber/10 text-amber border-amber/20',
  'Checked In': 'bg-green/10 text-green border-green/20',
  'Checked Out': 'bg-muted text-muted-foreground border-transparent',
  Cancelled: 'bg-red-500/10 text-red-500 border-red-500/20',
};

const latestReservations = [...reservations].sort((a, b) => (a.checkIn < b.checkIn ? 1 : -1)).slice(0, 5);
const vipArrivals = reservations.filter((r) => guests.find((g) => g.id === r.guestId)?.vip && r.status !== 'Cancelled').slice(0, 4);

export default function HotelDashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-bold text-foreground">Good morning, {'Isabelle'}</h2>
          <p className="mt-1 text-sm text-muted-foreground">Here&apos;s how the property is performing today.</p>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 shadow-sm">
          <Sun className="h-5 w-5 text-amber" />
          <div>
            <p className="text-sm font-bold text-foreground">29°C · Sunny</p>
            <p className="text-xs text-muted-foreground">South Malé Atoll</p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={BedDouble} label="Today's Occupancy" value={dashboardStats.occupancy} suffix="%" delta="+4% vs last week" trend="up" accent="indigo" />
        <StatCard icon={DoorOpen} label="Available Rooms" value={dashboardStats.availableRooms} accent="cyan" />
        <StatCard icon={DollarSign} label="Revenue Today" value={dashboardStats.revenueToday} accent="green" delta="+8.2%" trend="up" />
        <StatCard icon={Star} label="Average Rating" value={dashboardStats.avgRating} decimals={1} accent="amber" />
        <StatCard icon={LogIn} label="Check-ins Today" value={dashboardStats.checkInsToday} accent="indigo" />
        <StatCard icon={LogOut} label="Check-outs Today" value={dashboardStats.checkOutsToday} accent="violet" />
        <StatCard icon={ClipboardList} label="Housekeeping Tasks" value={dashboardStats.housekeepingOpen} delta="Open now" trend="down" accent="cyan" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <ChartCard title="Monthly Revenue" description="Last 7 months, USD">
          <ChartContainer config={revenueConfig} className="aspect-auto h-64 w-full">
            <AreaChart data={monthlyRevenue} margin={{ left: -20, right: 10 }}>
              <defs>
                <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-indigo)" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="var(--color-indigo)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area dataKey="revenue" type="monotone" stroke="var(--color-indigo)" fill="url(#fillRevenue)" strokeWidth={2} />
            </AreaChart>
          </ChartContainer>
        </ChartCard>

        <ChartCard title="Weekly Occupancy" description="Percentage of rooms occupied, by day">
          <ChartContainer config={occupancyConfig} className="aspect-auto h-64 w-full">
            <BarChart data={occupancyTrend} margin={{ left: -20 }}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="occupancy" fill="var(--color-cyan)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ChartContainer>
        </ChartCard>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card shadow-sm">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <h3 className="text-base font-bold text-foreground">Latest Reservations</h3>
            <Link href="/demo/hotel/reservations" className="flex items-center gap-1 text-sm font-semibold text-indigo hover:gap-1.5">
              View all <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="divide-y divide-border">
            {latestReservations.map((r) => (
              <div key={r.id} className="flex items-center gap-4 px-5 py-3.5">
                <Avatar className="h-9 w-9">
                  <AvatarFallback className="bg-indigo/10 text-xs font-bold text-indigo">{r.initials}</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-foreground">{r.guestName}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    Room {r.roomNumber} · {r.checkIn} → {r.checkOut}
                  </p>
                </div>
                <Badge variant="outline" className={STATUS_BADGE[r.status]}>
                  {r.status}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card shadow-sm">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <h3 className="flex items-center gap-2 text-base font-bold text-foreground">
              <Crown className="h-4 w-4 text-amber" /> Upcoming VIP Arrivals
            </h3>
          </div>
          <div className="divide-y divide-border">
            {vipArrivals.map((r) => (
              <div key={r.id} className="flex items-center gap-4 px-5 py-3.5">
                <Avatar className="h-9 w-9">
                  <AvatarFallback className="bg-amber/10 text-xs font-bold text-amber">{r.initials}</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-foreground">{r.guestName}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    Room {r.roomNumber} · {r.roomType}
                  </p>
                </div>
                <span className="text-xs font-semibold text-muted-foreground">{r.checkIn}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card shadow-sm">
        <div className="border-b border-border px-5 py-4">
          <h3 className="text-base font-bold text-foreground">Recent Guest Reviews</h3>
        </div>
        <div className="grid gap-4 p-5 sm:grid-cols-3">
          {reviews.map((r) => (
            <div key={r.id} className="rounded-xl border border-border p-4">
              <div className="mb-2 flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`h-3.5 w-3.5 ${i < r.rating ? 'fill-amber text-amber' : 'text-muted-foreground/30'}`} />
                ))}
              </div>
              <p className="mb-3 text-sm italic leading-relaxed text-muted-foreground">&ldquo;{r.comment}&rdquo;</p>
              <p className="text-xs font-semibold text-foreground">{r.guest}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
