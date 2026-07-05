import { notFound } from 'next/navigation';
import { Mail, Phone, Crown, Gift, CalendarCheck, FileText, UtensilsCrossed, BedDouble, StickyNote } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { EmptyState } from '@/components/demo/EmptyState';
import { getGuestById, guests, reservations } from '@/lib/demo/hotel-data';

export function generateStaticParams() {
  return guests.map((g) => ({ id: g.id }));
}

const TIER_BADGE: Record<string, string> = {
  Silver: 'bg-muted text-muted-foreground border-transparent',
  Gold: 'bg-amber/10 text-amber border-amber/20',
  Platinum: 'bg-violet/10 text-violet border-violet/20',
};

const INVOICE_BADGE: Record<string, string> = {
  Paid: 'bg-green/10 text-green border-green/20',
  Pending: 'bg-amber/10 text-amber border-amber/20',
  Refunded: 'bg-muted text-muted-foreground border-transparent',
};

export default function GuestProfilePage({ params }: { params: { id: string } }) {
  const guest = getGuestById(params.id);
  if (!guest) notFound();

  const upcoming = reservations.filter((r) => r.guestId === guest.id && (r.status === 'Confirmed' || r.status === 'Pending'));

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col justify-between gap-6 rounded-2xl border border-border bg-card p-6 shadow-sm lg:flex-row lg:items-center">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarFallback className="bg-indigo/10 text-lg font-bold text-indigo">{guest.initials}</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <h2 className="font-display text-xl font-bold text-foreground">{guest.name}</h2>
              {guest.vip && (
                <Badge variant="outline" className="gap-1 border-amber/20 bg-amber/10 text-amber">
                  <Crown className="h-3 w-3" /> VIP
                </Badge>
              )}
              <Badge variant="outline" className={TIER_BADGE[guest.loyaltyTier]}>
                {guest.loyaltyTier}
              </Badge>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{guest.nationality}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-border bg-muted px-4 py-2.5">
          <Gift className="h-4 w-4 text-indigo" />
          <div>
            <p className="text-sm font-bold text-foreground">{guest.loyaltyPoints.toLocaleString()} pts</p>
            <p className="text-xs text-muted-foreground">Loyalty balance</p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {[
          { icon: Mail, label: 'Email', value: guest.email },
          { icon: Phone, label: 'Phone', value: guest.phone },
        ].map((f) => (
          <div key={f.label} className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo/10 text-indigo">
              <f.icon className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-muted-foreground">{f.label}</p>
              <p className="truncate text-sm font-semibold text-foreground">{f.value}</p>
            </div>
          </div>
        ))}
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="history">Stay History</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-5 grid gap-4 sm:grid-cols-2">
          {[
            { icon: BedDouble, label: 'Room Preferences', value: guest.roomPreferences },
            { icon: UtensilsCrossed, label: 'Food Preferences', value: guest.foodPreferences },
            { icon: StickyNote, label: 'Special Requests', value: guest.specialRequests },
            { icon: StickyNote, label: 'Staff Notes', value: guest.notes },
          ].map((f) => (
            <div key={f.label} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
              <div className="mb-2 flex items-center gap-2 text-indigo">
                <f.icon className="h-4 w-4" />
                <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">{f.label}</p>
              </div>
              <p className="text-sm text-foreground">{f.value}</p>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="history" className="mt-5">
          {guest.stayHistory.length === 0 ? (
            <EmptyState icon={CalendarCheck} title="No past stays" description="This is this guest's first visit." />
          ) : (
            <div className="flex flex-col gap-3">
              {guest.stayHistory.map((s, i) => (
                <div key={i} className="flex items-center justify-between rounded-2xl border border-border bg-card p-5 shadow-sm">
                  <div>
                    <p className="text-sm font-bold text-foreground">
                      Room {s.room} · {s.checkIn} → {s.checkOut}
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-foreground">${s.amount.toLocaleString()}</p>
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="invoices" className="mt-5">
          {guest.invoices.length === 0 ? (
            <EmptyState icon={FileText} title="No invoices" description="Billing history will appear here." />
          ) : (
            <div className="flex flex-col gap-3">
              {guest.invoices.map((inv) => (
                <div key={inv.id} className="flex items-center justify-between rounded-2xl border border-border bg-card p-5 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan/10 text-cyan">
                      <FileText className="h-[1.1rem] w-[1.1rem]" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground">{inv.description}</p>
                      <p className="text-xs text-muted-foreground">
                        {inv.date} · {inv.method} · ${inv.amount.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline" className={INVOICE_BADGE[inv.status]}>
                    {inv.status}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="upcoming" className="mt-5">
          {upcoming.length === 0 ? (
            <EmptyState icon={CalendarCheck} title="No upcoming bookings" description="This guest has no scheduled future stays." />
          ) : (
            <div className="flex flex-col gap-3">
              {upcoming.map((r) => (
                <div key={r.id} className="flex items-center justify-between rounded-2xl border border-border bg-card p-5 shadow-sm">
                  <div>
                    <p className="text-sm font-bold text-foreground">
                      Room {r.roomNumber} · {r.roomType}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {r.checkIn} → {r.checkOut}
                    </p>
                  </div>
                  <Badge variant="outline" className="border-cyan/20 bg-cyan/10 text-cyan">
                    {r.status}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
