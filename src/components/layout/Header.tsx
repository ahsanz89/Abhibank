"use client";

import { ArrowRight, ChevronDown, Lock, Menu, Phone, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { NAV, SITE, UTILITY_LINKS } from "@/lib/site";
import { SmartLink } from "@/components/ui/primitives";

function isCurrent(pathname: string, href: string) {
  const path = href.split(/[?#]/)[0];
  return path !== "/" && (pathname === path || pathname.startsWith(path + "/"));
}

export function Header() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const [drawer, setDrawer] = useState(false);
  const [drawerGroup, setDrawerGroup] = useState<number | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Close everything on route change (state adjustment during render, no effect needed).
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpenMenu(null);
    setDrawer(false);
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenMenu(null);
        setDrawer(false);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenMenu(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawer ? "hidden" : "";
  }, [drawer]);

  const enter = (i: number) => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setOpenMenu(i), 80);
  };
  const leave = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setOpenMenu(null), 180);
  };

  return (
    <>
      <div className="utility-bar">
        <div className="container">
          <a href={SITE.helplineHref}>
            <Phone size={14} aria-hidden="true" /> 24/7 Helpline: {SITE.helpline}
          </a>
          <nav aria-label="Utility">
            {UTILITY_LINKS.map((l) => (
              <Link key={l.href} href={l.href}>
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
      <header className="site-header">
        <div className="container site-header__inner">
          <Link href="/" className="site-logo" aria-label="ABHI Microfinance Bank — home">
            <Image src="/assets/brand/logo-white.webp" alt="ABHI Microfinance Bank" width={532} height={192} priority sizes="120px" />
          </Link>

          <nav className="main-nav" aria-label="Main" ref={navRef}>
            {NAV.map((g, i) => {
              const current = g.links.some((l) => isCurrent(pathname, l.href));
              const open = openMenu === i;
              return (
                <div className="nav-item" key={g.label} onMouseEnter={() => enter(i)} onMouseLeave={leave}>
                  <button
                    type="button"
                    className={`nav-link${current ? " is-current" : ""}`}
                    aria-expanded={open}
                    aria-controls={`mega-${i}`}
                    onClick={() => setOpenMenu(open ? null : i)}
                  >
                    {g.label}
                    <ChevronDown size={15} aria-hidden="true" />
                  </button>
                  {open && (
                    <div className="mega" id={`mega-${i}`}>
                      {g.links.map((l) => (
                        <SmartLink key={l.href} href={l.href} className="mega__link" aria-current={isCurrent(pathname, l.href) ? "page" : undefined}>
                          <span className="icon-tile">
                            <Icon name={l.icon} size={19} />
                          </span>
                          <span>
                            <b>{l.label}</b>
                            <span>{l.description}</span>
                          </span>
                        </SmartLink>
                      ))}
                      {g.feature && (
                        <div className="mega__feature">
                          <span>
                            <b style={{ display: "block", fontWeight: 500 }}>{g.feature.title}</b>
                            <span className="muted small">{g.feature.text}</span>
                          </span>
                          <SmartLink href={g.feature.href} className="btn btn--primary btn--sm">
                            {g.feature.cta} <ArrowRight size={16} aria-hidden="true" />
                          </SmartLink>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
            <Link href="/abhi-intro" className={`nav-link nav-link--ipo${isCurrent(pathname, "/abhi-intro") ? " is-current" : ""}`}>
              IPO
            </Link>
          </nav>

          <div className="header-actions">
            <a className="btn btn--secondary btn--sm hide-tablet" href={SITE.apps.android} target="_blank" rel="noopener noreferrer">
              <Lock size={15} aria-hidden="true" /> ABHIBank App
            </a>
            <Link className="btn btn--primary btn--sm hide-mobile" href="/online-application">
              Online application
            </Link>
            <button type="button" className="icon-btn menu-toggle" aria-label={drawer ? "Close menu" : "Open menu"} aria-expanded={drawer} aria-controls="mobile-drawer" onClick={() => setDrawer((d) => !d)}>
              {drawer ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {drawer && (
        <div className="drawer" id="mobile-drawer" role="dialog" aria-modal="true" aria-label="Site menu">
          {NAV.map((g, i) => (
            <div className="drawer__group" key={g.label}>
              <button type="button" className="drawer__group-btn" aria-expanded={drawerGroup === i} onClick={() => setDrawerGroup(drawerGroup === i ? null : i)}>
                {g.label}
                <ChevronDown size={18} style={{ transform: drawerGroup === i ? "rotate(180deg)" : undefined, transition: "transform .2s" }} aria-hidden="true" />
              </button>
              {drawerGroup === i && (
                <div className="drawer__links">
                  {g.links.map((l) => (
                    <SmartLink key={l.href} href={l.href} onClick={() => setDrawer(false)}>
                      {l.label}
                    </SmartLink>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="drawer__group">
            <Link href="/abhi-intro" className="drawer__group-btn" onClick={() => setDrawer(false)}>
              IPO
            </Link>
          </div>
          <div className="stack" style={{ gap: 12, marginTop: 28 }}>
            <Link href="/online-application" className="btn btn--primary btn--block btn--lg" onClick={() => setDrawer(false)}>
              Online application
            </Link>
            <a href={SITE.helplineHref} className="btn btn--secondary btn--block btn--lg">
              <Phone size={18} aria-hidden="true" /> Call {SITE.helpline}
            </a>
          </div>
        </div>
      )}
    </>
  );
}
