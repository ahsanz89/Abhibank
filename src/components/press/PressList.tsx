"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import type { PressRelease } from "@/lib/content";

const fmt = (iso: string) => new Date(iso + "T00:00:00Z").toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

export function PressList({ items }: { items: PressRelease[] }) {
  const years = [...new Set(items.map((p) => p.date.slice(0, 4)))];
  const [year, setYear] = useState("All");
  const shown = year === "All" ? items : items.filter((p) => p.date.startsWith(year));
  const [first, ...rest] = shown;
  return (
    <div className="stack" style={{ gap: 40 }}>
      <div className="chip-row" role="group" aria-label="Filter by year">
        {["All", ...years, "2025"].filter((y, i, a) => a.indexOf(y) === i).map((y) => (
          <button key={y} type="button" className="chip" aria-pressed={year === y} onClick={() => setYear(y)}>
            {y}
          </button>
        ))}
      </div>
      {!first ? (
        <div className="card card--pad" style={{ textAlign: "center" }}>
          <p className="muted">No press releases for {year} yet.</p>
        </div>
      ) : (
        <>
          <Link href={`/press-release/${first.slug}`} className="card card--interactive" style={{ overflow: "hidden" }}>
            <div className="split" style={{ gap: 0 }}>
              {first.image && (
                <span style={{ position: "relative", minHeight: 320, display: "block", background: "var(--navy-800)" }}>
                  <Image src={first.image} alt="" fill sizes="(max-width: 960px) 100vw, 50vw" style={{ objectFit: "cover" }} priority />
                </span>
              )}
              <span className="stack" style={{ gap: 18, padding: "clamp(28px, 4vw, 56px)" }}>
                <span className="cluster" style={{ gap: 10 }}>
                  <span className="badge">Latest</span>
                  <span className="hint">{fmt(first.date)}</span>
                </span>
                <span className="h2" style={{ fontSize: "clamp(30px, 3.4vw, 46px)" }}>
                  {first.headline}
                </span>
                <span className="body">{first.excerpt}…</span>
                <span className="link-arrow">
                  Read the release <ArrowRight size={16} aria-hidden="true" />
                </span>
              </span>
            </div>
          </Link>
          <div className="grid grid-3">
            {rest.map((p) => (
              <Link key={p.slug} href={`/press-release/${p.slug}`} className="card card--interactive" style={{ overflow: "hidden" }}>
                {p.image && (
                  <span style={{ position: "relative", aspectRatio: "16 / 10", display: "block", background: "var(--navy-800)" }}>
                    <Image src={p.image} alt="" fill sizes="(max-width: 720px) 100vw, 33vw" style={{ objectFit: "cover" }} />
                  </span>
                )}
                <span className="stack" style={{ gap: 12, padding: 28, flex: 1 }}>
                  <span className="hint">{fmt(p.date)}</span>
                  <span className="product-card__title" style={{ fontSize: 21 }}>
                    {p.title}
                  </span>
                  <span className="product-card__desc">{p.headline}</span>
                  <span className="link-arrow">
                    Read more <ArrowRight size={16} aria-hidden="true" />
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
