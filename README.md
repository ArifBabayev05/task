# Technology Resilience Cluster — internal site

A one-page internal briefing site for the Technology Resilience Cluster of Azerbaijan, built from BCG materials (September 2026):

- **Word:** *Resilience Cluster — website content draft*, the cluster narrative
- **Deck:** *Technology resilience cluster v4*, which adds figures, six domains, the tax table and the anchor-company strategy

Every piece of content from both sources is on the page. Anything that appears in only one source is tagged **Deck only**. Inconsistencies between the sources are listed in the **Review notes** section.

The structure and timeline proposal for management (in Azerbaijani) is in [`docs/PROPOSAL.md`](docs/PROPOSAL.md).

## Stack

- Next.js 16 (App Router, statically prerendered `/en` and `/az`), TypeScript, Tailwind CSS v4
- `src/proxy.ts` puts every route and asset behind HTTP Basic Auth

## Project layout

```
src/
  app/[lang]/        layout + page (en, az)
  components/        page sections (Hero, About, Domains, Why, Incentives, Strategy, Review)
  content/
    types.ts         content schema
    en.ts, az.ts     all copy (AZ is a draft translation)
    companies.ts     company list, logo sizes, deck groupings
  proxy.ts           Basic Auth gate
public/
  logos/             company logos extracted from the deck
  images/            photos and ministry logo from the deck
docs/PROPOSAL.md     structure + timeline proposal (AZ)
```

To change copy, edit `src/content/en.ts` or `src/content/az.ts`. Both files must keep the same shape; TypeScript enforces this through `Content`.

## Run locally

```bash
npm install
npm run dev          # http://localhost:3000 (no password in dev unless SITE_PASSWORD is set)
npm run lint
npm run build && SITE_PASSWORD=secret npm start
```

## Deploy to Vercel (password-protected)

1. Import the repository in Vercel. The framework preset is detected as Next.js.
2. Under **Settings → Environment Variables**, add:
   - `SITE_PASSWORD`: required. Without it the production site returns `503` for every request (fails closed).
   - `SITE_USER`: optional, defaults to `team`.
3. Deploy, then share the URL, user name and password with the team through a separate channel.

Pages send `X-Robots-Tag: noindex` and `robots: noindex`, so they are not indexed.
