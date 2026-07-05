'use client';
import { Area, AreaChart, CartesianGrid, XAxis, Pie, PieChart, Cell } from 'recharts';
import { DollarSign, TrendingUp, CalendarDays, PercentCircle, Download } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart';
import { StatCard } from '@/components/demo/StatCard';
import { ChartCard } from '@/components/demo/ChartCard';
import { monthlyRevenue, occupancyTrend, bookingChannels, analyticsStats } from '@/lib/demo/hotel-data';

const revenueConfig = { revenue: { label: 'Revenue', color: 'var(--color-indigo)' } } satisfies ChartConfig;
const occupancyConfig = { occupancy: { label: 'Occupancy', color: 'var(--color-cyan)' } } satisfies ChartConfig;

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-bold text-foreground">Analytics</h2>
          <p className="mt-1 text-sm text-muted-foreground">Performance across occupancy, revenue, and booking channels.</p>
        </div>
        <button className="flex items-center gap-2 rounded-xl border border-border bg-muted px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted/70">
          <Download className="h-4 w-4" /> Export Report
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={DollarSign} label="ADR" value={analyticsStats.adr} suffix=" USD" accent="indigo" />
        <StatCard icon={TrendingUp} label="RevPAR" value={analyticsStats.revpar} suffix=" USD" accent="cyan" />
        <StatCard icon={CalendarDays} label="Avg Stay" value={analyticsStats.avgStay} suffix=" nights" decimals={1} accent="violet" />
        <StatCard icon={PercentCircle} label="Cancellation Rate" value={analyticsStats.cancellationRate} suffix="%" decimals={1} trend="down" delta="-0.4% vs last month" accent="amber" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ChartCard title="Revenue Trend" description="Last 7 months, USD">
            <ChartContainer config={revenueConfig} className="aspect-auto h-64 w-full">
              <AreaChart data={monthlyRevenue} margin={{ left: -20, right: 10 }}>
                <defs>
                  <linearGradient id="fillRevenueAnalytics" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-indigo)" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="var(--color-indigo)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area dataKey="revenue" type="monotone" stroke="var(--color-indigo)" fill="url(#fillRevenueAnalytics)" strokeWidth={2} />
              </AreaChart>
            </ChartContainer>
          </ChartCard>
        </div>

        <ChartCard title="Booking Channels" description="Share of total reservations">
          <ChartContainer config={revenueConfig} className="mx-auto aspect-square h-52">
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent hideLabel />} />
              <Pie data={bookingChannels} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} strokeWidth={4}>
                {bookingChannels.map((entry) => (
                  <Cell key={entry.name} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>
          <div className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-1.5">
            {bookingChannels.map((c) => (
              <div key={c.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="h-2 w-2 rounded-full" style={{ background: c.fill }} />
                {c.name}
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      <ChartCard title="Occupancy Trend" description="Percentage of rooms occupied, by day">
        <ChartContainer config={occupancyConfig} className="aspect-auto h-56 w-full">
          <AreaChart data={occupancyTrend} margin={{ left: -20, right: 10 }}>
            <defs>
              <linearGradient id="fillOccupancy" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-cyan)" stopOpacity={0.35} />
                <stop offset="95%" stopColor="var(--color-cyan)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area dataKey="occupancy" type="monotone" stroke="var(--color-cyan)" fill="url(#fillOccupancy)" strokeWidth={2} />
          </AreaChart>
        </ChartContainer>
      </ChartCard>
    </div>
  );
}
