'use client';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { Video, MapPin, Plus, CalendarX } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogFooter, DialogClose,
} from '@/components/ui/dialog';
import { EmptyState } from '@/components/demo/EmptyState';
import { appointments, patients } from '@/lib/demo/healthcare-data';

const STATUS_BADGE: Record<string, string> = {
  Confirmed: 'bg-green/10 text-green border-green/20',
  Pending: 'bg-amber/10 text-amber border-amber/20',
  Completed: 'bg-indigo/10 text-indigo border-indigo/20',
  Cancelled: 'bg-red-500/10 text-red-500 border-red-500/20',
};

function toISODate(d: Date) {
  return d.toISOString().slice(0, 10);
}

export default function AppointmentsPage() {
  const [date, setDate] = useState<Date | undefined>(new Date('2026-07-05T12:00:00'));
  const [open, setOpen] = useState(false);
  const appointmentDates = useMemo(() => new Set(appointments.map((a) => a.date)), []);

  const dayAppointments = useMemo(() => {
    if (!date) return [];
    const iso = toISODate(date);
    return appointments.filter((a) => a.date === iso).sort((a, b) => a.time.localeCompare(b.time));
  }, [date]);

  function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setOpen(false);
    toast.success('Appointment scheduled', { description: 'The patient will receive a confirmation shortly.' });
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-bold text-foreground">Appointments</h2>
          <p className="mt-1 text-sm text-muted-foreground">{appointments.length} scheduled this week</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger
            render={
              <button className="flex items-center gap-2 rounded-xl bg-gradient-to-br from-indigo to-cyan px-4 py-2.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5" />
            }
          >
            <Plus className="h-4 w-4" /> New Appointment
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Schedule appointment</DialogTitle>
              <DialogDescription>Book a new visit for an existing patient.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreate} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <Label>Patient</Label>
                <Select defaultValue={patients[0].id}>
                  <SelectTrigger>
                    <SelectValue>{(v: string) => patients.find((p) => p.id === v)?.name ?? 'Select patient'}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {patients.map((p) => (
                      <SelectItem key={p.id} value={p.id}>
                        {p.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="apt-date">Date</Label>
                  <Input id="apt-date" type="date" defaultValue="2026-07-08" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="apt-time">Time</Label>
                  <Input id="apt-time" type="time" defaultValue="10:00" />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <Label>Mode</Label>
                <Select defaultValue="In-person">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="In-person">In-person</SelectItem>
                    <SelectItem value="Video">Video</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <DialogFooter>
                <DialogClose
                  render={<button type="button" className="rounded-xl border border-border px-4 py-2 text-sm font-semibold text-foreground" />}
                >
                  Cancel
                </DialogClose>
                <button type="submit" className="rounded-xl bg-gradient-to-br from-indigo to-cyan px-4 py-2 text-sm font-semibold text-white">
                  Schedule
                </button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 lg:grid-cols-[auto_1fr]">
        <div className="rounded-2xl border border-border bg-card p-3 shadow-sm">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            modifiers={{ hasAppointment: (d) => appointmentDates.has(toISODate(d)) }}
            modifiersClassNames={{ hasAppointment: 'font-bold text-indigo after:absolute after:bottom-1 after:h-1 after:w-1 after:rounded-full after:bg-indigo' }}
          />
        </div>

        <div className="rounded-2xl border border-border bg-card shadow-sm">
          <div className="border-b border-border px-5 py-4">
            <h3 className="text-base font-bold text-foreground">
              {date?.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </h3>
          </div>
          {dayAppointments.length === 0 ? (
            <div className="p-5">
              <EmptyState icon={CalendarX} title="No appointments" description="Nothing scheduled for this day yet." />
            </div>
          ) : (
            <div className="divide-y divide-border">
              {dayAppointments.map((a) => (
                <div key={a.id} className="flex flex-wrap items-center gap-4 px-5 py-4">
                  <div className="w-16 shrink-0 text-sm font-bold text-foreground">{a.time}</div>
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-indigo/10 text-xs font-bold text-indigo">{a.initials}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-foreground">{a.patientName}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {a.type} · {a.duration}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                    {a.mode === 'Video' ? <Video className="h-3.5 w-3.5" /> : <MapPin className="h-3.5 w-3.5" />}
                    {a.mode}
                  </div>
                  <Badge variant="outline" className={STATUS_BADGE[a.status]}>
                    {a.status}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
