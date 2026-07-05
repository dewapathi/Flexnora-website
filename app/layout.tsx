import type { Metadata, Viewport } from 'next';
import { Syne, Inter } from 'next/font/google';
import './globals.css';

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://flexnora.com'),
  title: 'FLEXNORA Digital | World-Class Digital Solutions',
  description:
    'FLEXNORA Digital — We build world-class web apps, mobile experiences, and brand systems for founders who refuse to settle for ordinary.',
  keywords:
    'web development, mobile apps, branding, UI UX, digital agency, Sri Lanka, React, Flutter, Next.js',
  authors: [{ name: 'FLEXNORA Digital' }],
  openGraph: {
    title: 'FLEXNORA Digital | World-Class Digital Solutions',
    description:
      'We build products that make people stop and say — these people build world-class software.',
    type: 'website',
    images: ['/images/logo1.png'],
  },
  twitter: { card: 'summary_large_image' },
  icons: { icon: '/images/logo1.png' },
};

export const viewport: Viewport = {
  themeColor: '#050816',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${syne.variable} ${inter.variable}`}>
      <body className="bg-bg font-sans text-text antialiased overflow-x-hidden">{children}</body>
    </html>
  );
}
