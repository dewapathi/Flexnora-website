'use client';
import { useState } from 'react';
import Link from 'next/link';
import { BedDouble, DollarSign, Sparkles, Wrench, CheckCircle2, ArrowRight, Layers } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { rooms, guests, type Room } from '@/lib/demo/hotel-data';

const STATUS_STYLES: Record<Room['status'], { badge: string; icon: typeof CheckCircle2 }> = {
  Available: { badge: 'bg-green/10 text-green border-green/20', icon: CheckCircle2 },
  Occupied: { badge: 'bg-indigo/10 text-indigo border-indigo/20', icon: BedDouble },
  Cleaning: { badge: 'bg-cyan/10 text-cyan border-cyan/20', icon: Sparkles },
  Maintenance: { badge: 'bg-amber/10 text-amber border-amber/20', icon: Wrench },
};

const TYPE_OPTIONS = ['all', 'Standard', 'Deluxe', 'Suite', 'Presidential Suite'] as const;

export default function RoomsPage() {
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [selected, setSelected] = useState<Room | null>(null);

  const filtered = typeFilter === 'all' ? rooms : rooms.filter((r) => r.type === typeFilter);
  const selectedGuest = selected?.currentGuestId ? guests.find((g) => g.id === selected.currentGuestId) : undefined;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-bold text-foreground">Rooms</h2>
          <p className="mt-1 text-sm text-muted-foreground">{rooms.length} rooms across 6 floors</p>
        </div>
        <Select value={typeFilter} onValueChange={(v) => setTypeFilter(v ?? 'all')}>
          <SelectTrigger className="w-56">
            <SelectValue placeholder="Room type">{(v: string) => (v === 'all' ? 'All room types' : v)}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            {TYPE_OPTIONS.map((t) => (
              <SelectItem key={t} value={t}>
                {t === 'all' ? 'All room types' : t}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((room) => {
          const style = STATUS_STYLES[room.status];
          return (
            <button
              key={room.id}
              onClick={() => setSelected(room)}
              className="group overflow-hidden rounded-2xl border border-border bg-card text-left shadow-sm transition-all hover:-translate-y-1 hover:border-indigo/30"
            >
              <div className={`relative aspect-[4/3] overflow-hidden bg-gradient-to-br ${room.grad} p-4`}>
                <Badge variant="outline" className={`${style.badge} bg-white/90 dark:bg-black/40`}>
                  <style.icon className="h-3 w-3" /> {room.status}
                </Badge>
                <div className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-xl bg-white/20 text-white backdrop-blur-md">
                  <BedDouble className="h-5 w-5" />
                </div>
              </div>
              <div className="p-4">
                <div className="mb-1 flex items-center justify-between">
                  <h3 className="font-bold text-foreground">Room {room.number}</h3>
                  <span className="flex items-center gap-1 text-sm font-semibold text-foreground">
                    <DollarSign className="h-3.5 w-3.5" />
                    {room.price}
                  </span>
                </div>
                <p className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Layers className="h-3 w-3" /> Floor {room.floor} · {room.type}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      <Sheet open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <SheetContent className="w-full overflow-y-auto sm:max-w-md">
          {selected && (
            <>
              <SheetHeader>
                <SheetTitle>Room {selected.number}</SheetTitle>
                <SheetDescription>
                  Floor {selected.floor} · {selected.type} · ${selected.price}/night
                </SheetDescription>
              </SheetHeader>
              <div className="flex flex-col gap-5 px-4 pb-6">
                <div className={`aspect-[16/9] rounded-xl bg-gradient-to-br ${selected.grad}`} />

                <div>
                  <Badge variant="outline" className={STATUS_STYLES[selected.status].badge}>
                    {selected.status}
                  </Badge>
                  <p className="mt-1.5 text-xs text-muted-foreground">Last cleaned {selected.lastCleaned}</p>
                </div>

                {selectedGuest && (
                  <div className="rounded-xl border border-border p-4">
                    <p className="mb-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">Current Guest</p>
                    <Link href={`/demo/hotel/guests/${selectedGuest.id}`} className="flex items-center justify-between gap-2 text-sm font-semibold text-indigo hover:underline">
                      {selectedGuest.name} {selectedGuest.vip && '👑'}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                )}

                <div>
                  <p className="mb-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">Amenities</p>
                  <div className="flex flex-wrap gap-2">
                    {selected.amenities.map((a) => (
                      <span key={a} className="rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
