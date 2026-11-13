import type { Metadata } from "next";
import Image from "next/image";
import { Send, GraduationCap, HandHeart, Users, QrCode } from "lucide-react";
import { StoreBadges } from "@/components/sections/shared";
import { ButtonLink, CheckList, CtaBand, PageHero, SectionHeader } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "Digital financial services — ABHIBank App & corporate solutions",
  description: "FINCA Pay is now the ABHIBank App: safe and secure banking, instant money transfers and 500+ billers with no minimum balance. Plus bulk disbursements, fee and donation collection, payroll and digital payments for businesses.",
};

const BUSINESS = [
  { icon: Send, title: "Bulk disbursements", text: "Allows organisations to send bulk payments to their beneficiaries, empowering them with real-time, secure transaction settlements into any bank account within Pakistan." },
  { icon: GraduationCap, title: "School fee collection", text: "An easy and convenient way to collect fees for various institutions, with real-time settlement via a corporate portal, integrated through an easy and secure API with no additional charges." },
  { icon: HandHeart, title: "Donation collection", text: "Free-of-cost donation solutions for NGOs, SMEs and welfare organisations, with easy and transparent tracking of funds." },
  {
    icon: Users,
    title: "Salary disbursement & vendor payments",
    text: "Bulk salary transfers and vendor payments from any part of the world, with just an internet connection.",
    list: ["Complete employee record reconciliation", "Bulk uploading for digital vendor payments", "Integrated attendance module with customised features", "HRMS for employee management"],
  },
  {
    icon: QrCode,
    title: "Digital payment solution",
    text: "A convenient and innovative way for businesses and e-commerce players to receive customer payments without any hassle.",
    list: ["In-app payments via static QR codes", "Payment against consumer / invoice numbers through billers, e.g. government fees, education and credit card payments"],
  },
];

export default function DfsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Digital banking" }, { label: "Digital financial services" }]}
        overline="Digital financial services"
        title={
          <>
            Simpler, faster, <span className="accent">safer banking.</span>
          </>
        }
        lead="The world of banking is evolving and so are we. FINCA Pay is now the ABHIBank App — continue to enjoy a simpler, faster and safer digital banking experience, with no minimum balance requirement."
        aside={<Image src="/assets/app/phones.webp" alt="ABHIBank App screens" width={768} height={668} priority sizes="(max-width: 960px) 100vw, 40vw" style={{ width: "100%", maxWidth: 520, marginInline: "auto" }} />}
      >
        <StoreBadges />
      </PageHero>

      <section className="section" id="download">
        <div className="container">
          <SectionHeader overline="Our app" title="With no minimum balance requirement, you can experience:" />
          <div className="grid grid-3">
            {[
              ["/assets/app/feature-secure.webp", "Safe & secure banking", "Your money is safe with ABHI Microfinance Bank, which is fully regulated and trusted by millions."],
              ["/assets/app/feature-transfer.webp", "Quick money transfer", "Send and receive money instantly, anytime, anywhere, 24/7."],
              ["/assets/app/feature-bills.webp", "Easy bill payment", "Manage bills for 500+ billers from the comfort of your home with just a few clicks."],
            ].map(([img, t, d]) => (
              <div key={t} className="card card--pad stack" style={{ gap: 16 }}>
                <span style={{ display: "block", aspectRatio: "4 / 3", position: "relative", borderRadius: 14, overflow: "hidden", background: "var(--navy-900)" }}>
                  <Image src={img} alt="" fill sizes="(max-width: 720px) 100vw, 33vw" style={{ objectFit: "cover", objectPosition: "top" }} />
                </span>
                <h3 className="h4">{t}</h3>
                <p className="feature__text">{d}</p>
              </div>
            ))}
          </div>
          <div className="cluster" style={{ marginTop: 40, justifyContent: "space-between", gap: 24 }}>
            <p className="lead" style={{ margin: 0 }}>
              Download now on Android or iOS.
            </p>
            <StoreBadges />
          </div>
        </div>
      </section>

      <section className="section section--surface" id="business">
        <div className="container">
          <SectionHeader
            overline="Business solutions for corporates"
            title={
              <>
                Payments infrastructure for <span className="accent">every organisation.</span>
              </>
            }
            lead="Apart from consumer offerings, ABHI provides a wide range of business solutions for various corporate segments."
            action={
              <ButtonLink href="/contact-us-ewa" arrow>
                Talk to our team
              </ButtonLink>
            }
          />
          <div className="grid grid-3">
            {BUSINESS.map((b) => (
              <div key={b.title} className="card card--pad stack" style={{ gap: 16 }}>
                <span className="icon-tile">
                  <b.icon size={20} strokeWidth={1.6} aria-hidden="true" />
                </span>
                <h3 className="h4">{b.title}</h3>
                <p className="feature__text">{b.text}</p>
                {b.list && <CheckList items={b.list} />}
              </div>
            ))}
            <div className="card card--pad stack" style={{ gap: 16, justifyContent: "space-between", background: "linear-gradient(140deg, rgba(62,206,158,.16), rgba(91,111,216,.16))" }}>
              <h3 className="h3">Earned Wage Access for your workforce.</h3>
              <ButtonLink href="/ewa" arrow>
                Abhi Salary (EWA)
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <CtaBand title="Bank from anywhere." text="Open a digital wallet account in minutes with the ABHIBank App." primary={{ label: "Get the app", href: "#download" }} secondary={{ label: "Tutorials", href: "/tutorials" }} />
    </>
  );
}
