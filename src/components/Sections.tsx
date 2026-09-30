import Image from "next/image";
import {
  Activity,
  Blocks,
  BrainCircuit,
  CircleCheck,
  Cloud,
  Database,
  Drone,
  Factory,
  Globe,
  Handshake,
  Info,
  Landmark,
  Lightbulb,
  Network,
  Plane,
  RadioTower,
  Rocket,
  Satellite,
  Send,
  ShieldCheck,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import type { Content } from "@/content/types";
import { ApplicationForm } from "./ApplicationForm";
import { ButtonLink, Container, SectionHeader } from "./ui";

const pillarIcons: LucideIcon[] = [Blocks, Network, Lightbulb, Globe];
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
const roleIcons: LucideIcon[] = [Landmark, Factory];
const benefitIcons: LucideIcon[] = [Rocket, TrendingUp, Plane, Handshake];

function IconBadge({ Icon, tone = "navy" }: { Icon: LucideIcon; tone?: "navy" | "soft" }) {
  return (
    <span
      className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${
        tone === "navy" ? "bg-navy-900 text-white" : "bg-sky-100 text-brand"
      }`}
    >
      <Icon aria-hidden className="size-5" />
    </span>
  );
}

export function About({ c }: { c: Content }) {
  const { about } = c;
  return (
    <section id="haqqinda" className="bg-white py-16 sm:py-24">
      <Container>
        <SectionHeader kicker={about.kicker} title={about.title} lead={about.lead} />
        <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {about.pillars.map((p, i) => (
            <li key={p.title} className="flex gap-4 rounded-xl border border-line border-l-4 border-l-accent bg-sky-50 p-5 sm:p-6">
              <IconBadge Icon={pillarIcons[i] ?? Blocks} />
              <div>
                <h3 className="text-lg font-semibold leading-snug text-navy-900">{p.title}</h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-ink/80">{p.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

export function Domains({ c }: { c: Content }) {
  const { domains } = c;
  return (
    <section id="istiqametler" className="bg-sky-50 py-16 sm:py-24">
      <Container>
        <SectionHeader kicker={domains.kicker} title={domains.title} lead={domains.lead} />
        <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {domains.items.map((d) => {
            const Icon = domainIcons[d.id] ?? ShieldCheck;
            return (
              <li key={d.id} className="flex flex-col rounded-xl border border-line bg-white p-5 hover:border-brand/40">
                <IconBadge Icon={Icon} />
                <h3 className="mt-4 text-base font-semibold leading-snug text-navy-900">{d.title}</h3>
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
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_320px] lg:items-end">
          <SectionHeader kicker={partners.kicker} title={partners.title} lead={partners.lead} />
          <div className="relative hidden aspect-[16/10] overflow-hidden rounded-2xl lg:block">
            <Image src="/images/boardroom.jpg" alt="" fill sizes="320px" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 to-transparent" />
          </div>
        </div>

        <ul className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
          {partners.roles.map((r, i) => (
            <li
              key={r.title}
              className={`flex gap-4 rounded-xl p-5 sm:p-6 ${i === 0 ? "bg-navy-900 text-white" : "border border-line bg-sky-50"}`}
            >
              <span
                className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${
                  i === 0 ? "bg-white/10 text-accent" : "bg-white text-brand"
                }`}
              >
                {(() => {
                  const Icon = roleIcons[i] ?? Landmark;
                  return <Icon aria-hidden className="size-5" />;
                })()}
              </span>
              <div>
                <h3 className={`text-lg font-semibold ${i === 0 ? "text-white" : "text-navy-900"}`}>{r.title}</h3>
                {r.sectors && <p className={`mt-1 text-sm ${i === 0 ? "text-cyan" : "text-brand-600"}`}>{r.sectors}</p>}
                <p className={`mt-2 text-[15px] leading-relaxed ${i === 0 ? "text-white/80" : "text-ink/80"}`}>{r.body}</p>
              </div>
            </li>
          ))}
        </ul>

        <h3 className="mt-14 text-xl font-semibold text-navy-900">{partners.stepsTitle}</h3>
        <ol className="relative mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {partners.steps.map((s, i) => (
            <li key={s.title} className="relative">
              {i < partners.steps.length - 1 && (
                <span aria-hidden className="absolute left-14 right-[-1.25rem] top-[1.375rem] hidden h-0.5 bg-line lg:block" />
              )}
              <span
                className={`relative flex size-11 items-center justify-center rounded-full text-base font-semibold ring-4 ring-white ${
                  i === 0 ? "bg-accent text-navy-950" : "border-2 border-navy-700 bg-white text-navy-900"
                }`}
              >
                {i + 1}
              </span>
              <h4 className="mt-4 text-lg font-semibold text-navy-900">{s.title}</h4>
              <p className="mt-1.5 text-[15px] leading-relaxed text-muted">{s.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

export function Benefits({ c }: { c: Content }) {
  const { benefits } = c;
  return (
    <section id="imkanlar" className="bg-sky-50 py-16 sm:py-24">
      <Container>
        <SectionHeader kicker={benefits.kicker} title={benefits.title} lead={benefits.lead} />
        <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {benefits.items.map((b, i) => (
            <li key={b.title} className="flex gap-4 rounded-xl border border-line bg-white p-5 sm:p-6">
              <IconBadge Icon={benefitIcons[i] ?? Rocket} tone="soft" />
              <div>
                <h3 className="text-lg font-semibold leading-snug text-navy-900">{b.title}</h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-ink/80">{b.body}</p>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-6 flex gap-3 rounded-xl border border-line border-l-4 border-l-series-1 bg-white p-5 text-[15px] leading-relaxed text-ink/85">
          <Info aria-hidden className="mt-0.5 size-5 shrink-0 text-series-1" />
          <span>{benefits.note}</span>
        </p>
      </Container>
    </section>
  );
}

export function Join({ c }: { c: Content }) {
  const { join } = c;
  const { box } = join;
  return (
    <section id="qosulma" className="bg-white py-16 sm:py-24">
      <Container className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-14">
        <div>
          <SectionHeader kicker={join.kicker} title={join.title} />
          <ul className="mt-8 space-y-4">
            {join.criteria.map((item) => (
              <li key={item} className="flex gap-3 text-base leading-relaxed text-ink/85">
                <CircleCheck aria-hidden className="mt-0.5 size-5 shrink-0 text-series-1" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative isolate overflow-hidden rounded-2xl bg-navy-900 p-7 text-white sm:p-8">
          <Image src="/images/globe.jpg" alt="" fill sizes="(min-width: 1024px) 420px, 100vw" className="-z-20 object-cover opacity-40" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-navy-950/95 via-navy-900/85 to-navy-900/60" />
          <span className="flex size-11 items-center justify-center rounded-xl bg-white/10 text-accent">
            <Send aria-hidden className="size-5" />
          </span>
          <h3 className="mt-5 text-2xl font-semibold">{box.title}</h3>
          <p className="mt-3 text-[15px] leading-relaxed text-white/80">{box.body}</p>
          {box.button.href && (
            <div className="mt-6">
              <ButtonLink href={box.button.href}>{box.button.label}</ButtonLink>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}

export function Apply({ c }: { c: Content }) {
  const { form, join } = c;
  return (
    <section id="muraciet" className="bg-sky-50 py-16 sm:py-24">
      <Container className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-14">
        <div>
          <SectionHeader kicker={form.kicker} title={form.title} lead={form.lead} />
          <ul className="mt-8 space-y-3 border-t border-line pt-6">
            {join.criteria.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-relaxed text-ink/80">
                <CircleCheck aria-hidden className="mt-0.5 size-4 shrink-0 text-series-1" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <ApplicationForm
          text={form}
          locale={c.meta.locale}
          domains={c.domains.items.map((d) => ({ id: d.id, title: d.title }))}
        />
      </Container>
    </section>
  );
}
