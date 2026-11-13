import type { Metadata } from "next";
import { IbanCalculator } from "@/components/forms/IbanCalculator";
import { Accordion } from "@/components/ui/interactive";
import { PageHero } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "IBAN calculator",
  description: "Generate the International Bank Account Number (IBAN) for your ABHI branch or wallet account.",
};

export default function IbanPage() {
  return (
    <>
      <PageHero crumbs={[{ label: "Digital banking" }, { label: "IBAN calculator" }]} overline="IBAN calculator" title={<>Your IBAN, <span className="accent">in seconds.</span></>} lead="Generate the 24-character International Bank Account Number for your ABHI branch or wallet account — it’s calculated in your browser and never sent anywhere." />
      <section className="section">
        <div className="container split split--start">
          <div className="card card--pad card--solid">
            <IbanCalculator />
          </div>
          <Accordion
            items={[
              { q: "What is an IBAN?", a: "An International Bank Account Number identifies your account for domestic (IBFT/Raast) and international transfers. Pakistani IBANs are 24 characters: PK, two check digits, the bank code (ABHI) and your 16-digit account number." },
              { q: "Which number should I enter?", a: "For a branch account, enter your 16-digit account number. For an ABHI wallet account, enter your wallet (mobile) number starting with 03 (11 digits), 92 (12 digits) or 0092 (14 digits)." },
              { q: "Where else can I find my IBAN?", a: "Your IBAN is also printed on your account statement and cheque book, and is available in the ABHIBank App or by calling (042) 111-111-562." },
            ]}
          />
        </div>
      </section>
    </>
  );
}
