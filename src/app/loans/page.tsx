import type { Metadata } from "next";
import { Play } from "lucide-react";
import { FilterGrid } from "@/components/sections/FilterGrid";
import { ButtonLink, CtaBand, Feature, PageHero, SectionHeader } from "@/components/ui/primitives";
import { loans } from "@/lib/content";

export const metadata: Metadata = {
  title: "Loans — business, farming, gold, home & vehicle finance",
  description: "Multiple loan products with the best interest rates, easy repayment options, seamless processing and quick turnaround — from Karobari Karza to Sunheri Karza gold loans.",
};

export default function LoansPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Personal" }, { label: "Loans" }]}
        overline="Loans"
        title={
          <>
            Finance for the way <span className="accent">Pakistan works.</span>
          </>
        }
        lead="Achieve your dreams with multiple loan products coupled with the best interest rates, easy repayment options, seamless loan processing and quick turnaround time — designed for individuals running micro, small and medium-sized enterprises."
      >
        <div className="cluster">
          <ButtonLink href="/online-application?product=loan" arrow>
            Apply for a loan
          </ButtonLink>
          <ButtonLink href="/financials" variant="secondary">
            Pricing &amp; rate sheets
          </ButtonLink>
        </div>
      </PageHero>

      <section className="section">
        <div className="container">
          <SectionHeader overline="Products" title="What do you need finance for?" />
          <FilterGrid
            label="Filter loans by need"
            param="need"
            columns={3}
            filters={[
              { id: "farming", label: "Farming & livestock" },
              { id: "business", label: "My business" },
              { id: "women", label: "Women entrepreneurs" },
              { id: "vehicles", label: "Home & vehicles" },
              { id: "gold", label: "Gold-backed" },
            ]}
            items={loans.map((l) => ({ href: `/loans/${l.slug}`, image: l.image, title: l.name, text: l.summary, badge: l.amountRange ?? undefined, cats: l.categories }))}
          />
        </div>
      </section>

      <section className="section section--flush-top">
        <div className="container">
          <div className="card" style={{ borderRadius: "var(--radius-xl)", overflow: "hidden", background: "linear-gradient(120deg, var(--navy-900), var(--navy-800))" }}>
            <div className="split" style={{ gap: 0 }}>
              <div className="stack" style={{ gap: 24, padding: "clamp(32px, 5vw, 72px)" }}>
                <span className="overline">Sunheri Karza · Gold-backed finance</span>
                <h2 className="h2">
                  Your gold, <span className="accent">working for your business.</span>
                </h2>
                <p className="lead">Convert your gold jewellery into working capital — from PKR 40,000 to PKR 2,000,000. Top up or roll over your loan in the ABHIBank App.</p>
                <div className="cluster">
                  <ButtonLink href="/loans/sunheri-karza" arrow>
                    Sunheri Karza
                  </ButtonLink>
                  <ButtonLink href="/tutorials" variant="secondary">
                    <Play size={16} aria-hidden="true" /> Gold Top-Up walkthrough
                  </ButtonLink>
                </div>
              </div>
              <div className="hide-mobile" style={{ position: "relative", minHeight: 420, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 50% 50%, rgba(242,178,58,.22), transparent 60%)" }} />
                <span className="coin coin--gold float" style={{ left: "42%", top: "22%", width: 128, height: 128, fontSize: 34 }} aria-hidden="true">
                  Rs
                </span>
                <span className="coin coin--gold float-tilt" style={{ left: "20%", top: "56%", width: 78, height: 78, fontSize: 22 }} aria-hidden="true">
                  Rs
                </span>
                <span className="coin coin--gold float" style={{ left: "66%", top: "60%", width: 58, height: 58, fontSize: 16, animationDelay: "1.2s" }} aria-hidden="true">
                  Rs
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--flush-top">
        <div className="container">
          <SectionHeader overline="Why ABHI" title="Lending made simple" />
          <div className="grid grid-4">
            <Feature brand title="Competitive rates" text="Multiple loan products coupled with the best interest rates." />
            <Feature brand title="Easy repayment" text="Repayment options, including equal monthly instalments, that fit your cash flow." />
            <Feature brand title="Seamless processing" text="Convenient, easy-to-understand paperwork." />
            <Feature brand title="Quick turnaround" text="Fast decisions, so you get the finance when you need it." />
          </div>
        </div>
      </section>

      <CtaBand title="Ready to grow?" text="Start your loan application online or talk to us at any ABHI branch." primary={{ label: "Apply for a loan", href: "/online-application?product=loan" }} secondary={{ label: "Find a branch", href: "/branches" }} />
    </>
  );
}
