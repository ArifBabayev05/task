# Mənbə kodu (tam)

Layihənin bütün mətn faylları bir yerdə, arxiv və bərpa üçün. Şəkillər (`public/images`) və `package-lock.json` daxil deyil.
Yeniləmək üçün faylları dəyişdikdən sonra bu sənədi yenidən yaradın. Əsas mənbə həmişə repodakı fayllardır.

## `.env.example`

````text
# Copy to .env.local for local development:  cp .env.example .env.local
# On Vercel, set the same names under Project → Settings → Environment Variables.
# Every variable is optional in development.

# --- Application storage (Upstash Redis) -------------------------------------
# On Vercel these are added automatically when you connect "Upstash for Redis"
# under Storage. Locally, copy them from the Upstash console (REST API section).
KV_REST_API_URL=
KV_REST_API_TOKEN=

# --- Admin page (/admin) ------------------------------------------------------
# Without ADMIN_PASSWORD, /admin returns 404.
ADMIN_PASSWORD=
ADMIN_USER=admin

# --- Optional email notification via Resend ----------------------------------
RESEND_API_KEY=
APPLICATION_EMAIL_TO=
APPLICATION_EMAIL_FROM=

# --- Optional webhook notification (Google Sheets, Slack, Make, Zapier) -------
APPLICATION_WEBHOOK_URL=
APPLICATION_WEBHOOK_SECRET=

# --- Optional password for the whole site ------------------------------------
SITE_PASSWORD=
SITE_USER=team
````

## `.gitignore`

````text
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.*
.yarn/*
!.yarn/patches
!.yarn/plugins
!.yarn/releases
!.yarn/versions

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnpm-debug.log*

# env files (can opt-in for committing if needed)
.env*
!.env.example

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts
````

## `AGENTS.md`

````markdown
<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
````

## `CLAUDE.md`

````markdown
@AGENTS.md
````

## `eslint.config.mjs`

````js
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
````

## `next.config.ts`

````tsx
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Assets are pre-optimized; serving them directly keeps every file behind the Basic Auth proxy
  // (the image optimizer's internal fetch would otherwise be rejected by it).
  images: { unoptimized: true },
  async redirects() {
    return [{ source: "/", destination: "/az", permanent: false }];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // Internal material: keep it out of search engines and caches.
          { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" },
          { key: "Referrer-Policy", value: "no-referrer" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
        ],
      },
    ];
  },
};

export default nextConfig;
````

## `package.json`

````json
{
  "name": "resilience-cluster",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "@fontsource-variable/inter": "^5.3.0",
    "lucide-react": "^1.48.0",
    "next": "16.3.6",
    "react": "19.2.8",
    "react-dom": "19.2.8",
    "server-only": "^0.0.1"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "16.3.6",
    "tailwindcss": "^4",
    "typescript": "^5"
  },
  "engines": {
    "node": ">=20.9.0"
  }
}
````

## `postcss.config.mjs`

````js
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
````

## `src/app/[lang]/layout.tsx`

````tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getContent, hasLocale, locales } from "@/content";
import "../globals.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { meta } = getContent(lang);
  return {
    title: meta.title,
    description: meta.description,
    robots: { index: false, follow: false, nocache: true },
    icons: { icon: "/images/ministry-emblem.png" },
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <html lang={lang}>
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
````

## `src/app/[lang]/page.tsx`

````tsx
import { notFound } from "next/navigation";
import { ApplyDialog } from "@/components/ApplyDialog";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About, Benefits, Domains, Join, Partners } from "@/components/Sections";
import { getContent, hasLocale } from "@/content";

export default async function Page({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const c = getContent(lang);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-white focus:px-3 focus:py-2 focus:text-brand-900"
      >
        {c.ui.skipToContent}
      </a>
      <Header c={c} lang={lang} />
      <main id="main">
        <Hero c={c} />
        <About c={c} />
        <Domains c={c} />
        <Partners c={c} />
        <Benefits c={c} />
        <Join c={c} />
      </main>
      <Footer c={c} />
      <ApplyDialog
        text={c.form}
        locale={c.meta.locale}
        closeLabel={c.ui.close}
        domains={c.domains.items.map((d) => ({ id: d.id, title: d.title }))}
      />
    </>
  );
}
````

## `src/app/admin/export.csv/route.ts`

````tsx
import { connection } from "next/server";
import { az } from "@/content/az";
import { domainLabels, formatDate, residentLabel, typeLabel } from "@/lib/labels";
import { listApplications, storeConfigured } from "@/lib/store";

/** CSV export of all applications (UTF-8 with BOM and ";" separator so Excel opens it directly). */
export async function GET() {
  await connection();
  if (!storeConfigured()) return new Response("Store is not configured", { status: 503 });

  const f = az.form.fields;
  const apps = await listApplications();
  const header = [
    "Tarix",
    f.type.label,
    f.company,
    f.taxId,
    f.website,
    f.resident.label,
    f.domains,
    f.product,
    f.teamSize.label,
    f.name,
    f.role,
    f.email,
    f.phone,
    f.message,
    "Dil",
    "ID",
  ];
  const rows = apps.map((a) => [
    formatDate(a.submittedAt),
    typeLabel(a.type),
    a.company,
    a.taxId,
    a.website,
    residentLabel(a.resident),
    domainLabels(a.domains).join(", "),
    a.product,
    a.teamSize,
    a.name,
    a.role,
    a.email,
    a.phone,
    a.message,
    a.locale,
    a.id,
  ]);
  const cell = (v: string) => {
    // Neutralise spreadsheet formulas and quote every cell.
    const safe = /^[=+\-@\t\r]/.test(v) ? `'${v}` : v;
    return `"${safe.replace(/"/g, '""')}"`;
  };
  const csv = "﻿" + [header, ...rows].map((r) => r.map((v) => cell(String(v ?? ""))).join(";")).join("\r\n");
  const date = new Date().toISOString().slice(0, 10);
  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="muracietler-${date}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
````

## `src/app/admin/layout.tsx`

````tsx
import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Müraciətlər · Dayanıqlılıq Klasteri",
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="az">
      <body className="min-h-dvh bg-surface">{children}</body>
    </html>
  );
}
````

## `src/app/admin/page.tsx`

````tsx
import { connection } from "next/server";
import { az } from "@/content/az";
import { domainLabels, formatDate, residentLabel, typeLabel } from "@/lib/labels";
import { listApplications, storeConfigured, type StoredApplication } from "@/lib/store";

export default async function AdminPage() {
  await connection();
  const f = az.form.fields;

  let apps: StoredApplication[] = [];
  let error: string | null = null;
  if (!storeConfigured()) {
    error = "Verilənlər bazası qoşulmayıb. Vercel → Storage bölməsində Upstash Redis qoşun və layihəni yenidən deploy edin.";
  } else {
    try {
      apps = await listApplications();
    } catch (e) {
      console.error("[admin] listing failed", e);
      error = "Müraciətləri yükləmək mümkün olmadı. Bir az sonra yenidən cəhd edin.";
    }
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <header className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-6">
        <div>
          <p className="text-sm text-muted">Azərbaycan Texnoloji Dayanıqlılıq Klasteri</p>
          <h1 className="mt-1 text-2xl font-semibold text-brand-900">Müraciətlər</h1>
          <p className="mt-1 text-sm text-muted">Cəmi: {apps.length}</p>
        </div>
        {apps.length > 0 && (
          <a
            href="/admin/export.csv"
            className="rounded bg-brand-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-800"
          >
            CSV yüklə (Excel)
          </a>
        )}
      </header>

      {error && <p className="mt-6 rounded border border-danger/30 bg-danger/5 p-4 text-sm text-danger">{error}</p>}
      {!error && apps.length === 0 && <p className="mt-6 text-sm text-muted">Hələ müraciət yoxdur.</p>}

      <ol className="mt-6 space-y-3">
        {apps.map((a) => (
          <li key={a.id} className="rounded border border-line bg-white">
            <details className="group">
              <summary className="grid cursor-pointer list-none grid-cols-1 gap-x-6 gap-y-1 p-4 sm:grid-cols-[9rem_1fr_1fr_auto] sm:items-center [&::-webkit-details-marker]:hidden">
                <span className="text-sm tabular-nums text-muted">{formatDate(a.submittedAt)}</span>
                <span className="font-semibold text-brand-900">{a.company}</span>
                <span className="text-sm text-ink/80">
                  {a.name} · <a className="text-brand-700 underline" href={`mailto:${a.email}`}>{a.email}</a>
                </span>
                <span className="justify-self-start rounded-sm bg-surface px-2 py-0.5 text-xs font-medium text-brand-900 sm:justify-self-end">
                  {typeLabel(a.type)}
                </span>
              </summary>
              <dl className="grid grid-cols-1 gap-x-8 gap-y-3 border-t border-line p-4 text-sm sm:grid-cols-2">
                {(
                  [
                    [f.taxId, a.taxId],
                    [f.website, a.website],
                    [f.resident.label, residentLabel(a.resident)],
                    [f.teamSize.label, a.teamSize],
                    [f.domains, domainLabels(a.domains).join(", ")],
                    [f.role, a.role],
                    [f.phone, a.phone],
                    ["Dil", a.locale],
                  ] as [string, string][]
                )
                  .filter(([, v]) => v)
                  .map(([k, v]) => (
                    <div key={k}>
                      <dt className="text-muted">{k}</dt>
                      <dd className="mt-0.5 text-ink">{v}</dd>
                    </div>
                  ))}
                <div className="sm:col-span-2">
                  <dt className="text-muted">{f.product}</dt>
                  <dd className="mt-0.5 whitespace-pre-line text-ink">{a.product}</dd>
                </div>
                {a.message && (
                  <div className="sm:col-span-2">
                    <dt className="text-muted">{f.message}</dt>
                    <dd className="mt-0.5 whitespace-pre-line text-ink">{a.message}</dd>
                  </div>
                )}
              </dl>
            </details>
          </li>
        ))}
      </ol>
    </main>
  );
}
````

## `src/app/globals.css`

````css
@import "tailwindcss";
@import "@fontsource-variable/inter";

/*
 * Design tokens. Brand colours live here only, so the agency's brand palette can be
 * dropped in without touching components.
 */
@theme {
  --font-sans: "Inter Variable", ui-sans-serif, system-ui, sans-serif;

  --color-brand-950: #071a33;
  --color-brand-900: #0b2545;
  --color-brand-800: #13315c;
  --color-brand-700: #1d4e89;
  --color-brand-100: #e6edf5;

  --color-surface: #f4f6f9;
  --color-line: #dde3ea;
  --color-ink: #1a2230;
  --color-muted: #5b6676;
  --color-danger: #b42318;

  --radius-card: 4px;
}

:root {
  color-scheme: light;
}

html {
  scroll-padding-top: 5rem;
}

/* Keep the page from scrolling behind an open modal. */
html:has(dialog[open]) {
  overflow: hidden;
}

body {
  background: #ffffff;
  color: var(--color-ink);
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

dialog::backdrop {
  background: rgb(7 26 51 / 0.6);
}

.no-scrollbar {
  scrollbar-width: none;
}
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
````

## `src/components/ApplicationForm.tsx`

````tsx
"use client";

import { CircleCheck, CircleAlert, Send } from "lucide-react";
import { useActionState, useEffect, useRef, useState } from "react";
import type { ApplicationFormText } from "@/content/types";
import { initialApplyState, type ApplyState, type Field } from "@/lib/application";
import { submitApplication } from "@/lib/apply";

type Domain = { id: string; title: string };
type Props = { text: ApplicationFormText; domains: Domain[]; locale: string };

/** Remounting via `key` resets the action state for "send another application". */
export function ApplicationForm(props: Props) {
  const [round, setRound] = useState(0);
  return <FormBody key={round} {...props} onReset={() => setRound((r) => r + 1)} />;
}

const inputCls =
  "w-full rounded-[var(--radius-card)] border bg-white px-3.5 py-2.5 text-[15px] text-ink placeholder:text-muted/60 focus:outline-none focus:ring-2";
const okCls = "border-line focus:border-brand-700 focus:ring-brand-700/20";
const badCls = "border-danger focus:border-danger focus:ring-danger/20";

function FormBody({ text, domains, locale, onReset }: Props & { onReset: () => void }) {
  const [state, action, pending] = useActionState<ApplyState, FormData>(submitApplication, initialApplyState);
  const startedRef = useRef<HTMLInputElement>(null);
  const alertRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const f = text.fields;
  const errors = state.errors ?? {};
  const values = state.values ?? {};

  // Time-on-form spam guard; re-armed after every submission (React resets the form).
  useEffect(() => {
    if (startedRef.current) startedRef.current.value = String(Date.now());
    if (state.status === "error" || state.status === "failed") alertRef.current?.focus();
    if (state.status === "success") successRef.current?.focus();
  }, [state]);

  if (state.status === "success") {
    return (
      <div className="py-6 text-center">
        <CircleCheck aria-hidden className="mx-auto size-12 text-brand-700" />
        <h3 ref={successRef} tabIndex={-1} className="mt-4 text-2xl font-semibold text-brand-900 outline-none">
          {text.success.title}
        </h3>
        <p className="mx-auto mt-3 max-w-lg text-[15px] leading-relaxed text-ink/80">{text.success.body}</p>
        <button
          type="button"
          onClick={onReset}
          className="mt-6 rounded-[var(--radius-card)] border border-line px-4 py-2 text-sm font-semibold text-brand-900 hover:border-brand-700"
        >
          {text.success.again}
        </button>
      </div>
    );
  }

  const val = (k: Field) => (typeof values[k] === "string" ? (values[k] as string) : "");
  const err = (k: Field) => errors[k];
  const describedBy = (k: Field, hint?: boolean) =>
    [hint ? `${k}-hint` : "", err(k) ? `${k}-error` : ""].filter(Boolean).join(" ") || undefined;
  const errorText = (k: Field) =>
    err(k) ? (
      <p id={`${k}-error`} className="mt-1.5 text-sm text-danger">
        {text.errors[err(k)!]}
      </p>
    ) : null;
  const label = (htmlFor: string, children: React.ReactNode, required?: boolean) => (
    <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-brand-900">
      {children}
      {required ? <span className="text-danger"> *</span> : <span className="font-normal text-muted"> ({text.optional})</span>}
    </label>
  );
  const textInput = ({
    k,
    type = "text",
    required,
    autoComplete,
    hint,
    inputMode,
  }: {
    k: Field;
    type?: string;
    required?: boolean;
    autoComplete?: string;
    hint?: string;
    inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  }) => (
    <div>
      {label(k, f[k as "company"], required)}
      <input
        id={k}
        name={k}
        type={type}
        required={required}
        autoComplete={autoComplete}
        inputMode={inputMode}
        maxLength={200}
        defaultValue={val(k)}
        aria-invalid={err(k) ? true : undefined}
        aria-describedby={describedBy(k, Boolean(hint))}
        placeholder={hint}
        className={`${inputCls} ${err(k) ? badCls : okCls}`}
      />
      {errorText(k)}
    </div>
  );

  const selectedDomains = Array.isArray(values.domains) ? values.domains : [];
  const hasErrors = state.status === "error";

  return (
    <form action={action} noValidate className="relative">
      {/* spam guards + locale */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Fax <input type="text" name="fax" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>
      <input ref={startedRef} type="hidden" name="startedAt" defaultValue="" />
      <input type="hidden" name="locale" value={locale} />

      {(hasErrors || state.status === "failed") && (
        <div
          ref={alertRef}
          tabIndex={-1}
          role="alert"
          className="mb-6 flex gap-3 rounded-[var(--radius-card)] border border-danger/30 bg-danger/5 p-4 text-sm text-danger outline-none"
        >
          <CircleAlert aria-hidden className="mt-0.5 size-5 shrink-0" />
          <span>{hasErrors ? text.errors.summary : text.errors.failed}</span>
        </div>
      )}

      <p className="mb-6 text-sm text-muted">{text.requiredNote}</p>

      {/* 1. Application type */}
      <fieldset aria-describedby={err("type") ? "type-error" : undefined}>
        <legend className="mb-3 text-base font-semibold text-brand-900">
          {f.type.label} <span className="text-danger">*</span>
        </legend>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {f.type.options.map((o, i) => (
            <label
              key={o.value}
              className="flex cursor-pointer items-center gap-3 rounded-[var(--radius-card)] border border-line p-4 has-[:checked]:border-brand-700 has-[:checked]:bg-brand-100/60"
            >
              <input
                type="radio"
                name="type"
                value={o.value}
                defaultChecked={val("type") ? val("type") === o.value : i === 0}
                className="size-4 accent-[var(--color-brand-700)]"
              />
              <span className="text-[15px] font-medium text-brand-900">{o.label}</span>
            </label>
          ))}
        </div>
        {errorText("type")}
      </fieldset>

      {/* 2. Company */}
      <fieldset className="mt-8 border-t border-line pt-6">
        <legend className="float-left mb-4 w-full text-base font-semibold text-brand-900">{text.groups.company}</legend>
        <div className="clear-both grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            {textInput({ k: "company", required: true, autoComplete: "organization" })}
          </div>
          {textInput({ k: "taxId", inputMode: "numeric" })}
          {textInput({ k: "website", type: "url", autoComplete: "url", hint: f.websiteHint })}
        </div>
        <fieldset className="mt-5" aria-describedby={err("resident") ? "resident-error" : undefined}>
          <legend className="mb-2 text-sm font-medium text-brand-900">
            {f.resident.label} <span className="text-danger">*</span>
          </legend>
          <div className="flex flex-wrap gap-2">
            {f.resident.options.map((o) => (
              <label
                key={o.value}
                className="flex cursor-pointer items-center gap-2 rounded-full border border-line px-3.5 py-2 text-sm has-[:checked]:border-brand-700 has-[:checked]:bg-brand-100/60"
              >
                <input
                  type="radio"
                  name="resident"
                  value={o.value}
                  defaultChecked={val("resident") === o.value}
                  className="size-4 accent-[var(--color-brand-700)]"
                />
                {o.label}
              </label>
            ))}
          </div>
          {errorText("resident")}
        </fieldset>
      </fieldset>

      {/* 3. Activity */}
      <fieldset className="mt-8 border-t border-line pt-6">
        <legend className="float-left mb-4 w-full text-base font-semibold text-brand-900">{text.groups.activity}</legend>
        <fieldset className="clear-both" aria-describedby={["domains-hint", err("domains") ? "domains-error" : ""].filter(Boolean).join(" ")}>
          <legend className="mb-1 text-sm font-medium text-brand-900">
            {f.domains} <span className="text-danger">*</span>
          </legend>
          <p id="domains-hint" className="mb-2 text-xs text-muted">
            {f.domainsHint}
          </p>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {domains.map((d) => (
              <label
                key={d.id}
                className="flex cursor-pointer items-center gap-2.5 rounded-[var(--radius-card)] border border-line px-3 py-2.5 text-sm text-ink has-[:checked]:border-brand-700 has-[:checked]:bg-brand-100/60"
              >
                <input
                  type="checkbox"
                  name="domains"
                  value={d.id}
                  defaultChecked={selectedDomains.includes(d.id)}
                  className="size-4 accent-[var(--color-brand-700)]"
                />
                {d.title}
              </label>
            ))}
          </div>
          {errorText("domains")}
        </fieldset>
        <div className="mt-5">
          {label("product", f.product, true)}
          <p id="product-hint" className="mb-2 text-xs text-muted">
            {f.productHint}
          </p>
          <textarea
            id="product"
            name="product"
            rows={4}
            required
            maxLength={2000}
            defaultValue={val("product")}
            aria-invalid={err("product") ? true : undefined}
            aria-describedby={describedBy("product", true)}
            className={`${inputCls} ${err("product") ? badCls : okCls}`}
          />
          {errorText("product")}
        </div>
        <div className="mt-5 sm:max-w-xs">
          {label("teamSize", f.teamSize.label)}
          <select
            id="teamSize"
            name="teamSize"
            defaultValue={val("teamSize")}
            aria-invalid={err("teamSize") ? true : undefined}
            aria-describedby={describedBy("teamSize")}
            className={`${inputCls} ${err("teamSize") ? badCls : okCls}`}
          >
            <option value="">{f.teamSize.placeholder}</option>
            {f.teamSize.options.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
          {errorText("teamSize")}
        </div>
      </fieldset>

      {/* 4. Contact */}
      <fieldset className="mt-8 border-t border-line pt-6">
        <legend className="float-left mb-4 w-full text-base font-semibold text-brand-900">{text.groups.contact}</legend>
        <div className="clear-both grid grid-cols-1 gap-4 sm:grid-cols-2">
          {textInput({ k: "name", required: true, autoComplete: "name" })}
          {textInput({ k: "role", autoComplete: "organization-title" })}
          {textInput({ k: "email", type: "email", required: true, autoComplete: "email", inputMode: "email" })}
          {textInput({ k: "phone", type: "tel", autoComplete: "tel", inputMode: "tel" })}
          <div className="sm:col-span-2">
            {label("message", f.message)}
            <textarea
              id="message"
              name="message"
              rows={3}
              maxLength={2000}
              defaultValue={val("message")}
              aria-invalid={err("message") ? true : undefined}
              aria-describedby={describedBy("message")}
              className={`${inputCls} ${err("message") ? badCls : okCls}`}
            />
            {errorText("message")}
          </div>
        </div>
      </fieldset>

      <div className="mt-8 border-t border-line pt-6">
        <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-ink/85">
          <input
            type="checkbox"
            name="consent"
            defaultChecked={val("consent") === "on"}
            aria-invalid={err("consent") ? true : undefined}
            aria-describedby={err("consent") ? "consent-error" : undefined}
            className="mt-0.5 size-4 shrink-0 accent-[var(--color-brand-700)]"
          />
          <span>
            {f.consent} <span className="text-danger">*</span>
          </span>
        </label>
        {errorText("consent")}
      </div>

      <button
        type="submit"
        disabled={pending}
        className="mt-6 inline-flex items-center gap-2 rounded-[var(--radius-card)] bg-brand-900 px-6 py-3 text-[15px] font-semibold text-white hover:bg-brand-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700 disabled:cursor-wait disabled:opacity-70"
      >
        <Send aria-hidden className="size-4" />
        {pending ? text.submitting : text.submit}
      </button>
    </form>
  );
}
````

## `src/components/ApplyDialog.tsx`

````tsx
"use client";

import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import type { ApplicationFormText } from "@/content/types";
import { ApplicationForm } from "./ApplicationForm";

const OPEN_EVENT = "apply:open";
const HASH = "#muraciet";

/** Any number of these can open the single application dialog. */
export function ApplyButton({
  children,
  variant = "primary",
  className = "",
}: {
  children: React.ReactNode;
  variant?: "primary" | "inverse" | "compact";
  className?: string;
}) {
  const styles = {
    primary: "bg-brand-900 px-5 py-3 text-[15px] text-white hover:bg-brand-800",
    inverse: "bg-white px-5 py-3 text-[15px] text-brand-900 hover:bg-brand-100",
    compact: "bg-white px-3.5 py-2 text-sm text-brand-900 hover:bg-brand-100",
  }[variant];
  return (
    <button
      type="button"
      aria-haspopup="dialog"
      onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}
      className={`inline-flex items-center justify-center gap-2 rounded-[var(--radius-card)] font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700 ${styles} ${className}`}
    >
      {children}
    </button>
  );
}

export function ApplyDialog({
  text,
  domains,
  locale,
  closeLabel,
}: {
  text: ApplicationFormText;
  domains: { id: string; title: string }[];
  locale: string;
  closeLabel: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    const open = () => {
      if (!dialog.open) dialog.showModal();
    };
    const onHash = () => {
      if (window.location.hash === HASH) open();
    };
    window.addEventListener(OPEN_EVENT, open);
    window.addEventListener("hashchange", onHash);
    onHash(); // deep link: /az#muraciet opens the form
    return () => {
      window.removeEventListener(OPEN_EVENT, open);
      window.removeEventListener("hashchange", onHash);
    };
  }, []);

  const onClose = () => {
    if (window.location.hash === HASH) {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }
  };

  return (
    <dialog
      ref={ref}
      aria-labelledby="apply-title"
      onClose={onClose}
      onClick={(e) => {
        // Click on the backdrop (outside the panel) closes the dialog.
        if (e.target === e.currentTarget) e.currentTarget.close();
      }}
      className="m-auto w-[min(100%-2rem,48rem)] max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-[var(--radius-card)] bg-white p-0 text-ink shadow-2xl"
    >
      <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-line bg-white px-5 py-4 sm:px-8">
        <div>
          <h2 id="apply-title" className="text-xl font-semibold text-brand-900">
            {text.title}
          </h2>
          <p className="mt-1 text-sm text-muted">{text.lead}</p>
        </div>
        <button
          type="button"
          onClick={() => ref.current?.close()}
          aria-label={closeLabel}
          className="-mr-2 rounded p-2 text-muted hover:bg-surface hover:text-brand-900 focus-visible:outline-2 focus-visible:outline-brand-700"
        >
          <X aria-hidden className="size-5" />
        </button>
      </div>
      <div className="px-5 py-6 sm:px-8">
        <ApplicationForm text={text} domains={domains} locale={locale} />
      </div>
    </dialog>
  );
}
````

## `src/components/Footer.tsx`

````tsx
import Image from "next/image";
import type { Content } from "@/content/types";
import { Container } from "./ui";

export function Footer({ c }: { c: Content }) {
  return (
    <footer className="bg-brand-950 text-white/70">
      <Container className="grid grid-cols-1 gap-8 py-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <Image
            src="/images/ministry-logo-white.png"
            alt="Azərbaycan Respublikası Rəqəmsal İnkişaf və Nəqliyyat Nazirliyi"
            width={919}
            height={266}
            className="h-10 w-auto"
          />
          <p className="mt-5 max-w-sm text-sm leading-relaxed">{c.ui.org}</p>
        </div>
        <nav aria-label={c.ui.sectionsLabel} className="md:col-span-7">
          <ul className="grid grid-cols-1 gap-x-8 gap-y-2.5 text-sm sm:grid-cols-2">
            {c.ui.nav.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className="hover:text-white">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-3 py-5 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>{c.footer.text}</p>
          <a href="#top" className="hover:text-white">
            {c.ui.backToTop}
          </a>
        </Container>
      </div>
    </footer>
  );
}
````

## `src/components/Header.tsx`

````tsx
import Image from "next/image";
import Link from "next/link";
import { locales, type Locale } from "@/content";
import type { Content } from "@/content/types";
import { ApplyButton } from "./ApplyDialog";

export function Header({ c, lang }: { c: Content; lang: Locale }) {
  return (
    <header className="sticky top-0 z-40">
      <div className="bg-brand-900 text-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
          <a href="#top" className="flex min-w-0 items-center gap-4" aria-label={c.meta.title}>
            <Image
              src="/images/ministry-logo-white.png"
              alt="Azərbaycan Respublikası Rəqəmsal İnkişaf və Nəqliyyat Nazirliyi"
              width={919}
              height={266}
              priority
              className="h-9 w-auto shrink-0"
            />
            <span aria-hidden className="hidden h-8 w-px bg-white/25 md:block" />
            <span className="hidden max-w-[16rem] text-[13px] font-medium leading-snug text-white/85 md:block">{c.ui.org}</span>
          </a>
          <div className="ml-auto flex items-center gap-3">
            <nav aria-label={c.ui.languageLabel} className="flex text-xs font-semibold">
              {locales.map((l) => (
                <Link
                  key={l}
                  href={`/${l}`}
                  hrefLang={l}
                  aria-current={l === lang ? "true" : undefined}
                  className={`px-2 py-1 uppercase ${l === lang ? "text-white underline underline-offset-4" : "text-white/60 hover:text-white"}`}
                >
                  {l}
                </Link>
              ))}
            </nav>
            <ApplyButton variant="compact" className="hidden sm:inline-flex">
              {c.ui.applyCta}
            </ApplyButton>
          </div>
        </div>
      </div>
      <nav aria-label={c.ui.sectionsLabel} className="border-b border-line bg-white">
        <ul className="no-scrollbar mx-auto flex max-w-7xl gap-6 overflow-x-auto px-4 sm:px-6 lg:px-8">
          {c.ui.nav.map((item) => (
            <li key={item.id} className="shrink-0">
              <a
                href={`#${item.id}`}
                className="block whitespace-nowrap border-b-2 border-transparent py-3.5 text-sm font-medium text-ink/80 hover:border-brand-700 hover:text-brand-900"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
````

## `src/components/Hero.tsx`

````tsx
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Content } from "@/content/types";
import { ApplyButton } from "./ApplyDialog";
import { Container } from "./ui";

export function Hero({ c }: { c: Content }) {
  const { hero } = c;
  return (
    <section id="top" className="bg-white">
      <Container className="grid grid-cols-1 items-center gap-10 py-14 sm:py-20 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <p className="text-sm font-medium text-brand-700">{c.ui.org}</p>
          <h1 className="mt-4 text-balance text-4xl font-semibold leading-[1.1] tracking-tight text-brand-900 sm:text-5xl">
            {hero.title}
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted">{hero.lead}</p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            <ApplyButton>{hero.primary.label}</ApplyButton>
            <a
              href={hero.secondary.href}
              className="inline-flex items-center gap-2 text-[15px] font-semibold text-brand-900 underline-offset-4 hover:underline"
            >
              {hero.secondary.label} <ArrowRight aria-hidden className="size-4" />
            </a>
          </div>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] bg-brand-900 lg:col-span-5 lg:aspect-[4/5]">
          <Image
            src="/images/boardroom.jpg"
            alt=""
            fill
            priority
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover"
          />
        </div>
      </Container>
      <div className="border-y border-line bg-surface">
        <Container>
          <dl className="grid grid-cols-1 divide-y divide-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {hero.facts.map((f) => (
              <div key={f.label} className="flex flex-col-reverse justify-end gap-1 py-6 sm:px-8 sm:first:pl-0">
                <dt className="text-sm leading-snug text-muted">{f.label}</dt>
                <dd className="text-2xl font-semibold tracking-tight text-brand-900">{f.value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </div>
    </section>
  );
}
````

## `src/components/Sections.tsx`

````tsx
import {
  Activity,
  BrainCircuit,
  Check,
  Cloud,
  Database,
  Drone,
  RadioTower,
  Satellite,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import type { Content } from "@/content/types";
import { ApplyButton } from "./ApplyDialog";
import { Container, Heading } from "./ui";

const domainIcons: Record<string, LucideIcon> = {
  cyber: ShieldCheck,
  comms: RadioTower,
  data: Database,
  ai: BrainCircuit,
  cloud: Cloud,
  resilience: Activity,
  space: Satellite,
  uav: Drone,
};

const num = (i: number) => String(i + 1).padStart(2, "0");

/** Title and lead in the left column, content in the right (desktop). */
function Split({ title, lead, children }: { title: string; lead?: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
      <div className="lg:col-span-4">
        <Heading title={title} lead={lead} />
      </div>
      <div className="lg:col-span-8">{children}</div>
    </div>
  );
}

export function About({ c }: { c: Content }) {
  const { about } = c;
  return (
    <section id="haqqinda" className="bg-white py-16 sm:py-24">
      <Container>
        <Split title={about.title} lead={about.lead}>
          <ol className="grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2">
            {about.pillars.map((p, i) => (
              <li key={p.title} className="border-t border-line pt-5">
                <span className="text-sm font-semibold tabular-nums text-brand-700">{num(i)}</span>
                <h3 className="mt-2 text-lg font-semibold leading-snug text-brand-900">{p.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{p.body}</p>
              </li>
            ))}
          </ol>
        </Split>
      </Container>
    </section>
  );
}

export function Domains({ c }: { c: Content }) {
  const { domains } = c;
  return (
    <section id="istiqametler" className="border-y border-line bg-surface py-16 sm:py-24">
      <Container>
        <Heading title={domains.title} lead={domains.lead} />
        <ul className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {domains.items.map((d) => {
            const Icon = domainIcons[d.id] ?? ShieldCheck;
            return (
              <li key={d.id} className="bg-white p-6">
                <Icon aria-hidden className="size-6 text-brand-700" strokeWidth={1.5} />
                <h3 className="mt-5 font-semibold leading-snug text-brand-900">{d.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{d.body}</p>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}

export function Partners({ c }: { c: Content }) {
  const { partners } = c;
  return (
    <section id="terefdaslar" className="bg-white py-16 sm:py-24">
      <Container>
        <Split title={partners.title} lead={partners.lead}>
          <ul className="grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2">
            {partners.roles.map((r) => (
              <li key={r.title} className="border-t-2 border-brand-900 pt-5">
                <h3 className="text-lg font-semibold text-brand-900">{r.title}</h3>
                {r.sectors && <p className="mt-1 text-sm text-brand-700">{r.sectors}</p>}
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{r.body}</p>
              </li>
            ))}
          </ul>
        </Split>

        <div className="mt-16 border-t border-line pt-10">
          <h3 className="text-xl font-semibold text-brand-900">{partners.stepsTitle}</h3>
          <ol className="mt-8 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {partners.steps.map((s, i) => (
              <li key={s.title} className={`border-t-2 pt-5 ${i === 0 ? "border-brand-900" : "border-line"}`}>
                <span className="text-sm font-semibold tabular-nums text-brand-700">{num(i)}</span>
                <h4 className="mt-2 text-lg font-semibold text-brand-900">{s.title}</h4>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}

export function Benefits({ c }: { c: Content }) {
  const { benefits } = c;
  return (
    <section id="imkanlar" className="border-y border-line bg-surface py-16 sm:py-24">
      <Container>
        <Split title={benefits.title} lead={benefits.lead}>
          <ul className="grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2">
            {benefits.items.map((b) => (
              <li key={b.title} className="border-t border-line pt-5">
                <h3 className="text-lg font-semibold leading-snug text-brand-900">{b.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{b.body}</p>
              </li>
            ))}
          </ul>
          <p className="mt-10 border-l-2 border-brand-700 bg-white px-5 py-4 text-[15px] leading-relaxed text-ink/85">
            {benefits.note}
          </p>
        </Split>
      </Container>
    </section>
  );
}

export function Join({ c }: { c: Content }) {
  const { join } = c;
  return (
    <section id="qosulma" className="bg-brand-900 py-16 text-white sm:py-24">
      <Container className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <Heading title={join.title} inverse />
          <ul className="mt-8 space-y-4">
            {join.criteria.map((item) => (
              <li key={item} className="flex gap-3 text-[1.0625rem] leading-relaxed text-white/85">
                <Check aria-hidden className="mt-1 size-5 shrink-0 text-white" strokeWidth={2} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="self-start rounded-[var(--radius-card)] bg-white p-7 text-ink sm:p-8 lg:col-span-5">
          <h3 className="text-xl font-semibold text-brand-900">{join.box.title}</h3>
          <p className="mt-3 text-[15px] leading-relaxed text-muted">{join.box.body}</p>
          <ApplyButton className="mt-6 w-full sm:w-auto">{join.box.button.label}</ApplyButton>
        </div>
      </Container>
    </section>
  );
}
````

## `src/components/ui.tsx`

````tsx
export function Container({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

export function Heading({ title, lead, inverse = false }: { title: string; lead?: string; inverse?: boolean }) {
  return (
    <div>
      <h2
        className={`text-balance text-[1.75rem] font-semibold leading-tight tracking-tight sm:text-[2rem] ${
          inverse ? "text-white" : "text-brand-900"
        }`}
      >
        {title}
      </h2>
      {lead && (
        <p className={`mt-4 max-w-xl text-pretty text-[1.0625rem] leading-relaxed ${inverse ? "text-white/80" : "text-muted"}`}>
          {lead}
        </p>
      )}
    </div>
  );
}
````

## `src/content/az.ts`

````tsx
import type { Content } from "./types";

export const az: Content = {
  meta: {
    locale: "az",
    title: "Azərbaycan Texnoloji Dayanıqlılıq Klasteri",
    description:
      "Həyati sistemlərin təhlükəsiz və fasiləsiz işləməsini təmin edən texnologiyalar üzərində çalışan şirkətləri bir araya gətirən klaster.",
  },
  ui: {
    skipToContent: "Məzmuna keç",
    languageLabel: "Dil",
    sectionsLabel: "Bölmələr",
    org: "İnnovasiya və Rəqəmsal İnkişaf Agentliyi",
    nav: [
      { id: "haqqinda", label: "Klaster haqqında" },
      { id: "istiqametler", label: "İstiqamətlər" },
      { id: "terefdaslar", label: "Aparıcı tərəfdaşlar" },
      { id: "imkanlar", label: "Üzvlərə imkanlar" },
      { id: "qosulma", label: "Qoşulma" },
    ],
    backToTop: "Yuxarı qayıt",
    applyCta: "Müraciət et",
    close: "Bağla",
  },
  hero: {
    title: "Azərbaycan Texnoloji Dayanıqlılıq Klasteri",
    lead: "Həyati sistemlərin təhlükəsiz və fasiləsiz işləməsini təmin edən texnologiyalar üzərində çalışan şirkətləri bir araya gətiririk. Klaster yerli həllərin hazırlanmasını, tətbiqini və regiona ixracını dəstəkləyir.",
    primary: { label: "Klasterə qoşulun" },
    secondary: { label: "İstiqamətlərə baxın", href: "#istiqametler" },
    facts: [
      { value: "8", label: "fəaliyyət istiqaməti" },
      { value: "4", label: "mərhələ: tapşırıqdan ixraca qədər" },
      { value: "Texnopark", label: "rezidentləri üçün qanunvericiliklə müəyyən edilmiş güzəştlər" },
    ],
  },
  about: {
    title: "Klaster nədir",
    lead: "Klaster Texnopark rezidentlərini, aparıcı tərəfdaş şirkətləri və dövlət qurumlarını ümumi məqsəd ətrafında birləşdirir: kritik infrastrukturu qoruyan həllər yaratmaq və onları xarici bazarlara çıxarmaq.",
    pillars: [
      {
        title: "Mövcud imkanlara əsaslanmaq",
        body: "Azərbaycanın infrastrukturu, texniki bacarıqları və beynəlxalq tərəfdaşlıqları başlanğıc nöqtəsidir.",
      },
      {
        title: "Ekosistem yaratmaq",
        body: "Yerli və beynəlxalq şirkətlər arasında əməkdaşlıq, xarici şirkətlər üçün isə bazara sadələşdirilmiş giriş.",
      },
      {
        title: "Bilik və təcrübəni yerində qurmaq",
        body: "Aparıcı texnologiya şirkətlərinin xidmət, inteqrasiya və tətbiq fəaliyyətlərini Azərbaycanda qurmaq, yerli ekspertizanı inkişaf etdirmək.",
      },
      {
        title: "İxraca hazır həllər",
        body: "Mərkəzi Asiya, Yaxın Şərq və Afrika bazarları üçün Azərbaycandan təqdim olunan inteqrasiya olunmuş həllər.",
      },
    ],
  },
  domains: {
    title: "Fəaliyyət istiqamətləri",
    lead: "Klaster mülki dayanıqlılıq texnologiyalarını əhatə edir.",
    items: [
      { id: "cyber", title: "Kibertəhlükəsizlik və rəqəmsal etimad", body: "Təhdidlərin aşkarlanması, identifikasiya, məlumatların qorunması, elektron imza" },
      { id: "comms", title: "Təhlükəsiz kommunikasiyalar", body: "Kritik missiya rabitəsi, şəbəkə dayanıqlılığı, şifrələmə" },
      { id: "data", title: "Məlumat və verilənlər", body: "Data platformaları, analitika, qərar qəbuluna dəstək" },
      { id: "ai", title: "Süni intellekt", body: "Sİ əsaslı analitika, avtomatlaşdırma və proqnozlaşdırma" },
      { id: "cloud", title: "Bulud texnologiyaları", body: "Dayanıqlı bulud infrastrukturu və rəqəmsal xidmətlər" },
      { id: "resilience", title: "Dayanıqlılıq həlləri", body: "Real vaxt monitorinqi, erkən xəbərdarlıq, xidmətlərin fasiləsizliyi" },
      { id: "space", title: "Kosmik texnologiyalar", body: "Peyk rabitəsi, Yerin müşahidəsi, məlumat xidmətləri" },
      { id: "uav", title: "Pilotsuz uçuş aparatları", body: "Mülki tətbiqlər: inspeksiya, monitorinq, logistika" },
    ],
  },
  partners: {
    title: "Aparıcı tərəfdaşlar",
    lead: "Klaster böyük milli şirkətlər və qlobal texnologiya şirkətləri ilə aparıcı (anchor) tərəfdaş kimi işləyir.",
    roles: [
      {
        title: "Milli şirkətlər",
        sectors: "Telekommunikasiya, kosmik, enerji və nəqliyyat",
        body: "Real tapşırıqlar və pilot layihələr təqdim edir.",
      },
      {
        title: "Qlobal texnologiya şirkətləri",
        body: "Texnologiya, standart və sertifikatlaşdırma gətirir.",
      },
    ],
    stepsTitle: "Əməkdaşlıq necə qurulur",
    steps: [
      { title: "Tapşırıq", body: "Aparıcı tərəfdaş həll tələb edən konkret tapşırığı müəyyən edir." },
      { title: "Komanda", body: "Klaster üzvlərindən tapşırığa uyğun şirkətlər qrupu formalaşır." },
      { title: "Pilot", body: "Həll real mühitdə pilot layihə kimi sınaqdan keçirilir." },
      { title: "İxrac", body: "Referansı olan hazır həll xarici bazarlara çıxarılır." },
    ],
  },
  benefits: {
    title: "Klaster üzvlərinə imkanlar",
    lead: "Aşağıdakı imkanlar ilk növbədə klaster üzvlərinə təqdim olunur.",
    items: [
      { title: "Layihə üzərində dərhal işə başlamaq", body: "Aparıcı tərəfdaşların tapşırıqlarına və pilot layihələrə birbaşa çıxış." },
      { title: "İxraca dəstək", body: "Hədəf bazarların araşdırılması, satış fəaliyyətinə və bazara çıxışa dəstək." },
      {
        title: "Beynəlxalq tədbirlər",
        body: "Beynəlxalq konfranslarda və Azərbaycan milli pavilyonunda iştirak, dövlət nümayəndə heyətlərinin səfərlərinə qoşulmaq.",
      },
      { title: "Şəbəkələşmə və tərəfdaşlıq", body: "İnvestorlar, xarici tərəfdaşlar və digər klaster üzvləri ilə əlaqələr." },
    ],
    note: "İxraca dəstək və beynəlxalq tədbirlərdə iştirak İRİA-nın proqramları çərçivəsində həyata keçirilir. Bundan əlavə, Texnopark rezidentləri olan klaster üzvləri qanunvericiliklə müəyyən edilmiş güzəştlərdən istifadə edir.",
  },
  join: {
    title: "Klasterə kimlər qoşula bilər",
    criteria: [
      "Fəaliyyəti yuxarıdakı istiqamətlərdən birinə aid olan Texnopark rezidentləri",
      "Öz məhsulu və ya texnologiyası olan şirkətlərə üstünlük verilir",
      "Formalaşmış texniki komanda və birgə layihələrdə iştirak etməyə hazırlıq",
    ],
    box: {
      title: "Müraciət",
      body: "Klasterə qoşulmaq və ya aparıcı tərəfdaş kimi əməkdaşlıq etmək üçün müraciət göndərin.",
      button: { label: "Müraciət göndərin" },
    },
  },
  form: {
    title: "Müraciət forması",
    lead: "Formu doldurun. Müraciətinizə baxıldıqdan sonra sizinlə göstərdiyiniz email vasitəsilə əlaqə saxlanılacaq.",
    requiredNote: "* ilə işarələnmiş sahələr mütləqdir.",
    groups: { type: "Müraciət növü", company: "Şirkət", activity: "Fəaliyyət", contact: "Əlaqə şəxsi" },
    fields: {
      type: {
        label: "Nə üçün müraciət edirsiniz",
        options: [
          { value: "member", label: "Klasterə üzv kimi qoşulmaq" },
          { value: "anchor", label: "Aparıcı tərəfdaş kimi əməkdaşlıq" },
        ],
      },
      company: "Şirkətin adı",
      taxId: "VÖEN",
      website: "Vebsayt",
      websiteHint: "Məsələn: https://sirket.az",
      resident: {
        label: "Texnopark rezidentisinizmi",
        options: [
          { value: "yes", label: "Bəli" },
          { value: "applying", label: "Müraciət mərhələsindədir" },
          { value: "no", label: "Xeyr" },
        ],
      },
      domains: "Fəaliyyət istiqamətləri",
      domainsHint: "Bir və ya bir neçə istiqamət seçin.",
      product: "Məhsul və ya texnologiya",
      productHint: "Şirkətin öz məhsulu və ya texnologiyası haqqında qısa məlumat.",
      teamSize: { label: "Texniki komandanın ölçüsü", placeholder: "Seçin", options: ["1–10", "11–50", "51–200", "200+"] },
      name: "Ad və soyad",
      role: "Vəzifə",
      email: "Email",
      phone: "Telefon",
      message: "Əlavə qeyd",
      consent: "Təqdim etdiyim məlumatların müraciətə baxılması məqsədilə istifadə olunmasına razıyam.",
    },
    optional: "istəyə bağlı",
    submit: "Müraciəti göndər",
    submitting: "Göndərilir…",
    errors: {
      summary: "Formu göndərmək üçün qeyd olunan sahələri düzəldin.",
      required: "Bu sahəni doldurun.",
      email: "Düzgün email ünvanı daxil edin.",
      domains: "Ən azı bir istiqamət seçin.",
      url: "Düzgün veb ünvan daxil edin.",
      tooLong: "Mətn çox uzundur.",
      consent: "Davam etmək üçün razılığınızı təsdiqləyin.",
      failed: "Müraciət göndərilmədi. Bir az sonra yenidən cəhd edin.",
    },
    success: {
      title: "Müraciətiniz qəbul olundu",
      body: "Təşəkkür edirik. Müraciətinizə baxıldıqdan sonra göstərdiyiniz email ünvanı ilə sizinlə əlaqə saxlanılacaq.",
      again: "Yeni müraciət göndər",
    },
  },
  footer: {
    text: "İnnovasiya və Rəqəmsal İnkişaf Agentliyi, Rəqəmsal İnkişaf və Nəqliyyat Nazirliyi, 2026",
  },
};
````

## `src/content/en.ts`

````tsx
import type { Content } from "./types";

// Translation of az.ts (the source copy).
export const en: Content = {
  meta: {
    locale: "en",
    title: "Technology Resilience Cluster of Azerbaijan",
    description:
      "A cluster that brings together companies working on technologies that keep essential systems running safely and without interruption.",
  },
  ui: {
    skipToContent: "Skip to content",
    languageLabel: "Language",
    sectionsLabel: "Sections",
    org: "Innovation and Digital Development Agency",
    nav: [
      { id: "haqqinda", label: "About the cluster" },
      { id: "istiqametler", label: "Focus areas" },
      { id: "terefdaslar", label: "Anchor partners" },
      { id: "imkanlar", label: "Member benefits" },
      { id: "qosulma", label: "Joining" },
    ],
    backToTop: "Back to top",
    applyCta: "Apply",
    close: "Close",
  },
  hero: {
    title: "Technology Resilience Cluster of Azerbaijan",
    lead: "We bring together companies working on technologies that keep essential systems running safely and without interruption. The cluster supports developing local solutions, deploying them and exporting them to the region.",
    primary: { label: "Join the cluster" },
    secondary: { label: "See the focus areas", href: "#istiqametler" },
    facts: [
      { value: "8", label: "focus areas" },
      { value: "4", label: "stages, from task to export" },
      { value: "Technopark", label: "residents use the incentives set by law" },
    ],
  },
  about: {
    title: "What the cluster is",
    lead: "The cluster brings Technopark residents, anchor partner companies and government bodies together around a shared goal: building solutions that protect critical infrastructure and taking them to foreign markets.",
    pillars: [
      {
        title: "Build on existing capabilities",
        body: "Azerbaijan's infrastructure, technical skills and international partnerships are the starting point.",
      },
      {
        title: "Build an ecosystem",
        body: "Cooperation between local and international companies, and simpler market access for foreign companies.",
      },
      {
        title: "Build knowledge and experience locally",
        body: "Set up the service, integration and deployment work of leading technology companies in Azerbaijan and develop local expertise.",
      },
      {
        title: "Export-ready solutions",
        body: "Integrated solutions delivered from Azerbaijan for markets in Central Asia, the Middle East and Africa.",
      },
    ],
  },
  domains: {
    title: "Focus areas",
    lead: "The cluster covers civilian resilience technologies.",
    items: [
      { id: "cyber", title: "Cybersecurity and digital trust", body: "Threat detection, identification, data protection, electronic signature" },
      { id: "comms", title: "Secure communications", body: "Mission-critical communications, network resilience, encryption" },
      { id: "data", title: "Data and information", body: "Data platforms, analytics, decision support" },
      { id: "ai", title: "Artificial intelligence", body: "AI-based analytics, automation and forecasting" },
      { id: "cloud", title: "Cloud technologies", body: "Resilient cloud infrastructure and digital services" },
      { id: "resilience", title: "Resilience solutions", body: "Real-time monitoring, early warning, service continuity" },
      { id: "space", title: "Space technologies", body: "Satellite communications, Earth observation, data services" },
      { id: "uav", title: "Unmanned aerial vehicles", body: "Civilian uses: inspection, monitoring, logistics" },
    ],
  },
  partners: {
    title: "Anchor partners",
    lead: "The cluster works with large national companies and global technology companies as anchor partners.",
    roles: [
      {
        title: "National companies",
        sectors: "Telecommunications, space, energy and transport",
        body: "Provide real tasks and pilot projects.",
      },
      {
        title: "Global technology companies",
        body: "Bring technology, standards and certification.",
      },
    ],
    stepsTitle: "How cooperation works",
    steps: [
      { title: "Task", body: "The anchor partner defines a specific task that needs a solution." },
      { title: "Team", body: "A group of cluster members suited to the task is formed." },
      { title: "Pilot", body: "The solution is tested as a pilot project in a real environment." },
      { title: "Export", body: "The finished solution, now with a reference, goes to foreign markets." },
    ],
  },
  benefits: {
    title: "Opportunities for cluster members",
    lead: "The following opportunities are offered first to cluster members.",
    items: [
      { title: "Start on projects right away", body: "Direct access to anchor partners' tasks and pilot projects." },
      { title: "Export support", body: "Target market research, and support for sales and market entry." },
      {
        title: "International events",
        body: "Taking part in international conferences and the Azerbaijan national pavilion, and joining visits of government delegations.",
      },
      { title: "Networking and partnerships", body: "Contacts with investors, foreign partners and other cluster members." },
    ],
    note: "Export support and participation in international events are delivered through IDDA programs. In addition, cluster members that are Technopark residents use the incentives set by law.",
  },
  join: {
    title: "Who can join the cluster",
    criteria: [
      "Technopark residents whose work falls within one of the areas above",
      "Companies with their own product or technology are preferred",
      "An established technical team and readiness to take part in joint projects",
    ],
    box: {
      title: "Application",
      body: "Send an application to join the cluster or to cooperate as an anchor partner.",
      button: { label: "Send an application" },
    },
  },
  form: {
    title: "Application form",
    lead: "Fill in the form. Once your application has been reviewed, we will contact you at the email you provide.",
    requiredNote: "Fields marked * are required.",
    groups: { type: "Application type", company: "Company", activity: "Activity", contact: "Contact person" },
    fields: {
      type: {
        label: "What are you applying for",
        options: [
          { value: "member", label: "Join the cluster as a member" },
          { value: "anchor", label: "Cooperate as an anchor partner" },
        ],
      },
      company: "Company name",
      taxId: "Tax ID (VÖEN)",
      website: "Website",
      websiteHint: "For example: https://company.az",
      resident: {
        label: "Are you a Technopark resident",
        options: [
          { value: "yes", label: "Yes" },
          { value: "applying", label: "Application in progress" },
          { value: "no", label: "No" },
        ],
      },
      domains: "Focus areas",
      domainsHint: "Select one or more areas.",
      product: "Product or technology",
      productHint: "A short description of the company's own product or technology.",
      teamSize: { label: "Technical team size", placeholder: "Select", options: ["1–10", "11–50", "51–200", "200+"] },
      name: "Full name",
      role: "Position",
      email: "Email",
      phone: "Phone",
      message: "Additional notes",
      consent: "I agree that the information I provide may be used to review this application.",
    },
    optional: "optional",
    submit: "Send application",
    submitting: "Sending…",
    errors: {
      summary: "Please correct the marked fields to send the form.",
      required: "Please fill in this field.",
      email: "Enter a valid email address.",
      domains: "Select at least one area.",
      url: "Enter a valid web address.",
      tooLong: "This text is too long.",
      consent: "Please confirm your consent to continue.",
      failed: "The application could not be sent. Please try again a little later.",
    },
    success: {
      title: "Your application has been received",
      body: "Thank you. Once your application has been reviewed, we will contact you at the email you provided.",
      again: "Send another application",
    },
  },
  footer: {
    text: "Innovation and Digital Development Agency, Ministry of Digital Development and Transport, 2026",
  },
};
````

## `src/content/index.ts`

````tsx
import { az } from "./az";
import { en } from "./en";
import type { Content } from "./types";

export const locales = ["az", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "az";

const content: Record<Locale, Content> = { en, az };

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

export const getContent = (locale: Locale): Content => content[locale];
````

## `src/content/types.ts`

````tsx
/** Page content. Both locales (az, en) share this shape. */
export type Content = {
  meta: { locale: string; title: string; description: string };
  ui: {
    skipToContent: string;
    languageLabel: string;
    sectionsLabel: string;
    /** Organisation shown in the header next to the ministry logo. */
    org: string;
    nav: { id: string; label: string }[];
    backToTop: string;
    applyCta: string;
    close: string;
  };
  hero: {
    title: string;
    lead: string;
    primary: { label: string };
    secondary: { label: string; href: string };
    facts: { value: string; label: string }[];
  };
  about: {
    title: string;
    lead: string;
    pillars: { title: string; body: string }[];
  };
  domains: {
    title: string;
    lead: string;
    items: { id: string; title: string; body: string }[];
  };
  partners: {
    title: string;
    lead: string;
    roles: { title: string; sectors?: string; body: string }[];
    stepsTitle: string;
    steps: { title: string; body: string }[];
  };
  benefits: {
    title: string;
    lead: string;
    items: { title: string; body: string }[];
    note: string;
  };
  join: {
    title: string;
    criteria: string[];
    box: {
      title: string;
      body: string;
      button: { label: string };
    };
  };
  form: ApplicationFormText;
  footer: { text: string };
};

export type ApplicationFormText = {
  title: string;
  lead: string;
  requiredNote: string;
  groups: { type: string; company: string; activity: string; contact: string };
  fields: {
    type: { label: string; options: { value: "member" | "anchor"; label: string }[] };
    company: string;
    taxId: string;
    website: string;
    websiteHint: string;
    resident: { label: string; options: { value: "yes" | "no" | "applying"; label: string }[] };
    domains: string;
    domainsHint: string;
    product: string;
    productHint: string;
    teamSize: { label: string; placeholder: string; options: string[] };
    name: string;
    role: string;
    email: string;
    phone: string;
    message: string;
    consent: string;
  };
  optional: string;
  submit: string;
  submitting: string;
  errors: {
    summary: string;
    required: string;
    email: string;
    domains: string;
    url: string;
    tooLong: string;
    consent: string;
    failed: string;
  };
  success: { title: string; body: string; again: string };
};
````

## `src/lib/application.ts`

````tsx
/** Shared (client + server) definitions for the application form. */

export const DOMAIN_IDS = ["cyber", "comms", "data", "ai", "cloud", "resilience", "space", "uav"] as const;
export const TYPES = ["member", "anchor"] as const;
export const RESIDENT = ["yes", "applying", "no"] as const;
export const TEAM_SIZES = ["1–10", "11–50", "51–200", "200+"] as const;

export type Field =
  | "type"
  | "company"
  | "taxId"
  | "website"
  | "resident"
  | "domains"
  | "product"
  | "teamSize"
  | "name"
  | "role"
  | "email"
  | "phone"
  | "message"
  | "consent";

export type ErrorCode = "required" | "email" | "domains" | "url" | "tooLong" | "consent";

export type ApplyState = {
  status: "idle" | "error" | "success" | "failed";
  errors?: Partial<Record<Field, ErrorCode>>;
  /** Submitted values, returned on error so the form keeps what the user typed. */
  values?: Partial<Record<Field, string | string[]>>;
};

export const initialApplyState: ApplyState = { status: "idle" };

export type Application = {
  type: (typeof TYPES)[number];
  company: string;
  taxId: string;
  website: string;
  resident: (typeof RESIDENT)[number];
  domains: (typeof DOMAIN_IDS)[number][];
  product: string;
  teamSize: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  message: string;
  locale: string;
  submittedAt: string;
};
````

## `src/lib/apply.ts`

````tsx
"use server";

import {
  DOMAIN_IDS,
  RESIDENT,
  TEAM_SIZES,
  TYPES,
  type Application,
  type ApplyState,
  type ErrorCode,
  type Field,
} from "./application";
import { deliverApplication } from "./deliver";

const MAX_SHORT = 200;
const MAX_LONG = 2000;
const MIN_FILL_MS = 3000;

const str = (fd: FormData, key: string) => {
  const v = fd.get(key);
  return typeof v === "string" ? v.trim() : "";
};

function normalizeUrl(raw: string): string | null {
  if (!raw) return "";
  const withScheme = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  try {
    const u = new URL(withScheme);
    return u.hostname.includes(".") ? u.toString() : null;
  } catch {
    return null;
  }
}

/** Server Action behind the application form (used with useActionState). */
export async function submitApplication(_prev: ApplyState, fd: FormData): Promise<ApplyState> {
  // Spam guards: a hidden honeypot field and a minimum time on the form.
  // Bots get a normal-looking success so they don't learn to adapt.
  const startedAt = Number(str(fd, "startedAt"));
  if (str(fd, "fax") || !startedAt || Date.now() - startedAt < MIN_FILL_MS) {
    return { status: "success" };
  }

  const values: ApplyState["values"] = {
    type: str(fd, "type"),
    company: str(fd, "company"),
    taxId: str(fd, "taxId"),
    website: str(fd, "website"),
    resident: str(fd, "resident"),
    domains: fd.getAll("domains").filter((v): v is string => typeof v === "string"),
    product: str(fd, "product"),
    teamSize: str(fd, "teamSize"),
    name: str(fd, "name"),
    role: str(fd, "role"),
    email: str(fd, "email"),
    phone: str(fd, "phone"),
    message: str(fd, "message"),
    consent: fd.get("consent") ? "on" : "",
  };
  const v = values as Record<Field, string> & { domains: string[] };
  const errors: Partial<Record<Field, ErrorCode>> = {};
  const req = (k: Field) => {
    if (!v[k]) errors[k] = "required";
  };

  if (!(TYPES as readonly string[]).includes(v.type)) errors.type = "required";
  req("company");
  if (!(RESIDENT as readonly string[]).includes(v.resident)) errors.resident = "required";
  const domains = v.domains.filter((d) => (DOMAIN_IDS as readonly string[]).includes(d));
  if (domains.length === 0) errors.domains = "domains";
  req("product");
  if (v.teamSize && !(TEAM_SIZES as readonly string[]).includes(v.teamSize)) errors.teamSize = "required";
  req("name");
  if (!v.email) errors.email = "required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email)) errors.email = "email";
  const website = normalizeUrl(v.website);
  if (website === null) errors.website = "url";
  if (!v.consent) errors.consent = "consent";

  for (const k of ["company", "taxId", "website", "name", "role", "email", "phone"] as const) {
    if (v[k].length > MAX_SHORT) errors[k] = "tooLong";
  }
  for (const k of ["product", "message"] as const) {
    if (v[k].length > MAX_LONG) errors[k] = "tooLong";
  }

  if (Object.keys(errors).length > 0) return { status: "error", errors, values };

  const app: Application = {
    type: v.type as Application["type"],
    company: v.company,
    taxId: v.taxId,
    website: website ?? "",
    resident: v.resident as Application["resident"],
    domains: domains as Application["domains"],
    product: v.product,
    teamSize: v.teamSize,
    name: v.name,
    role: v.role,
    email: v.email,
    phone: v.phone,
    message: v.message,
    locale: str(fd, "locale") === "en" ? "en" : "az",
    submittedAt: new Date().toISOString(),
  };

  const ok = await deliverApplication(app);
  return ok ? { status: "success" } : { status: "failed", values };
}
````

## `src/lib/deliver.ts`

````tsx
import "server-only";
import { az } from "@/content/az";
import type { Application } from "./application";
import { saveApplication, storeConfigured } from "./store";

/**
 * Stores an application and sends optional notifications. Configure on Vercel
 * (Project → Settings → Environment Variables / Storage), then redeploy:
 *
 *   Storage (primary; viewed at /admin): Upstash Redis, see ./store.ts
 *
 *   Email notification via Resend (https://resend.com), optional:
 *     RESEND_API_KEY          API key
 *     APPLICATION_EMAIL_TO    recipient(s), comma-separated
 *     APPLICATION_EMAIL_FROM  sender on a verified domain, e.g. "Klaster <noreply@example.az>"
 *                             (defaults to Resend's test sender, which only delivers to the account owner)
 *
 *   Webhook (Google Apps Script / Sheets, Slack, Make, Zapier, …), optional:
 *     APPLICATION_WEBHOOK_URL     receives the application as JSON (POST)
 *     APPLICATION_WEBHOOK_SECRET  optional, sent as the X-Webhook-Secret header
 *
 * Returns true when the application was stored or accepted by at least one destination.
 */
export async function deliverApplication(app: Application): Promise<boolean> {
  const tasks: Promise<boolean>[] = [];
  if (storeConfigured()) tasks.push(store(app));
  if (process.env.RESEND_API_KEY && process.env.APPLICATION_EMAIL_TO) tasks.push(sendEmail(app));
  if (process.env.APPLICATION_WEBHOOK_URL) tasks.push(sendWebhook(app));

  if (tasks.length === 0) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[application] No destination configured; application received in development:", app);
      return true;
    }
    console.error("[application] No destination configured (connect Upstash Redis, or set RESEND_API_KEY + APPLICATION_EMAIL_TO or APPLICATION_WEBHOOK_URL).");
    return false;
  }

  const results = await Promise.all(tasks);
  return results.some(Boolean);
}

async function store(app: Application): Promise<boolean> {
  try {
    await saveApplication(app);
    return true;
  } catch (err) {
    console.error("[application] Storing failed", err);
    return false;
  }
}

/** Human-readable summary using the Azerbaijani labels (the team's working language). */
export function formatApplication(app: Application): string {
  const f = az.form.fields;
  const domainTitle = new Map(az.domains.items.map((d) => [d.id, d.title]));
  const opt = <T extends string>(list: { value: T; label: string }[], v: T) => list.find((o) => o.value === v)?.label ?? v;
  const rows: [string, string][] = [
    [f.type.label, opt(f.type.options, app.type)],
    [f.company, app.company],
    [f.taxId, app.taxId],
    [f.website, app.website],
    [f.resident.label, opt(f.resident.options, app.resident)],
    [f.domains, app.domains.map((d) => domainTitle.get(d) ?? d).join(", ")],
    [f.product, app.product],
    [f.teamSize.label, app.teamSize],
    [f.name, app.name],
    [f.role, app.role],
    [f.email, app.email],
    [f.phone, app.phone],
    [f.message, app.message],
    ["Dil / Language", app.locale],
    ["Tarix / Date", app.submittedAt],
  ];
  return rows
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}:\n${v}`)
    .join("\n\n");
}

async function sendEmail(app: Application): Promise<boolean> {
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.APPLICATION_EMAIL_FROM || "Dayanıqlılıq Klasteri <onboarding@resend.dev>",
        to: process.env.APPLICATION_EMAIL_TO!.split(",").map((s) => s.trim()).filter(Boolean),
        reply_to: app.email,
        subject: `Yeni müraciət: ${app.company}`,
        text: formatApplication(app),
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) console.error("[application] Resend error", res.status, await res.text().catch(() => ""));
    return res.ok;
  } catch (err) {
    console.error("[application] Resend request failed", err);
    return false;
  }
}

async function sendWebhook(app: Application): Promise<boolean> {
  try {
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (process.env.APPLICATION_WEBHOOK_SECRET) headers["X-Webhook-Secret"] = process.env.APPLICATION_WEBHOOK_SECRET;
    const res = await fetch(process.env.APPLICATION_WEBHOOK_URL!, {
      method: "POST",
      headers,
      body: JSON.stringify({ ...app, summary: formatApplication(app) }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) console.error("[application] Webhook error", res.status);
    return res.ok;
  } catch (err) {
    console.error("[application] Webhook request failed", err);
    return false;
  }
}
````

## `src/lib/labels.ts`

````tsx
import { az } from "@/content/az";
import type { Application } from "./application";

/** Azerbaijani display labels for stored applications (admin list and CSV). */
const f = az.form.fields;
const domainTitle = new Map(az.domains.items.map((d) => [d.id, d.title]));

export const typeLabel = (v: Application["type"]) => f.type.options.find((o) => o.value === v)?.label ?? v;
export const residentLabel = (v: Application["resident"]) => f.resident.options.find((o) => o.value === v)?.label ?? v;
export const domainLabels = (ids: string[]) => ids.map((d) => domainTitle.get(d as never) ?? d);

export const formatDate = (iso: string) => {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  const pad = (n: number) => String(n).padStart(2, "0");
  // Baku time (UTC+4, no DST)
  const b = new Date(d.getTime() + 4 * 3600_000);
  return `${pad(b.getUTCDate())}.${pad(b.getUTCMonth() + 1)}.${b.getUTCFullYear()} ${pad(b.getUTCHours())}:${pad(b.getUTCMinutes())}`;
};
````

## `src/lib/store.ts`

````tsx
import "server-only";
import type { Application } from "./application";

/**
 * Application storage in Upstash Redis (REST API, no SDK).
 *
 * On Vercel: Project → Storage → Create/Connect → "Upstash for Redis" (free plan).
 * The integration adds KV_REST_API_URL / KV_REST_API_TOKEN (or UPSTASH_REDIS_REST_URL /
 * UPSTASH_REDIS_REST_TOKEN) to the project; redeploy afterwards.
 */
const KEY = "cluster:applications";

export type StoredApplication = Application & { id: string };

function config() {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  return url && token ? { url: url.replace(/\/$/, ""), token } : null;
}

export const storeConfigured = () => config() !== null;

async function command<T>(args: (string | number)[]): Promise<T> {
  const cfg = config();
  if (!cfg) throw new Error("Application store is not configured");
  const res = await fetch(cfg.url, {
    method: "POST",
    headers: { Authorization: `Bearer ${cfg.token}`, "Content-Type": "application/json" },
    body: JSON.stringify(args),
    cache: "no-store",
    signal: AbortSignal.timeout(10_000),
  });
  const data = (await res.json().catch(() => ({}))) as { result?: T; error?: string };
  if (!res.ok || data.error) throw new Error(`Redis ${args[0]} failed: ${res.status} ${data.error ?? ""}`);
  return data.result as T;
}

export async function saveApplication(app: Application): Promise<StoredApplication> {
  const stored: StoredApplication = { id: crypto.randomUUID(), ...app };
  await command<number>(["LPUSH", KEY, JSON.stringify(stored)]);
  return stored;
}

/** Newest first. */
export async function listApplications(): Promise<StoredApplication[]> {
  const rows = await command<string[]>(["LRANGE", KEY, 0, -1]);
  return rows.flatMap((r) => {
    try {
      return [JSON.parse(r) as StoredApplication];
    } catch {
      return [];
    }
  });
}
````

## `src/proxy.ts`

````tsx
import { NextResponse, type NextRequest } from "next/server";

/**
 * HTTP Basic Auth gates. Configure on Vercel (Project → Settings → Environment Variables), then redeploy.
 *
 * Admin area (/admin, application list and CSV export), always protected:
 *   ADMIN_PASSWORD  required; without it /admin returns 404
 *   ADMIN_USER      optional, defaults to "admin"
 *
 * Whole site (pages and static assets), optional; the site is public unless set:
 *   SITE_PASSWORD   turns the gate on
 *   SITE_USER       optional, defaults to "team"
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    const password = process.env.ADMIN_PASSWORD;
    if (!password) return new NextResponse("Not found", { status: 404 });
    return checkBasicAuth(request, process.env.ADMIN_USER || "admin", password, "Cluster applications");
  }

  const sitePassword = process.env.SITE_PASSWORD;
  if (!sitePassword) return NextResponse.next();
  return checkBasicAuth(request, process.env.SITE_USER || "team", sitePassword, "Resilience Cluster");
}

function checkBasicAuth(request: NextRequest, user: string, password: string, realm: string) {
  const header = request.headers.get("authorization") ?? "";
  if (header.startsWith("Basic ")) {
    let decoded = "";
    try {
      decoded = atob(header.slice(6));
    } catch {
      decoded = "";
    }
    const sep = decoded.indexOf(":");
    if (sep !== -1) {
      const okUser = safeEqual(decoded.slice(0, sep), user);
      const okPass = safeEqual(decoded.slice(sep + 1), password);
      if (okUser && okPass) return NextResponse.next();
    }
  }
  return new NextResponse("Authentication required.", {
    status: 401,
    headers: { "WWW-Authenticate": `Basic realm="${realm}", charset="UTF-8"`, "Cache-Control": "no-store" },
  });
}

/** Constant-time string comparison (length difference still returns false). */
function safeEqual(a: string, b: string): boolean {
  const len = Math.max(a.length, b.length);
  let diff = a.length ^ b.length;
  for (let i = 0; i < len; i++) {
    diff |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0);
  }
  return diff === 0;
}

export const config = {
  matcher: ["/:path*"],
};
````

## `tsconfig.json`

````json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts",
    ".next/dev/types/**/*.ts",
    "**/*.mts"
  ],
  "exclude": ["node_modules"]
}
````

