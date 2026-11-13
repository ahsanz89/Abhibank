import type { Metadata } from "next";
import { Locator } from "@/components/tools/Locator";
import { PageHero } from "@/components/ui/primitives";
import { atms, regions } from "@/lib/content";

export const metadata: Metadata = {
  title: "ATM network",
  description: `Find one of ABHI Microfinance Bank’s ${atms.length} ATMs by city, area or ATM ID. ABHI ATM cards work across the 1LINK network.`,
};

export default function AtmPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Help" }, { label: "ATM network" }]}
        overline="ATM network"
        title={
          <>
            Cash, <span className="accent">close by.</span>
          </>
        }
        lead={`${atms.length} ABHI ATMs across Pakistan. ABHI ATM cards also work across the 1LINK network.`}
      />
      <section className="section section--tight">
        <div className="container">
          <Locator regions={regions} atms={atms} initial="atms" />
        </div>
      </section>
    </>
  );
}
