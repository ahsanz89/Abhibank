import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";
import { Pool } from "pg";

export interface Submission {
  reference: string;
  formId: string;
  payload: Record<string, string>;
  attachment?: { name: string; type: string; size: number; data: Buffer } | null;
  ipHash: string | null;
  userAgent: string | null;
}

let pool: Pool | null = null;
let schemaReady: Promise<void> | null = null;

const SCHEMA = `
CREATE TABLE IF NOT EXISTS form_submissions (
  id            BIGSERIAL PRIMARY KEY,
  reference     TEXT UNIQUE NOT NULL,
  form_id       TEXT NOT NULL,
  payload       JSONB NOT NULL,
  attachment_name TEXT,
  attachment_type TEXT,
  attachment    BYTEA,
  ip_hash       TEXT,
  user_agent    TEXT,
  status        TEXT NOT NULL DEFAULT 'new',
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS form_submissions_form_created_idx ON form_submissions (form_id, created_at DESC);
`;

function getPool(): Pool | null {
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  if (!pool) {
    pool = new Pool({
      connectionString: url,
      max: 3,
      ssl: /localhost|127\.0\.0\.1/.test(url) ? undefined : { rejectUnauthorized: false },
    });
  }
  return pool;
}

export async function ensureSchema(p: Pool) {
  schemaReady ??= p.query(SCHEMA).then(() => undefined);
  return schemaReady;
}

export function storageMode(): "postgres" | "file" {
  return getPool() ? "postgres" : "file";
}

export async function saveSubmission(s: Submission): Promise<void> {
  const p = getPool();
  if (p) {
    await ensureSchema(p);
    await p.query(
      `INSERT INTO form_submissions (reference, form_id, payload, attachment_name, attachment_type, attachment, ip_hash, user_agent)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
      [s.reference, s.formId, JSON.stringify(s.payload), s.attachment?.name ?? null, s.attachment?.type ?? null, s.attachment?.data ?? null, s.ipHash, s.userAgent],
    );
    return;
  }
  // Fallback for local development / previews without a database.
  const dir = process.env.VERCEL ? "/tmp/abhi-data" : path.join(process.cwd(), ".data");
  await fs.mkdir(dir, { recursive: true });
  const record = {
    reference: s.reference,
    formId: s.formId,
    payload: s.payload,
    attachment: s.attachment ? { name: s.attachment.name, type: s.attachment.type, size: s.attachment.size } : null,
    ipHash: s.ipHash,
    createdAt: new Date().toISOString(),
  };
  await fs.appendFile(path.join(dir, "submissions.jsonl"), JSON.stringify(record) + "\n", "utf8");
  if (s.attachment) {
    await fs.writeFile(path.join(dir, `${s.reference}-${s.attachment.name.replace(/[^\w.-]/g, "_")}`), s.attachment.data);
  }
}
