import type { Metadata } from "next";
import { DocumentCentre } from "@/components/tools/DocumentCentre";
import { PageHero } from "@/components/ui/primitives";
import { documents } from "@/lib/content";

export const metadata: Metadata = {
  title: "Financials & public documents",
  description: "Financial reports, the IPO prospectus, schedules of charges, deposit rate sheets, pricing, policies, tenders and notices from ABHI Microfinance Bank.",
};

export default function FinancialsPage() {
  const sorted = [...documents].sort((a, b) => (b.year ?? 0) - (a.year ?? 0));
  return (
    <>
      <PageHero
        crumbs={[{ label: "About", href: "/about-us" }, { label: "Financials" }]}
        overline="Public documents"
        title={
          <>
            Financials &amp; <span className="accent">public documents.</span>
          </>
        }
        lead="Schedules of charges, financial reports, the IPO prospectus, rate sheets, disclosures and tenders — searchable by category, year and language."
      />
      <section className="section section--tight">
        <div className="container">
          <DocumentCentre docs={sorted} />
        </div>
      </section>
    </>
  );
}
