# Technology Resilience Cluster of Azerbaijan

One-page site for the Technology Resilience Cluster of Azerbaijan (Innovation and Digital Development Agency, Ministry of Digital Development and Transport). Azerbaijani is the source copy and the default language (`/az`); `/en` is a translation.

Sections: About the cluster, Focus areas, Anchor partners, Member benefits, Joining, Application form.

## Stack

- Next.js 16 (App Router, statically prerendered `/en` and `/az`), TypeScript, Tailwind CSS v4
- `src/proxy.ts`: optional HTTP Basic Auth for every route and asset (off unless `SITE_PASSWORD` is set)

## Project layout

```
src/
  app/[lang]/        layout + page (en, az)
  components/        page sections (Header, Hero, Sections, Footer)
  content/
    types.ts         content schema
    az.ts, en.ts     all copy (az is the source, en the translation)
  lib/apply.ts       Server Action: validates and submits the application form
  lib/deliver.ts     sends applications by email (Resend) and/or webhook
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

The form (section 06, `#muraciet`) is handled by a Server Action. It validates every field on the server, keeps the user's input on errors, and uses a honeypot field plus a minimum fill time against spam.

Applications are delivered to whichever destination is configured in Vercel (**Settings → Environment Variables**, then redeploy). At least one is required in production; otherwise the form shows an error and nothing is lost silently.

| Variable | Purpose |
|---|---|
| `RESEND_API_KEY` | [Resend](https://resend.com) API key for email delivery |
| `APPLICATION_EMAIL_TO` | Recipient address(es), comma-separated |
| `APPLICATION_EMAIL_FROM` | Sender on a domain verified in Resend, e.g. `Klaster <noreply@example.az>` (defaults to Resend's test sender) |
| `APPLICATION_WEBHOOK_URL` | Receives each application as JSON (POST); works with Google Apps Script / Sheets, Slack, Make, Zapier |
| `APPLICATION_WEBHOOK_SECRET` | Optional, sent as the `X-Webhook-Secret` header |

Email and webhook can be used together. In development, with nothing configured, applications are printed to the server console.

## Deploy to Vercel

1. Import the repository in Vercel. The framework preset is detected as Next.js.
2. Deploy. No environment variables are needed, and the site is public.

To put the site behind a password later, add `SITE_PASSWORD` (and optionally `SITE_USER`, which defaults to `team`) under **Settings → Environment Variables**, then redeploy.

Pages send `X-Robots-Tag: noindex` and `robots: noindex`, so they are not indexed.
