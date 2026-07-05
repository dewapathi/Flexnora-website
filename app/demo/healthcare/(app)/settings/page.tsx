'use client';
import { useState } from 'react';
import { toast } from 'sonner';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { doctor } from '@/lib/demo/healthcare-data';

function SettingsRow({ label, description, children }: { label: string; description: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-6 py-4">
      <div>
        <p className="text-sm font-semibold text-foreground">{label}</p>
        <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>
      </div>
      {children}
    </div>
  );
}

export default function SettingsPage() {
  const [notif, setNotif] = useState({ email: true, sms: false, appointments: true, ai: true });

  function save() {
    toast.success('Settings saved', { description: 'Your preferences have been updated.' });
  }

  return (
    <div className="flex max-w-3xl flex-col gap-6">
      <div>
        <h2 className="font-display text-2xl font-bold text-foreground">Settings</h2>
        <p className="mt-1 text-sm text-muted-foreground">Manage your account and preferences.</p>
      </div>

      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" defaultValue={doctor.name} />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="role">Role</Label>
              <Input id="role" defaultValue={doctor.role} />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email-set">Email</Label>
              <Input id="email-set" defaultValue={doctor.email} />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="license">License Number</Label>
              <Input id="license" defaultValue={doctor.license} />
            </div>
          </div>
          <button onClick={save} className="mt-6 rounded-xl bg-gradient-to-br from-indigo to-cyan px-5 py-2.5 text-sm font-semibold text-white">
            Save Changes
          </button>
        </TabsContent>

        <TabsContent value="notifications" className="mt-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <SettingsRow label="Email notifications" description="Receive appointment and report updates via email.">
            <Switch checked={notif.email} onCheckedChange={(v) => setNotif((s) => ({ ...s, email: v }))} />
          </SettingsRow>
          <Separator />
          <SettingsRow label="SMS alerts" description="Get a text message for urgent patient updates.">
            <Switch checked={notif.sms} onCheckedChange={(v) => setNotif((s) => ({ ...s, sms: v }))} />
          </SettingsRow>
          <Separator />
          <SettingsRow label="Appointment reminders" description="Reminders 30 minutes before each appointment.">
            <Switch checked={notif.appointments} onCheckedChange={(v) => setNotif((s) => ({ ...s, appointments: v }))} />
          </SettingsRow>
          <Separator />
          <SettingsRow label="AI assistant suggestions" description="Proactive suggestions from your AI assistant.">
            <Switch checked={notif.ai} onCheckedChange={(v) => setNotif((s) => ({ ...s, ai: v }))} />
          </SettingsRow>
          <button onClick={save} className="mt-4 rounded-xl bg-gradient-to-br from-indigo to-cyan px-5 py-2.5 text-sm font-semibold text-white">
            Save Preferences
          </button>
        </TabsContent>

        <TabsContent value="security" className="mt-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="current-pw">Current Password</Label>
              <Input id="current-pw" type="password" defaultValue="••••••••••" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="new-pw">New Password</Label>
              <Input id="new-pw" type="password" placeholder="Enter a new password" />
            </div>
          </div>
          <Separator className="my-5" />
          <SettingsRow label="Two-factor authentication" description="Add an extra layer of security to your account.">
            <Switch defaultChecked />
          </SettingsRow>
          <button onClick={save} className="mt-4 rounded-xl bg-gradient-to-br from-indigo to-cyan px-5 py-2.5 text-sm font-semibold text-white">
            Update Security
          </button>
        </TabsContent>
      </Tabs>
    </div>
  );
}
