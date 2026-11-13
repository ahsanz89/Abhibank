// Creates the form_submissions table in Postgres.
// Usage: DATABASE_URL=postgres://… npm run db:migrate
// The API also creates the table on first write, so this is optional —
// run it once after provisioning a database to fail fast on bad credentials.
import pg from "pg";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL is not set — nothing to migrate (submissions will be stored as JSONL files).");
  process.exit(1);
}

const SQL = `
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

const client = new pg.Client({
  connectionString: url,
  ssl: /localhost|127\.0\.0\.1/.test(url) ? undefined : { rejectUnauthorized: false },
});

try {
  await client.connect();
  await client.query(SQL);
  const { rows } = await client.query("SELECT count(*)::int AS n FROM form_submissions");
  console.log(`✓ form_submissions ready (${rows[0].n} rows)`);
} catch (err) {
  console.error("Migration failed:", err.message);
  process.exitCode = 1;
} finally {
  await client.end();
}
