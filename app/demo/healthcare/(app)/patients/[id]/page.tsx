import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Phone, Mail, MapPin, ShieldCheck, Video, CalendarPlus, TrendingUp, TrendingDown, Minus, FileText, Pill } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { EmptyState } from '@/components/demo/EmptyState';
import { getPatientById, patients, type Patient } from '@/lib/demo/healthcare-data';

export function generateStaticParams() {
  return patients.map((p) => ({ id: p.id }));
}

const STATUS_BADGE: Record<Patient['status'], string> = {
  Stable: 'bg-green/10 text-green border-green/20',
  Critical: 'bg-red-500/10 text-red-500 border-red-500/20',
  Recovering: 'bg-cyan/10 text-cyan border-cyan/20',
  Scheduled: 'bg-amber/10 text-amber border-amber/20',
};

const TREND_ICON = { up: TrendingUp, down: TrendingDown, flat: Minus };

export default function PatientDetailPage({ params }: { params: { id: string } }) {
  const patient = getPatientById(params.id);
  if (!patient) notFound();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col justify-between gap-6 rounded-2xl border border-border bg-card p-6 shadow-sm lg:flex-row lg:items-center">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarFallback className="bg-indigo/10 text-lg font-bold text-indigo">{patient.initials}</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <h2 className="font-display text-xl font-bold text-foreground">{patient.name}</h2>
              <Badge variant="outline" className={STATUS_BADGE[patient.status]}>
                {patient.status}
              </Badge>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              {patient.age} yrs · {patient.gender} · {patient.condition}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2.5">
          <Link
            href="/demo/healthcare/consultation"
            className="flex items-center gap-2 rounded-xl border border-border bg-muted px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted/70"
          >
            <Video className="h-4 w-4" /> Start Video Call
          </Link>
          <Link
            href="/demo/healthcare/appointments"
            className="flex items-center gap-2 rounded-xl bg-gradient-to-br from-indigo to-cyan px-4 py-2.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5"
          >
            <CalendarPlus className="h-4 w-4" /> Book Appointment
          </Link>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: Phone, label: 'Phone', value: patient.phone },
          { icon: Mail, label: 'Email', value: patient.email },
          { icon: MapPin, label: 'Address', value: patient.address },
          { icon: ShieldCheck, label: 'Insurance', value: patient.insurance },
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
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-5">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {patient.vitals.map((v) => {
              const TrendIcon = TREND_ICON[v.trend];
              return (
                <div key={v.label} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                  <p className="text-xs font-medium text-muted-foreground">{v.label}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <p className={`text-lg font-bold ${v.normal ? 'text-foreground' : 'text-red-500'}`}>{v.value}</p>
                    <TrendIcon className={`h-4 w-4 ${v.normal ? 'text-muted-foreground' : 'text-red-500'}`} />
                  </div>
                </div>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="history" className="mt-5">
          <div className="flex flex-col gap-4">
            {patient.history.map((h, i) => (
              <div key={i} className="flex gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm">
                <div className="w-24 shrink-0 text-xs font-semibold text-muted-foreground">{h.date}</div>
                <div>
                  <p className="text-sm font-bold text-foreground">{h.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{h.description}</p>
                  <p className="mt-2 text-xs font-medium text-indigo">{h.doctor}</p>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="prescriptions" className="mt-5">
          {patient.prescriptions.length === 0 ? (
            <EmptyState icon={Pill} title="No prescriptions" description="This patient has no recorded prescriptions yet." />
          ) : (
            <div className="flex flex-col gap-3">
              {patient.prescriptions.map((rx, i) => (
                <div key={i} className="flex items-center justify-between rounded-2xl border border-border bg-card p-5 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet/10 text-violet">
                      <Pill className="h-[1.1rem] w-[1.1rem]" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground">
                        {rx.name} <span className="font-normal text-muted-foreground">— {rx.dosage}</span>
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {rx.frequency} · Prescribed {rx.prescribedOn}
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline" className={rx.status === 'Active' ? 'bg-green/10 text-green border-green/20' : ''}>
                    {rx.status}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="documents" className="mt-5">
          {patient.documents.length === 0 ? (
            <EmptyState icon={FileText} title="No documents" description="Lab reports, imaging, and scans will appear here once uploaded." />
          ) : (
            <div className="flex flex-col gap-3">
              {patient.documents.map((doc, i) => (
                <div key={i} className="flex items-center justify-between rounded-2xl border border-border bg-card p-5 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan/10 text-cyan">
                      <FileText className="h-[1.1rem] w-[1.1rem]" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground">{doc.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {doc.type} · {doc.date} · {doc.size}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
