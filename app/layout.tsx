import type { Metadata, Viewport } from 'next';
import '@/styles/globals.css';
import { siteOwner } from '@/config/siteOwner';

export const metadata: Metadata = {
  title: siteOwner.branding.siteTitle,
  description: siteOwner.branding.description,
  openGraph: {
    title: siteOwner.branding.siteTitle,
    description: siteOwner.branding.description,
    siteName: siteOwner.branding.siteTitle,
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: siteOwner.branding.siteTitle,
    description: siteOwner.branding.description,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1.0,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
