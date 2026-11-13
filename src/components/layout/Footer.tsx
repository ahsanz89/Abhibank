import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SocialIcon } from "@/components/ui/Icon";
import { FOOTER_COLUMNS, LEGAL_LINKS, SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="stack" style={{ gap: 24 }}>
            <Image src="/assets/brand/logo-white.webp" alt="ABHI Microfinance Bank" width={532} height={192} style={{ width: 132, height: "auto" }} />
            <p className="muted" style={{ fontWeight: 300, maxWidth: 320, fontSize: 15 }}>
              Financial freedom for all. Delivering simple and secure financial experiences through cutting-edge technology.
            </p>
            <ul className="stack" style={{ gap: 12, fontSize: 15 }}>
              <li>
                <a href={SITE.helplineHref} className="cluster" style={{ color: "#fff", gap: 10 }}>
                  <Phone size={16} className="accent" aria-hidden="true" /> {SITE.helpline} · 24/7
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`} className="cluster" style={{ color: "#fff", gap: 10 }}>
                  <Mail size={16} className="accent" aria-hidden="true" /> {SITE.email}
                </a>
              </li>
              <li className="cluster" style={{ gap: 10, alignItems: "flex-start", flexWrap: "nowrap", color: "var(--text-secondary)", fontWeight: 300 }}>
                <MapPin size={16} className="accent" style={{ marginTop: 4, flex: "none" }} aria-hidden="true" /> {SITE.address}
              </li>
            </ul>
            <div className="cluster" style={{ gap: 8 }}>
              {(["facebook", "instagram", "linkedin"] as const).map((n) => (
                <a key={n} href={SITE.social[n]} className="icon-btn" target="_blank" rel="noopener noreferrer" aria-label={`ABHI on ${n[0].toUpperCase() + n.slice(1)}`}>
                  <SocialIcon network={n} />
                </a>
              ))}
            </div>
          </div>
          {FOOTER_COLUMNS.map((col) => (
            <div className="footer-col" key={col.title}>
              <h2>{col.title}</h2>
              <ul>
                {col.links.map((l) => (
                  <li key={l.href + l.label}>
                    <Link href={l.href}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} ABHI Microfinance Bank Limited. All rights reserved.</span>
          <nav aria-label="Legal">
            {LEGAL_LINKS.map((l) => (
              <Link key={l.href} href={l.href}>
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
