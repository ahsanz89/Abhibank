"use client";

import { CircleAlert, CircleCheck, LoaderCircle, Upload } from "lucide-react";
import { useId, useRef, useState, type FormEvent } from "react";
import { ATTACHMENT, FORMS, validateField, type FieldDef, type FormId } from "@/lib/forms";

type Status = { kind: "idle" } | { kind: "submitting" } | { kind: "success"; reference: string } | { kind: "error"; message: string };

export function SmartForm({
  formId,
  initial = {},
  submitLabel = "Submit",
  hideFields = [],
  footnote,
}: {
  formId: FormId;
  initial?: Record<string, string>;
  submitLabel?: string;
  hideFields?: string[];
  footnote?: React.ReactNode;
}) {
  const def = FORMS[formId];
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState<Record<string, string>>(() => Object.fromEntries(def.fields.map((f) => [f.name, initial[f.name] ?? ""])));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [fileName, setFileName] = useState("");
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const fields = def.fields.filter((f) => !hideFields.includes(f.name));

  const set = (f: FieldDef, v: string) => {
    setValues((s) => ({ ...s, [f.name]: v }));
    if (touched[f.name]) setErrors((e) => ({ ...e, [f.name]: validateField(f, v) ?? "" }));
  };
  const blur = (f: FieldDef) => {
    setTouched((t) => ({ ...t, [f.name]: true }));
    setErrors((e) => ({ ...e, [f.name]: validateField(f, values[f.name] ?? "") ?? "" }));
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const next: Record<string, string> = {};
    for (const f of fields) {
      if (f.type === "file") continue;
      const err = validateField(f, values[f.name] ?? "");
      if (err) next[f.name] = err;
    }
    const fileInput = formRef.current?.querySelector<HTMLInputElement>('input[type="file"]');
    const file = fileInput?.files?.[0];
    if (file && file.size > ATTACHMENT.maxBytes) next.attachment = "Files must be 4 MB or smaller.";
    setErrors(next);
    setTouched(Object.fromEntries(fields.map((f) => [f.name, true])));
    if (Object.values(next).some(Boolean)) {
      const first = fields.find((f) => next[f.name]);
      if (first) document.getElementById(`${uid}-${first.name}`)?.focus();
      setStatus({ kind: "error", message: "Please correct the highlighted fields." });
      return;
    }
    setStatus({ kind: "submitting" });
    const body = new FormData(formRef.current!);
    for (const [k, v] of Object.entries(values)) if (!body.has(k)) body.set(k, v);
    try {
      const res = await fetch(`/api/forms/${formId}`, { method: "POST", body });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.reference) {
        setStatus({ kind: "success", reference: json.reference });
        formRef.current?.closest("section, .card")?.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      if (json.errors) setErrors(json.errors);
      setStatus({ kind: "error", message: json.error ?? "Something went wrong. Please try again." });
    } catch {
      setStatus({ kind: "error", message: "We couldn’t reach the server. Check your connection and try again." });
    }
  }

  if (status.kind === "success") {
    return (
      <div className="stack" style={{ gap: 18, alignItems: "flex-start", padding: "12px 0" }} role="status" aria-live="polite">
        <span className="icon-tile" style={{ width: 64, height: 64, borderRadius: 20, background: "rgba(62,206,158,.12)" }}>
          <CircleCheck size={30} />
        </span>
        <h3 className="h3">{def.successTitle}</h3>
        <p className="body">{def.successText}</p>
        <p className="body">
          Reference number: <b style={{ color: "#fff", letterSpacing: ".04em" }}>{status.reference}</b>
        </p>
        <button
          type="button"
          className="btn btn--secondary"
          onClick={() => {
            setValues(Object.fromEntries(def.fields.map((f) => [f.name, initial[f.name] ?? ""])));
            setTouched({});
            setErrors({});
            setFileName("");
            setStatus({ kind: "idle" });
          }}
        >
          Submit another
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} className="form" noValidate onSubmit={onSubmit} aria-describedby={status.kind === "error" ? `${uid}-status` : undefined}>
      <div className="honeypot" aria-hidden="true">
        <label>
          Website <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div className="form-grid">
        {fields.map((f) => {
          const id = `${uid}-${f.name}`;
          const err = touched[f.name] ? errors[f.name] : "";
          const required = f.rules?.includes("required");
          const common = {
            id,
            name: f.name,
            "aria-invalid": err ? true : undefined,
            "aria-describedby": err ? `${id}-err` : f.hint ? `${id}-hint` : undefined,
            "aria-required": required || undefined,
          };
          const label = (
            <span className="field__label">
              {f.label}
              {required && <span className="req" aria-hidden="true">*</span>}
            </span>
          );
          let control: React.ReactNode;
          if (f.type === "select") {
            control = (
              <select {...common} className="select" value={values[f.name]} onChange={(e) => set(f, e.target.value)} onBlur={() => blur(f)}>
                <option value="">Select…</option>
                {f.options!.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            );
          } else if (f.type === "textarea") {
            control = <textarea {...common} className="textarea" value={values[f.name]} placeholder={f.placeholder} onChange={(e) => set(f, e.target.value)} onBlur={() => blur(f)} />;
          } else if (f.type === "radio") {
            return (
              <fieldset key={f.name} className={`field${f.span === 2 ? " span-2" : ""}`} style={{ border: 0, padding: 0, margin: 0 }} aria-describedby={err ? `${id}-err` : undefined}>
                <legend className="field__label" style={{ marginBottom: 8 }}>
                  {f.label}
                  {required && <span className="req" aria-hidden="true">*</span>}
                </legend>
                <div className="choice-cards">
                  {f.options!.map((o) => (
                    <label className="choice-card" key={o}>
                      <input type="radio" name={f.name} value={o} checked={values[f.name] === o} onChange={() => { set(f, o); setTouched((t) => ({ ...t, [f.name]: true })); setErrors((e) => ({ ...e, [f.name]: "" })); }} />
                      {o}
                    </label>
                  ))}
                </div>
                {err && (
                  <span className="field__error" id={`${id}-err`}>
                    <CircleAlert size={14} aria-hidden="true" /> {err}
                  </span>
                )}
              </fieldset>
            );
          } else if (f.type === "file") {
            control = (
              <label className="choice-card" style={{ cursor: "pointer", borderStyle: "dashed" }}>
                <Upload size={18} className="accent" aria-hidden="true" />
                <span>{fileName || "Choose a file"}</span>
                <input
                  {...common}
                  type="file"
                  className="visually-hidden"
                  accept=".pdf,.jpg,.jpeg,.png,.docx"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    setFileName(file ? `${file.name} (${Math.round(file.size / 1024)} KB)` : "");
                    setErrors((x) => ({ ...x, attachment: file && file.size > ATTACHMENT.maxBytes ? "Files must be 4 MB or smaller." : "" }));
                    setTouched((t) => ({ ...t, attachment: true }));
                  }}
                />
              </label>
            );
          } else {
            control = (
              <input
                {...common}
                className="input"
                type={f.type}
                value={values[f.name]}
                placeholder={f.placeholder}
                autoComplete={f.autoComplete}
                inputMode={f.inputMode}
                min={f.min}
                max={f.max}
                onChange={(e) => set(f, e.target.value)}
                onBlur={() => blur(f)}
              />
            );
          }
          return (
            <div className={`field${f.span === 2 ? " span-2" : ""}`} key={f.name}>
              {f.type === "file" ? <span className="field__label">{f.label}</span> : <label htmlFor={id}>{label}</label>}
              {control}
              {err ? (
                <span className="field__error" id={`${id}-err`}>
                  <CircleAlert size={14} aria-hidden="true" /> {err}
                </span>
              ) : (
                f.hint && (
                  <span className="hint" id={`${id}-hint`}>
                    {f.hint}
                  </span>
                )
              )}
            </div>
          );
        })}
      </div>
      {status.kind === "error" && (
        <div className="alert alert--error" role="alert" id={`${uid}-status`}>
          <CircleAlert size={18} aria-hidden="true" />
          <span>{status.message}</span>
        </div>
      )}
      <div className="cluster" style={{ justifyContent: "space-between", gap: 16 }}>
        {footnote ? <p className="hint" style={{ maxWidth: 460 }}>{footnote}</p> : <span />}
        <button type="submit" className="btn btn--primary btn--lg" disabled={status.kind === "submitting"} aria-busy={status.kind === "submitting"}>
          {status.kind === "submitting" ? (
            <>
              <LoaderCircle size={18} className="spin" aria-hidden="true" /> Sending…
            </>
          ) : (
            submitLabel
          )}
        </button>
      </div>
    </form>
  );
}
