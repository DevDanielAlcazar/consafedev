import type {Metadata} from 'next';
import { Instrument_Sans, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-instrument',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://consafedev.qzz.io'),
  title: 'ConSafeDev | Software a medida',
  description: 'Software a medida que conecta procesos, automatiza operaciones y convierte problemas reales de negocio en sistemas que funcionan.',
  openGraph: {
    title: 'ConSafeDev | Software a medida',
    description: 'Software a medida que conecta procesos, automatiza operaciones y convierte problemas reales de negocio en sistemas que funcionan.',
    url: 'https://consafedev.qzz.io',
    siteName: 'ConSafeDev',
    locale: 'es_MX',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'ConSafeDev | Software a medida',
    description: 'Software a medida para operaciones reales.',
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "ConSafeDev",
  "description": "Software a medida que conecta procesos, automatiza operaciones y convierte problemas reales de negocio en sistemas que funcionan.",
  "url": "https://consafedev.qzz.io"
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="es" className={`${instrumentSans.variable} ${inter.variable} ${jetBrainsMono.variable}`}>
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
