# Technology Resilience Cluster of Azerbaijan

One-page site for the Technology Resilience Cluster of Azerbaijan (Innovation and Digital Development Agency, Ministry of Digital Development and Transport). Azerbaijani is the source copy and the default language (`/az`); `/en` is a translation.

Sections: About the cluster, Focus areas, Anchor partners, Member benefits, Joining.

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
  proxy.ts           optional Basic Auth gate
public/
  images/            photos and ministry logo
docs/PROPOSAL.md     original structure + timeline proposal (AZ)
```

To change copy, edit `src/content/az.ts` or `src/content/en.ts`. The application button in the Joining section appears once `join.box.button.href` is set. Both files must keep the same shape; TypeScript enforces this through `Content`.

## Run locally

```bash
npm install
npm run dev          # http://localhost:3000
npm run lint
npm run build && npm start
```

## Deploy to Vercel

1. Import the repository in Vercel. The framework preset is detected as Next.js.
2. Deploy. No environment variables are needed, and the site is public.

To put the site behind a password later, add `SITE_PASSWORD` (and optionally `SITE_USER`, which defaults to `team`) under **Settings → Environment Variables**, then redeploy.

Pages send `X-Robots-Tag: noindex` and `robots: noindex`, so they are not indexed.
