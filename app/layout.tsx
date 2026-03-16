import type {Metadata} from 'next';
import { Space_Grotesk, Inter } from 'next/font/google';
import './globals.css'; // Global styles

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ConSafeDev | Desarrollo de Software en León, Gto',
  description: 'Boutique de Ingeniería Universal en León, Gto. Automatización Inteligente para Empresas, desarrollo a medida y arquitectura de alto rendimiento.',
  keywords: ['Desarrollo de Software en León', 'Automatización Inteligente para Empresas', 'Agencia de Software B2B', 'Next.js', 'Arquitectura de Software'],
  openGraph: {
    title: 'ConSafeDev | Desarrollo de Software en León, Gto',
    description: 'Boutique de Ingeniería Universal especializada en desarrollo a medida y automatización inteligente.',
    url: 'https://consafedev.com',
    siteName: 'ConSafeDev',
    images: [
      {
        url: 'https://consafedev.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ConSafeDev - Ingeniería de Software Universal',
      },
    ],
    locale: 'es_MX',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ConSafeDev | Desarrollo de Software en León, Gto',
    description: 'Automatización Inteligente para Empresas y arquitectura de alto rendimiento.',
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "ConSafeDev",
  "image": "https://consafedev.com/logo.png",
  "description": "Boutique de Ingeniería Universal especializada en desarrollo de software a medida y automatización inteligente.",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "León",
    "addressRegion": "Guanajuato",
    "addressCountry": "MX"
  },
  "founder": {
    "@type": "Person",
    "name": "Jesús Daniel Nava Alcázar",
    "jobTitle": "CEO & Maestro Arquitecto"
  },
  "url": "https://consafedev.com",
  "telephone": "+524770000000",
  "priceRange": "$$$"
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="es" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased selection:bg-teal/30 selection:text-white" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
