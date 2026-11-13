"use client";

import { useState } from "react";
import { ProductCard } from "@/components/sections/shared";

export interface TabProduct {
  href: string;
  image: string;
  title: string;
  text: string;
  badge?: string;
}

export function ProductTabs({ tabs }: { tabs: { label: string; products: TabProduct[] }[] }) {
  const [active, setActive] = useState(0);
  return (
    <div className="stack" style={{ gap: 36 }}>
      <div className="chip-row" role="tablist" aria-label="Product categories">
        {tabs.map((t, i) => (
          <button
            key={t.label}
            type="button"
            role="tab"
            id={`ptab-${i}`}
            aria-controls={`ppanel-${i}`}
            aria-selected={active === i}
            tabIndex={active === i ? 0 : -1}
            className="chip"
            onClick={() => setActive(i)}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                const n = (active + (e.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length;
                setActive(n);
                document.getElementById(`ptab-${n}`)?.focus();
              }
            }}
          >
            {t.label}
          </button>
        ))}
      </div>
      {tabs.map((t, i) => (
        <div key={t.label} role="tabpanel" id={`ppanel-${i}`} aria-labelledby={`ptab-${i}`} hidden={active !== i} className="grid grid-4">
          {t.products.map((p) => (
            <ProductCard key={p.href + p.title} {...p} />
          ))}
        </div>
      ))}
    </div>
  );
}
