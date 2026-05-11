import './globals.css';

export const metadata = {
  title: 'Mytr.AI - Redefining Diabetes Care in India',
  description: 'Affordable insulin pump technology and AI-powered metabolic health tools for diabetes care in India.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}