# Technology Resilience Cluster of Azerbaijan

One-page site for the Technology Resilience Cluster of Azerbaijan (Innovation and Digital Development Agency, Ministry of Digital Development and Transport). Azerbaijani is the source copy and the default language (`/az`); `/en` is a translation.

Sections: About the cluster, Focus areas, Anchor partners, Member benefits, Joining. The application form opens in a modal.

## Stack

- Next.js 16 (App Router, statically prerendered `/en` and `/az`), TypeScript, Tailwind CSS v4
- `src/proxy.ts`: optional HTTP Basic Auth for every route and asset (off unless `SITE_PASSWORD` is set)

## Project layout

```
src/
  app/[lang]/        layout + page (en, az)
  components/        Header, Hero, Sections, Footer, ApplyDialog (modal), ApplicationForm
  content/
    types.ts         content schema
    az.ts, en.ts     all copy (az is the source, en the translation)
  lib/apply.ts       Server Action: validates and submits the application form
  lib/deliver.ts     stores applications and sends optional notifications
  lib/store.ts       Upstash Redis storage (REST)
  app/admin/         password-protected application list and CSV export
  proxy.ts           optional Basic Auth gate
public/
  images/            photos and ministry logo
docs/PROPOSAL.md     original structure + timeline proposal (AZ)
```

To change copy, edit `src/content/az.ts` or `src/content/en.ts`. Both files must keep the same shape; TypeScript enforces this through `Content`.

## Run locally

```bash
npm install
npm run dev          # http://localhost:3000
npm run lint
npm run build && npm start
```

## Application form

"Klasterə qoşulun" / "Müraciət et" open the application form in a modal (`<dialog>`); `/az#muraciet` opens it directly. A Server Action validates every field on the server, keeps the user's input on errors, and uses a honeypot field plus a minimum fill time against spam.

### Where applications go

1. **Storage (main):** Vercel → project → **Storage** → connect **Upstash for Redis** (free plan). This adds `KV_REST_API_URL` and `KV_REST_API_TOKEN` automatically. Redeploy.
2. **Admin page:** set `ADMIN_PASSWORD` (and optionally `ADMIN_USER`, default `admin`) under **Settings → Environment Variables**, redeploy, then open `/admin`. It lists all applications and has a **CSV (Excel)** export. Without `ADMIN_PASSWORD`, `/admin` returns 404.
3. **Optional notifications**, in addition to storage:

| Variable | Purpose |
|---|---|
| `RESEND_API_KEY`, `APPLICATION_EMAIL_TO`, `APPLICATION_EMAIL_FROM` | Email each application via [Resend](https://resend.com) |
| `APPLICATION_WEBHOOK_URL`, `APPLICATION_WEBHOOK_SECRET` | POST each application as JSON (Google Sheets, Slack, Make, Zapier) |

In production, if nothing is configured, the form shows an error rather than dropping applications silently. In development, applications are printed to the server console.

## Deploy to Vercel

1. Import the repository in Vercel. The framework preset is detected as Next.js.
2. Deploy. No environment variables are needed, and the site is public.

To put the site behind a password later, add `SITE_PASSWORD` (and optionally `SITE_USER`, which defaults to `team`) under **Settings → Environment Variables**, then redeploy.

Pages send `X-Robots-Tag: noindex` and `robots: noindex`, so they are not indexed.
