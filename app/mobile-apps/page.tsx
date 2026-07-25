import type { Metadata } from 'next';
import { BackToMap } from '@/app/world/_components/BackToMap';
import MobileShowcase from '@/components/MobileShowcase';

export const metadata: Metadata = {
  title: 'Mobile Apps | FLEXNORA Digital',
  description: 'Mobile app development across food delivery, healthcare, and finance.',
};

export default function MobileAppsPage() {
  return (
    <main>
      <BackToMap />
      <MobileShowcase />
    </main>
  );
}
