'use client';
import { Mail, Building2, Users, CalendarCheck, Star } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { StatCard } from '@/components/demo/StatCard';
import { hotel, guests, reservations, dashboardStats } from '@/lib/demo/hotel-data';

export default function HotelProfilePage() {
  const specialties = ['Guest Relations', 'Revenue Management', 'Operations', 'Luxury Hospitality'];

  return (
    <div className="flex max-w-3xl flex-col gap-6">
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
        <Avatar className="h-24 w-24">
          <AvatarFallback className="bg-indigo/10 text-2xl font-bold text-indigo">{hotel.manager.initials}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="font-display text-xl font-bold text-foreground">{hotel.manager.name}</h2>
          <p className="text-sm text-muted-foreground">{hotel.manager.role}</p>
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          {specialties.map((s) => (
            <span key={s} className="rounded-full border border-indigo/20 bg-indigo/10 px-3 py-1 text-xs font-semibold text-lilac">
              {s}
            </span>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard icon={Users} label="Guests on File" value={guests.length} accent="indigo" />
        <StatCard icon={CalendarCheck} label="Reservations Managed" value={reservations.length} accent="cyan" />
        <StatCard icon={Star} label="Avg Rating" value={dashboardStats.avgRating} decimals={1} accent="green" />
      </div>

      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <h3 className="mb-4 text-base font-bold text-foreground">Property Details</h3>
        <div className="flex flex-col divide-y divide-border">
          {[
            { icon: Mail, label: 'Email', value: hotel.manager.email },
            { icon: Building2, label: 'Property', value: hotel.name },
          ].map((f) => (
            <div key={f.label} className="flex items-center gap-3 py-3">
              <f.icon className="h-4 w-4 shrink-0 text-muted-foreground" />
              <span className="w-36 shrink-0 text-sm text-muted-foreground">{f.label}</span>
              <span className="text-sm font-semibold text-foreground">{f.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
