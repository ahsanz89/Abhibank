import type { Metadata } from "next";
import { Mail, MapPin, Megaphone, Phone } from "lucide-react";
import { PageHero, SectionHeader } from "@/components/ui/primitives";
import { SITE } from "@/lib/site";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact us",
  description: "Helpline (042) 111-111-562 (24/7), info@abhibank.com, Plot #12, S. A. House, D-12 Markaz, Islamabad.",
};

export default function ContactPage() {
  const cards = [
    { icon: Phone, label: "Helpline (24/7)", value: SITE.helpline, href: SITE.helplineHref },
    { icon: Mail, label: "Email", value: SITE.email, href: `mailto:${SITE.email}` },
    { icon: MapPin, label: "Head office", value: SITE.address, href: "/head-office" },
    { icon: Megaphone, label: "Whistle-blowing", value: "Report misconduct confidentially", href: "/whistle-blowing" },
  ];
  return (
    <>
      <PageHero crumbs={[{ label: "Help" }, { label: "Contact us" }]} overline="Contact us" title={<>We’re here. <span className="accent">24/7.</span></>} lead="Call, write or visit — whichever suits you." />
      <section className="section">
        <div className="container">
          <SectionHeader title="You can contact us at" />
          <div className="grid grid-4">
            {cards.map((c) => {
              const inner = (
                <>
                  <span className="icon-tile">
                    <c.icon size={19} aria-hidden="true" />
                  </span>
                  <span className="hint">{c.label}</span>
                  <b style={{ fontWeight: 500, lineHeight: 1.45 }}>{c.value}</b>
                </>
              );
              return c.href.startsWith("/") ? (
                <Link key={c.label} href={c.href} className="card card--interactive card--pad" style={{ gap: 14 }}>
                  {inner}
                </Link>
              ) : (
                <a key={c.label} href={c.href} className="card card--interactive card--pad" style={{ gap: 14 }}>
                  {inner}
                </a>
              );
            })}
          </div>
          <div className="grid grid-3" style={{ marginTop: 24 }}>
            {[
              ["Lodge a complaint", "/complaint-and-suggestion"],
              ["Find a branch", "/branches"],
              ["EWA enquiries", "/contact-us-ewa"],
            ].map(([t, h]) => (
              <Link key={h} href={h} className="btn btn--secondary btn--lg btn--block">
                {t}
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="section section--flush-top">
        <div className="container">
          <div className="locator__map" style={{ position: "relative", top: 0, height: 420 }}>
            <iframe src={SITE.mapsEmbed} title="Map: ABHI Microfinance Bank head office, Islamabad" loading="lazy" />
          </div>
        </div>
      </section>
    </>
  );
}
