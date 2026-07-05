'use client';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { Search, Plus, CalendarX } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogFooter, DialogClose,
} from '@/components/ui/dialog';
import { EmptyState } from '@/components/demo/EmptyState';
import { reservations, guests, rooms, type Reservation } from '@/lib/demo/hotel-data';

const STATUS_BADGE: Record<Reservation['status'], string> = {
  Confirmed: 'bg-cyan/10 text-cyan border-cyan/20',
  Pending: 'bg-amber/10 text-amber border-amber/20',
  'Checked In': 'bg-green/10 text-green border-green/20',
  'Checked Out': 'bg-muted text-muted-foreground border-transparent',
  Cancelled: 'bg-red-500/10 text-red-500 border-red-500/20',
};

const STATUS_OPTIONS = ['all', 'Confirmed', 'Pending', 'Checked In', 'Checked Out', 'Cancelled'] as const;

export default function ReservationsPage() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<string>('all');
  const [open, setOpen] = useState(false);

  const filtered = useMemo(() => {
    return reservations.filter((r) => {
      const matchesSearch =
        r.guestName.toLowerCase().includes(search.toLowerCase()) || r.roomNumber.includes(search);
      const matchesStatus = status === 'all' || r.status === status;
      return matchesSearch && matchesStatus;
    });
  }, [search, status]);

  function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setOpen(false);
    toast.success('Reservation created', { description: 'A confirmation email will be sent to the guest.' });
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-bold text-foreground">Reservations</h2>
          <p className="mt-1 text-sm text-muted-foreground">{reservations.length} reservations on file</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger
            render={
              <button className="flex items-center gap-2 rounded-xl bg-gradient-to-br from-indigo to-cyan px-4 py-2.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5" />
            }
          >
            <Plus className="h-4 w-4" /> New Reservation
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New reservation</DialogTitle>
              <DialogDescription>Book a room for a guest.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreate} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <Label>Guest</Label>
                <Select defaultValue={guests[0].id}>
                  <SelectTrigger>
                    <SelectValue>{(v: string) => guests.find((g) => g.id === v)?.name ?? 'Select guest'}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {guests.map((g) => (
                      <SelectItem key={g.id} value={g.id}>
                        {g.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-1.5">
                <Label>Room</Label>
                <Select defaultValue={rooms.find((r) => r.status === 'Available')?.id}>
                  <SelectTrigger>
                    <SelectValue>{(v: string) => { const r = rooms.find((room) => room.id === v); return r ? `Room ${r.number} — ${r.type}` : 'Select room'; }}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {rooms.filter((r) => r.status === 'Available').map((r) => (
                      <SelectItem key={r.id} value={r.id}>
                        Room {r.number} — {r.type} (${r.price}/night)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="checkin">Check-in</Label>
                  <Input id="checkin" type="date" defaultValue="2026-07-10" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="checkout">Check-out</Label>
                  <Input id="checkout" type="date" defaultValue="2026-07-13" />
                </div>
              </div>
              <DialogFooter>
                <DialogClose render={<button type="button" className="rounded-xl border border-border px-4 py-2 text-sm font-semibold text-foreground" />}>
                  Cancel
                </DialogClose>
                <button type="submit" className="rounded-xl bg-gradient-to-br from-indigo to-cyan px-4 py-2 text-sm font-semibold text-white">
                  Create Reservation
                </button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="relative max-w-sm flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by guest or room number..." className="pl-9" />
        </div>
        <Select value={status} onValueChange={(v) => setStatus(v ?? 'all')}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Status">{(v: string) => (v === 'all' ? 'All statuses' : v)}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            {STATUS_OPTIONS.map((s) => (
              <SelectItem key={s} value={s}>
                {s === 'all' ? 'All statuses' : s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        {filtered.length === 0 ? (
          <EmptyState icon={CalendarX} title="No reservations found" description="Try adjusting your search or status filter." />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Guest</TableHead>
                <TableHead className="hidden md:table-cell">Room</TableHead>
                <TableHead className="hidden sm:table-cell">Dates</TableHead>
                <TableHead className="hidden lg:table-cell">Source</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden lg:table-cell text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((r) => (
                <TableRow key={r.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-indigo/10 text-xs font-bold text-indigo">{r.initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-foreground">{r.guestName}</p>
                        <p className="text-xs text-muted-foreground">{r.nights} nights</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden text-sm text-muted-foreground md:table-cell">
                    Room {r.roomNumber} · {r.roomType}
                  </TableCell>
                  <TableCell className="hidden text-sm text-muted-foreground sm:table-cell">
                    {r.checkIn} → {r.checkOut}
                  </TableCell>
                  <TableCell className="hidden text-sm text-muted-foreground lg:table-cell">{r.source}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={STATUS_BADGE[r.status]}>
                      {r.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden text-right text-sm font-semibold text-foreground lg:table-cell">${r.amount.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
