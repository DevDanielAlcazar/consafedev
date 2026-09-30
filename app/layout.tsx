import type { Metadata, Viewport } from "next";
import { Instrument_Sans, Inter, JetBrains_Mono } from "next/font/google";
import { siteConfig } from "@/lib/consafedev/site-config";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const title = "ConSafeDev | Software a medida para operaciones reales";
const description =
  "Diseñamos software a medida que conecta procesos, automatiza operaciones y convierte problemas reales de negocio en sistemas que funcionan.";
const socialAlt = "ConSafeDev — Lo complejo puede funcionar simple.";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  applicationName: "ConSafeDev",
  title,
  description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title,
    description,
    url: siteConfig.siteUrl,
    siteName: "ConSafeDev",
    locale: "es_MX",
    type: "website",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: socialAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/twitter-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#08111b",
  colorScheme: "dark light",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "ConSafeDev",
  description,
  url: siteConfig.siteUrl,
  logo: `${siteConfig.siteUrl}/icon.png`,
  telephone: "+52 477 569 4198",
  areaServed: {
    "@type": "Country",
    name: "México",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    telephone: "+52 477 569 4198",
    availableLanguage: ["es"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-MX" className={`${instrumentSans.variable} ${inter.variable} ${jetBrainsMono.variable}`}>
      <head>
        <link
          rel="preload"
          as="image"
          href="/media/consafedev-operation-start-rc1.webp"
          type="image/webp"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className="font-sans antialiased selection:bg-teal/30 selection:text-white"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
