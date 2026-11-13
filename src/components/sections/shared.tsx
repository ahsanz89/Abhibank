import { ArrowRight, Check, Receipt, Send, QrCode, Wallet, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { CLIENT_LOGOS } from "@/lib/content";

export function ProductCard({ href, image, title, text, badge, cta = "Learn more" }: { href: string; image: string; title: string; text: string; badge?: string; cta?: string }) {
  return (
    <Link href={href} className="card card--interactive product-card">
      <div className="cluster" style={{ justifyContent: "space-between", alignItems: "flex-start" }}>
        <Image src={image} alt="" width={96} height={96} className="product-card__art" />
        {badge && <span className="badge badge--accent">{badge}</span>}
      </div>
      <h3 className="product-card__title">{title}</h3>
      <p className="product-card__desc">{text}</p>
      <div className="product-card__foot">
        <span className="link-arrow">
          {cta} <ArrowRight size={16} aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}

/** The ABHIBank App screen used inside the 3D device mock-ups (illustrative sample data). */
export function DeviceScreen() {
  return (
    <div className="device__screen" aria-hidden="true">
      <div className="device__row">
        <span className="muted">Assalam-o-Alaikum, Sana</span>
        <span style={{ width: 30, height: 30, borderRadius: "50%", background: "var(--brand)", color: "var(--navy-950)", fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center" }}>S</span>
      </div>
      <div className="device__balance">
        <span className="muted" style={{ fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase" }}>
          Earned salary available
        </span>
        <span className="device__amount">PKR 18,450</span>
        <span className="device__bar">
          <span />
        </span>
        <span className="muted" style={{ fontSize: 10 }}>
          Day 18 of 30
        </span>
      </div>
      <span className="device__cta">
        <Zap size={15} /> Withdraw · 30 sec
      </span>
      <div className="device__actions">
        <span>
          <Send size={17} />
          Transfer
        </span>
        <span>
          <Receipt size={17} />
          Bills
        </span>
        <span>
          <QrCode size={17} />
          Pay QR
        </span>
      </div>
      {[
        ["Electricity bill", "- 3,200", Receipt],
        ["Sent to Bilal", "- 1,500", Send],
        ["Salary withdrawn", "+ 5,000", Wallet],
      ].map(([t, a, I]) => {
        const Ico = I as typeof Receipt;
        return (
          <div className="device__row" key={t as string}>
            <span className="cluster" style={{ gap: 10, flexWrap: "nowrap" }}>
              <span style={{ width: 28, height: 28, borderRadius: 9, background: "var(--navy-800)", color: "var(--brand)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Ico size={13} />
              </span>
              {t as string}
            </span>
            <span style={{ color: (a as string).startsWith("+") ? "var(--brand)" : "var(--text-secondary)" }}>{a as string}</span>
          </div>
        );
      })}
    </div>
  );
}

export function HeroScene() {
  return (
    <div className="scene" role="img" aria-label="The ABHIBank App on a phone, an ABHI ATM card and floating rupee coins">
      <div className="scene__glow" />
      <div className="scene__ring" />
      <div className="device">
        <DeviceScreen />
      </div>
      <div className="atm-card" aria-hidden="true">
        <div className="cluster" style={{ justifyContent: "space-between" }}>
          <Image src="/assets/brand/icon-mark.png" alt="" width={40} height={40} style={{ filter: "brightness(0.1)" }} />
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".16em" }}>ATM CARD</span>
        </div>
        <span className="atm-card__chip" />
        <span style={{ fontWeight: 500, letterSpacing: ".18em", fontSize: 15 }}>•••• •••• •••• 0000</span>
      </div>
      <div className="toast-card float-tilt" style={{ right: -6, top: 118 }} aria-hidden="true">
        <span className="toast-card__icon">
          <Check size={18} strokeWidth={3} />
        </span>
        <span className="stack">
          <b style={{ fontWeight: 500, fontSize: 14 }}>Salary received</b>
          <span className="muted">in under 30 seconds</span>
        </span>
      </div>
      <span className="coin float" style={{ left: 455, top: 430, width: 96, height: 96, fontSize: 28 }} aria-hidden="true">
        Rs
      </span>
      <span className="coin float-tilt" style={{ left: 40, top: 150, width: 62, height: 62, fontSize: 18, animationDelay: "1.4s" }} aria-hidden="true">
        Rs
      </span>
    </div>
  );
}

export function StoreBadges() {
  return (
    <div className="cluster" style={{ gap: 12 }}>
      <a href={SITE.apps.android} target="_blank" rel="noopener noreferrer" aria-label="Get the ABHIBank App on Google Play">
        <Image src="/assets/badges/google-play.svg" alt="" width={196} height={58} style={{ height: 52, width: "auto" }} />
      </a>
      <a href={SITE.apps.ios} target="_blank" rel="noopener noreferrer" aria-label="Download the ABHIBank App on the App Store">
        <Image src="/assets/badges/app-store.svg" alt="" width={196} height={58} style={{ height: 52, width: "auto" }} />
      </a>
    </div>
  );
}

export function ClientMarquee({ reverse }: { reverse?: boolean }) {
  const half = reverse ? CLIENT_LOGOS.slice(16) : CLIENT_LOGOS.slice(0, 16);
  return (
    <div className="marquee" aria-hidden="true">
      <div className={`marquee__track${reverse ? " marquee__track--reverse" : ""}`}>
        {[...half, ...half].map((src, i) => (
          <span className="logo-tile" key={i}>
            <Image src={src} alt="" width={300} height={152} />
          </span>
        ))}
      </div>
    </div>
  );
}
