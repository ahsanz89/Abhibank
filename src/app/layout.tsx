import type { Metadata, Viewport } from "next";
import "@fontsource-variable/bricolage-grotesque/opsz.css";
import "@fontsource/poppins/latin-300.css";
import "@fontsource/poppins/latin-400.css";
import "@fontsource/poppins/latin-500.css";
import "@fontsource/poppins/latin-600.css";
import "@/styles/tokens.css";
import "@/styles/base.css";
import "@/styles/components.css";
import "@/styles/sections.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BackToTop } from "@/components/ui/interactive";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: "ABHI Microfinance Bank — Banking for everyone. Right now.", template: "%s | ABHI Microfinance Bank" },
  description: SITE.description,
  applicationName: SITE.name,
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: "en_PK",
    images: [{ url: "/assets/banners/financial-freedom.webp", width: 1600, height: 531, alt: "ABHI Microfinance Bank — Financial freedom for all" }],
  },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/assets/brand/icon-mark.png", apple: "/assets/brand/icon-mark.png" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#0A192F",
  colorScheme: "dark",
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "BankOrCreditUnion",
  name: SITE.name,
  url: SITE.url,
  logo: `${SITE.url}/assets/brand/logo-white.webp`,
  telephone: "+92-42-111-111-562",
  email: SITE.email,
  address: { "@type": "PostalAddress", streetAddress: "Plot #12, S. A. House, D-12 Markaz", addressLocality: "Islamabad", addressCountry: "PK" },
  sameAs: Object.values(SITE.social),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Enables scroll-reveal styles only when JavaScript runs, so content is never hidden without it. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}
