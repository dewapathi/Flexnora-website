'use client';
import { Bar, BarChart, CartesianGrid, XAxis, Line, LineChart, YAxis } from 'recharts';
import { Clock, Repeat, FileCheck2, Heart, Download } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart';
import { StatCard } from '@/components/demo/StatCard';
import { ChartCard } from '@/components/demo/ChartCard';
import { weeklyLoad, satisfactionTrend, topConditions, reportStats } from '@/lib/demo/healthcare-data';

const barConfig = { appointments: { label: 'Appointments', color: 'var(--color-cyan)' } } satisfies ChartConfig;
const lineConfig = { score: { label: 'Satisfaction', color: 'var(--color-green)' } } satisfies ChartConfig;

export default function ReportsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-bold text-foreground">Reports &amp; Analytics</h2>
          <p className="mt-1 text-sm text-muted-foreground">Practice performance over the last 6 months</p>
        </div>
        <button className="flex items-center gap-2 rounded-xl border border-border bg-muted px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted/70">
          <Download className="h-4 w-4" /> Export Report
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Clock} label="Avg Consult Time" value={reportStats.avgConsultTime} suffix=" min" accent="indigo" />
        <StatCard icon={Repeat} label="Readmission Rate" value={reportStats.readmissionRate} suffix="%" trend="down" delta="-0.6% vs last quarter" accent="amber" />
        <StatCard icon={FileCheck2} label="Report Turnaround" value={reportStats.reportTurnaround} suffix=" days" accent="cyan" />
        <StatCard icon={Heart} label="Patient Retention" value={reportStats.retention} suffix="%" trend="up" delta="+2% vs last quarter" accent="green" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <ChartCard title="Weekly Appointment Load" description="Appointments booked per day">
          <ChartContainer config={barConfig} className="aspect-auto h-64 w-full">
            <BarChart data={weeklyLoad} margin={{ left: -20 }}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="appointments" fill="var(--color-cyan)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ChartContainer>
        </ChartCard>

        <ChartCard title="Patient Satisfaction Trend" description="Average score out of 100">
          <ChartContainer config={lineConfig} className="aspect-auto h-64 w-full">
            <LineChart data={satisfactionTrend} margin={{ left: -20 }}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
              <YAxis domain={[85, 100]} tickLine={false} axisLine={false} width={30} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line dataKey="score" type="monotone" stroke="var(--color-green)" strokeWidth={2.5} dot={{ r: 4, fill: 'var(--color-green)' }} />
            </LineChart>
          </ChartContainer>
        </ChartCard>
      </div>

      <div className="rounded-2xl border border-border bg-card shadow-sm">
        <div className="border-b border-border px-5 py-4">
          <h3 className="text-base font-bold text-foreground">Top Conditions Treated</h3>
        </div>
        <div className="flex flex-col gap-4 p-5">
          {topConditions.map((c) => (
            <div key={c.name} className="flex items-center gap-4">
              <span className="w-44 shrink-0 truncate text-sm font-medium text-foreground">{c.name}</span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                <div className="h-full rounded-full bg-gradient-to-r from-indigo to-cyan" style={{ width: `${c.share * 4}%` }} />
              </div>
              <span className="w-16 shrink-0 text-right text-xs font-semibold text-muted-foreground">{c.count} patients</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
