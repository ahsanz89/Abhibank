# ABHI Microfinance Bank — website

A complete rebuild of [abhibank.com](https://abhibank.com) on a premium, consistent design system. Every page, form and tool from the original site is here, with the original content and brand assets. Old URLs redirect to their new homes.

- **55 pages:** home, 18 deposit and loan detail pages, about, history, leadership, investors, financials, branch and ATM locator, IPO, press, legal pages, and more.
- **5 working forms**, backed by an API.
- **Tools:** IBAN calculator, document centre with 199 documents, branch locator (126 branches) and ATM locator (114 ATMs).
- Responsive from 390 px to 1440 px+. Keyboard and screen-reader friendly. Respects reduced motion.

---

## Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 16** (App Router) + **React 19** + **TypeScript 5.9** | Static pre-rendering for speed and SEO, plus one API route for forms, in a single deployable app. |
| Styling | Plain CSS design system (`src/styles/*.css`) using CSS custom properties | No Tailwind or CSS-in-JS runtime. Tokens map 1:1 to the approved design. |
| Motion | CSS transitions + `IntersectionObserver` | Framer Motion was not needed for the effects in the design, so it's one less dependency. All motion is disabled under `prefers-reduced-motion`. |
| Icons | `lucide-react` | Social brand icons are inline SVG. |
| Fonts | Self-hosted Bricolage Grotesque + Poppins (`@fontsource`) | The original brand fonts, with no third-party font requests. |
| Data store | PostgreSQL via `pg` (optional) | Only used for form submissions. |
| Email | [Resend](https://resend.com) REST API (optional) | Sends notification emails for submissions. No SDK dependency. |

Runtime dependencies: `next`, `react`, `react-dom`, `lucide-react`, `pg`, and two font packages.

## Getting started

Requires **Node.js 20.9+**.

```bash
npm install
cp .env.example .env.local   # optional — everything works with no env vars locally
npm run dev                  # http://localhost:3000
```

| Script | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` / `npm start` | Production build / serve it |
| `npm run lint` | ESLint (Next.js core-web-vitals + TypeScript rules) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run test:e2e` | Smoke test against a running server (`BASE_URL`, default `http://localhost:3000`). See below. |
| `npm run db:migrate` | Creates the `form_submissions` table in `DATABASE_URL` |

### What the smoke test covers

`scripts/smoke-test.mjs`:

- Crawls every page in the sitemap. Each page must return 200 and have one `<h1>` and a `<title>`.
- HEAD-checks every internal link, image and asset.
- Checks the legacy-URL redirects and the 404 page.
- Exercises the forms API: validation errors, a successful submission and an unknown form.

## Environment variables

Copy `.env.example`. **Never commit real values.** `.env*` is git-ignored. Set secrets in your host's dashboard.

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Recommended | Public URL. Used for canonical links, the sitemap, robots and Open Graph. |
| `NEXT_PUBLIC_LEGACY_ASSET_ORIGIN` | No (default `https://abhibank.com`) | Origin that serves the original PDFs and tutorial videos. See *Known limitations*. |
| `DATABASE_URL` | Recommended in production | Postgres connection string (Neon, Vercel Postgres, Supabase…). Without it, submissions go to `.data/submissions.jsonl` (or `/tmp` on Vercel, which is **not durable**). |
| `RESEND_API_KEY` | No | Enables email notification of each submission. |
| `NOTIFY_EMAIL_TO` / `NOTIFY_EMAIL_FROM` | With Resend | Recipient and verified sender. |
| `IP_HASH_SALT` | Recommended | Salt for hashing submitter IPs. Raw IPs are never stored. |

## Backend: forms

All forms post `multipart/form-data` to **`POST /api/forms/[form]`**. Valid form ids:

- `complaint`
- `deposit-application`
- `loan-application`
- `ewa-enquiry`
- `whistleblow`

Validation:

- Client and server share one schema: `src/lib/forms.ts`. Fields are validated as the user types and again on the server.
- CNIC, Pakistani mobile and email formats are checked, along with required fields and length limits.
- File uploads must be PDF, JPG, PNG or DOCX, up to 4 MB.

Spam protection: a hidden honeypot field plus per-IP rate limiting (6 per minute, in memory).

On success, the API returns `201 { reference: "ABHI-CMP-YYMMDD-XXXXXX" }`. Validation failures return `422 { errors: { field: message } }`.

Storage (`src/lib/server/storage.ts`):

- With `DATABASE_URL`: one row per submission in `form_submissions`. Fields are stored as JSONB, and the attachment as BYTEA. The table is created automatically, or via `npm run db:migrate`.
- Without it: append-only JSONL.

Notification (`src/lib/server/notify.ts`): when `RESEND_API_KEY` is set, a plain-text summary goes to `NOTIFY_EMAIL_TO`. A failed email never fails the submission.

## Project structure

```
public/assets/        Original abhibank.com imagery, optimised to WebP/SVG (≈5 MB, 189 files)
  brand/ icons/ products/ banners/ app/ about/ people/ partners/ press/ ipo/ badges/ clients/ ewa-clients/ investors/
src/app/              Routes (one folder per page) + api/forms/[form]
src/components/       ui/ (primitives, interactive), layout/ (header, footer), forms/, sections/, home/, about/, tools/, press/
src/data/*.json       Content migrated from the original site (products, branches, ATMs, documents, leadership, press, legal…)
src/lib/              site.ts (navigation, contacts), content.ts (typed data access), forms.ts, iban.ts, hooks.ts, server/
src/styles/           tokens.css → base.css → components.css → sections.css
scripts/              prepare-assets.py, extract-content.py (one-off migration), migrate.mjs, smoke-test.mjs
```

All content is data-driven. To change a product, branch or document, edit the JSON in `src/data/`. All images are referenced from `public/assets/`, and the `/assets/*` path is served with immutable caching.

## Deployment (Vercel)

1. Import the GitHub repo in Vercel. The framework (Next.js) is detected automatically, and no build settings are needed.
2. Under **Settings → Environment Variables**, add `NEXT_PUBLIC_SITE_URL` (your production URL) and `IP_HASH_SALT`.
3. Recommended: add a Postgres database (**Storage → Neon**) to get `DATABASE_URL`. Optionally, add `RESEND_API_KEY`, `NOTIFY_EMAIL_TO` and `NOTIFY_EMAIL_FROM`.
4. Deploy. Then run `BASE_URL=https://<your-domain> npm run test:e2e` to verify the live site.

The app also runs on any Node host (Render, Railway, a VPS) with `npm run build && npm start`. On Netlify, use the official Next.js runtime.

## Redirects from the old site

`next.config.ts` permanently redirects the original WordPress URLs to their new equivalents:

- `/asaan-account` → `/deposits/asaan-account`
- `/products/:slug` → `/loans/:slug`
- `/news_and_press/:slug` → `/press-release/:slug`
- …and others

This means existing links and search rankings carry over.

## Known limitations

- **PDFs and tutorial videos** (199 documents, walkthrough MP4s, the IPO background video) are still served from `abhibank.com/wp-content/uploads`, through `NEXT_PUBLIC_LEGACY_ASSET_ORIGIN`. They were left out of the repo to keep it lean (several hundred MB). To self-host them, upload them to object storage and change that variable.
- **YouTube thumbnails** load from `i.ytimg.com`. Videos load only when clicked (privacy-friendly lite embed).
- **"Use my location"** in the locator uses the browser's geolocation plus OpenStreetMap Nominatim to find the nearest city. If permission is denied, it falls back to search.
- **Rate limiting** is in memory per server instance. For strict limits across many instances, back it with Redis or Upstash.
- **No admin UI for submissions.** Read them in your Postgres console, or rely on the email notifications.
- **The Vercel file fallback isn't durable:** without `DATABASE_URL`, submissions on Vercel go to `/tmp` and are lost on redeploy. Set a database for production.
- **Investor videos** on the original Partners page had no public URLs, so they're shown as images.
- Product, branch and document content is a snapshot of abhibank.com as of November 2026. Later updates need to be applied to `src/data/`.
