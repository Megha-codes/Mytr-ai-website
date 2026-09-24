import { DM_Sans, Manrope } from 'next/font/google';
import './globals.css';

// Self-hosted at build time via next/font — no runtime fetch to Google's
// CDN, so the brand fonts render on first paint even offline / behind a
// restrictive network, instead of silently falling back to system-ui.
const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-manrope',
  display: 'swap',
});

export const metadata = {
  title: 'mytr.ai — Understand your body',
  description: 'One intelligent health interface that brings together your body, your habits, and the environment around you.',
  icons: { icon: '/assets/favicon.png' },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${manrope.variable}`}>
      <body>{children}</body>
    </html>
  );
}
