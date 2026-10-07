import type { Metadata } from 'next';
import './globals.css';
import { personalInfo } from '@/data/personal';
import { siteUrl, siteDescription } from '@/lib/site';

const title = 'Zain Hassan | Data Analyst — SQL & Power BI';
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl), title, description: siteDescription,
  alternates: { canonical: '/' },
  verification: { google: 'U0BFkYiNYrbn4TUABVqfP0Fej1cthlgtL4IbyOpaYRI' },
  authors: [{ name: personalInfo.name }],
  robots: { index: true, follow: true },
  openGraph: { title, description: siteDescription, url: siteUrl, siteName: 'Zain Hassan', type: 'website', locale: 'en_US', images: [{ url: '/social-preview.png', width: 1200, height: 630, alt: 'Zain Hassan — SQL, Power BI and business data analytics' }] },
  twitter: { card: 'summary_large_image', title, description: siteDescription, images: ['/social-preview.png'] },
};
const schema = {
  '@context': 'https://schema.org', '@type': 'ProfilePage', url: siteUrl,
  mainEntity: {
    '@type': 'Person', '@id': `${siteUrl}/#zain-hassan`, name: personalInfo.name,
    url: siteUrl, description: siteDescription, image: `${siteUrl}/avatar.jpeg`,
    sameAs: personalInfo.socialLinks.filter(link => ['GitHub', 'LinkedIn'].includes(link.platform)).map(link => link.url),
    knowsAbout: ['SQL', 'Power BI', 'Excel', 'C#', 'Relational Database Design'],
    homeLocation: { '@type': 'Place', name: 'Lahore, Pakistan' },
  },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body className="antialiased">
    <a href="#main-content" className="skip-link">Skip to content</a>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
    {children}
  </body></html>;
}
