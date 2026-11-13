#!/usr/bin/env node
/**
 * Smoke test for a running build: crawls every page in the sitemap, follows
 * every internal link and asset found on them, checks legacy redirects and
 * exercises the form API (validation errors + successful submission).
 *
 * Usage: BASE_URL=http://localhost:3000 node scripts/smoke-test.mjs
 */
const BASE = (process.env.BASE_URL ?? "http://localhost:3000").replace(/\/$/, "");
let failures = 0;
const fail = (msg) => {
  failures++;
  console.error("  ✗", msg);
};
const ok = (msg) => console.log("  ✓", msg);

async function get(path, opts = {}) {
  return fetch(BASE + path, { redirect: "manual", ...opts });
}

// 1. Pages from the sitemap
const sm = await (await get("/sitemap.xml")).text();
const pages = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
console.log(`\nPages (${pages.length})`);
const links = new Set();
for (const p of pages) {
  const res = await get(p);
  if (res.status !== 200) fail(`${p} → ${res.status}`);
  const html = await res.text();
  for (const m of html.matchAll(/(?:href|src)="(\/[^"#?]*)/g)) links.add(m[1]);
  for (const m of html.matchAll(/\/_next\/image\?url=([^&"]+)/g)) links.add(decodeURIComponent(m[1]));
  if (!/<h1[\s>]/.test(html)) fail(`${p} has no <h1>`);
  if (!/<title>[^<]{8,}<\/title>/.test(html)) fail(`${p} has no meaningful <title>`);
}
if (!failures) ok("all sitemap pages return 200 with an <h1> and <title>");

// 2. Every internal link & asset referenced by those pages
console.log(`\nInternal links & assets (${links.size})`);
const before = failures;
for (const l of links) {
  if (l.startsWith("/_next/image")) continue;
  const res = await get(l, { method: "HEAD" });
  if (res.status >= 400) fail(`${l} → ${res.status}`);
}
if (failures === before) ok("no broken internal links or assets");

// 3. Legacy URL redirects
console.log("\nLegacy redirects");
for (const [from, to] of [
  ["/asaan-account", "/deposits/asaan-account"],
  ["/products/tractor-loan", "/loans/tractor-loan"],
  ["/news_and_press/abhi-x-cba", "/press-release/abhi-x-cba"],
]) {
  const res = await get(from);
  const loc = res.headers.get("location") ?? "";
  if (![301, 308].includes(res.status) || !loc.endsWith(to)) fail(`${from} → ${res.status} ${loc}`);
  else ok(`${from} → ${to}`);
}
const nf = await get("/this-page-does-not-exist");
nf.status === 404 ? ok("unknown URL returns 404") : fail(`404 page returned ${nf.status}`);

// 4. Form API
console.log("\nForm API");
const form = (entries) => {
  const fd = new FormData();
  for (const [k, v] of Object.entries(entries)) fd.set(k, v);
  return fd;
};
const bad = await get("/api/forms/complaint", { method: "POST", body: form({ fullName: "", cnic: "123" }) });
const badJson = await bad.json();
bad.status === 422 && badJson.errors?.cnic ? ok("invalid complaint rejected with field errors (422)") : fail(`invalid complaint → ${bad.status}`);
const good = await get("/api/forms/complaint", {
  method: "POST",
  body: form({ fullName: "Test User", cnic: "42000-1462196-2", contactNumber: "03001234567", email: "test@example.com", nature: "Feedback", accountNumber: "1234567890123456", walletNumber: "", details: "Automated smoke test — please ignore." }),
});
const goodJson = await good.json();
good.status === 201 && /^ABHI-CMP-/.test(goodJson.reference) ? ok(`valid complaint accepted (${goodJson.reference})`) : fail(`valid complaint → ${good.status} ${JSON.stringify(goodJson)}`);
const unknown = await get("/api/forms/nope", { method: "POST", body: form({}) });
unknown.status === 404 ? ok("unknown form id → 404") : fail(`unknown form → ${unknown.status}`);

console.log(failures ? `\n${failures} check(s) failed` : "\nAll checks passed");
process.exit(failures ? 1 : 0);
