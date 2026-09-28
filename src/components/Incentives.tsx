import { Megaphone, Plane, Target, Users } from "lucide-react";
import type { Content } from "@/content/types";
import { ChartCard, HBarChart, StackedBar } from "./charts";
import { ExportBuilder } from "./ExportBuilder";
import { Tabs } from "./interactive";
import { Container, More, SectionHeader, SourceMark } from "./ui";

const areaIcons = [Target, Plane, Megaphone, Users];

type TaxGroup = Content["incentives"]["tax"]["groups"][number];

function TaxPanel({ g, deckOnly }: { g: TaxGroup; deckOnly: string }) {
  return (
    <div className="grid grid-cols-1 gap-5 rounded-xl border border-line bg-white p-5 sm:p-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
      <div>
        <h4 className="text-lg font-semibold text-navy-900">{g.title}</h4>
        <p className="mt-2 text-[15px] leading-relaxed text-ink/85">{g.body}</p>
        {g.addition && (
          <p className="mt-3 rounded-lg border-l-2 border-series-1 bg-cyan-soft px-3 py-2 text-sm leading-relaxed text-ink/90">
            {g.addition} <SourceMark label={deckOnly} />
          </p>
        )}
      </div>
      <dl className="divide-y divide-line overflow-hidden rounded-lg border border-line bg-sky-50/60">
        {g.rows.map((r) => (
          <div key={r.label} className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-4 px-4 py-3">
            <dt className="text-sm">
              <span className="font-medium text-brand">{r.label}</span>
              <span className="block text-xs text-muted">
                {r.category}
                {r.note ? ` · ${r.note}` : ""}
              </span>
              {r.source === "deck" && <SourceMark label={deckOnly} />}
            </dt>
            <dd className="text-right text-lg font-semibold tracking-tight text-navy-900">{r.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function Incentives({ c }: { c: Content }) {
  const { incentives, ui, charts } = c;
  const { tax, exportSupport } = incentives;
  return (
    <section id="incentives" className="bg-sky-50 py-16 sm:py-24">
      <Container>
        <div>
          <SectionHeader kicker={incentives.kicker} title={incentives.title} lead={incentives.lead} />
        </div>

        {/* 4.1 Tax and regulatory framework */}
        <div className="mt-14">
          <h3 className="text-xl font-semibold text-navy-900">
            {tax.title}
          </h3>
          <div className="dot-grid mt-5 rounded-2xl bg-navy-900 p-6 text-white sm:p-8">
            <SourceMark label={ui.deckOnly} tone="dark" />
            <p className="mt-2 text-balance text-xl font-semibold leading-snug sm:text-2xl">{tax.headline}</p>
            <More more={ui.readMore} less={ui.showLess} className="mt-3 [&_summary]:text-cyan [&_summary:hover]:text-white">
              <p className="max-w-4xl text-pretty text-sm leading-relaxed text-white/75 sm:text-base">{tax.subline}</p>
            </More>
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-2">
            <p className="max-w-3xl text-[15px] text-ink/85">{tax.intro}</p>
            <span className="rounded-full bg-cyan px-3 py-1 text-xs font-semibold text-white">{tax.selectedExamples}</span>
          </div>
          <p className="mt-2 text-xs text-muted">{tax.hint}</p>
          <div className="mt-4">
            <Tabs
              variant="tiles"
              label={tax.title}
              items={tax.groups.map((g) => ({
                id: g.title,
                label: (
                  <>
                    <span className={`${g.headline.value.length > 5 ? "text-2xl" : "text-3xl"} max-w-full break-words font-semibold tracking-tight`}>
                      {g.headline.value}
                    </span>
                    <span className="mt-1 text-xs leading-snug opacity-75">{g.headline.label}</span>
                    <span className="mt-auto pt-3 text-[11px] font-semibold uppercase tracking-wider opacity-60">
                      {g.title}
                    </span>
                  </>
                ),
                panel: <TaxPanel g={g} deckOnly={ui.deckOnly} />,
              }))}
            />
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
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
              />
            </ChartCard>
            <ChartCard title={charts.royalty.title} subtitle={charts.deductions.subtitle}>
              <StackedBar
                segments={[
                  { key: "exempt", label: charts.royalty.exempt, value: 95, display: "95%", color: "bg-series-1", ink: "white" },
                  { key: "taxed", label: charts.royalty.taxed, value: 5, display: "5%", color: "bg-series-2", ink: "dark" },
                ]}
                note={charts.royalty.effective}
              />
            </ChartCard>
          </div>
        </div>

        {/* 4.2 Export support programs */}
        <div className="mt-16">
          <h3 className="text-xl font-semibold text-navy-900">
            {exportSupport.title}
          </h3>
          <p className="mt-3 max-w-3xl text-[15px] text-ink/85">
            {exportSupport.intro}
          </p>

          <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
            <ChartCard title={charts.exportFunding.title} subtitle={charts.exportFunding.subtitle}>
              <ExportBuilder
                locale={c.meta.locale}
                hint={exportSupport.builderHint}
                totalNote={charts.exportFunding.total}
                programs={[
                  { key: "research", label: charts.exportFunding.research, amount: 20000, color: "bg-series-1", ink: "white" },
                  { key: "sales", label: charts.exportFunding.sales, amount: 50000, color: "bg-series-2", ink: "dark" },
                ]}
              />
            </ChartCard>

            <div className="rounded-xl border border-line bg-white p-5 sm:p-6">
              <Tabs
                variant="underline"
                label={exportSupport.title}
                items={exportSupport.areas.map((area, i) => {
                  const Icon = areaIcons[i] ?? Target;
                  return {
                    id: area.title,
                    label: (
                      <span className="flex items-center gap-2 whitespace-nowrap">
                        <Icon aria-hidden className="size-4" />
                        {area.title}
                      </span>
                    ),
                    panel: (
                      <div>
                        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                          {area.programs.map((p) => (
                            <li key={p.name} className="rounded-lg bg-sky-50 p-4">
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
                        <More more={ui.readMore} less={ui.showLess} className="mt-4">
                          <p className="text-sm leading-relaxed text-ink/80">{area.body}</p>
                        </More>
                      </div>
                    ),
                  };
                })}
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
