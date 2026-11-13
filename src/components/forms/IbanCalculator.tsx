"use client";

import { Check, CircleAlert, Copy } from "lucide-react";
import { useId, useState } from "react";
import { generateIban, type AccountKind } from "@/lib/iban";

export function IbanCalculator() {
  const id = useId();
  const [kind, setKind] = useState<AccountKind>("branch");
  const [account, setAccount] = useState("");
  const [result, setResult] = useState<{ iban?: string; formatted?: string; error?: string } | null>(null);
  const [copied, setCopied] = useState(false);

  return (
    <form
      className="form"
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        setCopied(false);
        setResult(generateIban(kind, account));
      }}
    >
      <fieldset style={{ border: 0, padding: 0, margin: 0 }}>
        <legend className="field__label" style={{ marginBottom: 10 }}>
          Account type
        </legend>
        <div className="choice-cards">
          {(
            [
              ["branch", "ABHI Branch Account"],
              ["wallet", "ABHI Wallet Account"],
            ] as const
          ).map(([k, label]) => (
            <label className="choice-card" key={k}>
              <input
                type="radio"
                name="account-type"
                value={k}
                checked={kind === k}
                onChange={() => {
                  setKind(k);
                  setAccount("");
                  setResult(null);
                }}
              />
              {label}
            </label>
          ))}
        </div>
      </fieldset>
      <div className="field">
        <label htmlFor={`${id}-acct`} className="field__label">
          Account number
        </label>
        <input
          id={`${id}-acct`}
          className="input"
          inputMode="numeric"
          autoComplete="off"
          placeholder={kind === "branch" ? "e.g. 1234567890123456" : "e.g. 03001234567"}
          value={account}
          aria-invalid={result?.error ? true : undefined}
          aria-describedby={`${id}-help`}
          onChange={(e) => {
            setAccount(e.target.value.replace(/[^\d\s-]/g, ""));
            setResult(null);
          }}
        />
        <span className="hint" id={`${id}-help`}>
          {kind === "branch" ? "Enter your 16-digit ABHI branch account number." : "Enter your wallet number starting with 03, 92 or 0092."}
        </span>
      </div>
      <button type="submit" className="btn btn--primary btn--lg" style={{ justifySelf: "start" }}>
        Generate IBAN
      </button>
      <div aria-live="polite">
        {result?.error && (
          <div className="alert alert--error" role="alert">
            <CircleAlert size={18} aria-hidden="true" />
            <span>{result.error}</span>
          </div>
        )}
        {result?.formatted && (
          <div className="card card--pad" style={{ borderColor: "rgba(62,206,158,.6)", display: "flex", gap: 16, justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" }}>
            <span className="stack" style={{ gap: 4 }}>
              <span className="hint">Your IBAN</span>
              <b style={{ fontSize: "clamp(18px, 2.2vw, 24px)", letterSpacing: ".06em", fontWeight: 500, fontVariantNumeric: "tabular-nums" }}>{result.formatted}</b>
            </span>
            <button
              type="button"
              className="btn btn--secondary btn--sm"
              onClick={async () => {
                await navigator.clipboard?.writeText(result.iban!);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
            >
              {copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />} {copied ? "Copied" : "Copy IBAN"}
            </button>
          </div>
        )}
      </div>
    </form>
  );
}
