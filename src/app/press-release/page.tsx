import type { Metadata } from "next";
import { PressList } from "@/components/press/PressList";
import { PageHero } from "@/components/ui/primitives";
import { press } from "@/lib/content";

export const metadata: Metadata = {
  title: "Press releases",
  description: "News, partnerships and announcements from ABHI Microfinance Bank.",
};

export default function PressPage() {
  return (
    <>
      <PageHero crumbs={[{ label: "About", href: "/about-us" }, { label: "Press releases" }]} overline="Newsroom" title={<>Press <span className="accent">releases.</span></>} lead="Partnerships, milestones and announcements from ABHI Microfinance Bank." />
      <section className="section">
        <div className="container">
          <PressList items={press} />
        </div>
      </section>
    </>
  );
}
