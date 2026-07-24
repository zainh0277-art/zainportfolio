import type { Metadata } from 'next';
import './globals.css';
import { personalInfo } from '@/data/personal';

export const metadata: Metadata = {
  title: `${personalInfo.name} — Full Stack Data Analyst`,
  description: personalInfo.bio,
  keywords: ['SQL', 'Python', 'Power BI', 'Data Analyst', 'Data Analytics', 'Portfolio'],
  openGraph: {
    title: `${personalInfo.name} — Full Stack Data Analyst`,
    description: personalInfo.bio,
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
