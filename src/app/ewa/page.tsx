import type { Metadata } from "next";
import Image from "next/image";
import { Smartphone, Send } from "lucide-react";
import { Accordion, LiteYouTube, VideoCard } from "@/components/ui/interactive";
import { ButtonLink, CtaBand, Feature, PageHero, SectionHeader } from "@/components/ui/primitives";
import { EWA_CLIENT_LOGOS } from "@/lib/content";

export const metadata: Metadata = {
  title: "Abhi Salary — Earned Wage Access (EWA)",
  description: "Your earned salary in just 30 seconds. Instant access to your salary via phone app or SMS, anytime, anywhere — cheaper than credit cards.",
};

const USER_VIDEOS = ["https://www.youtube.com/watch?v=TMg7FQbT7Y4", "https://www.youtube.com/watch?v=Yn7Hk2ehSSY", "https://www.youtube.com/watch?v=RYGMX-X_9tA", "https://www.youtube.com/watch?v=pZq30jcNgCE"];

export default function EwaPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Business & employers" }, { label: "Abhi Salary (EWA)" }]}
        overline="Abhi Salary · Earned Wage Access"
        title={
          <>
            Your earned salary in just <span className="accent">30 seconds.</span>
          </>
        }
        lead="You wait for your salary? Now your salary waits for you. Experience instant access to your salary via phone app or SMS, anytime, anywhere."
        aside={
          <div className="ring" role="img" aria-label="Earned salary in 30 seconds">
            <div className="ring__track" />
            <div className="ring__core" />
            <div className="ring__label">
              <span className="ring__num">
                30<small>sec</small>
              </span>
              <span className="muted">from request to your account</span>
            </div>
            <span className="ring__chip float" style={{ right: 0, top: "6%" }}>
              <Send size={15} aria-hidden="true" /> Any bank or wallet
            </span>
            <span className="ring__chip float-tilt" style={{ left: "-2%", bottom: "10%" }}>
              <Smartphone size={15} aria-hidden="true" /> App or SMS
            </span>
          </div>
        }
      >
        <div className="cluster">
          <ButtonLink href="/contact-us-ewa" arrow>
            EWA employee / employer
          </ButtonLink>
          <ButtonLink href="/digital-financial-services#download" variant="secondary">
            Get the app
          </ButtonLink>
        </div>
      </PageHero>

      <section className="section section--tight" aria-labelledby="ewa-clients">
        <div className="container">
          <h2 id="ewa-clients" className="overline" style={{ display: "block", textAlign: "center", marginBottom: 32 }}>
            Our clients
          </h2>
          <div className="grid grid-6" style={{ gap: 12 }}>
            {EWA_CLIENT_LOGOS.map((src) => (
              <span key={src} className="logo-tile logo-tile--dark" style={{ height: 76 }}>
                <Image src={src} alt="" width={300} height={120} style={{ maxHeight: 44, width: "auto", opacity: 0.85 }} />
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--surface">
        <div className="container split">
          <div className="stack" style={{ gap: 24 }}>
            <span className="overline">Products</span>
            <h2 className="h2">
              Earned Wage Access, <span className="accent">our flagship.</span>
            </h2>
            <p className="lead">
              At Abhi, we’re redefining financial wellness in emerging markets by giving people instant access to their money — when they need it most. Our mission is to empower individuals and businesses with innovative financial solutions that improve cash flow, boost productivity, and drive financial inclusion.
            </p>
            <p className="body">Let employees access their earned salaries anytime during the month — no more waiting for payday. Our flagship product increases employee satisfaction, reduces financial stress, and improves retention.</p>
          </div>
          <LiteYouTube url="https://www.youtube.com/watch?v=aHBVygDcMCw" title="Abhi Earned Wage Access" />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeader overline="Why it helps" title="Payday, whenever you need it." />
          <div className="grid grid-4">
            <Feature brand num="30s" title="Instant transfer" text="Transfer your salary to any bank account or wallet within 30 seconds." />
            <Feature brand num="0" title="No more borrowing" text="No need to borrow from family or friends during emergencies." />
            <Feature brand num="24/7" title="Anytime, anywhere" text="Say goodbye to payday stress and access your earned wages anytime, anywhere." />
            <Feature brand num="<" title="Cheaper than cards" text="The service is cheaper than credit cards." />
          </div>
        </div>
      </section>

      <section className="section section--flush-top">
        <div className="container">
          <SectionHeader overline="Hear from our users" title="Real people, real paydays." />
          <div className="grid grid-4">
            {USER_VIDEOS.map((v, i) => (
              <VideoCard key={v} title={`User story ${i + 1}`} video={v} aspect="9 / 12" />
            ))}
          </div>
        </div>
      </section>

      <section className="section section--surface">
        <div className="container split split--start">
          <div className="stack" style={{ gap: 18 }}>
            <span className="overline">FAQ</span>
            <h2 className="h2">Questions, answered.</h2>
            <p className="lead">Can’t find what you’re looking for? Call {"(042) 111-111-562"}.</p>
          </div>
          <Accordion
            items={[
              { q: "Who can use Abhi Salary?", a: "Employees of companies that partner with ABHI. If your employer isn’t a partner yet, send us an enquiry and we’ll reach out to them." },
              { q: "How fast will I receive my money?", a: "You can transfer your earned salary to any bank account or wallet within 30 seconds." },
              { q: "How do I request my salary?", a: "Through the ABHI app or by SMS — anytime, anywhere during the month." },
              { q: "How much does it cost?", a: "The service is cheaper than using a credit card. Applicable charges are shown before you confirm a request." },
              { q: "What does my employer get?", a: "Higher employee satisfaction, reduced financial stress and improved retention — plus ABHI’s payroll, salary disbursement and HRMS tools." },
            ]}
          />
        </div>
      </section>

      <CtaBand title="Bring Earned Wage Access to your organisation." text="Join 7,000+ companies that give their people financial freedom." primary={{ label: "Employer / employee enquiry", href: "/contact-us-ewa" }} />
    </>
  );
}
