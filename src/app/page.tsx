import { ArrowRight, Phone, ShieldCheck, Smartphone, Send, Receipt, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ProductTabs } from "@/components/home/ProductTabs";
import { ClientMarquee, HeroScene, StoreBadges } from "@/components/sections/shared";
import { ButtonLink, SectionHeader } from "@/components/ui/primitives";
import { CountUp, LiteYouTube, Reveal, Slider, VideoCard } from "@/components/ui/interactive";
import { CAMPAIGN_BANNERS, WALKTHROUGHS, formatDate, press, branchCount } from "@/lib/content";
import { SITE, legacyAsset } from "@/lib/site";
import { DismissibleCampaign } from "@/components/home/DismissibleCampaign";

const TABS = [
  {
    label: "Save",
    products: [
      { href: "/deposits/asaan-account", image: "/assets/products/asaan-account.webp", title: "Asaan Account", text: "No minimum balance, no transaction requirements — just simplicity at your fingertips.", badge: "Open with PKR 100" },
      { href: "/deposits/rozana-munafa", image: "/assets/products/rozana-munafa.webp", title: "Rozana Munafa", text: "A high-yield savings account with monthly profit and no transaction limits." },
      { href: "/deposits/niswan-rozana-munafa", image: "/assets/products/niswan-rozana-munafa.webp", title: "Niswan Rozana Munafa", text: "A daily savings account designed exclusively for women.", badge: "For women" },
      { href: "/deposits/tahafuz-term-deposit", image: "/assets/products/tahafuz-term-deposit.webp", title: "Tahafuz Term Deposit", text: "Attractive rates for fixed tenors with a variety of profit payment options." },
    ],
  },
  {
    label: "Borrow",
    products: [
      { href: "/loans/sunheri-karza", image: "/assets/products/sunheri-karza.webp", title: "Sunheri Karza", text: "Convert your gold jewellery into working capital for your business.", badge: "Gold-backed" },
      { href: "/loans/karobari-karza", image: "/assets/products/karobari-karza.webp", title: "Karobari Karza", text: "A loan facility that helps business owners raise capital." },
      { href: "/loans/kashtkar-karza", image: "/assets/products/kashtkar-karza.webp", title: "Kashtkar Karza", text: "Finance that supports the expansion of your farming business." },
      { href: "/loans/niswan-karza", image: "/assets/products/niswan-karza.webp", title: "Niswan Karza", text: "A short to medium-term loan facility for female entrepreneurs.", badge: "For women" },
    ],
  },
  {
    label: "Get paid",
    products: [
      { href: "/ewa", image: "/assets/icons/loans.webp", title: "Abhi Salary (EWA)", text: "Your earned salary in just 30 seconds, by app or SMS — anytime, anywhere.", badge: "Flagship" },
      { href: "/digital-financial-services#business", image: "/assets/products/sahulat-plus-current-account.webp", title: "Salary disbursement", text: "Bulk salary transfers with reconciliation, attendance and HRMS." },
      { href: "/digital-financial-services#business", image: "/assets/products/sahulat-current-account.webp", title: "Bulk disbursements", text: "Real-time, secure settlements into any bank account in Pakistan." },
      { href: "/digital-financial-services#business", image: "/assets/products/tahafuz-term-deposit.webp", title: "Collections", text: "School fees and donations with real-time settlement via a corporate portal." },
    ],
  },
  {
    label: "Pay & transfer",
    products: [
      { href: "/digital-financial-services", image: "/assets/icons/digital.webp", title: "ABHIBank App", text: "Simpler, faster and safer digital banking with no minimum balance." },
      { href: "/digital-financial-services", image: "/assets/icons/deposits.webp", title: "Bill payments", text: "Pay bills for 500+ billers from the comfort of home." },
      { href: "/digital-financial-services#business", image: "/assets/products/sahulat-current-account.webp", title: "QR payments", text: "Receive customer payments in-app via static QR codes." },
      { href: "/iban-calculator", image: "/assets/products/sahulat-plus-current-account.webp", title: "IBAN calculator", text: "Generate the IBAN for your ABHI branch or wallet account." },
    ],
  },
];

const JOURNEY = [
  { y: "2008", t: "The Kashf Foundation is founded with a mission to alleviate poverty in Pakistan." },
  { y: "2012", t: "Gold-backed lending launches; the loan portfolio passes PKR 1B." },
  { y: "2013", t: "Acquired by FINCA; employee banking and running finance launch." },
  { y: "2021", t: "ABHI is founded, pioneering Earned Wage Access in Pakistan.", key: true },
  { y: "2024", t: "ABHI and TPL acquire FINCA Microfinance Bank, relaunched as ABHI Microfinance Bank." },
  { y: "2026", t: "Initial public offering on the Pakistan Stock Exchange.", key: true },
];

export default function HomePage() {
  const latest = press.slice(0, 3);
  return (
    <>
      {/* Hero */}
      <section className="hero dots" aria-labelledby="hero-title">
        <div className="container hero__inner">
          <div className="hero__text">
            <span className="badge">
              <TrendingUp size={14} aria-hidden="true" /> Pakistan’s fastest-growing microfinance bank
            </span>
            <h1 id="hero-title" className="display">
              Banking for everyone. <span className="accent">Right now.</span>
            </h1>
            <p className="lead">
              Save, borrow and access the salary you’ve already earned in 30 seconds — in the ABHIBank App, through 7,000+ partner employers and at {branchCount}+ branches across Pakistan.
            </p>
            <div className="cluster" style={{ gap: 14 }}>
              <ButtonLink href="/online-application" size="lg" arrow>
                Open an account
              </ButtonLink>
              <ButtonLink href="/deposits" size="lg" variant="secondary">
                Explore products
              </ButtonLink>
            </div>
            <div className="hero__trust">
              <span>
                <ShieldCheck size={18} aria-hidden="true" /> Fully regulated microfinance bank
              </span>
              <span>
                <Phone size={17} aria-hidden="true" /> 24/7 helpline {SITE.helpline}
              </span>
            </div>
          </div>
          <div className="scene-wrap">
            <HeroScene />
          </div>
        </div>
      </section>

      <DismissibleCampaign />

      {/* Stats */}
      <section className="section" style={{ paddingBottom: 40 }} aria-label="ABHI in numbers">
        <div className="container">
          <div className="stats">
            <div className="stat">
              <span className="stat__value">
                <CountUp value={1.8} decimals={1} suffix="M" />
              </span>
              <span className="stat__label">Lives impacted</span>
            </div>
            <div className="stat">
              <span className="stat__value">
                <CountUp value={69.1} decimals={1} prefix="PKR " suffix="B" />
              </span>
              <span className="stat__label">In deposits</span>
            </div>
            <div className="stat">
              <span className="stat__value">
                <CountUp value={7} suffix="K+" />
              </span>
              <span className="stat__label">Companies financially empowered</span>
            </div>
            <div className="stat">
              <span className="stat__value">
                <CountUp value={470} suffix="K+" />
              </span>
              <span className="stat__label">Transactions</span>
            </div>
          </div>
        </div>
      </section>

      {/* Campaigns (original banners) */}
      <section className="section section--tight" aria-labelledby="whats-new">
        <div className="container">
          <SectionHeader overline="What’s new" title={<span id="whats-new">Campaigns &amp; announcements</span>} />
          <Slider slides={CAMPAIGN_BANNERS} label="ABHI campaigns and announcements" />
        </div>
      </section>

      {/* Products */}
      <section className="section" aria-labelledby="products-title">
        <div className="container">
          <SectionHeader
            overline="Our products"
            title={
              <span id="products-title">
                One bank for every <span className="accent">rupee</span> you earn, save and grow.
              </span>
            }
            action={
              <ButtonLink href="/online-application" variant="secondary" arrow>
                Apply online
              </ButtonLink>
            }
          />
          <ProductTabs tabs={TABS} />
        </div>
      </section>

      {/* EWA */}
      <section className="section section--surface" aria-labelledby="ewa-title">
        <div className="container split">
          <Reveal>
            <div className="stack" style={{ gap: 26 }}>
              <span className="overline">Abhi Salary · Earned Wage Access</span>
              <h2 id="ewa-title" className="h2">
                You used to wait for your salary. <span className="accent">Now it waits for you.</span>
              </h2>
              <p className="lead">No borrowing from family or friends in an emergency, no payday stress — and the service costs less than a credit card.</p>
              <ol className="stack" style={{ marginTop: 6 }}>
                {[
                  ["01", "Request by app or SMS", "Employees of ABHI partner companies can request anytime during the month."],
                  ["02", "Choose an amount", "Withdraw from the salary you have already earned."],
                  ["03", "Receive it in 30 seconds", "Transfer to any bank account or wallet in Pakistan."],
                ].map(([n, t, d]) => (
                  <li key={n} className="cluster" style={{ alignItems: "flex-start", gap: 24, padding: "22px 0", borderTop: "1px solid var(--line)", flexWrap: "nowrap" }}>
                    <span className="feature__num" style={{ fontSize: 28, width: 44, flex: "none" }}>
                      {n}
                    </span>
                    <span className="stack" style={{ gap: 4 }}>
                      <b style={{ fontWeight: 500, fontSize: 18 }}>{t}</b>
                      <span className="muted" style={{ fontWeight: 300, fontSize: 15 }}>
                        {d}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>
              <div className="cluster">
                <ButtonLink href="/ewa" arrow>
                  For employees
                </ButtonLink>
                <ButtonLink href="/contact-us-ewa" variant="secondary">
                  For employers
                </ButtonLink>
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="ring" role="img" aria-label="Earned salary transferred in 30 seconds">
              <div className="ring__track" />
              <div className="ring__core" />
              <div className="ring__label">
                <span className="ring__num">
                  30<small>sec</small>
                </span>
                <span className="muted">from request to your account</span>
              </div>
              <span className="ring__chip float" style={{ right: "0%", top: "6%" }}>
                <Send size={15} aria-hidden="true" /> Any bank or wallet
              </span>
              <span className="ring__chip float-tilt" style={{ left: "-2%", bottom: "10%" }}>
                <Smartphone size={15} aria-hidden="true" /> App or SMS
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* App */}
      <section className="section" aria-labelledby="app-title">
        <div className="container">
          <div className="card" style={{ borderRadius: "var(--radius-xl)", overflow: "hidden", background: "linear-gradient(120deg, var(--navy-900) 40%, var(--navy-800))" }}>
            <div className="split" style={{ gap: 0 }}>
              <div className="stack" style={{ gap: 28, padding: "clamp(32px, 6vw, 88px)" }}>
                <span className="overline">ABHIBank App · ABHI Pay</span>
                <h2 id="app-title" className="h2">
                  Your smart digital wallet for <span className="accent">everyday banking.</span>
                </h2>
                <p className="lead">Banking is now faster, smarter and more convenient. Manage your finances anytime, anywhere with a secure digital wallet designed to make daily transactions simple.</p>
                <ul className="stack" style={{ gap: 20 }}>
                  {[
                    [ShieldCheck, "Safe & secure banking", "Your money is safe with ABHI Microfinance Bank, fully regulated and trusted by millions."],
                    [Send, "Quick money transfer", "Send and receive money instantly — anytime, anywhere, 24/7."],
                    [Receipt, "Easy bill payment", "Manage bills for 500+ billers from the comfort of your home."],
                  ].map(([I, t, d]) => {
                    const Ico = I as typeof Send;
                    return (
                      <li key={t as string} className="cluster" style={{ alignItems: "flex-start", gap: 18, flexWrap: "nowrap" }}>
                        <span className="icon-tile">
                          <Ico size={20} strokeWidth={1.6} aria-hidden="true" />
                        </span>
                        <span className="stack" style={{ gap: 4 }}>
                          <b style={{ fontWeight: 500, fontSize: 17 }}>{t as string}</b>
                          <span className="muted" style={{ fontWeight: 300, fontSize: 15 }}>
                            {d as string}
                          </span>
                        </span>
                      </li>
                    );
                  })}
                </ul>
                <StoreBadges />
              </div>
              <div className="hide-mobile" style={{ position: "relative", alignSelf: "stretch", minHeight: 560, display: "flex", alignItems: "center", justifyContent: "center", padding: 40 }}>
                <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 50% 50%, rgba(62,206,158,.22), transparent 60%)" }} />
                <Image src="/assets/app/phones.webp" alt="ABHIBank App screens showing balance, transfers and payments" width={768} height={668} sizes="(max-width: 1180px) 50vw, 560px" style={{ position: "relative", width: "100%", maxWidth: 560 }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clients */}
      <section className="section section--flush-top" aria-labelledby="clients-title">
        <div className="container">
          <SectionHeader
            overline="Employers"
            title={
              <span id="clients-title">
                <span className="accent">7,000+ companies</span> are financially empowered with ABHI.
              </span>
            }
            action={
              <ButtonLink href="/contact-us-ewa" variant="secondary" arrow>
                Become a partner
              </ButtonLink>
            }
          />
        </div>
        <div className="stack" style={{ gap: 16 }}>
          <ClientMarquee />
          <ClientMarquee reverse />
        </div>
        <p className="visually-hidden">Clients include Artistic Milliners, Gul Ahmed, Servis, Domino’s, Puma Energy, Chase Up, Martin Dow, Bykea, SadaPay, Alkaram, Yunus Textile and many more.</p>
      </section>

      {/* Journey */}
      <section className="section section--surface" aria-labelledby="journey-title">
        <div className="container">
          <SectionHeader
            overline="Our journey"
            title={
              <span id="journey-title">
                From eight people in one room to a <span className="accent">listed bank.</span>
              </span>
            }
            lead="Founded in 2021, ABHI quickly emerged as a leading fintech and went on to acquire FINCA, transforming it into ABHI Microfinance Bank — now the fastest-growing microfinance bank in Pakistan."
            action={
              <ButtonLink href="/our-history" variant="secondary" arrow>
                Our history
              </ButtonLink>
            }
          />
          <div className="timeline">
            {JOURNEY.map((j) => (
              <div key={j.y} className={`timeline__item${j.key ? " timeline__item--key" : ""}`}>
                <span className="timeline__year">{j.y}</span>
                <p className="feature__text">{j.t}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 56 }}>
            <LiteYouTube url="https://www.youtube.com/watch?v=prZcCXPULE4" title="ABHI Microfinance Bank — our journey" />
          </div>
        </div>
      </section>

      {/* Walkthroughs */}
      <section className="section" aria-labelledby="walk-title">
        <div className="container">
          <SectionHeader
            overline="Products walkthrough"
            title={<span id="walk-title">See how it works.</span>}
            action={
              <ButtonLink href="/tutorials" variant="secondary" arrow>
                View more
              </ButtonLink>
            }
          />
          <div className="grid grid-3">
            {WALKTHROUGHS.map((w) => (
              <VideoCard key={w.title} title={w.title} text={w.text} poster={w.poster} video={legacyAsset(w.video)} aspect="4 / 5" />
            ))}
          </div>
        </div>
      </section>

      {/* Press */}
      <section className="section section--flush-top" aria-labelledby="press-title">
        <div className="container">
          <SectionHeader
            overline="Press releases"
            title={<span id="press-title">Latest from ABHI.</span>}
            action={
              <ButtonLink href="/press-release" variant="secondary" arrow>
                All press releases
              </ButtonLink>
            }
          />
          <div className="grid grid-3">
            {latest.map((p) => (
              <Link key={p.slug} href={`/press-release/${p.slug}`} className="card card--interactive" style={{ overflow: "hidden" }}>
                {p.image && (
                  <span style={{ position: "relative", aspectRatio: "16 / 10", display: "block", background: "var(--navy-800)" }}>
                    <Image src={p.image} alt="" fill sizes="(max-width: 720px) 100vw, 33vw" style={{ objectFit: "cover" }} />
                  </span>
                )}
                <span className="stack" style={{ gap: 14, padding: 28, flex: 1 }}>
                  <span className="hint">{formatDate(p.date)}</span>
                  <span className="product-card__title" style={{ fontSize: 22 }}>
                    {p.title}
                  </span>
                  <span className="product-card__desc">{p.excerpt}</span>
                  <span className="link-arrow">
                    Read more <ArrowRight size={16} aria-hidden="true" />
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Help */}
      <section className="section section--flush-top" aria-labelledby="help-title">
        <div className="container">
          <div className="card card--pad dots" style={{ borderRadius: "var(--radius-xl)", backgroundColor: "var(--bg-surface)" }}>
            <div className="cluster" style={{ justifyContent: "space-between", marginBottom: 32, gap: 20 }}>
              <h2 id="help-title" className="h3">
                How can we help?
              </h2>
              <a href={SITE.helplineHref} className="btn btn--secondary btn--sm">
                <Phone size={15} aria-hidden="true" /> {SITE.helpline}
              </a>
            </div>
            <div className="grid grid-4">
              {[
                ["Branches & ATMs", "Find the nearest ABHI branch or ATM", "/branches"],
                ["IBAN calculator", "Generate your IBAN in seconds", "/iban-calculator"],
                ["Complaints & suggestions", "Lodge a complaint or share feedback", "/complaint-and-suggestion"],
                ["Public documents", "Schedules of charges and reports", "/financials"],
              ].map(([t, d, h]) => (
                <Link key={h} href={h} className="card card--interactive" style={{ padding: 22, gap: 6, background: "var(--navy-800)" }}>
                  <b style={{ fontWeight: 500 }}>{t}</b>
                  <span className="muted small" style={{ fontWeight: 300 }}>
                    {d}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
