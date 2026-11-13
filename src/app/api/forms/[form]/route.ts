import { createHash, randomBytes } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";
import { ATTACHMENT, FORMS, validateForm, type FormId } from "@/lib/forms";
import { saveSubmission, storageMode } from "@/lib/server/storage";
import { notify } from "@/lib/server/notify";

export const runtime = "nodejs";

const WINDOW_MS = 60_000;
const LIMIT = 6;
const hits = new Map<string, number[]>();

function rateLimited(key: string) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > LIMIT;
}

function reference(prefix: string) {
  const d = new Date();
  const ymd = `${String(d.getUTCFullYear()).slice(2)}${String(d.getUTCMonth() + 1).padStart(2, "0")}${String(d.getUTCDate()).padStart(2, "0")}`;
  return `ABHI-${prefix}-${ymd}-${randomBytes(3).toString("hex").toUpperCase()}`;
}

export async function GET(_req: NextRequest, ctx: RouteContext<"/api/forms/[form]">) {
  const { form } = await ctx.params;
  if (!(form in FORMS)) return NextResponse.json({ error: "Unknown form" }, { status: 404 });
  return NextResponse.json({ form, storage: storageMode(), status: "ok" });
}

export async function POST(req: NextRequest, ctx: RouteContext<"/api/forms/[form]">) {
  const { form } = await ctx.params;
  const def = FORMS[form as FormId];
  if (!def) return NextResponse.json({ error: "Unknown form" }, { status: 404 });

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
  const ipHash = createHash("sha256")
    .update(ip + (process.env.IP_HASH_SALT ?? "abhi"))
    .digest("hex")
    .slice(0, 32);
  if (rateLimited(`${form}:${ipHash}`)) {
    return NextResponse.json({ error: "Too many submissions. Please wait a minute and try again." }, { status: 429 });
  }

  let data: FormData;
  try {
    data = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot: real users never fill this hidden field.
  if (String(data.get("website") ?? "")) {
    return NextResponse.json({ ok: true, reference: reference(def.referencePrefix) });
  }

  const values: Record<string, string> = {};
  for (const f of def.fields) {
    if (f.type === "file") continue;
    const v = data.get(f.name);
    values[f.name] = typeof v === "string" ? v.trim().slice(0, 4000) : "";
  }
  const errors = validateForm(def, values);

  let attachment: { name: string; type: string; size: number; data: Buffer } | null = null;
  const fileField = def.fields.find((f) => f.type === "file");
  if (fileField) {
    const file = data.get(fileField.name);
    if (file && typeof file !== "string" && file.size > 0) {
      if (file.size > ATTACHMENT.maxBytes) errors[fileField.name] = "Files must be 4 MB or smaller.";
      else if (!ATTACHMENT.types.includes(file.type)) errors[fileField.name] = "Upload a PDF, JPG, PNG or DOCX file.";
      else attachment = { name: file.name.slice(0, 120), type: file.type, size: file.size, data: Buffer.from(await file.arrayBuffer()) };
    }
  }

  if (Object.keys(errors).length) {
    return NextResponse.json({ error: "Please correct the highlighted fields.", errors }, { status: 422 });
  }

  const ref = reference(def.referencePrefix);
  try {
    await saveSubmission({ reference: ref, formId: def.id, payload: values, attachment, ipHash, userAgent: req.headers.get("user-agent")?.slice(0, 300) ?? null });
  } catch (e) {
    console.error("[forms] save failed", e);
    return NextResponse.json({ error: "We couldn’t save your submission. Please try again or call (042) 111-111-562." }, { status: 503 });
  }
  await notify(def, ref, values, attachment?.name);
  return NextResponse.json({ ok: true, reference: ref }, { status: 201 });
}
