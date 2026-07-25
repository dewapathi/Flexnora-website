import type { Metadata } from 'next';
import { BackToMap } from '@/app/world/_components/BackToMap';
import Testimonials from '@/components/Testimonials';
import Stats from '@/components/Stats';

export const metadata: Metadata = {
  title: 'Testimonials | FLEXNORA Digital',
  description: 'Client stories, ratings, and delivery stats.',
};

export default function TestimonialsPage() {
  return (
    <main>
      <BackToMap />
      <Testimonials />
      <Stats />
    </main>
  );
}
