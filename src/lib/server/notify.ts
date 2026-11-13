import "server-only";
import type { FormDef } from "@/lib/forms";

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

/** Sends an e-mail copy of a submission through Resend when RESEND_API_KEY is configured. Never throws. */
export async function notify(def: FormDef, reference: string, values: Record<string, string>, attachmentName?: string) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.NOTIFY_EMAIL_TO;
  if (!key || !to) return { sent: false as const };
  const rows = def.fields
    .filter((f) => f.type !== "file")
    .map((f) => `<tr><td style="padding:6px 12px;color:#555">${esc(f.label)}</td><td style="padding:6px 12px">${esc(values[f.name] ?? "")}</td></tr>`)
    .join("");
  const html = `<h2 style="font-family:sans-serif">${esc(def.title)} — ${esc(reference)}</h2><table style="font-family:sans-serif;font-size:14px;border-collapse:collapse">${rows}</table>${
    attachmentName ? `<p style="font-family:sans-serif">Attachment stored: ${esc(attachmentName)}</p>` : ""
  }`;
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.NOTIFY_EMAIL_FROM ?? "ABHI Website <onboarding@resend.dev>",
        to: to.split(",").map((s) => s.trim()),
        subject: `[Website] ${def.title} ${reference}`,
        html,
        reply_to: values.email || values.officialEmail || undefined,
      }),
      signal: AbortSignal.timeout(8000),
    });
    return { sent: res.ok };
  } catch {
    return { sent: false as const };
  }
}
