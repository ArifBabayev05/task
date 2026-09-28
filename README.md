# Technology Resilience Cluster — internal site

A one-page internal briefing site for the Technology Resilience Cluster of Azerbaijan, built from BCG materials (September 2026):

- **Word:** *Resilience Cluster — website content draft*, the cluster narrative
- **Deck:** *Technology resilience cluster v4*, which adds figures, six domains, the tax table and the anchor-company strategy

Every piece of content from both sources is on the page. Anything that appears in only one source is tagged **Deck only**. Inconsistencies between the sources are listed in the **Review notes** section.

The structure and timeline proposal for management (in Azerbaijani) is in [`docs/PROPOSAL.md`](docs/PROPOSAL.md).

## Stack

- Next.js 16 (App Router, statically prerendered `/en` and `/az`), TypeScript, Tailwind CSS v4
- `src/proxy.ts`: optional HTTP Basic Auth for every route and asset (off unless `SITE_PASSWORD` is set)

## Project layout

```
src/
  app/[lang]/        layout + page (en, az)
  components/        page sections (Hero, About, Domains, Why, Incentives, Strategy, Review)
  content/
    types.ts         content schema
    en.ts, az.ts     all copy (AZ is a draft translation)
    companies.ts     company list, logo sizes, deck groupings
  proxy.ts           optional Basic Auth gate
public/
  logos/             company logos extracted from the deck
  images/            photos and ministry logo from the deck
docs/PROPOSAL.md     structure + timeline proposal (AZ)
```

To change copy, edit `src/content/en.ts` or `src/content/az.ts`. Both files must keep the same shape; TypeScript enforces this through `Content`.

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
