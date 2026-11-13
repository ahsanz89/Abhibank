import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import { ClientMarquee } from "@/components/sections/shared";
import { CountUp, LiteYouTube } from "@/components/ui/interactive";
import { ButtonLink, SectionHeader } from "@/components/ui/primitives";
import { INVESTOR_LOGOS } from "@/lib/content";
import { SITE, legacyAsset } from "@/lib/site";

export const metadata: Metadata = {
  title: "IPO — Pakistan’s fastest-growing microfinance bank is going public",
  description: "The IPO of ABHI Microfinance Bank: book building 5–6 November and retail subscription 12–13 November 2026. Prospectus, key financial highlights and how to invest via PSX e-IPO.",
};

const PROSPECTUS = legacyAsset("https://abhibank.com/wp-content/uploads/2026/10/ABHI-Updated-Prospectus-Final_compressed.pdf");
const Q1_REPORT = legacyAsset("https://abhibank.com/wp-content/uploads/2026/06/Condensed-Interim-Financial-Statements-March-2026.pdf");

const FACTS = [
  ["Book building", "5–6 November 2026"],
  ["Retail subscription", "12–13 November 2026"],
  ["Total issue size", "PKR 1.98–2.97B"],
  ["Shares offered", "132M shares"],
  ["Share of post-IPO capital", "13.65%"],
  ["Floor price", "PKR 15.0"],
  ["Cap price", "PKR 22.5"],
];

const INVESTOR_VOICES = [
  ["/assets/ipo/investor-thomas-tsao.webp", "Thomas G. Tsao, Co-founder & Chair, Gobi Partners"],
  ["/assets/ipo/investor-misbah-naqvi.webp", "Misbah Naqvi, Co-founder & General Partner"],
  ["/assets/ipo/investor-kirill.webp", "Kirill, investor"],
  ["/assets/ipo/investor-stefan.webp", "Stefan, investor"],
  ["/assets/ipo/investor-faisal-aftab.webp", "Faisal Aftab, investor"],
  ["/assets/ipo/investor-dave.webp", "Dave, investor"],
];

const SOCIAL = ["merchant-financing", "stat-post-1", "stat-post-1-urdu", "abhi-bank-ipo-post-2c", "abhi-bank-ipo-post-2a-urdu", "abhi-bank-ipo-post-3", "abhi-bank-ipo-post-2b-urdu", "generic-post-1"];

export default function IpoPage() {
  return (
    <>
      <section className="hero" aria-labelledby="ipo-title" style={{ minHeight: "min(88vh, 860px)", display: "flex", alignItems: "flex-end" }}>
        <video className="hide-mobile" autoPlay muted loop playsInline aria-hidden="true" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.35 }}>
          <source src={legacyAsset("https://abhibank.com/wp-content/uploads/2026/08/abhiinto.mp4")} type="video/mp4" />
        </video>
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(10,25,47,.92) 0%, rgba(10,25,47,.55) 55%, rgba(10,25,47,.25) 100%), linear-gradient(180deg, rgba(10,25,47,0) 40%, rgba(10,25,47,.95) 92%)" }} />
        <div className="container" style={{ position: "relative", paddingBlock: "120px 96px" }}>
          <div className="stack" style={{ gap: 28, maxWidth: 980 }}>
            <Image src="/assets/brand/logo-white.svg" alt="ABHI" width={160} height={77} style={{ width: 150, height: "auto" }} />
            <span className="overline">Initial public offering · Pakistan Stock Exchange</span>
            <h1 id="ipo-title" className="display">
              Pakistan’s fastest-growing microfinance bank. <span className="accent">Our IPO is happening.</span>
            </h1>
            <div className="cluster">
              <ButtonLink href={SITE.psxEipo} size="lg" arrow>
                Buy shares now
              </ButtonLink>
              <ButtonLink href={PROSPECTUS} size="lg" variant="secondary">
                <FileText size={18} aria-hidden="true" /> See prospectus
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div className="stack" style={{ gap: 24 }}>
            <span className="overline">IPO details</span>
            <h2 className="h2">
              We didn’t build a bank for the wealthy. <span className="accent">We built it for everyone.</span>
            </h2>
            <div className="table-wrap">
              <table className="table">
                <caption className="visually-hidden">ABHI Microfinance Bank IPO details</caption>
                <tbody>
                  {FACTS.map(([k, v]) => (
                    <tr key={k}>
                      <th scope="row" style={{ textTransform: "none", letterSpacing: 0, fontSize: 15, fontWeight: 300, color: "var(--text-secondary)", whiteSpace: "normal" }}>
                        {k}
                      </th>
                      <td className="strong" style={{ textAlign: "right", whiteSpace: "nowrap" }}>
                        {v}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="hint">Details as announced in ABHI’s IPO campaign. Please read the prospectus before investing.</p>
          </div>
          <div className="media-frame">
            <Image src="/assets/ipo/heading.webp" alt="The IPO of ABHI Microfinance Bank — book building 5–6 November, retail subscription 12–13 November 2026, issue size PKR 1.98–2.97B, floor price PKR 15.0, cap price PKR 22.5" width={1400} height={787} priority sizes="(max-width: 960px) 100vw, 50vw" style={{ width: "100%", height: "auto" }} />
          </div>
        </div>
      </section>

      <section className="section section--surface">
        <div className="container split">
          <div className="stack" style={{ gap: 22 }}>
            <span className="overline">What is ABHI?</span>
            <h2 className="h2">A neobank of the future.</h2>
            <p className="lead">
              Abhi provides instant credit access, aiding businesses, employees and vendors to bridge payment gaps. Partnering with 25,000+ companies, Abhi drives economic growth and is recognised as MENAP’s first fintech ‘Technology Pioneer 2023’ by the World Economic Forum.
            </p>
          </div>
          <LiteYouTube url="https://www.youtube.com/watch?v=5l3XFTcI1x4" title="What is ABHI?" poster="/assets/ipo/what-is-abhi.webp" />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeader overline="Key financial highlights" title="Growth you can read in the numbers." action={<ButtonLink href={Q1_REPORT} variant="secondary">1st Quarter Financial Report 2026</ButtonLink>} />
          <div className="stats" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
            <div className="stat">
              <span className="stat__value"><CountUp value={1.02} decimals={2} prefix="PKR " suffix="B" /></span>
              <span className="stat__label">2025 net profit after tax</span>
            </div>
            <div className="stat">
              <span className="stat__value"><CountUp value={1.5} decimals={1} prefix="PKR " suffix="B" /></span>
              <span className="stat__label">2026 first 6 months net profit (incl. tax)</span>
            </div>
            <div className="stat">
              <span className="stat__value"><CountUp value={85} prefix="PKR " suffix="B+" /></span>
              <span className="stat__label">Total transaction volume</span>
            </div>
            <div className="stat">
              <span className="stat__value"><CountUp value={1.8} decimals={1} suffix="M" /></span>
              <span className="stat__label">Lives impacted</span>
            </div>
            <div className="stat">
              <span className="stat__value"><CountUp value={2} suffix="M+" /></span>
              <span className="stat__label">Transactions</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--surface">
        <div className="container">
          <SectionHeader overline="Investors & partners" title="Backed by the world’s leading investors & partners" />
          <div className="grid grid-6" style={{ gap: 12 }}>
            {["/assets/partners/mastercard.webp", ...INVESTOR_LOGOS].map((src) => (
              <span key={src} className="logo-tile" style={{ height: 96, padding: 8 }}>
                <Image src={src} alt="" width={420} height={311} style={{ maxHeight: 80, width: "auto" }} />
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Link href="/press-release/the-ipo-pakistan-has-not-seen-yet" className="card card--interactive" style={{ overflow: "hidden" }}>
            <div className="split" style={{ gap: 0 }}>
              <span style={{ position: "relative", minHeight: 320, display: "block" }}>
                <Image src="/assets/press/ipo-pakistan.webp" alt="" fill sizes="(max-width: 960px) 100vw, 50vw" style={{ objectFit: "cover" }} />
              </span>
              <span className="stack" style={{ gap: 18, padding: "clamp(28px, 4vw, 56px)" }}>
                <span className="overline">From fintech to public markets</span>
                <span className="h2" style={{ fontSize: "clamp(30px, 3.4vw, 46px)" }}>
                  The IPO Pakistan has not seen yet
                </span>
                <span className="body">From eight people in a shared room to a landmark IPO journey, ABHI’s co-founders reflect on building a technology-led microfinance bank and what this milestone could mean for Pakistan’s fintech ecosystem.</span>
                <span className="link-arrow">
                  Read more <ArrowRight size={16} aria-hidden="true" />
                </span>
              </span>
            </div>
          </Link>
        </div>
      </section>

      <section className="section section--flush-top">
        <div className="container">
          <SectionHeader overline="Voices" title="Hear from our investors & stakeholders" />
          <div className="h-scroll">
            {[...INVESTOR_VOICES, ["/assets/ipo/stakeholder-farooq-kamran.webp", "Farooq Kamran, Chief Financial Officer / Acting CEO"], ["/assets/ipo/stakeholder-mariam-pervaiz.webp", "Mariam Pervaiz, Chief Innovation & Financial Inclusion Officer"]].map(([src, cap]) => (
              <figure key={src} className="stack" style={{ gap: 10 }}>
                <span className="story-card" style={{ display: "block", aspectRatio: src.includes("stakeholder") ? "16 / 10" : "9 / 16" }}>
                  <Image src={src} alt={cap} fill sizes="260px" style={{ objectFit: "cover" }} />
                </span>
                <figcaption className="muted small" style={{ fontWeight: 300 }}>
                  {cap}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--surface">
        <div className="container grid grid-2" style={{ gap: 40 }}>
          <div className="stack" style={{ gap: 20 }}>
            <span className="overline">How to invest</span>
            <h2 className="h3">How to open a CDC account &amp; invest</h2>
            <LiteYouTube url="https://youtu.be/8saKIFqGW2Y" title="How to open a CDC account and invest" />
            <div className="cluster">
              <ButtonLink href={SITE.cdcPortal} variant="secondary">
                CDC login portal
              </ButtonLink>
              <ButtonLink href={SITE.psxEipo}>PSX e-IPO</ButtonLink>
            </div>
          </div>
          <div className="stack" style={{ gap: 20 }}>
            <span className="overline">Ask Cashy</span>
            <h2 className="h3">Ask Cashy about the AMB IPO</h2>
            <LiteYouTube url="https://youtu.be/XTOSjA1hG7s" title="Ask Cashy about the ABHI Microfinance Bank IPO" />
            <p className="body">Watch our co-founders’ story of the journey so far.</p>
            <LiteYouTube url="https://youtu.be/5ogHFTE_Gqw" title="ABHI Microfinance Bank — our journey" />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeader overline="Join a community of millions" title={<>More than <span className="accent">7,000+ companies</span> are financially empowered.</>} />
        </div>
        <ClientMarquee />
        <div className="container" style={{ marginTop: 56 }}>
          <div className="h-scroll">
            {SOCIAL.map((s) => (
              <span key={s} className="story-card" style={{ display: "block", aspectRatio: "4 / 5" }}>
                <Image src={`/assets/ipo/social-${s}.webp`} alt="ABHI IPO campaign post" fill sizes="280px" style={{ objectFit: "cover" }} />
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
