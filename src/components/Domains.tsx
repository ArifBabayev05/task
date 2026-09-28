import Image from "next/image";
import {
  ArrowDownRight,
  Ban,
  BrainCircuit,
  Drone,
  Radar,
  RadioTower,
  Satellite,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { candidatesByDomain } from "@/content/companies";
import type { Content } from "@/content/types";
import { ChartCard } from "./charts";
import { Tabs } from "./interactive";
import { Container, Logo, SectionHeader, SourceMark } from "./ui";

const domainIcons: Record<string, LucideIcon> = {
  cyber: ShieldCheck,
  comms: RadioTower,
  awareness: Radar,
  space: Satellite,
  uav: Drone,
  "data-ai": BrainCircuit,
};

/** Word (4) vs deck (6) framing side by side. */
function DomainFraming({ c }: { c: Content }) {
  const { domains, charts } = c;
  const core = domains.items.filter((d) => d.status === "core");
  const extra = domains.items.filter((d) => d.status !== "core");
  return (
    <ChartCard title={charts.framing.title}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {[charts.framing.word, charts.framing.deck].map((f, idx) => {
          const list = idx === 0 ? core : [...core, ...extra];
          return (
            <div key={f.label} className="rounded-lg bg-sky-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">{f.label}</p>
              <p className="mt-1 flex items-baseline gap-2">
                <span className="text-4xl font-semibold tracking-tight text-navy-900">{f.value}</span>
                <span className="text-sm text-ink/80">{f.caption}</span>
              </p>
              {/* unit chart: one block per domain */}
              <div className="mt-3 flex gap-1.5" aria-hidden>
                {list.map((d) => (
                  <span
                    key={d.id}
                    className={`h-2.5 flex-1 rounded-sm ${d.status === "core" ? "bg-series-1" : "border border-series-1 bg-white"}`}
                  />
                ))}
              </div>
              <ul className="mt-3 space-y-1">
                {list.map((d) => (
                  <li key={d.id} className="text-[13px] leading-snug text-ink/85">
                    {d.title}
                    {d.status !== "core" && <span className="text-muted"> · {domains.statusLabels[d.status]}</span>}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
      <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-ink/80">
        <li className="flex items-center gap-1.5">
          <span aria-hidden className="size-2.5 rounded-sm bg-series-1" /> {charts.framing.coreLabel}
        </li>
        <li className="flex items-center gap-1.5">
          <span aria-hidden className="size-2.5 rounded-sm border border-series-1 bg-white" /> {charts.framing.extraLabel}
        </li>
      </ul>
    </ChartCard>
  );
}

function DomainPanel({ c, index }: { c: Content; index: number }) {
  const { domains, charts, ui } = c;
  const d = domains.items[index];
  const Icon = domainIcons[d.id] ?? ShieldCheck;
  const companies = candidatesByDomain[index];
  const core = d.status === "core";
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_auto]">
      <div>
        <div className="flex items-center gap-3">
          <span
            className={`flex size-12 items-center justify-center rounded-xl ${
              core ? "bg-navy-900 text-white" : "border border-dashed border-brand/40 bg-sky-100 text-brand"
            }`}
          >
            <Icon aria-hidden className="size-6" />
          </span>
          <div>
            <p className={`text-[11px] font-semibold uppercase tracking-wider ${core ? "text-brand-600" : "text-muted"}`}>
              {domains.statusLabels[d.status]} {d.source === "deck" && <SourceMark label={ui.deckOnly} />}
            </p>
            <h3 className="text-lg font-semibold text-navy-900">{d.title}</h3>
          </div>
        </div>
        {d.description && <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink/85">{d.description}</p>}
        {d.note && <p className="mt-4 max-w-xl text-sm italic text-muted">{d.note}</p>}
        <ul className="mt-4 flex flex-wrap gap-2">
          {d.bullets.map((b) => (
            <li key={b} className="rounded-full border border-line bg-sky-50 px-3 py-1.5 text-[13px] font-medium text-navy-900">
              {b}
            </li>
          ))}
          <li className="rounded-full border border-dashed border-line px-3 py-1.5 text-[13px] text-muted">…</li>
        </ul>
      </div>
      {companies && (
        <a
          href="#strategy"
          className="group flex min-w-[220px] flex-col justify-between rounded-xl bg-navy-900 p-5 text-white hover:bg-navy-800"
        >
          <div>
            <p className="text-5xl font-semibold tracking-tight">{companies.length}</p>
            <p className="mt-1 text-sm text-white/75">{charts.candidates.short}</p>
          </div>
          <div className="mt-4 flex -space-x-2">
            {companies
              .filter((co) => co.logo)
              .slice(0, 5)
              .map((co) => (
                <span key={co.name} className="flex size-9 items-center justify-center overflow-hidden rounded-full bg-white p-1.5 ring-2 ring-navy-900">
                  <Logo company={{ ...co, estonian: false }} area={500} maxWidth={24} maxHeight={24} />
                </span>
              ))}
            <ArrowDownRight aria-hidden className="ml-4 size-5 self-center text-cyan group-hover:translate-x-0.5" />
          </div>
        </a>
      )}
    </div>
  );
}

export function Domains({ c }: { c: Content }) {
  const { domains } = c;
  return (
    <section id="domains" className="bg-sky-50 py-16 sm:py-24">
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_300px] lg:items-start">
          <div>
            <SectionHeader kicker={domains.kicker} title={domains.title} lead={domains.lead} />
          </div>
          <div className="relative hidden aspect-[4/3] overflow-hidden rounded-2xl lg:block">
            <Image src="/images/boardroom.jpg" alt="" fill sizes="300px" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5 text-white">
              <p className="flex items-center gap-2 text-sm font-semibold">
                <Ban aria-hidden className="size-4 text-accent" /> {domains.exclusion.title}
              </p>
              <p className="mt-2 text-[13px] leading-snug text-white/85">{domains.exclusion.body}</p>
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-2xl border border-line bg-white p-5 sm:p-6">
          <Tabs
            label={domains.title}
            items={domains.items.map((d, i) => {
              const Icon = domainIcons[d.id] ?? ShieldCheck;
              return {
                id: d.id,
                label: (
                  <span className="flex items-center gap-2">
                    <Icon aria-hidden className="size-4" />
                    {d.title}
                  </span>
                ),
                panel: <DomainPanel c={c} index={i} />,
              };
            })}
          />
        </div>

        <div className="mt-6">
          <DomainFraming c={c} />
        </div>

        <p className="mt-6 flex items-start gap-2 rounded-lg border border-alert/20 bg-alert-50 px-3 py-2 text-[13px] text-ink/85 lg:hidden">
          <Ban aria-hidden className="mt-0.5 size-4 shrink-0 text-alert" />
          <span>
            <strong className="font-semibold">{domains.exclusion.title}:</strong> {domains.exclusion.body}
          </span>
        </p>
        <p className="mt-4 text-xs text-muted">{domains.listNote}</p>
      </Container>
    </section>
  );
}
