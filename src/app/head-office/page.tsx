import type { Metadata } from "next";
import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/ui/primitives";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Head office",
  description: "ABHI Microfinance Bank head office: Plot #12, S. A. House, D-12 Markaz, Islamabad. Tel (042) 111-111-562.",
};

export default function HeadOfficePage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Help" }, { label: "Head office" }]}
        overline="Head office"
        title={
          <>
            Visit us in <span className="accent">Islamabad.</span>
          </>
        }
        aside={<Image src="/assets/brand/head-office.webp" alt="ABHI Microfinance Bank head office building" width={768} height={528} priority style={{ width: "100%", height: "auto" }} />}
      />
      <section className="section">
        <div className="container split split--start">
          <div className="stack" style={{ gap: 16 }}>
            <h2 className="h3">Details</h2>
            {[
              [MapPin, SITE.address, `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("ABHI Microfinance Bank Limited Islamabad")}`],
              [Phone, `Tel: ${SITE.helpline}`, SITE.helplineHref],
              [Mail, SITE.email, `mailto:${SITE.email}`],
            ].map(([I, t, h]) => {
              const Ico = I as typeof Phone;
              return (
                <a key={t as string} href={h as string} className="card card--interactive locator__item" target={(h as string).startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
                  <span className="icon-tile">
                    <Ico size={19} aria-hidden="true" />
                  </span>
                  <span style={{ fontSize: 17, alignSelf: "center" }}>{t as string}</span>
                </a>
              );
            })}
          </div>
          <div className="locator__map" style={{ position: "relative", top: 0, height: 460 }}>
            <iframe src={SITE.mapsEmbed} title="Map: ABHI Microfinance Bank head office, Islamabad" loading="lazy" />
          </div>
        </div>
      </section>
    </>
  );
}
