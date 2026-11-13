import Image from "next/image";
import { Phone } from "lucide-react";
import { SmartForm } from "@/components/forms/SmartForm";
import { CheckList, PageHero, ProductLinks } from "@/components/sections/ProductBits";
import type { ProductSection } from "@/lib/content";
import { SITE } from "@/lib/site";
import type { FormId } from "@/lib/forms";

export function ProductDetail({
  crumbs,
  overline,
  name,
  summary,
  intro,
  image,
  sections,
  badge,
  formId,
  formInitial,
  formTitle,
  related,
}: {
  crumbs: { label: string; href?: string }[];
  overline: string;
  name: string;
  summary: string;
  intro: string[];
  image: string;
  sections: ProductSection[];
  badge?: string | null;
  formId: FormId;
  formInitial: Record<string, string>;
  formTitle: string;
  related: { href: string; title: string; image: string; text: string }[];
}) {
  return (
    <>
      <PageHero
        crumbs={crumbs}
        overline={overline}
        title={name}
        lead={summary}
        aside={
          <div className="card" style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: 32, background: "radial-gradient(circle at 50% 40%, rgba(62,206,158,.16), transparent 70%), var(--navy-900)", aspectRatio: "4 / 3" }}>
            <Image src={image} alt="" width={320} height={320} style={{ width: "min(70%, 280px)", height: "auto" }} priority />
          </div>
        }
      >
        <div className="cluster">
          {badge && <span className="badge badge--accent">{badge}</span>}
          <a href="#apply" className="btn btn--primary">
            Apply now
          </a>
          <a href={SITE.helplineHref} className="btn btn--secondary">
            <Phone size={16} aria-hidden="true" /> {SITE.helpline}
          </a>
        </div>
      </PageHero>

      <section className="section">
        <div className="container split split--start">
          <div className="stack" style={{ gap: 40 }}>
            {intro.length > 0 && (
              <div className="prose">
                {intro.map((p) => (
                  <p key={p} className="lead" style={{ maxWidth: "none" }}>
                    {p}
                  </p>
                ))}
              </div>
            )}
            {sections.map((s) => (
              <div key={s.title} className="stack" style={{ gap: 18 }}>
                <h2 className="h3">{s.title}</h2>
                {s.text?.map((t) => (
                  <p key={t} className="body">
                    {t}
                  </p>
                ))}
                <CheckList items={s.items} />
              </div>
            ))}
          </div>
          <div id="apply" className="card card--pad card--solid" style={{ position: "sticky", top: "calc(var(--header-h) + 16px)", scrollMarginTop: "calc(var(--header-h) + 16px)" }}>
            <div className="stack" style={{ gap: 8, marginBottom: 26 }}>
              <span className="overline">Online application</span>
              <h2 className="h3">{formTitle}</h2>
              <p className="muted small" style={{ fontWeight: 300 }}>
                Share a few details and our team will call you back.
              </p>
            </div>
            <SmartForm formId={formId} initial={formInitial} submitLabel="Submit application" footnote="By submitting, you agree to be contacted by ABHI Microfinance Bank about this application." />
          </div>
        </div>
      </section>

      <ProductLinks title="You may also like" items={related} />
    </>
  );
}
