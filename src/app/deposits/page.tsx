import type { Metadata } from "next";
import { Check } from "lucide-react";
import { FilterGrid } from "@/components/sections/FilterGrid";
import { CtaBand, Feature, PageHero, SectionHeader, ButtonLink } from "@/components/ui/primitives";
import { deposits } from "@/lib/content";

export const metadata: Metadata = {
  title: "Deposits — savings, current & term deposit accounts",
  description: "Competitive saving products with ABHIBank App, ATM, IBFT, SMS alerts, fast account opening and personalised cheque books. Compare ABHI deposit accounts.",
};

const FACILITIES = ["ABHIBank App", "ATM facility", "IBFT facility", "SMS alerts", "Personalised cheque books", "Fast, convenient account opening"];

function highlight(slug: string) {
  const d = deposits.find((x) => x.slug === slug)!;
  return d.sections.flatMap((s) => s.items).slice(0, 2).join(" · ");
}

export default function DepositsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Personal" }, { label: "Deposits" }]}
        overline="Deposits"
        title={
          <>
            Savings that work <span className="accent">as hard as you do.</span>
          </>
        }
        lead="Competitive saving products coupled with advanced banking facilities. Our variety of product options gives you the flexibility to manage your finances and earn high profit returns."
        aside={
          <div className="card card--pad" style={{ background: "var(--navy-800)" }}>
            <span className="overline" style={{ color: "var(--text-muted)" }}>
              Every account includes
            </span>
            <ul className="grid grid-2" style={{ gap: "14px 20px", marginTop: 20 }}>
              {FACILITIES.map((f) => (
                <li key={f} className="cluster" style={{ gap: 10, flexWrap: "nowrap", fontSize: 15, fontWeight: 300 }}>
                  <Check size={16} className="accent" strokeWidth={2.4} aria-hidden="true" /> {f}
                </li>
              ))}
            </ul>
          </div>
        }
      />

      <section className="section">
        <div className="container">
          <SectionHeader overline="Accounts" title="Find your account" />
          <FilterGrid
            label="Filter accounts"
            param="type"
            filters={[
              { id: "savings", label: "Savings" },
              { id: "current", label: "Current" },
              { id: "term", label: "Term deposits" },
              { id: "women", label: "For women" },
            ]}
            items={deposits.map((d) => ({
              href: `/deposits/${d.slug}`,
              image: d.image,
              title: d.name,
              text: d.summary,
              badge: d.type,
              cats: d.categories,
            }))}
          />
        </div>
      </section>

      <section className="section section--flush-top">
        <div className="container">
          <SectionHeader
            overline="Compare"
            title="All accounts side by side"
            action={
              <ButtonLink href="/financials" variant="secondary">
                Schedule of charges &amp; rate sheets
              </ButtonLink>
            }
          />
          <div className="table-wrap">
            <table className="table" style={{ minWidth: 860 }}>
              <caption className="visually-hidden">Comparison of ABHI deposit accounts</caption>
              <thead>
                <tr>
                  <th scope="col">Account</th>
                  <th scope="col">Type</th>
                  <th scope="col">Key features</th>
                  <th scope="col">
                    <span className="visually-hidden">Details</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {deposits.map((d) => (
                  <tr key={d.slug}>
                    <td className="strong">{d.name}</td>
                    <td>{d.type}</td>
                    <td>{highlight(d.slug)}</td>
                    <td>
                      <ButtonLink href={`/deposits/${d.slug}`} variant="ghost" size="sm" arrow>
                        Details
                      </ButtonLink>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="hint" style={{ marginTop: 16 }}>
            Profit rates and charges are published in ABHI’s latest deposit rate sheet and schedule of charges.
          </p>
        </div>
      </section>

      <section className="section section--flush-top">
        <div className="container grid grid-3">
          <Feature brand num="01" title="Apply online" text="Send your details and a branch representative will call you to complete account opening." />
          <Feature brand num="02" title="Visit a branch" text="Open your account in person at any of our branches across Pakistan." />
          <Feature brand num="03" title="Use the app" text="Open a digital wallet account from your smartphone with the ABHIBank App." />
        </div>
      </section>

      <CtaBand title="Open your account today." text="Apply online or visit any ABHI branch. Our 24/7 helpline is here if you have questions." primary={{ label: "Apply online", href: "/online-application?product=deposit" }} secondary={{ label: "Find a branch", href: "/branches" }} />
    </>
  );
}
