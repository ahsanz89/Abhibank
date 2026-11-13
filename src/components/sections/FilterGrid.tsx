"use client";

import { useState } from "react";
import { useQueryParam } from "@/lib/hooks";
import { ProductCard } from "@/components/sections/shared";

export interface FilterItem {
  href: string;
  image: string;
  title: string;
  text: string;
  badge?: string;
  cats: string[];
  cta?: string;
}

/** Chip filter + product grid. Reads an optional ?need= / ?type= query value for deep links. */
export function FilterGrid({ filters, items, param, columns = 4, label }: { filters: { id: string; label: string }[]; items: FilterItem[]; param: string; columns?: 3 | 4; label: string }) {
  const fromUrl = useQueryParam(param);
  const [chosen, setActive] = useState<string | null>(null);
  const active = chosen ?? (fromUrl && filters.some((f) => f.id === fromUrl) ? fromUrl : "all");
  const shown = active === "all" ? items : items.filter((i) => i.cats.includes(active));
  return (
    <div className="stack" style={{ gap: 32 }}>
      <div className="chip-row" role="group" aria-label={label}>
        {[{ id: "all", label: "All" }, ...filters].map((f) => (
          <button
            key={f.id}
            type="button"
            className="chip"
            aria-pressed={active === f.id}
            onClick={() => {
              setActive(f.id);
              const url = new URL(window.location.href);
              if (f.id === "all") url.searchParams.delete(param);
              else url.searchParams.set(param, f.id);
              window.history.replaceState(null, "", url);
            }}
          >
            {f.label}
            <span className="muted" style={{ fontSize: 12 }}>
              {f.id === "all" ? items.length : items.filter((i) => i.cats.includes(f.id)).length}
            </span>
          </button>
        ))}
      </div>
      <p className="visually-hidden" aria-live="polite">
        Showing {shown.length} products
      </p>
      <div className={`grid grid-${columns}`}>
        {shown.map((i) => (
          <ProductCard key={i.href} href={i.href} image={i.image} title={i.title} text={i.text} badge={i.badge} cta={i.cta ?? "View details"} />
        ))}
      </div>
    </div>
  );
}
