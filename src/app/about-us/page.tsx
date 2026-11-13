import type { Metadata } from "next";
import Image from "next/image";
import { ButtonLink, CheckList, CtaBand, SectionHeader, Breadcrumbs } from "@/components/ui/primitives";
import { CountUp, Reveal } from "@/components/ui/interactive";

export const metadata: Metadata = {
  title: "About us",
  description: "ABHI’s journey began in 2021 with a mission to solve access to credit in Pakistan. Today ABHI Microfinance Bank serves millions through 110+ branches across 100+ cities.",
};

const STORY = [
  "ABHI’s journey began in 2021, driven by a mission to solve a fundamental challenge in Pakistan — access to credit. Individuals and businesses alike struggled with financial constraints, sparking the need for an instant, seamless solution. ABHI answered this call with Earned Wage Access (EWA), empowering employees with real-time access to their salaries. The launch of the ABHI Mobile App marked a turning point, as the company onboarded its first corporate partner, setting the stage for financial empowerment at scale.",
  "In 2022, ABHI expanded its offerings beyond EWA, introducing payroll processing, payroll financing and invoice factoring, revolutionising corporate cash-flow management. The company’s rapid growth was fuelled by a $17M Series A round. That same year, ABHI was selected as one of 16 companies for Hub71, a prestigious Abu Dhabi-based accelerator, and partnered with Pakistan’s top five textile giants.",
  "2023 was a landmark year — ABHI became the first fintech in Pakistan to raise a PKR 2B Sukuk bond, and the World Economic Forum named ABHI a Technology Pioneer.",
  "In 2024, ABHI established its international headquarters in Abu Dhabi, entered Saudi Arabia through a strategic partnership with Alraedah, and empowered 650+ merchants with SME financing, including Daraz, Foodpanda, EduFi, Digikhata and Amadeus.",
  "Building on this momentum, ABHI — in partnership with TPL Corp Limited — acquired ABHI Microfinance Bank Limited. This collaboration, approved by the State Bank of Pakistan and the Competition Commission of Pakistan, integrates ABHI’s digital solutions, a vast microfinance network and TPL Corp’s expertise in retail, insurance and technology to redefine financial inclusion.",
  "Today ABHI provides responsible financial services, such as small loans and savings accounts, to millions of clients through a branch network of 110+ branches across 100+ cities in Pakistan. In 2017 the bank introduced the ABHIBank App, Pakistan’s first truly telco-agnostic digital wallet; under the ABHI 2.0 vision anyone can open a bank account in one minute from their smartphone, wherever they are.",
];

export default function AboutPage() {
  return (
    <>
      <section className="page-hero dots">
        <div className="container page-hero__inner">
          <Breadcrumbs items={[{ label: "About" }, { label: "About us" }]} />
          <span className="overline" style={{ marginTop: 64 }}>
            About ABHI
          </span>
          <h1 className="display" style={{ marginTop: 24, maxWidth: 1180 }}>
            We didn’t build a bank for the wealthy. <span className="accent">We built it for everyone.</span>
          </h1>
        </div>
      </section>

      <section className="section">
        <div className="container split split--start">
          <div className="stack" style={{ gap: 28, position: "sticky", top: "calc(var(--header-h) + 24px)" }}>
            <span className="overline">Our story</span>
            <h2 className="h2">It started with one question: why is credit so hard to get?</h2>
            <div className="media-frame" style={{ aspectRatio: "16 / 10" }}>
              <Image src="/assets/about/acquisition.webp" alt="TPL Corp, ABHI and FINCA leadership at the acquisition signing" fill sizes="(max-width: 960px) 100vw, 45vw" style={{ objectFit: "cover" }} />
            </div>
          </div>
          <div className="prose" style={{ fontSize: 17 }}>
            {STORY.map((p, i) => (
              <p key={i} className={i === 0 ? "lead" : undefined} style={i === 0 ? { maxWidth: "none" } : undefined}>
                {p}
              </p>
            ))}
            <p>As ABHI continues its journey, one goal remains at the core: empowering businesses and individuals with financial freedom, anytime, anywhere.</p>
          </div>
        </div>
      </section>

      <section className="section section--surface">
        <div className="container grid grid-2" style={{ gap: 24 }}>
          {[
            ["/assets/icons/mission.webp", "Mission", "Delivering simple and secure financial experiences through cutting-edge technology."],
            ["/assets/icons/vision.webp", "Vision", "Financial freedom for all."],
          ].map(([img, t, d]) => (
            <Reveal key={t}>
              <div className="card card--pad stack" style={{ gap: 18, minHeight: 280, justifyContent: "space-between" }}>
                <Image src={img} alt="" width={64} height={64} />
                <div className="stack" style={{ gap: 10 }}>
                  <span className="overline">{t}</span>
                  <p className="h3">{d}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeader overline="Impact" title="Financial & digital literacy across Pakistan" />
          <div className="stats">
            <div className="stat">
              <span className="stat__value"><CountUp value={1500} /></span>
              <span className="stat__label">Literacy sessions</span>
            </div>
            <div className="stat">
              <span className="stat__value"><CountUp value={36} suffix="K" /></span>
              <span className="stat__label">Attendees educated</span>
            </div>
            <div className="stat">
              <span className="stat__value"><CountUp value={15} suffix="M+" /></span>
              <span className="stat__label">Clients served</span>
            </div>
            <div className="stat">
              <span className="stat__value"><CountUp value={15} suffix="M+" /></span>
              <span className="stat__label">Households enabled</span>
            </div>
          </div>
          <p className="hint" style={{ marginTop: 24 }}>Social impact: every loan creates 3 jobs.</p>
        </div>
      </section>

      <section className="section section--flush-top">
        <div className="container">
          <SectionHeader overline="What we offer" title="Products & services" />
          <div className="grid grid-4">
            {[
              ["Deposit products", ["Asaan Current Account", "Rozana Munafa Account", "Sahulat Current Account", "Sahulat Plus Current Account", "Aitemad Bachat Account", "Tahafuz Term Deposit Account", "Muhaffiz Term Deposit Account", "International Remittance"], "/deposits"],
              ["Lending products", ["Kashtkar Karza", "Maweshi Karza", "Sunehri Karza", "Karobari Karza", "School Loan", "Motorcycle Loan", "House Renovation Loan", "Light Commercial Vehicle Loan"], "/loans"],
              ["Digital financial services", ["Payroll Solution", "ABHIBank App"], "/digital-financial-services"],
              ["Female-centric products", ["Niswan Karza", "Niswan Rozana Munafa Account"], "/women-centric-products-services"],
            ].map(([t, items, href]) => (
              <div key={t as string} className="card card--pad stack" style={{ gap: 18 }}>
                <h3 className="h4">{t as string}</h3>
                <CheckList items={items as string[]} />
                <ButtonLink href={href as string} variant="ghost" size="sm" arrow>
                  Explore
                </ButtonLink>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title="Meet the people behind ABHI." text="Our Board of Directors and management bring decades of banking, fintech and governance experience." primary={{ label: "Leadership", href: "/leadership" }} secondary={{ label: "Our history", href: "/our-history" }} />
    </>
  );
}
