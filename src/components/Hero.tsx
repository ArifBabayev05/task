import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Content } from "@/content/types";
import { ButtonLink, Container } from "./ui";

/** Anchor partner at the centre, cluster members around it (static, no animation). */
function NetworkDiagram({ label, legend }: { label: string; legend: Content["hero"]["legend"] }) {
  const c = { x: 200, y: 200 };
  const members = [
    { x: 200, y: 58, r: 14 },
    { x: 300, y: 100, r: 11 },
    { x: 342, y: 200, r: 15 },
    { x: 300, y: 300, r: 12 },
    { x: 200, y: 342, r: 14 },
    { x: 100, y: 300, r: 11 },
    { x: 58, y: 200, r: 13 },
    { x: 100, y: 100, r: 12 },
  ];
  // Links between neighbouring members (as in the source diagram).
  const ring: [number, number][] = [
    [0, 1],
    [2, 3],
    [5, 6],
    [7, 0],
    [3, 4],
  ];
  return (
    <figure className="rounded-2xl border border-white/15 bg-navy-900/85 p-6 shadow-2xl shadow-black/30">
      <svg viewBox="0 0 400 400" role="img" aria-label={label} className="mx-auto h-auto w-full max-w-[340px]">
        <circle cx={c.x} cy={c.y} r="120" fill="none" stroke="rgb(255 255 255 / 0.06)" strokeWidth="1" />
        <circle cx={c.x} cy={c.y} r="60" fill="none" stroke="var(--color-accent)" strokeOpacity="0.35" strokeWidth="1.5" />
        {members.map((m) => (
          <line key={`s-${m.x}-${m.y}`} x1={c.x} y1={c.y} x2={m.x} y2={m.y} stroke="rgb(255 255 255 / 0.22)" strokeWidth="1.4" />
        ))}
        {ring.map(([a, b]) => (
          <line
            key={`r-${a}-${b}`}
            x1={members[a].x}
            y1={members[a].y}
            x2={members[b].x}
            y2={members[b].y}
            stroke="rgb(255 255 255 / 0.22)"
            strokeWidth="1.4"
          />
        ))}
        {members.map((m) => (
          <circle key={`m-${m.x}-${m.y}`} cx={m.x} cy={m.y} r={m.r} fill="var(--color-navy-700)" stroke="var(--color-cyan)" strokeWidth="1.6" />
        ))}
        <circle cx={c.x} cy={c.y} r="28" fill="var(--color-accent)" />
      </svg>
      <figcaption className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-white/75">
        <span className="flex items-center gap-2">
          <span aria-hidden className="size-2.5 rounded-full bg-accent" /> {legend.anchor}
        </span>
        <span className="flex items-center gap-2">
          <span aria-hidden className="size-2.5 rounded-full border border-cyan bg-navy-700" /> {legend.members}
        </span>
      </figcaption>
    </figure>
  );
}

export function Hero({ c }: { c: Content }) {
  const { hero } = c;
  return (
    <section id="top" className="relative isolate overflow-hidden bg-navy-950 text-white">
      <Image src="/images/hero-wave.jpg" alt="" fill priority sizes="100vw" className="-z-20 object-cover object-center opacity-70" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-navy-950/70 via-navy-950/50 to-navy-950" />
      <Container className="grid grid-cols-1 items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:py-24">
        <div>
          <h1 className="max-w-[16ch] text-balance text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            {hero.title}
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-white/80 sm:text-lg">{hero.lead}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={hero.primary.href}>
              {hero.primary.label} <ArrowRight aria-hidden className="size-4" />
            </ButtonLink>
            <ButtonLink href={hero.secondary.href} variant="ghost">
              {hero.secondary.label}
            </ButtonLink>
          </div>
        </div>
        <NetworkDiagram label={hero.diagramLabel} legend={hero.legend} />
      </Container>
    </section>
  );
}
