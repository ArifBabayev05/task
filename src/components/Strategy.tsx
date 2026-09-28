import Image from "next/image";
import { ChevronDown, Lock, TriangleAlert } from "lucide-react";
import type { Content } from "@/content/types";
import { Bullets, Container, Logo, SectionHeader, SlideTitle, SourceMark, icons } from "./ui";

const poolTones: Record<string, string> = {
  navy: "bg-navy-800",
  green: "bg-emerald-600",
  blue: "bg-brand-600",
  ink: "bg-navy-950",
  gray: "bg-slate-500",
};

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
      <Candidates c={c} />
      <Pools c={c} />
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
        <SlideTitle kicker={criteria.kicker} title={criteria.title} />
        <p className="mt-2 text-xs text-muted">{criteria.duplicateNote}</p>
        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {criteria.columns.map((col) => {
            const blue = col.tone === "blue";
            return (
              <div
                key={col.title}
                className={`overflow-hidden rounded-xl border ${blue ? "border-brand/30" : "border-leaf/30"}`}
              >
                <h4
                  className={`px-6 py-4 text-lg font-semibold ${
                    blue ? "bg-white text-brand" : "bg-white text-leaf"
                  } border-b ${blue ? "border-brand/20" : "border-leaf/20"}`}
                >
                  {col.title}
                </h4>
                <ul className={`divide-y ${blue ? "divide-white bg-sky-50" : "divide-white bg-leaf-50"}`}>
                  {col.items.map((item) => {
                    const Icon = icons[item.icon];
                    return (
                      <li key={item.title} className="flex gap-4 px-6 py-4">
                        <Icon aria-hidden className={`mt-0.5 size-7 shrink-0 ${blue ? "text-brand-600" : "text-leaf"}`} />
                        <div>
                          <p className="font-semibold text-navy-900">{item.title}</p>
                          <p className="mt-0.5 text-sm leading-relaxed text-ink/80">{item.body}</p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
}

function Candidates({ c }: { c: Content }) {
  const { candidates } = c.strategy;
  return (
    <div className="bg-sky-50 py-16 sm:py-20">
      <Container>
        <SlideTitle kicker={candidates.kicker} title={candidates.title} />
        <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {candidates.domains.map((d, i) => (
            <li key={d.title} className="flex flex-col rounded-xl border border-line bg-white shadow-sm">
              <div className="flex items-center gap-3 border-b border-line p-4">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-600 text-sm font-semibold text-white">
                  {i + 1}
                </span>
                <h4 className="font-semibold leading-snug text-brand">{d.title}</h4>
              </div>
              <ul className="grid grid-cols-2 items-center gap-x-4 gap-y-5 p-5">
                {d.companies.map((co) => (
                  <li key={co.name} className="flex min-h-9 items-center justify-center">
                    <Logo company={co} area={2000} maxWidth={110} maxHeight={40} />
                  </li>
                ))}
              </ul>
              <p className="mt-auto border-t border-line px-4 py-2.5 text-xs text-muted">
                {d.companies.length} · {d.companies.map((co) => co.name).join(", ")}
              </p>
            </li>
          ))}
        </ol>
        <div className="mt-5 space-y-1 text-xs text-muted">
          {candidates.footnotes.map((f) => (
            <p key={f}>{f}</p>
          ))}
        </div>
      </Container>
    </div>
  );
}

function Pools({ c }: { c: Content }) {
  const { pools } = c.strategy;
  return (
    <div className="bg-white py-16 sm:py-20">
      <Container>
        <SlideTitle kicker={pools.kicker} title={pools.title} />
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {pools.pools.map((p) => (
            <li key={p.title} className="flex flex-col">
              <div className="flex flex-1 flex-col overflow-hidden rounded-xl border border-line bg-white">
                <h4
                  className={`flex min-h-16 items-center justify-center px-3 py-3 text-center text-sm font-semibold leading-snug text-white ${
                    poolTones[p.tone] ?? "bg-navy-800"
                  }`}
                >
                  {p.title}
                </h4>
                <ul className="flex flex-1 flex-col items-center justify-center gap-5 p-5">
                  {p.companies.map((co) => (
                    <li key={co.name}>
                      <Logo company={co} area={3400} maxWidth={150} maxHeight={52} />
                    </li>
                  ))}
                </ul>
              </div>
              <ChevronDown aria-hidden className="mx-auto mt-2 hidden size-6 text-muted lg:block" />
            </li>
          ))}
        </ul>
        <p className="mt-6 rounded-xl bg-navy-800 px-5 py-4 text-center text-base font-semibold text-white sm:text-lg">
          {pools.chainTitle}
        </p>
        <ol className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {pools.chain.map((step) => {
            const Icon = icons[step.icon];
            return (
              <li
                key={step.label}
                className="flex flex-col items-center gap-3 rounded-xl bg-sky-100 px-3 py-5 text-center"
              >
                <Icon aria-hidden className="size-7 text-brand-600" strokeWidth={1.5} />
                <span className="text-sm font-semibold leading-snug text-brand">{step.label}</span>
              </li>
            );
          })}
        </ol>
        <p className="mt-4 text-xs text-muted">{pools.footnote}</p>
      </Container>
    </div>
  );
}

function Pathway1({ c }: { c: Content }) {
  const { pathway1: p } = c.strategy;
  const h = p.headers;
  return (
    <div className="bg-sky-50 py-16 sm:py-20">
      <Container>
        <SlideTitle kicker={p.kicker} title={p.title} />
        <p className="mt-3 text-[15px] text-muted">{p.subtitle}</p>

        <div
          aria-hidden
          className="mt-8 hidden grid-cols-[150px_150px_minmax(0,1.5fr)_minmax(0,1fr)_150px] gap-5 rounded-t-xl bg-navy-800 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-white lg:grid"
        >
          <span>{h.company}</span>
          <span>{h.exit}</span>
          <span>{h.fit}</span>
          <span>{h.value}</span>
          <span>{h.current}</span>
        </div>
        <ul className="mt-8 space-y-4 lg:mt-0 lg:space-y-0 lg:divide-y lg:divide-line lg:overflow-hidden lg:rounded-b-xl lg:border lg:border-t-0 lg:border-line">
          {p.rows.map((r) => (
            <li
              key={r.company.name}
              className="grid gap-4 rounded-xl border border-line bg-white p-5 lg:grid-cols-[150px_150px_minmax(0,1.5fr)_minmax(0,1fr)_150px] lg:gap-5 lg:rounded-none lg:border-0"
            >
              <div>
                <Logo company={r.company} area={3000} maxWidth={140} maxHeight={48} />
                <p className="mt-2 text-xs font-medium text-brand">{r.domain}</p>
              </div>
              <div className="text-sm italic text-muted">
                <p>
                  <span className="font-semibold not-italic text-ink/70">{h.exit}: </span>
                  {r.exit}
                </p>
                <p className="mt-1">
                  <span className="font-semibold not-italic text-ink/70">{h.footprint}: </span>
                  {r.footprint}
                </p>
              </div>
              <div>
                <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted lg:sr-only">{h.fit}</p>
                <Bullets items={r.fit} className="text-sm text-ink/85" dotClass="bg-navy-700" />
              </div>
              <div>
                <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted lg:sr-only">{h.value}</p>
                <Bullets items={r.value} className="text-sm text-brand-600" />
              </div>
              <div>
                <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted lg:sr-only">{h.current}</p>
                <span
                  className={`inline-block rounded-lg px-3 py-2 text-center text-[13px] font-medium leading-snug text-ink ${
                    r.currentTone === "green" ? "bg-leaf-100" : "bg-sky-100"
                  }`}
                >
                  {r.current}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}

function Pathway2({ c }: { c: Content }) {
  const { pathway2: p } = c.strategy;
  const h = p.headers;
  return (
    <div className="bg-white py-16 sm:py-20">
      <Container>
        <SlideTitle kicker={p.kicker} title={p.title} />
        <p className="mt-3 text-[15px] text-muted">{p.subtitle}</p>

        <div
          aria-hidden
          className="mt-8 hidden grid-cols-[180px_minmax(0,1.3fr)_minmax(0,1fr)] gap-6 rounded-t-xl bg-navy-800 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-white lg:grid"
        >
          <span>{h.company}</span>
          <span>{h.projects}</span>
          <span>{h.fit}</span>
        </div>
        <ul className="mt-8 space-y-4 lg:mt-0 lg:space-y-0 lg:divide-y lg:divide-line lg:overflow-hidden lg:rounded-b-xl lg:border lg:border-t-0 lg:border-line">
          {p.rows.map((r) => (
            <li
              key={r.company.map((co) => co.name).join("+")}
              className="grid gap-4 rounded-xl border border-line bg-white p-5 lg:grid-cols-[180px_minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-6 lg:rounded-none lg:border-0"
            >
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  {r.company.map((co) => (
                    <Logo key={co.name} company={co} area={2600} maxWidth={140} maxHeight={44} />
                  ))}
                </div>
                <p className="mt-2 text-xs font-medium text-brand">{r.domain}</p>
              </div>
              <div>
                <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted lg:sr-only">
                  {h.projects}
                </p>
                <Bullets items={r.projects} className="text-sm text-ink/85" dotClass="bg-navy-700" />
              </div>
              <div>
                <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted lg:sr-only">{h.fit}</p>
                <Bullets items={r.fit} className="text-sm text-brand-600" />
                {r.flag && (
                  <p className="mt-3 flex gap-2 rounded-lg border border-alert/25 bg-alert-50 px-3 py-2 text-xs leading-snug text-alert">
                    <TriangleAlert aria-hidden className="size-4 shrink-0" />
                    <span>{r.flag}</span>
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}
