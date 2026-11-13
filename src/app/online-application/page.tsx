import type { Metadata } from "next";
import { Lock, Phone } from "lucide-react";
import { ApplicationHub } from "@/components/forms/ApplicationHub";
import { PageHero } from "@/components/ui/primitives";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Online application — become our customer",
  description: "Open a digital wallet account, apply for a loan or apply for a deposit account with ABHI Microfinance Bank online.",
};

export default function OnlineApplicationPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Online application" }]}
        overline="Become our customer"
        title={
          <>
            Become an ABHI customer <span className="accent">in minutes.</span>
          </>
        }
        lead="Choose what you’d like to open. We’ll take a few details and our team will call you to complete the process."
      >
        <div className="cluster" style={{ gap: 24, fontSize: 14, color: "var(--text-secondary)", fontWeight: 300 }}>
          <span className="cluster" style={{ gap: 8 }}>
            <Lock size={16} className="accent" aria-hidden="true" /> Encrypted and confidential
          </span>
          <a href={SITE.helplineHref} className="cluster" style={{ gap: 8, color: "var(--text-secondary)" }}>
            <Phone size={16} className="accent" aria-hidden="true" /> Need help? {SITE.helpline}
          </a>
        </div>
      </PageHero>
      <section className="section section--tight">
        <div className="container">
          <ApplicationHub />
        </div>
      </section>
    </>
  );
}
