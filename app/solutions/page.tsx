import type { Metadata } from 'next';
import { BackToMap } from '@/app/world/_components/BackToMap';
import SolutionGallery from '@/components/SolutionGallery';

export const metadata: Metadata = {
  title: 'Solution Gallery | FLEXNORA Digital',
  description: "Real, interactive product demos across industries — don't take our word for it.",
};

export default function SolutionsPage() {
  return (
    <main>
      <BackToMap />
      <SolutionGallery />
    </main>
  );
}
