import type { Metadata } from 'next';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/sonner';
import { DemoQueryProvider } from '@/lib/demo/query-provider';

export const metadata: Metadata = {
  title: 'FLEXNORA Demo Gallery | Interactive Product Showcase',
  description:
    'Explore fully interactive product demos built by FLEXNORA — real dashboards, mobile apps, and AI features across healthcare, hospitality, ecommerce, and more.',
};

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return (
    <DemoQueryProvider>
      <TooltipProvider delay={200}>
        {children}
        <Toaster position="top-right" richColors />
      </TooltipProvider>
    </DemoQueryProvider>
  );
}
