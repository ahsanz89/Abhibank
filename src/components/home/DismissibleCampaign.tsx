"use client";

import { ArrowRight, TrendingUp, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useNow, useStoredFlag } from "@/lib/hooks";
import { SITE, legacyAsset } from "@/lib/site";

const KEY = "abhi-campaign-ipo-2026";
const SUBSCRIPTION_END = Date.UTC(2026, 10, 13, 19, 0); // 13 Nov 2026, midnight PKT

export function DismissibleCampaign() {
  const stored = useStoredFlag(KEY);
  const [dismissed, setHidden] = useState(false);
  const now = useNow();
  const live = now === null || now < SUBSCRIPTION_END;
  if (stored || dismissed) return null;
  return (
    <div className="container campaign">
      <div className="card campaign__card" role="region" aria-label="IPO announcement">
        <span className="badge">
          <TrendingUp size={13} aria-hidden="true" /> IPO
        </span>
        <p style={{ flex: "1 1 320px", fontSize: 15, lineHeight: 1.5 }}>
          {live ? (
            <>
              <b style={{ fontWeight: 500 }}>Public subscription is live: 12–13 November 2026.</b>{" "}
              <span className="muted">The IPO of ABHI Microfinance Bank — subscribe through PSX e-IPO.</span>
            </>
          ) : (
            <>
              <b style={{ fontWeight: 500 }}>ABHI Microfinance Bank is going public on the Pakistan Stock Exchange.</b>{" "}
              <span className="muted">Read the prospectus and IPO details.</span>
            </>
          )}
        </p>
        <div className="cluster" style={{ gap: 10 }}>
          <a className="btn btn--secondary btn--sm" href={legacyAsset("https://abhibank.com/wp-content/uploads/2026/10/ABHI-Updated-Prospectus-Final_compressed.pdf")} target="_blank" rel="noopener noreferrer">
            Prospectus
          </a>
          {live ? (
            <a className="btn btn--primary btn--sm" href={SITE.psxEipo} target="_blank" rel="noopener noreferrer">
              Subscribe now <ArrowRight size={16} aria-hidden="true" />
            </a>
          ) : (
            <Link className="btn btn--primary btn--sm" href="/abhi-intro">
              IPO details <ArrowRight size={16} aria-hidden="true" />
            </Link>
          )}
          <button
            type="button"
            className="icon-btn"
            aria-label="Dismiss announcement"
            onClick={() => {
              setHidden(true);
              try {
                window.localStorage.setItem(KEY, "1");
              } catch {
                /* ignore */
              }
            }}
          >
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
