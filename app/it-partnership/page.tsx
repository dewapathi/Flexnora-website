import type { Metadata } from 'next';
import { BackToMap } from '@/app/world/_components/BackToMap';
import ItPartnership from '@/components/ItPartnership';

export const metadata: Metadata = {
  title: 'IT Partnership | FLEXNORA Digital',
  description: 'Become an outsourced technology department, fully managed.',
};

export default function ItPartnershipPage() {
  return (
    <main>
      <BackToMap />
      <ItPartnership />
    </main>
  );
}
