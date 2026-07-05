'use client';
import { useState } from 'react';
import { toast } from 'sonner';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { hotel } from '@/lib/demo/hotel-data';

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

export default function HotelSettingsPage() {
  const [notif, setNotif] = useState({ reservations: true, housekeeping: true, reviews: true, vip: true });

  function save() {
    toast.success('Settings saved', { description: 'Your preferences have been updated.' });
  }

  return (
    <div className="flex max-w-3xl flex-col gap-6">
      <div>
        <h2 className="font-display text-2xl font-bold text-foreground">Settings</h2>
        <p className="mt-1 text-sm text-muted-foreground">Manage your property and preferences.</p>
      </div>

      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">Hotel Profile</TabsTrigger>
          <TabsTrigger value="branding">Branding</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="hotel-name">Property Name</Label>
              <Input id="hotel-name" defaultValue={hotel.name} />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="hotel-location">Location</Label>
              <Input id="hotel-location" defaultValue={hotel.location} />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="manager-name">General Manager</Label>
              <Input id="manager-name" defaultValue={hotel.manager.name} />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="manager-email">Contact Email</Label>
              <Input id="manager-email" defaultValue={hotel.manager.email} />
            </div>
          </div>
          <button onClick={save} className="mt-6 rounded-xl bg-gradient-to-br from-indigo to-cyan px-5 py-2.5 text-sm font-semibold text-white">
            Save Changes
          </button>
        </TabsContent>

        <TabsContent value="branding" className="mt-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="primary-color">Primary Color</Label>
              <div className="flex items-center gap-2">
                <span className="h-9 w-9 shrink-0 rounded-lg bg-gradient-to-br from-indigo to-cyan" />
                <Input id="primary-color" defaultValue="#1D4ED8" />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="currency">Default Currency</Label>
              <Input id="currency" defaultValue="USD ($)" />
            </div>
          </div>
          <button onClick={save} className="mt-6 rounded-xl bg-gradient-to-br from-indigo to-cyan px-5 py-2.5 text-sm font-semibold text-white">
            Save Branding
          </button>
        </TabsContent>

        <TabsContent value="notifications" className="mt-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <SettingsRow label="Reservation alerts" description="Get notified when a new reservation is made or cancelled.">
            <Switch checked={notif.reservations} onCheckedChange={(v) => setNotif((s) => ({ ...s, reservations: v }))} />
          </SettingsRow>
          <Separator />
          <SettingsRow label="Housekeeping updates" description="Get notified when a room's cleaning status changes.">
            <Switch checked={notif.housekeeping} onCheckedChange={(v) => setNotif((s) => ({ ...s, housekeeping: v }))} />
          </SettingsRow>
          <Separator />
          <SettingsRow label="Guest reviews" description="Get notified when a new guest review is submitted.">
            <Switch checked={notif.reviews} onCheckedChange={(v) => setNotif((s) => ({ ...s, reviews: v }))} />
          </SettingsRow>
          <Separator />
          <SettingsRow label="VIP arrival alerts" description="Get a priority notification ahead of every VIP check-in.">
            <Switch checked={notif.vip} onCheckedChange={(v) => setNotif((s) => ({ ...s, vip: v }))} />
          </SettingsRow>
          <button onClick={save} className="mt-4 rounded-xl bg-gradient-to-br from-indigo to-cyan px-5 py-2.5 text-sm font-semibold text-white">
            Save Preferences
          </button>
        </TabsContent>
      </Tabs>
    </div>
  );
}
