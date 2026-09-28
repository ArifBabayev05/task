import { Megaphone, Plane, Target, Users } from "lucide-react";
import type { Content } from "@/content/types";
import { ChartCard, HBarChart, StackedBar } from "./charts";
import { Container, SectionHeader, SourceMark } from "./ui";

const areaIcons = [Target, Plane, Megaphone, Users];

function TaxCharts({ c }: { c: Content }) {
  const { charts, ui } = c;
  return (
    <div className="mt-8 space-y-4">
      <div>
        <p className="mb-3 text-sm font-semibold text-navy-900">{charts.zeroRates.title}</p>
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-3 lg:grid-cols-5">
          {charts.zeroRates.items.map((z) => (
            <div key={z.label} className="flex flex-col-reverse justify-end bg-white p-4">
              <dt className="mt-1 text-xs leading-snug text-muted">{z.label}</dt>
              <dd className="text-3xl font-semibold tracking-tight text-navy-900">{z.value}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <ChartCard title={charts.deductions.title} subtitle={charts.deductions.subtitle}>
          <HBarChart
            rows={charts.deductions.rows.map((r) => ({
              key: r.label,
              label: r.label,
              value: r.value,
              display: `${r.value}%`,
            }))}
            max={250}
            unit=""
            baseline={{ value: 100, label: charts.deductions.baseline }}
            tableLabel={charts.tableToggle}
            headers={[charts.deductions.title, "%"]}
          />
          <p className="mt-auto pt-3">
            <SourceMark label={ui.deckOnly} />
          </p>
        </ChartCard>
        <ChartCard title={charts.royalty.title} subtitle={charts.deductions.subtitle}>
          <StackedBar
            segments={[
              { key: "exempt", label: charts.royalty.exempt, value: 95, display: "95%", color: "bg-series-1", ink: "white" },
              { key: "taxed", label: charts.royalty.taxed, value: 5, display: "5%", color: "bg-series-2", ink: "dark" },
            ]}
            note={charts.royalty.effective}
            tableLabel={charts.tableToggle}
            headers={[charts.royalty.title, "%"]}
          />
        </ChartCard>
      </div>
    </div>
  );
}

export function Incentives({ c }: { c: Content }) {
  const { incentives, ui, charts } = c;
  const { tax, exportSupport } = incentives;
  return (
    <section id="incentives" className="bg-sky-50 py-16 sm:py-24">
      <Container>
        <SectionHeader kicker={incentives.kicker} title={incentives.title} lead={incentives.lead} />

        {/* 4.1 Tax and regulatory framework */}
        <div className="mt-14">
          <h3 className="text-xl font-semibold text-navy-900">{tax.title}</h3>
          <div className="dot-grid mt-5 rounded-2xl bg-navy-900 p-6 text-white sm:p-8">
            <div className="flex flex-wrap items-center gap-2">
              <SourceMark label={ui.deckOnly} tone="dark" />
            </div>
            <p className="mt-3 text-balance text-xl font-semibold leading-snug sm:text-2xl">{tax.headline}</p>
            <p className="mt-3 max-w-4xl text-pretty text-sm leading-relaxed text-white/75 sm:text-base">{tax.subline}</p>
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-2">
            <p className="max-w-3xl text-[15px] text-ink/85">{tax.intro}</p>
            <span className="rounded-full bg-cyan px-3 py-1 text-xs font-semibold text-white">{tax.selectedExamples}</span>
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {tax.groups.map((g) => (
              <article key={g.title} className="flex flex-col overflow-hidden rounded-xl border border-line bg-white">
                <div className="p-5">
                  <h4 className="text-base font-semibold text-navy-900">{g.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-ink/80">{g.body}</p>
                  {g.addition && (
                    <p className="mt-3 rounded-lg border-l-2 border-series-1 bg-cyan-soft px-3 py-2 text-sm leading-relaxed text-ink/90">
                      {g.addition} <SourceMark label={ui.deckOnly} />
                    </p>
                  )}
                </div>
                <dl className="mt-auto divide-y divide-line border-t border-line bg-sky-50/60">
                  {g.rows.map((r) => (
                    <div key={r.label} className="px-5 py-3">
                      <dt className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted">
                        <span>{r.category}</span>
                        <span aria-hidden>›</span>
                        <span className="font-medium text-brand">{r.label}</span>
                        {r.source === "deck" && <SourceMark label={ui.deckOnly} />}
                      </dt>
                      <dd className="mt-1">
                        <span className="text-lg font-semibold tracking-tight text-navy-900">{r.value}</span>
                        {r.note && <span className="mt-0.5 block text-[13px] leading-snug text-muted">{r.note}</span>}
                      </dd>
                    </div>
                  ))}
                </dl>
              </article>
            ))}
          </div>
        </div>

        <TaxCharts c={c} />

        {/* 4.2 Export support programs */}
        <div className="mt-16">
          <h3 className="text-xl font-semibold text-navy-900">{exportSupport.title}</h3>
          <p className="mt-3 max-w-3xl text-[15px] text-ink/85">{exportSupport.intro}</p>
          <ChartCard
            className="mt-6"
            title={charts.exportFunding.title}
            subtitle={charts.exportFunding.subtitle}
          >
            <StackedBar
              segments={[
                { key: "research", label: charts.exportFunding.research, value: 20000, display: "$20,000", color: "bg-series-1", ink: "white" },
                { key: "sales", label: charts.exportFunding.sales, value: 50000, display: "$50,000", color: "bg-series-2", ink: "dark" },
              ]}
              note={charts.exportFunding.total}
              tableLabel={charts.tableToggle}
              headers={[exportSupport.title, "USD"]}
            />
          </ChartCard>
          <div className="mt-6 space-y-4">
            {exportSupport.areas.map((area, i) => {
              const Icon = areaIcons[i] ?? Target;
              return (
                <article
                  key={area.title}
                  className="grid overflow-hidden rounded-xl border border-line bg-white lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]"
                >
                  <div className="p-5 sm:p-6">
                    <div className="flex items-center gap-3">
                      <span className="flex size-10 items-center justify-center rounded-lg bg-navy-900 text-white">
                        <Icon aria-hidden className="size-5" />
                      </span>
                      <h4 className="text-lg font-semibold text-navy-900">{area.title}</h4>
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-ink/85">{area.body}</p>
                  </div>
                  <ul className="divide-y divide-line border-t border-line bg-sky-50/60 lg:border-l lg:border-t-0">
                    {area.programs.map((p) => (
                      <li key={p.name} className="p-5 sm:px-6">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <p className="text-sm font-semibold text-brand">{p.name}</p>
                          {p.amount && (
                            <span className="rounded-full bg-navy-900 px-2.5 py-0.5 text-xs font-semibold tabular-nums text-white">
                              {p.amount}
                            </span>
                          )}
                        </div>
                        <p className="mt-1.5 text-[13px] leading-relaxed text-muted">{p.detail}</p>
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
          <p className="mt-4 flex flex-wrap items-center gap-2 text-xs text-muted">
            <SourceMark label={ui.deckOnly} />
            <span className="italic">“{exportSupport.deckIntro}”</span>
          </p>
        </div>
      </Container>
    </section>
  );
}
