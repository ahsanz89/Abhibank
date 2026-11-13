import type { Metadata } from "next";
import { PeopleGrid } from "@/components/about/PeopleGrid";
import { CtaBand, PageHero, SectionHeader } from "@/components/ui/primitives";
import { leadership } from "@/lib/content";

export const metadata: Metadata = {
  title: "Our leadership",
  description: "ABHI Microfinance Bank’s Board of Directors, shareholder representative and management team.",
};

export default function LeadershipPage() {
  return (
    <>
      <PageHero crumbs={[{ label: "About", href: "/about-us" }, { label: "Leadership" }]} overline="Leadership" title={<>People who build <span className="accent">trust.</span></>} lead="Experience, governance and dedication to providing access to responsible financial services." />
      <section className="section">
        <div className="container">
          <SectionHeader overline="Governance" title="Board of Directors" lead="Our Board of Directors brings a breadth of expertise and dedication to providing access to responsible financial services." />
          <PeopleGrid people={leadership.board} />
        </div>
      </section>
      <section className="section section--surface">
        <div className="container">
          <SectionHeader overline="Shareholder representative" title="Strategic insight" lead="Our shareholder representative contributes strategic insight and governance expertise, supporting the organisation’s vision while ensuring alignment with shareholder interests and long-term sustainable growth." />
          <PeopleGrid people={leadership.shareholderRep} />
        </div>
      </section>
      <section className="section">
        <div className="container">
          <SectionHeader overline="Management" title="Leadership team" lead="Our management team brings vast experience, professional skills and expertise from various industry backgrounds." />
          <PeopleGrid people={leadership.management} />
        </div>
      </section>
      <CtaBand title="Read our latest results." text="Financial statements, schedules of charges and disclosures in one place." primary={{ label: "Financials", href: "/financials" }} />
    </>
  );
}
