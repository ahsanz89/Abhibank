"use client";

import { Download, FileText, Search } from "lucide-react";
import { useMemo, useState } from "react";
import type { DocumentItem } from "@/lib/content";
import { legacyAsset } from "@/lib/site";

const PAGE = 20;

export function DocumentCentre({ docs }: { docs: DocumentItem[] }) {
  const categories = useMemo(() => {
    const order = ["IPO", "Financial reports", "Schedule of charges", "Rates & pricing", "Policies & disclosures", "Tenders & notices"];
    return order.filter((c) => docs.some((d) => d.category === c));
  }, [docs]);
  const years = useMemo(() => [...new Set(docs.map((d) => d.year).filter(Boolean) as number[])].sort((a, b) => b - a), [docs]);
  const [cat, setCat] = useState("All");
  const [year, setYear] = useState("All");
  const [lang, setLang] = useState("All");
  const [q, setQ] = useState("");
  const [limit, setLimit] = useState(PAGE);

  const filtered = docs.filter(
    (d) =>
      (cat === "All" || d.category === cat) &&
      (year === "All" || String(d.year) === year) &&
      (lang === "All" || d.language === lang) &&
      (!q || d.title.toLowerCase().includes(q.toLowerCase())),
  );
  const reset = () => setLimit(PAGE);

  return (
    <div className="doc-layout">
      <aside className="doc-filters" aria-label="Filter documents">
        <div className="stack" style={{ gap: 8 }}>
          <span className="overline" style={{ color: "var(--text-muted)" }}>
            Category
          </span>
          {["All", ...categories].map((c) => (
            <button
              key={c}
              type="button"
              className="doc-cat"
              aria-pressed={cat === c}
              onClick={() => {
                setCat(c);
                reset();
              }}
            >
              {c === "All" ? "All documents" : c}
              <span className="muted small">{c === "All" ? docs.length : docs.filter((d) => d.category === c).length}</span>
            </button>
          ))}
        </div>
        <label className="field">
          <span className="overline" style={{ color: "var(--text-muted)" }}>
            Year
          </span>
          <select
            className="select"
            value={year}
            onChange={(e) => {
              setYear(e.target.value);
              reset();
            }}
          >
            <option value="All">All years</option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </label>
        <div className="stack" style={{ gap: 10 }}>
          <span className="overline" style={{ color: "var(--text-muted)" }}>
            Language
          </span>
          <div className="segmented" role="group" aria-label="Language">
            {["All", "English", "Urdu"].map((l) => (
              <button
                key={l}
                type="button"
                className="chip"
                aria-pressed={lang === l}
                onClick={() => {
                  setLang(l);
                  reset();
                }}
              >
                {l === "Urdu" ? "اردو" : l}
              </button>
            ))}
          </div>
        </div>
      </aside>

      <div className="stack" style={{ gap: 20, minWidth: 0 }}>
        <label className="search">
          <Search size={20} aria-hidden="true" />
          <span className="visually-hidden">Search documents</span>
          <input
            type="search"
            placeholder={`Search ${docs.length} documents`}
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              reset();
            }}
          />
        </label>
        <div className="card" style={{ overflow: "hidden" }}>
          <div className="cluster" style={{ justifyContent: "space-between", padding: "18px 24px", borderBottom: "1px solid var(--line)" }}>
            <b style={{ fontWeight: 500 }} aria-live="polite">
              {filtered.length} {filtered.length === 1 ? "document" : "documents"}
            </b>
            <span className="hint">Newest first</span>
          </div>
          {filtered.length === 0 ? (
            <div className="stack" style={{ alignItems: "center", textAlign: "center", gap: 12, padding: "56px 24px" }}>
              <Search size={30} className="muted" aria-hidden="true" />
              <b style={{ fontWeight: 500 }}>No documents match your filters</b>
              <button
                type="button"
                className="btn btn--secondary btn--sm"
                onClick={() => {
                  setCat("All");
                  setYear("All");
                  setLang("All");
                  setQ("");
                }}
              >
                Clear filters
              </button>
            </div>
          ) : (
            <ul>
              {filtered.slice(0, limit).map((d) => (
                <li key={d.url + d.title} className="doc-row">
                  <span className="icon-tile">
                    <FileText size={20} strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <span className="stack" style={{ gap: 8, flex: "1 1 300px", minWidth: 0 }}>
                    <span style={{ fontWeight: 400, lineHeight: 1.45 }}>{d.title}</span>
                    <span className="cluster" style={{ gap: 8 }}>
                      <span className="badge badge--accent">{d.category}</span>
                      <span className="badge badge--neutral">{d.language}</span>
                      {d.year && <span className="hint">{d.year}</span>}
                      <span className="hint">· {d.type}</span>
                    </span>
                  </span>
                  <a className="btn btn--secondary btn--sm" href={legacyAsset(d.url)} target="_blank" rel="noopener noreferrer" aria-label={`Download ${d.title} (${d.type})`}>
                    <Download size={16} aria-hidden="true" /> Download
                  </a>
                </li>
              ))}
            </ul>
          )}
          {filtered.length > limit && (
            <div className="cluster" style={{ justifyContent: "center", padding: 24, borderTop: "1px solid var(--line)" }}>
              <button type="button" className="btn btn--secondary" onClick={() => setLimit((l) => l + PAGE)}>
                Load more ({filtered.length - limit} remaining)
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
