import Image from "next/image";
import { ChevronDown, Lock, TriangleAlert } from "lucide-react";
import { candidatesByDomain, russiaExits } from "@/content/companies";
import type { Content } from "@/content/types";
import { ChartCard, Timeline } from "./charts";
import { CompanyExplorer } from "./CompanyExplorer";
import { Bullets, Container, Logo, SectionHeader, SlideTitle, SourceMark, icons } from "./ui";

export function Strategy({ c }: { c: Content }) {
  const { strategy, ui } = c;
  return (
    <section id="strategy" aria-labelledby="strategy-title">
      {/* Divider between the cluster narrative and internal BCG working material */}
      <div className="relative isolate overflow-hidden bg-navy-950 py-16 text-white sm:py-20">
        <div className="absolute inset-y-0 right-0 -z-20 w-full max-w-[720px]">
          <Image src="/images/globe.jpg" alt="" fill sizes="720px" className="object-cover object-left opacity-60" />
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-950 from-40% via-navy-950/80 to-navy-950/20" />
        <Container>
          <p className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-wider text-navy-950">
            <Lock aria-hidden className="size-3.5" /> {ui.sectionInternal}
          </p>
          <div className="mt-6" id="strategy-title">
            <SectionHeader
              kicker={strategy.kicker}
              title={strategy.title}
              lead={strategy.lead}
              dark
              aside={<SourceMark label={ui.deckOnly} tone="dark" />}
            />
          </div>
        </Container>
      </div>

      <Criteria c={c} />
      <Explorer c={c} />
      <Pathway1 c={c} />
      <Pathway2 c={c} />
    </section>
  );
}

function Criteria({ c }: { c: Content }) {
  const { criteria } = c.strategy;
  return (
    <div className="bg-white py-16 sm:py-20">
      <Container>
        <div>
          <SlideTitle kicker={criteria.kicker} title={criteria.title} />
          <p className="mt-2 text-xs text-muted">{criteria.duplicateNote}</p>
        </div>
        <div className="mt-8 grid grid-cols-1 items-start gap-5 lg:grid-cols-[1fr_auto_1fr]">
          {criteria.columns.map((col, ci) => {
            const blue = col.tone === "blue";
            return (
              <div key={col.title} className="contents">
                {ci === 1 && (
                  <span
                    aria-hidden
                    className="mx-auto hidden size-10 items-center justify-center self-center rounded-full bg-navy-900 text-lg font-semibold text-white lg:flex"
                  >
                    ×
                  </span>
                )}
                <div className={`overflow-hidden rounded-xl border ${blue ? "border-brand/30" : "border-leaf/30"}`}>
                  <h4
                    className={`flex items-center justify-between border-b px-5 py-4 text-lg font-semibold ${
                      blue ? "border-brand/20 text-brand" : "border-leaf/20 text-leaf"
                    }`}
                  >
                    {col.title}
                    <span className={`rounded-full px-2 py-0.5 text-xs ${blue ? "bg-sky-100" : "bg-leaf-100"}`}>{col.items.length}</span>
                  </h4>
                  <ul className={`divide-y ${blue ? "divide-white bg-sky-50" : "divide-white bg-leaf-50"}`}>
                    {col.items.map((item) => {
                      const Icon = icons[item.icon];
                      return (
                        <li key={item.title}>
                          <details className="group">
                            <summary className="flex cursor-pointer list-none items-center gap-3 px-5 py-3.5 hover:bg-white/60 [&::-webkit-details-marker]:hidden">
                              <Icon aria-hidden className={`size-6 shrink-0 ${blue ? "text-brand-600" : "text-leaf"}`} />
                              <span className="flex-1 font-semibold text-navy-900">{item.title}</span>
                              <ChevronDown aria-hidden className="size-4 text-muted transition group-open:rotate-180" />
                            </summary>
                            <p className="px-5 pb-4 pl-14 text-sm leading-relaxed text-ink/80">{item.body}</p>
                          </details>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
}

function Explorer({ c }: { c: Content }) {
  const { strategy, charts, ui } = c;
  const { candidates, pools, explorer } = strategy;
  return (
    <div className="bg-sky-50 py-16 sm:py-20">
      <Container>
        <div>
          <SlideTitle kicker={candidates.kicker} title={candidates.title} />
          <p className="mt-3 text-[15px] text-muted">{pools.title}</p>
        </div>
        <div className="mt-8">
          <CompanyExplorer
            modes={[
              {
                id: "domain",
                label: explorer.byDomain,
                groups: candidates.domains.map((d, i) => ({ title: d.title, companies: candidatesByDomain[i] })),
              },
              {
                id: "pool",
                label: explorer.byPool,
                groups: pools.pools.map((p) => ({ title: p.title, companies: p.companies })),
              },
            ]}
            labels={{
              all: ui.all,
              showing: explorer.showing,
              unit: charts.pools.unit,
              hint: explorer.hint,
              multiDomain: explorer.multiDomain,
            }}
          />
        </div>

        <p className="mt-10 rounded-xl bg-navy-800 px-5 py-4 text-center text-base font-semibold text-white sm:text-lg">
          {pools.chainTitle}
        </p>
        <ol className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {pools.chain.map((step) => {
            const Icon = icons[step.icon];
            return (
              <li
                key={step.label}
                className="flex flex-col items-center gap-3 rounded-xl bg-sky-100 px-3 py-5 text-center hover:bg-white"
              >
                <Icon aria-hidden className="size-7 text-brand-600" strokeWidth={1.5} />
                <span className="text-sm font-semibold leading-snug text-brand">{step.label}</span>
              </li>
            );
          })}
        </ol>
        <div className="mt-5 space-y-1 text-xs text-muted">
          {candidates.footnotes.map((f) => (
            <p key={f}>{f}</p>
          ))}
          <p>{pools.footnote}</p>
        </div>
      </Container>
    </div>
  );
}

function ExitTimeline({ c }: { c: Content }) {
  const { pathway1: p } = c.strategy;
  const { exits } = c.charts;
  const items = russiaExits.map((e) => {
    const row = p.rows.find((r) => r.company.name === e.company.name);
    return {
      key: e.company.name,
      label: e.company.name,
      year: e.year,
      month: e.month,
      display: row?.exit ?? String(e.year),
      extra: row?.footprint ?? "",
    };
  });
  return (
    <ChartCard title={exits.title} subtitle={exits.subtitle}>
      <Timeline
        items={items}
        from={2022}
        to={2023}
        locale={c.meta.locale}
        legend={{ exact: exits.exact, yearOnly: exits.yearOnly }}
        tableLabel={c.charts.tableToggle}
        headers={[exits.companyHeader, exits.exitHeader, exits.footprintHeader]}
      />
    </ChartCard>
  );
}

function RowLabel({ children }: { children: React.ReactNode }) {
  return <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted">{children}</p>;
}

function Pathway1({ c }: { c: Content }) {
  const { pathway1: p } = c.strategy;
  const h = p.headers;
  return (
    <div className="bg-white py-16 sm:py-20">
      <Container>
        <div>
          <SlideTitle kicker={p.kicker} title={p.title} />
          <p className="mt-3 text-[15px] text-muted">{p.subtitle}</p>
        </div>
        <div className="mt-8 grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
          <ExitTimeline c={c} />
          <ul className="space-y-2.5">
            {p.rows.map((r) => (
              <li key={r.company.name}>
                <details className="group rounded-xl border border-line bg-white open:shadow-md">
                  <summary className="flex cursor-pointer list-none flex-wrap items-center gap-x-4 gap-y-2 p-4 [&::-webkit-details-marker]:hidden">
                    <span className="w-28 shrink-0">
                      <Logo company={r.company} area={1800} maxWidth={110} maxHeight={36} />
                    </span>
                    <span className="min-w-0 flex-1 text-xs font-medium text-brand">{r.domain}</span>
                    <span
                      className={`rounded-md px-2.5 py-1 text-xs font-medium text-ink ${
                        r.currentTone === "green" ? "bg-leaf-100" : "bg-sky-100"
                      }`}
                    >
                      {r.current}
                    </span>
                    <ChevronDown aria-hidden className="size-4 text-muted transition group-open:rotate-180" />
                  </summary>
                  <div className="grid grid-cols-1 gap-4 border-t border-line p-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <p className="text-sm text-ink/80">
                        <span className="font-semibold text-navy-900">{h.exit}:</span> {r.exit} ·{" "}
                        <span className="font-semibold text-navy-900">{h.footprint}:</span> <em>{r.footprint}</em>
                      </p>
                    </div>
                    <div>
                      <RowLabel>{h.fit}</RowLabel>
                      <Bullets items={r.fit} className="text-sm text-ink/85" dotClass="bg-navy-700" />
                    </div>
                    <div>
                      <RowLabel>{h.value}</RowLabel>
                      <Bullets items={r.value} className="text-sm text-brand-600" />
                    </div>
                  </div>
                </details>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </div>
  );
}

function Pathway2({ c }: { c: Content }) {
  const { pathway2: p } = c.strategy;
  const h = p.headers;
  return (
    <div className="bg-sky-50 py-16 sm:py-20">
      <Container>
        <div>
          <SlideTitle kicker={p.kicker} title={p.title} />
          <p className="mt-3 text-[15px] text-muted">{p.subtitle}</p>
        </div>
        <ul className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-2">
          {p.rows.map((r) => (
            <li key={r.company.map((co) => co.name).join("+")}>
              <details className="group h-full rounded-xl border border-line bg-white open:shadow-md">
                <summary className="flex cursor-pointer list-none items-center gap-4 p-4 [&::-webkit-details-marker]:hidden">
                  <span className="flex w-36 shrink-0 flex-wrap items-center gap-2">
                    {r.company.map((co) => (
                      <Logo key={co.name} company={co} area={1600} maxWidth={r.company.length > 1 ? 70 : 130} maxHeight={36} />
                    ))}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-xs font-medium text-brand">{r.domain}</span>
                    <span className="mt-0.5 line-clamp-1 text-[13px] text-muted">{r.projects[0]}</span>
                  </span>
                  {r.flag && <TriangleAlert aria-hidden className="size-4 shrink-0 text-alert" />}
                  <ChevronDown aria-hidden className="size-4 shrink-0 text-muted transition group-open:rotate-180" />
                </summary>
                <div className="grid gap-4 border-t border-line p-4">
                  <div>
                    <RowLabel>{h.projects}</RowLabel>
                    <Bullets items={r.projects} className="text-sm text-ink/85" dotClass="bg-navy-700" />
                  </div>
                  <div>
                    <RowLabel>{h.fit}</RowLabel>
                    <Bullets items={r.fit} className="text-sm text-brand-600" />
                    {r.flag && (
                      <p className="mt-3 flex gap-2 rounded-lg border border-alert/25 bg-alert-50 px-3 py-2 text-xs leading-snug text-alert">
                        <TriangleAlert aria-hidden className="size-4 shrink-0" />
                        <span>{r.flag}</span>
                      </p>
                    )}
                  </div>
                </div>
              </details>
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}
