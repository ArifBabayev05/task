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
