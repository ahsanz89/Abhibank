import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Cookie, FileText, Shield, Smartphone } from "lucide-react";
import { PageHero } from "@/components/ui/primitives";

export const metadata: Metadata = { title: "Privacy, cookies & terms", description: "ABHI Microfinance Bank’s cookie guidelines, privacy guidelines, terms of use and digital onboarding terms & conditions." };

const DOCS = [
  { href: "/cookie-guidelines", title: "Cookie", text: "How we use cookies and tracking technologies.", icon: Cookie },
  { href: "/privacy-guidelines", title: "Privacy", text: "How we collect, use and protect personal data.", icon: Shield },
  { href: "/terms-of-use", title: "Terms of use", text: "The terms governing use of this website.", icon: FileText },
  { href: "/onboarding-terms-conditions", title: "Terms & conditions (digital onboarding)", text: "Terms for opening accounts digitally.", icon: Smartphone },
];

export default function PrivacyHub() {
  return (
    <>
      <PageHero crumbs={[{ label: "Privacy" }]} overline="Legal" title={<>Privacy, cookies <span className="accent">&amp; terms.</span></>} />
      <section className="section">
        <div className="container grid grid-4">
          {DOCS.map((d) => (
            <Link key={d.href} href={d.href} className="card card--interactive card--pad" style={{ gap: 16 }}>
              <span className="icon-tile">
                <d.icon size={20} strokeWidth={1.6} aria-hidden="true" />
              </span>
              <b style={{ fontWeight: 500, fontSize: 19 }}>{d.title}</b>
              <span className="product-card__desc">{d.text}</span>
              <span className="link-arrow">
                Read <ArrowRight size={16} aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
