import type { Metadata } from "next";
import { VideoCard } from "@/components/ui/interactive";
import { CtaBand, PageHero } from "@/components/ui/primitives";
import { WALKTHROUGHS } from "@/lib/content";
import { legacyAsset } from "@/lib/site";

export const metadata: Metadata = {
  title: "Tutorials — Salary Advance, Gold Top-Up and Rollover",
  description: "Step-by-step video walkthroughs of the ABHIBank App: Salary Advance, Gold Top-Up and Rollover.",
};

export default function TutorialsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Digital banking" }, { label: "Tutorials" }]}
        overline="Tutorials"
        title={
          <>
            Gold Top-Up, Rollover <span className="accent">&amp; Salary Advance.</span>
          </>
        }
        lead="Short video walkthroughs of the most-used features in the ABHIBank App."
      />
      <section className="section">
        <div className="container grid grid-3">
          {WALKTHROUGHS.map((w) => (
            <VideoCard key={w.title} title={w.title} text={w.text} poster={w.poster} video={legacyAsset(w.video)} aspect="4 / 5" />
          ))}
        </div>
      </section>
      <CtaBand title="Need help in the app?" text="Our helpline is available 24/7 on (042) 111-111-562." primary={{ label: "Contact us", href: "/connect-with-abhi" }} secondary={{ label: "Digital banking", href: "/digital-financial-services" }} />
    </>
  );
}
