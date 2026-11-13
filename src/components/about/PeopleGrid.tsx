"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useCallback, useState } from "react";
import { Modal } from "@/components/ui/interactive";
import type { Person } from "@/lib/content";

export function PeopleGrid({ people }: { people: Person[] }) {
  const [open, setOpen] = useState<Person | null>(null);
  const close = useCallback(() => setOpen(null), []);
  return (
    <>
      <div className="grid grid-4">
        {people.map((p) => (
          <button key={p.slug} type="button" className="card card--interactive person-card" onClick={() => p.bio.length && setOpen(p)} disabled={!p.bio.length} aria-haspopup="dialog">
            <Image src={p.image} alt={p.name} width={360} height={360} className="person-card__img" sizes="(max-width: 720px) 100vw, 25vw" />
            <span className="stack" style={{ gap: 4 }}>
              <span className="person-card__name">{p.name}</span>
              <span className="person-card__role">{p.role}</span>
            </span>
            {p.bio.length > 0 && (
              <span className="link-arrow" style={{ fontSize: 14 }}>
                Read bio <ArrowRight size={15} aria-hidden="true" />
              </span>
            )}
          </button>
        ))}
      </div>
      <Modal open={!!open} onClose={close} label={open ? `${open.name} — biography` : "Biography"}>
        {open && (
          <div className="stack" style={{ gap: 24 }}>
            <div className="cluster" style={{ gap: 20, flexWrap: "nowrap", alignItems: "center", paddingRight: 48 }}>
              <Image src={open.image} alt="" width={120} height={120} style={{ width: 96, height: 96, objectFit: "contain", borderRadius: 18, background: "var(--navy-800)" }} />
              <div className="stack" style={{ gap: 6 }}>
                <h2 className="h3">{open.name}</h2>
                <p className="accent" style={{ fontWeight: 500, fontSize: 15 }}>
                  {open.role}
                </p>
              </div>
            </div>
            <div className="prose">
              {open.bio.map((b) => (
                <p key={b}>{b}</p>
              ))}
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
