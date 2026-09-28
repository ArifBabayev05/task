import Image from "next/image";
import { Ban, BrainCircuit, Drone, Radar, RadioTower, Satellite, ShieldCheck, type LucideIcon } from "lucide-react";
import type { Content } from "@/content/types";
import { Bullets, Container, SectionHeader, SourceMark } from "./ui";

const domainIcons: Record<string, LucideIcon> = {
  cyber: ShieldCheck,
  comms: RadioTower,
  awareness: Radar,
  space: Satellite,
  uav: Drone,
  "data-ai": BrainCircuit,
};

export function Domains({ c }: { c: Content }) {
  const { domains, ui } = c;
  return (
    <section id="domains" className="bg-sky-50 py-16 sm:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_300px] lg:items-start">
          <div>
            <SectionHeader kicker={domains.kicker} title={domains.title} lead={domains.lead} />
            <p className="mt-4 flex max-w-3xl flex-wrap items-center gap-2 text-sm leading-relaxed text-muted">
              <span>{domains.deckTitle}</span>
              <SourceMark label={ui.deckOnly} />
            </p>
          </div>
          <div className="relative hidden aspect-[3/4] overflow-hidden rounded-2xl lg:block">
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

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {domains.items.map((d) => {
            const Icon = domainIcons[d.id] ?? ShieldCheck;
            const core = d.status === "core";
            return (
              <li
                key={d.id}
                className={`flex flex-col rounded-xl p-5 ${
                  core ? "border border-line bg-white shadow-sm" : "border border-dashed border-brand/35 bg-white/60"
                }`}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${
                      core ? "bg-navy-900 text-white" : "bg-sky-100 text-brand"
                    }`}
                  >
                    <Icon aria-hidden className="size-5" />
                  </span>
                  <div className="min-w-0">
                    <p
                      className={`text-[11px] font-semibold uppercase tracking-wider ${
                        core ? "text-brand-600" : "text-muted"
                      }`}
                    >
                      {domains.statusLabels[d.status]}
                    </p>
                    <h3 className="mt-0.5 text-base font-semibold leading-snug text-navy-900">{d.title}</h3>
                  </div>
                </div>
                {d.description && <p className="mt-4 text-sm leading-relaxed text-ink/85">{d.description}</p>}
                <Bullets items={d.bullets} className="mt-4 text-sm text-ink/85" />
                {(d.note || d.source) && (
                  <div className="mt-auto flex flex-wrap items-center gap-2 pt-5 text-xs text-muted">
                    {d.note && <span className="italic">{d.note}</span>}
                    {d.source === "deck" && <SourceMark label={ui.deckOnly} />}
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted">{domains.listNote}</p>
          <p className="flex items-start gap-2 rounded-lg border border-alert/20 bg-alert-50 px-3 py-2 text-[13px] text-ink/85 lg:hidden">
            <Ban aria-hidden className="mt-0.5 size-4 shrink-0 text-alert" />
            <span>
              <strong className="font-semibold">{domains.exclusion.title}:</strong> {domains.exclusion.body}
            </span>
          </p>
        </div>
      </Container>
    </section>
  );
}
