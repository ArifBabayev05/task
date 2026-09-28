import Image from "next/image";
import type { Content } from "@/content/types";
import { Container, SourceMark } from "./ui";

export function Hero({ c }: { c: Content }) {
  const { hero, ui } = c;
  return (
    <section id="top" className="relative isolate overflow-hidden bg-navy-950 text-white">
      <Image
        src="/images/hero-wave.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-center opacity-80"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-navy-950/60 via-navy-950/40 to-navy-950" />
      <Container className="pb-12 pt-14 sm:pb-16 sm:pt-20 lg:pt-24">
        <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-white/80">
          <span aria-hidden className="size-1.5 rounded-full bg-accent" />
          {ui.internalNotice}
        </p>
        <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[1.6fr_1fr] lg:items-end">
          <div>
            <p className="flex flex-wrap items-center gap-2 text-sm font-medium text-cyan">
              {hero.eyebrow} <SourceMark label={ui.deckOnly} tone="dark" />
            </p>
            <h1 className="mt-3 text-balance text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              {hero.title}
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-white/80 sm:text-lg">{hero.lead}</p>
          </div>
          <div className="rounded-2xl border border-white/15 bg-navy-900/85 p-6 shadow-2xl shadow-black/30">
            <div className="flex items-start justify-between gap-3">
              <p className="text-sm font-semibold text-white">{hero.ambitionLabel}</p>
              <SourceMark label={ui.deckOnly} tone="dark" />
            </div>
            <p className="mt-4 text-6xl font-semibold tracking-tight text-white">{hero.ambitionValue}</p>
            <p className="mt-1 text-lg text-white/80">{hero.ambitionCaption}</p>
            <p className="mt-5 border-t border-white/10 pt-4 text-sm leading-relaxed text-white/70">{hero.tagline}</p>
          </div>
        </div>
        <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 lg:grid-cols-4">
          {hero.stats.map((s) => (
            <div key={s.label} className="flex flex-col-reverse justify-end bg-navy-950/80 p-4 sm:p-5">
              <dt className="mt-1 text-xs leading-snug text-white/70 sm:text-sm">
                {s.label} {s.source === "deck" && <SourceMark label={ui.deckOnly} tone="dark" />}
              </dt>
              <dd className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">{s.value}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-6 text-xs text-white/50">{hero.date}</p>
      </Container>
    </section>
  );
}
