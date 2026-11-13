import type { Metadata } from "next";
import { HistoryExplorer } from "@/components/about/HistoryExplorer";
import { LiteYouTube } from "@/components/ui/interactive";
import { CtaBand, PageHero, SectionHeader } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "Our history",
  description: "From the Kashf Foundation in 2008 to FINCA Microfinance Bank and today’s ABHI Microfinance Bank — the milestones that shaped us.",
};

const MILESTONES = [
  { year: "2008", text: "The Kashf Foundation is founded with a mission to alleviate poverty in Pakistan.", image: "/assets/about/history-2008.webp" },
  { year: "2009", text: "The bank launches deposit-taking operations across its branch network.", image: "/assets/about/history-2009.webp" },
  { year: "2010", text: "The bank opens ATM facilities and strengthens its branch network across Pakistan.", image: "/assets/about/history-2010.svg" },
  { year: "2011", text: "The bank is awarded the Silver Award for social performance reporting from MIX Market.", image: "/assets/about/history-2011.webp" },
  { year: "2012", text: "The bank launches gold-backed lending and surpasses PKR 1B in outstanding gross loan portfolio.", image: "/assets/about/history-2012.webp" },
  { year: "2013", text: "The bank is acquired by FINCA and rebrands as FINCA Microfinance Bank Ltd. In the same year, it launches employee banking services and the running finance facility.", image: "/assets/about/history-2013.webp" },
  { year: "2014", text: "The bank surpasses 75K borrowers in Pakistan — one of the fastest-growing microfinance networks in the country, operating from more than 100 touch points.", image: "/assets/about/history-2014.webp" },
  { year: "2024", text: "ABHI and TPL acquire FINCA Microfinance Bank Limited and relaunch it as ABHI Microfinance Bank, approved by the State Bank of Pakistan and the Competition Commission of Pakistan.", image: "/assets/about/history-2024.webp" },
];

export default function HistoryPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "About", href: "/about-us" }, { label: "Our history" }]}
        overline="Our history"
        title={
          <>
            Eighteen years of <span className="accent">inclusion.</span>
          </>
        }
        lead="From a foundation built to alleviate poverty to Pakistan’s fastest-growing microfinance bank."
      />
      <section className="section">
        <div className="container">
          <HistoryExplorer milestones={MILESTONES} />
        </div>
      </section>
      <section className="section section--surface">
        <div className="container">
          <SectionHeader overline="Watch" title="Our journey" lead="ABHI Microfinance Bank has emerged as the fastest-growing microfinance bank in Pakistan." />
          <div style={{ maxWidth: 980 }}>
            <LiteYouTube url="https://youtu.be/5ogHFTE_Gqw" title="ABHI Microfinance Bank — our history" />
          </div>
        </div>
      </section>
      <CtaBand title="The next chapter is public." text="ABHI Microfinance Bank is listing on the Pakistan Stock Exchange." primary={{ label: "IPO details", href: "/abhi-intro" }} secondary={{ label: "About us", href: "/about-us" }} />
    </>
  );
}
