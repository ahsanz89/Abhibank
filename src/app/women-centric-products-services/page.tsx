import type { Metadata } from "next";
import { ProductCard } from "@/components/sections/shared";
import { CtaBand, PageHero, SectionHeader } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "Women-centric products & services",
  description: "Niswan Karza for female entrepreneurs and the Niswan Rozana Munafa daily savings account designed exclusively for women.",
};

export default function WomenCentricPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Personal" }, { label: "Women-centric products & services" }]}
        overline="Female-centric products"
        title={
          <>
            Built for the women <span className="accent">building Pakistan.</span>
          </>
        }
        lead="Savings and finance designed around the needs of female customers and entrepreneurs."
      />
      <section className="section">
        <div className="container">
          <SectionHeader title="Products for women" />
          <div className="grid grid-2">
            <ProductCard href="/loans/niswan-karza" image="/assets/products/niswan-karza.webp" title="Niswan Karza" text="A short to medium-term loan facility for female entrepreneurs, with tenures of 6, 12, 15 and 18 months and equal monthly instalments." badge="Loan" cta="View details" />
            <ProductCard href="/deposits/niswan-rozana-munafa" image="/assets/products/niswan-rozana-munafa.webp" title="Niswan Rozana Munafa" text="A daily savings account designed exclusively for women, offering all the benefits of Rozana Munafa with a free ATM card, cheque book and locker facility." badge="Savings" cta="View details" />
          </div>
        </div>
      </section>
      <CtaBand title="Start today." text="Apply online or visit an accessible model branch near you." primary={{ label: "Apply online", href: "/online-application" }} secondary={{ label: "Find a branch", href: "/branches" }} />
    </>
  );
}
