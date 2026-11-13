"use client";

import Image from "next/image";
import { useState } from "react";

export interface Milestone {
  year: string;
  text: string;
  image: string;
}

export function HistoryExplorer({ milestones }: { milestones: Milestone[] }) {
  const [i, setI] = useState(milestones.length - 1);
  const m = milestones[i];
  return (
    <div className="stack" style={{ gap: 48 }}>
      <div className="chip-row" role="tablist" aria-label="Milestone years">
        {milestones.map((x, k) => (
          <button
            key={x.year}
            type="button"
            role="tab"
            aria-selected={k === i}
            aria-controls="milestone-panel"
            className="chip"
            onClick={() => setI(k)}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") setI(Math.min(milestones.length - 1, i + 1));
              if (e.key === "ArrowLeft") setI(Math.max(0, i - 1));
            }}
          >
            {x.year}
          </button>
        ))}
      </div>
      <div id="milestone-panel" role="tabpanel" aria-live="polite" className="split" style={{ alignItems: "center" }}>
        <div className="stack" style={{ gap: 24 }}>
          <span className="history-year">{m.year}</span>
          <p className="h3" style={{ fontWeight: 400, lineHeight: 1.35 }}>
            {m.text}
          </p>
        </div>
        <div className="card" style={{ aspectRatio: "4 / 3", display: "flex", alignItems: "center", justifyContent: "center", padding: 32, background: "radial-gradient(circle at 50% 45%, rgba(62,206,158,.14), transparent 70%), var(--navy-900)" }}>
          <Image key={m.image} src={m.image} alt="" width={700} height={520} style={{ maxHeight: "100%", width: "auto", objectFit: "contain" }} />
        </div>
      </div>
      <div className="progress" aria-hidden="true">
        <span style={{ width: `${((i + 1) / milestones.length) * 100}%` }} />
      </div>
    </div>
  );
}
