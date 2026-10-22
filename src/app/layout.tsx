import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';
const manrope = localFont({
  src: '../../public/fonts/Manrope-Variable.ttf',
  variable: '--font-manrope',
  display: 'swap',
});
const instrument = localFont({
  src: '../../public/fonts/InstrumentSerif-Italic.ttf',
  variable: '--font-editorial',
  weight: '400',
  style: 'italic',
  display: 'swap',
});
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  ),
  title: 'YATSAR — Diseño web con intención',
  description:
    'Diseñamos y desarrollamos páginas web, tiendas online y soluciones digitales a la altura de tu negocio. Conocé YATSAR.',
  openGraph: {
    title: 'YATSAR — Tu negocio merece una web a su altura.',
    description: 'Diseño, desarrollo y soluciones digitales con intención.',
    locale: 'es_AR',
    type: 'website',
    images: ['/opengraph-image'],
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
};
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#080B12',
  colorScheme: 'dark',
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${manrope.variable} ${instrument.variable}`}>
      <body>{children}</body>
    </html>
  );
}
