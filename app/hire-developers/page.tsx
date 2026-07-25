import type { Metadata } from 'next';
import { BackToMap } from '@/app/world/_components/BackToMap';
import HireDevelopers from '@/components/HireDevelopers';

export const metadata: Metadata = {
  title: 'Hire Developers | FLEXNORA Digital',
  description: 'Dedicated frontend, backend, full stack, and mobile developers.',
};

export default function HireDevelopersPage() {
  return (
    <main>
      <BackToMap />
      <HireDevelopers />
    </main>
  );
}
