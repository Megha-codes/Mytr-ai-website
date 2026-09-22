import { DM_Sans, Manrope } from 'next/font/google';
import './globals.css';

// Self-hosted at build time via next/font — no runtime fetch to Google's
// CDN, so the brand fonts render on first paint even offline / behind a
// restrictive network, instead of silently falling back to system-ui.
const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-manrope',
  display: 'swap',
});

export const metadata = {
  title: 'Mytr.AI — Diabetes Technology, Made for India',
  description: 'An always-on desk display and an AI-powered health app, sharing one account. Affordable, accessible diabetes technology built for India.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${manrope.variable}`}>
      <body>{children}</body>
    </html>
  );
}
