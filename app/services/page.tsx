import type { Metadata } from 'next';
import { BackToMap } from '@/app/world/_components/BackToMap';
import Services from '@/components/Services';

export const metadata: Metadata = {
  title: 'Services | FLEXNORA Digital',
  description: 'Full-service software, web, and mobile development coverage.',
};

export default function ServicesPage() {
  return (
    <main>
      <BackToMap />
      <Services />
    </main>
  );
}
