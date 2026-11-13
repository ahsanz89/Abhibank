"use client";

import { Accessibility, CreditCard, LocateFixed, MapPin, Phone, Search } from "lucide-react";
import { useMemo, useState } from "react";
import type { Atm, Region } from "@/lib/content";
import { SITE } from "@/lib/site";

type Mode = "branches" | "atms";
interface Place {
  key: string;
  title: string;
  address: string;
  region?: string;
  phones?: string[];
  meta?: string;
  accessible?: boolean;
}

const mapUrl = (q: string) => `https://maps.google.com/maps?q=${encodeURIComponent(q)}&t=m&z=14&output=embed`;
const directions = (q: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

export function Locator({ regions, atms, initial }: { regions: Region[]; atms: Atm[]; initial: Mode }) {
  const [mode, setMode] = useState<Mode>(initial);
  const [region, setRegion] = useState("All");
  const [q, setQ] = useState("");
  const [accessibleOnly, setAccessibleOnly] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [geo, setGeo] = useState<"idle" | "busy" | "denied">("idle");

  const accessibleCities = useMemo(() => {
    const acc = regions.find((r) => r.region.startsWith("Accessible"));
    return (acc?.branches ?? []).map((b) => b.address.toLowerCase());
  }, [regions]);

  const branchPlaces: Place[] = useMemo(
    () =>
      regions
        .filter((r) => !r.region.startsWith("Accessible"))
        .flatMap((r) =>
          r.branches.map((b, i) => ({
            key: `${r.region}-${b.city}-${i}`,
            title: b.city,
            address: b.address,
            region: r.region,
            phones: b.phones,
            accessible: accessibleCities.some((a) => a.includes(b.city.toLowerCase().split(" ")[0])),
          })),
        ),
    [regions, accessibleCities],
  );
  const atmPlaces: Place[] = useMemo(() => atms.map((a) => ({ key: a.id + a.address, title: `${a.city} ATM`, address: a.address, meta: `ATM ID ${a.id} · ${a.type}`, region: a.city })), [atms]);

  const regionNames = regions.filter((r) => !r.region.startsWith("Accessible")).map((r) => r.region);
  const list = (mode === "branches" ? branchPlaces : atmPlaces).filter(
    (p) =>
      (mode === "atms" || region === "All" || p.region === region) &&
      (!accessibleOnly || mode === "atms" || p.accessible) &&
      (!q || `${p.title} ${p.address} ${p.meta ?? ""}`.toLowerCase().includes(q.toLowerCase())),
  );
  const current = list.find((p) => p.key === selected) ?? list[0];

  const filterKey = `${mode}|${region}|${q}|${accessibleOnly}`;
  const [lastKey, setLastKey] = useState(filterKey);
  if (filterKey !== lastKey) {
    setLastKey(filterKey);
    setSelected(null);
  }

  const useLocation = () => {
    if (!navigator.geolocation) return setGeo("denied");
    setGeo("busy");
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const r = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&zoom=10`, { headers: { Accept: "application/json" } });
          const j = await r.json();
          const city: string = j.address?.city || j.address?.town || j.address?.county || "";
          setQ(city.replace(/ (District|City)$/i, ""));
          setGeo("idle");
        } catch {
          setGeo("denied");
        }
      },
      () => setGeo("denied"),
      { timeout: 8000 },
    );
  };

  return (
    <div className="stack" style={{ gap: 28 }}>
      <div className="stack" style={{ gap: 16 }}>
        <div className="cluster" style={{ gap: 12 }}>
          <div className="segmented" role="tablist" aria-label="Location type">
            {(
              [
                ["branches", "Branches"],
                ["atms", "ATMs"],
              ] as const
            ).map(([m, l]) => (
              <button key={m} type="button" role="tab" className="chip" aria-selected={mode === m} onClick={() => setMode(m)}>
                {l}
              </button>
            ))}
          </div>
          <label className="search" style={{ flex: "1 1 320px", height: 48 }}>
            <Search size={18} aria-hidden="true" />
            <span className="visually-hidden">Search by city or area</span>
            <input type="search" placeholder={mode === "branches" ? "Search by city or area" : "Search by city, area or ATM ID"} value={q} onChange={(e) => setQ(e.target.value)} />
          </label>
          <button type="button" className="btn btn--secondary btn--sm" onClick={useLocation} aria-busy={geo === "busy"}>
            <LocateFixed size={16} aria-hidden="true" /> {geo === "busy" ? "Locating…" : "Use my location"}
          </button>
        </div>
        {mode === "branches" && (
          <div className="cluster" style={{ gap: 10 }}>
            <div className="chip-row" role="group" aria-label="Filter by region" style={{ flex: "1 1 auto" }}>
              {["All", ...regionNames].map((r) => (
                <button key={r} type="button" className="chip" aria-pressed={region === r} onClick={() => setRegion(r)}>
                  {r === "All" ? "All regions" : r}
                </button>
              ))}
            </div>
            <label className="choice" style={{ alignItems: "center" }}>
              <input type="checkbox" checked={accessibleOnly} onChange={(e) => setAccessibleOnly(e.target.checked)} />
              <Accessibility size={16} aria-hidden="true" /> Accessible model branches (PWD)
            </label>
          </div>
        )}
        {geo === "denied" && <p className="hint">We couldn’t get your location. Type your city instead.</p>}
      </div>

      <div className="locator">
        <div className="stack" style={{ gap: 12 }}>
          <p className="muted small" aria-live="polite">
            <b style={{ color: "#fff", fontWeight: 500 }}>{list.length}</b> {mode === "branches" ? (list.length === 1 ? "branch" : "branches") : list.length === 1 ? "ATM" : "ATMs"} found
          </p>
          {list.length === 0 ? (
            <div className="card card--pad stack" style={{ alignItems: "center", textAlign: "center", gap: 10, borderStyle: "dashed" }}>
              <MapPin size={28} className="muted" aria-hidden="true" />
              <b style={{ fontWeight: 500 }}>No results</b>
              <p className="muted small">Try a different city, or call {SITE.helpline}.</p>
            </div>
          ) : (
            <ul className="locator__list">
              {list.map((p) => {
                const active = current?.key === p.key;
                return (
                  <li key={p.key}>
                    <div className="card locator__item" style={active ? { borderColor: "rgba(62,206,158,.6)", background: "rgba(62,206,158,.05)" } : undefined}>
                      <span className="icon-tile">{mode === "branches" ? <MapPin size={19} aria-hidden="true" /> : <CreditCard size={19} aria-hidden="true" />}</span>
                      <div className="stack" style={{ gap: 6, flex: 1, minWidth: 0 }}>
                        <div className="cluster" style={{ justifyContent: "space-between", gap: 8 }}>
                          <button type="button" onClick={() => setSelected(p.key)} style={{ background: "none", border: 0, padding: 0, color: "#fff", fontWeight: 500, fontSize: 17, textAlign: "left" }} aria-pressed={active}>
                            {p.title}
                          </button>
                          {mode === "atms" ? <span className="badge">Operational</span> : p.accessible && <span className="badge badge--accent">Accessible</span>}
                        </div>
                        <span className="muted small" style={{ fontWeight: 300 }}>
                          {p.address}
                          {mode === "branches" && p.region ? ` · ${p.region}` : ""}
                        </span>
                        {p.meta && <span className="hint">{p.meta}</span>}
                        <div className="cluster" style={{ gap: 16, fontSize: 14, marginTop: 4 }}>
                          {p.phones?.map((t) => (
                            <a key={t} href={`tel:${t.replace(/[^\d]/g, "").slice(0, 11)}`} className="cluster" style={{ gap: 6 }}>
                              <Phone size={14} aria-hidden="true" /> {t}
                            </a>
                          ))}
                          <a href={directions(`${p.address}, ${p.title.replace(" ATM", "")}, Pakistan`)} target="_blank" rel="noopener noreferrer">
                            Directions
                          </a>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        <div className="locator__map">
          {current ? (
            <iframe key={current.key} src={mapUrl(`${current.address}, ${current.title.replace(" ATM", "")}, Pakistan`)} title={`Map: ${current.title}`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          ) : (
            <iframe src={SITE.mapsEmbed} title="Map: ABHI head office" loading="lazy" />
          )}
        </div>
      </div>
    </div>
  );
}
