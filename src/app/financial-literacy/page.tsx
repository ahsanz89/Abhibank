import type { Metadata } from "next";
import { CheckList, CtaBand, PageHero, SectionHeader } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "Financial literacy — National Financial Literacy Program",
  description: "ABHI joins hands with the State Bank of Pakistan to spread financial education across the country through the National Financial Literacy Program (NFLP).",
};

const BENEFITS: [string, string[]][] = [
  ["Reducing poverty", ["Gaining access to secure banking services enables people to accumulate savings in a secure manner.", "Access to credit helps improve the asset base.", "Vulnerability of poorer households can be reduced by minimising the impact of income shocks.", "Helps decrease the proportion of low-return assets held by households for precautionary purposes."]],
  ["Increasing economic growth", ["Facilitating transactions boosts economic activity.", "Providing secure investment opportunities for all segments of the population.", "Savings are mobilised to meet expenses during difficult times.", "Economic growth booms by attracting foreign capital, including FDI, portfolio investment, bonds and remittances."]],
  ["Promoting stability", ["Financial institutions get strengthened, which broadens markets for service providers.", "Discouraging insecure savings practices, such as personal committees.", "Allocating capital efficiently among competing uses.", "Risk management is facilitated through various services, including insurance.", "Money transfers and transactions become more efficient and quicker."]],
];

const COMMON = [
  "Access to conventional and Islamic financial institutions and products.",
  "Opening bank accounts to document and track income and expenses contributes to a regulated economy.",
  "Facilitating tax filing for tax-related benefits.",
  "Fulfilling prerequisites for obtaining loans, credit cards, immigration visas and more.",
  "Safeguarding savings through secure modes.",
  "Making appropriate use of funds with informed financial decisions.",
  "Access to a wide range of loans and investment schemes.",
  "Easy access to banking facilities through digital means like mobile banking, internet banking and ATMs.",
  "Convenience of paying utility bills, transferring money, paying government taxes and shopping at POS terminals and online.",
  "Secure locker facilities for valuable items.",
];

export default function LiteracyPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Digital banking" }, { label: "Financial literacy" }]}
        overline="National Financial Literacy Program (NFLP)"
        title={
          <>
            Knowledge is the first <span className="accent">financial service.</span>
          </>
        }
        lead="ABHI Microfinance Bank’s mission is to alleviate poverty and provide responsible financial services to enable individuals and communities. When equipped with essential knowledge, people make well-informed financial decisions — so we join hands with the State Bank of Pakistan to spread financial education across the country through the NFLP."
      />
      <section className="section">
        <div className="container split split--start">
          <div className="stack" style={{ gap: 18 }}>
            <span className="overline">What is financial inclusion?</span>
            <h2 className="h2">Access, with dignity and fairness.</h2>
          </div>
          <p className="lead">Financial inclusion refers to providing individuals and businesses with access to formal financial services that cater to their needs with dignity and fairness. These services include quality payments, savings, credit and insurance options.</p>
        </div>
      </section>
      <section className="section section--surface">
        <div className="container">
          <SectionHeader overline="Benefits of financial inclusion" title="Why it matters" />
          <div className="grid grid-3">
            {BENEFITS.map(([t, items], i) => (
              <div key={t} className="card card--pad stack" style={{ gap: 18 }}>
                <span className="feature__num" style={{ fontSize: 40 }}>
                  0{i + 1}
                </span>
                <h3 className="h4">{t}</h3>
                <CheckList items={items} />
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container split split--start">
          <div className="stack" style={{ gap: 18 }}>
            <span className="overline">For poor &amp; marginalised groups</span>
            <h2 className="h2">Common benefits</h2>
          </div>
          <CheckList items={COMMON} />
        </div>
      </section>
      <CtaBand title="Open your first account." text="The Asaan Account opens with PKR 100 and has no minimum balance." primary={{ label: "Asaan Account", href: "/deposits/asaan-account" }} secondary={{ label: "All deposits", href: "/deposits" }} />
    </>
  );
}
