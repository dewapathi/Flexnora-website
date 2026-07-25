import type { Metadata } from 'next';
import { BackToMap } from '@/app/world/_components/BackToMap';
import Comparison from '@/components/Comparison';

export const metadata: Metadata = {
  title: 'Comparison | FLEXNORA Digital',
  description: 'Hiring in-house vs. partnering with FLEXNORA, side by side.',
};

export default function ComparisonPage() {
  return (
    <main>
      <BackToMap />
      <Comparison />
    </main>
  );
}
