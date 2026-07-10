import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const satoshi = localFont({
  src: [
    { path: './fonts/satoshi/Satoshi-Regular.woff2', weight: '400', style: 'normal' },
    { path: './fonts/satoshi/Satoshi-Medium.woff2', weight: '500', style: 'normal' },
    { path: './fonts/satoshi/Satoshi-Bold.woff2', weight: '700', style: 'normal' },
    { path: './fonts/satoshi/Satoshi-Black.woff2', weight: '900', style: 'normal' },
  ],
  variable: '--font-satoshi',
  display: 'swap',
});

const generalSans = localFont({
  src: [
    { path: './fonts/general-sans/GeneralSans-Regular.woff2', weight: '400', style: 'normal' },
    { path: './fonts/general-sans/GeneralSans-Medium.woff2', weight: '500', style: 'normal' },
    { path: './fonts/general-sans/GeneralSans-Semibold.woff2', weight: '600', style: 'normal' },
  ],
  variable: '--font-general-sans',
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
  themeColor: '#05070F',
};

const THEME_INIT_SCRIPT = `
try {
  var t = localStorage.getItem('flexnora-theme');
  if (t !== 'light') document.documentElement.classList.add('dark');
} catch (e) {}
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${satoshi.variable} ${generalSans.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="bg-bg font-sans text-text antialiased overflow-x-hidden">
        <div className="grain-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
