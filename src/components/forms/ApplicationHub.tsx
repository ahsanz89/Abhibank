"use client";

import Image from "next/image";
import { Banknote, PiggyBank, Smartphone } from "lucide-react";
import { useState } from "react";
import { useQueryParam } from "@/lib/hooks";
import { SmartForm } from "@/components/forms/SmartForm";
import { StoreBadges } from "@/components/sections/shared";

const OPTIONS = [
  { id: "wallet", icon: Smartphone, title: "Digital wallet account", text: "Open an ABHIBank App wallet in minutes — no minimum balance." },
  { id: "loan", icon: Banknote, title: "Apply for a loan", text: "Business, farming, gold-backed, home and vehicle finance." },
  { id: "deposit", icon: PiggyBank, title: "Deposit account", text: "Savings, current and term deposit accounts." },
] as const;

type Opt = (typeof OPTIONS)[number]["id"];

export function ApplicationHub() {
  const fromUrl = useQueryParam("product");
  const [chosen, setChosen] = useState<Opt | null>(null);
  const opt: Opt = chosen ?? (fromUrl === "wallet" || fromUrl === "loan" ? fromUrl : "deposit");
  const choose = (o: Opt) => {
    setChosen(o);
    const url = new URL(window.location.href);
    url.searchParams.set("product", o);
    window.history.replaceState(null, "", url);
  };
  return (
    <div className="stack" style={{ gap: 40 }}>
      <div className="grid grid-3" role="radiogroup" aria-label="What would you like to open?">
        {OPTIONS.map((o) => {
          const active = opt === o.id;
          return (
            <button
              key={o.id}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => choose(o.id)}
              className="card card--interactive card--pad"
              style={{ gap: 14, textAlign: "left", font: "inherit", borderColor: active ? "var(--brand)" : undefined, background: active ? "rgba(62,206,158,.07)" : undefined }}
            >
              <span className="cluster" style={{ justifyContent: "space-between" }}>
                <span className="icon-tile">
                  <o.icon size={20} strokeWidth={1.6} aria-hidden="true" />
                </span>
                <span aria-hidden="true" style={{ width: 22, height: 22, borderRadius: "50%", border: `2px solid ${active ? "var(--brand)" : "var(--line-strong)"}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {active && <span style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--brand)" }} />}
                </span>
              </span>
              <b style={{ fontWeight: 500, fontSize: 19 }}>{o.title}</b>
              <span className="muted small" style={{ fontWeight: 300 }}>
                {o.text}
              </span>
            </button>
          );
        })}
      </div>

      <div className="card card--pad card--solid">
        {opt === "wallet" && (
          <div className="split">
            <div className="stack" style={{ gap: 20 }}>
              <h2 className="h3">Open your digital wallet in the ABHIBank App</h2>
              <p className="body">Download the app, verify your CNIC and mobile number, and your wallet account is ready in about a minute — from anywhere in Pakistan, with no minimum balance.</p>
              <StoreBadges />
            </div>
            <Image src="/assets/app/phones.webp" alt="ABHIBank App screens" width={768} height={668} sizes="(max-width: 960px) 100vw, 40vw" style={{ width: "100%", maxWidth: 420, marginInline: "auto" }} />
          </div>
        )}
        {opt === "loan" && (
          <div className="stack" style={{ gap: 24 }}>
            <h2 className="h3">Apply for a loan</h2>
            <SmartForm formId="loan-application" submitLabel="Submit application" footnote="*You are not eligible for a Gold Loan (Sunheri Karza) if you do not own gold." />
          </div>
        )}
        {opt === "deposit" && (
          <div className="stack" style={{ gap: 24 }}>
            <h2 className="h3">Deposit online application</h2>
            <SmartForm formId="deposit-application" submitLabel="Submit application" footnote="A representative from your nearest branch will call you to complete account opening." />
          </div>
        )}
      </div>
    </div>
  );
}
