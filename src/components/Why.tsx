import Image from "next/image";
import type { Content } from "@/content/types";
import { Bullets, Container, More, SectionHeader, SourceMark, icons } from "./ui";

/** Hub diagram: Azerbaijan at the centre, connected to the four regions it serves. */
function Gateway({ c }: { c: Content }) {
  const g = c.why.gateway;
  // Approximate compass placement of each region relative to Azerbaijan.
  const pts = [
    { x: 90, y: 60 }, // Europe (north-west)
    { x: 430, y: 70 }, // Central Asia (east)
    { x: 380, y: 230 }, // Middle East (south)
    { x: 110, y: 240 }, // Africa (south-west)
  ];
  const center = { x: 260, y: 150 };
  return (
    <figure data-reveal className="rounded-xl border border-line bg-white p-5">
      <figcaption className="flex flex-wrap items-baseline justify-between gap-2">
        <span className="font-semibold text-navy-900">{g.title}</span>
        <span className="text-xs text-muted">{g.caption}</span>
      </figcaption>
      <svg viewBox="0 0 520 300" role="img" aria-label={`${g.center}: ${g.nodes.join(", ")}`} className="mt-3 h-auto w-full">
        <defs>
          <radialGradient id="gw-glow">
            <stop offset="0%" stopColor="var(--color-cyan)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="var(--color-cyan)" stopOpacity="0" />
          </radialGradient>
        </defs>
        {pts.map((p, i) => (
          <g key={g.nodes[i]}>
            <line x1={center.x} y1={center.y} x2={p.x} y2={p.y} stroke="var(--color-line)" strokeWidth="2" />
            <line
              x1={center.x}
              y1={center.y}
              x2={p.x}
              y2={p.y}
              stroke="var(--color-series-1)"
              strokeWidth="2"
              strokeDasharray="6 10"
              className="gateway-flow"
              style={{ animationDelay: `${i * 0.4}s` }}
            />
          </g>
        ))}
        <circle cx={center.x} cy={center.y} r="70" fill="url(#gw-glow)" />
        {pts.map((p, i) => (
          <g key={`n-${g.nodes[i]}`}>
            <circle cx={p.x} cy={p.y} r="7" fill="var(--color-series-1)" stroke="#fff" strokeWidth="2" />
            <text
              x={p.x}
              y={p.y + (p.y < center.y ? -16 : 26)}
              textAnchor="middle"
              className="fill-[var(--color-ink)] text-[15px] font-semibold"
            >
              {g.nodes[i]}
            </text>
          </g>
        ))}
        <circle cx={center.x} cy={center.y} r="30" fill="var(--color-navy-900)" stroke="#fff" strokeWidth="3" />
        <text x={center.x} y={center.y + 52} textAnchor="middle" className="fill-[var(--color-navy-900)] text-[16px] font-bold">
          {g.center}
        </text>
        <text x={center.x} y={center.y + 6} textAnchor="middle" className="fill-white text-[15px] font-bold">
          AZ
        </text>
      </svg>
    </figure>
  );
}

export function Why({ c }: { c: Content }) {
  const { why, ui } = c;
  return (
    <section id="why-azerbaijan" className="bg-white py-16 sm:py-24">
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[340px_1fr]">
          <div data-reveal className="relative overflow-hidden rounded-2xl bg-navy-800 lg:min-h-[520px]">
            <Image
              src="/images/gavel.jpg"
              alt=""
              fill
              sizes="(min-width: 1024px) 340px, 100vw"
              className="object-cover opacity-60"
            />
            <div className="relative flex h-full flex-col justify-end bg-gradient-to-t from-navy-950/90 to-navy-950/10 p-6 pt-24 sm:p-8 sm:pt-40">
              <SectionHeader kicker={why.kicker} title={why.title} dark />
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <ol className="grid gap-3">
              {why.reasons.map((r, i) => {
                const Icon = icons[r.icon];
                return (
                  <li
                    key={r.title}
                    data-reveal
                    style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}
                    className="grid grid-cols-1 gap-4 rounded-xl border border-line bg-sky-50 p-5 sm:grid-cols-[48px_1fr]"
                  >
                    <span className="flex size-12 items-center justify-center rounded-xl bg-white text-brand shadow-sm">
                      <Icon aria-hidden className="size-6" />
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold leading-snug text-navy-900">{r.title}</h3>
                      <p className="mt-1 text-[15px] text-ink/85">{r.short}</p>
                      <More more={ui.readMore} less={ui.showLess} className="mt-2">
                        <p className="text-sm leading-relaxed text-ink/80">{r.body}</p>
                        <p className="mb-2 mt-3 flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-muted">
                          {c.about.deckBulletsLabel} <SourceMark label={ui.deckOnly} />
                        </p>
                        <Bullets items={r.bullets} className="text-sm text-muted" />
                      </More>
                    </div>
                  </li>
                );
              })}
            </ol>
            <Gateway c={c} />
          </div>
        </div>
      </Container>
    </section>
  );
}
