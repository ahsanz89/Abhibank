import type { Metadata } from "next";
import Image from "next/image";
import { ClientMarquee } from "@/components/sections/shared";
import { CtaBand, PageHero, SectionHeader } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "Partners & investors",
  description: "ABHI Microfinance Bank’s technology partners, shareholders — Abhi, TPL Corp and Kashf Holdings — and the companies we serve.",
};

const PARTNERS = [
  ["UBL Omni", "/assets/partners/ubl-omni.webp"],
  ["Pathfinder Group", "/assets/partners/pathfinder.webp"],
  ["Touchpoint", "/assets/partners/touchpoint.webp"],
  ["Autosoft Dynamics Limited", "/assets/partners/autosoft.webp"],
  ["NCR", "/assets/partners/ncr.webp"],
  ["PTCL", "/assets/partners/ptcl.webp"],
  ["1LINK", "/assets/partners/1link.svg"],
];
const SHAREHOLDERS = [
  ["Abhi", "/assets/partners/abhi.webp"],
  ["TPL Corp", "/assets/partners/tpl.webp"],
  ["Kashf Holdings (Pvt) Limited", "/assets/partners/kashf.webp"],
];

export default function PartnersPage() {
  return (
    <>
      <PageHero crumbs={[{ label: "About", href: "/about-us" }, { label: "Partners & investors" }]} overline="Partners & investors" title={<>Backed by partners <span className="accent">who share our mission.</span></>} />
      <section className="section">
        <div className="container">
          <SectionHeader overline="Partners" title="Technology & payment partners" />
          <div className="grid grid-4">
            {PARTNERS.map(([n, src]) => (
              <div key={n} className="card card--pad stack" style={{ gap: 18, alignItems: "flex-start" }}>
                <span className="logo-tile" style={{ width: "100%", height: 120 }}>
                  <Image src={src} alt={`${n} logo`} width={300} height={120} style={{ maxHeight: 80, width: "auto" }} />
                </span>
                <b style={{ fontWeight: 500 }}>{n}</b>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section section--surface">
        <div className="container">
          <SectionHeader overline="Shareholders" title="Our shareholders" />
          <div className="grid grid-3">
            {SHAREHOLDERS.map(([n, src]) => (
              <div key={n} className="card card--pad stack" style={{ gap: 20, alignItems: "center", textAlign: "center" }}>
                <Image src={src} alt={`${n} logo`} width={296} height={300} style={{ width: 140, height: "auto", borderRadius: 20 }} />
                <b className="h4">{n}</b>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section" aria-labelledby="our-clients">
        <div className="container">
          <SectionHeader overline="Our clients" title={<span id="our-clients">7,000+ companies financially empowered</span>} />
        </div>
        <div className="stack" style={{ gap: 16 }}>
          <ClientMarquee />
          <ClientMarquee reverse />
        </div>
      </section>
      <CtaBand title="Invest in the next chapter." text="Read the IPO prospectus and key financial highlights." primary={{ label: "IPO details", href: "/abhi-intro" }} secondary={{ label: "Financials", href: "/financials" }} />
    </>
  );
}
