import { Blocks, Globe, Magnet, Rocket } from "lucide-react";
import type { Content } from "@/content/types";
import { Bullets, Container, More, SectionHeader, SourceMark } from "./ui";

const stepIcons = [Blocks, Magnet, Globe, Rocket];

export function About({ c }: { c: Content }) {
  const { about, ui } = c;
  return (
    <section id="about" className="bg-white py-16 sm:py-24">
      <Container>
        <div>
          <SectionHeader kicker={about.kicker} title={about.title} lead={about.lead} />
        </div>
        <div className="mt-12 flex flex-wrap items-end justify-between gap-3">
          <h3 className="text-xl font-semibold text-navy-900">{about.modelTitle}</h3>
          <p className="text-sm text-muted">{about.modelLead}</p>
        </div>

        <ol className="relative mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* connector line behind the step numbers (desktop) */}
          <span aria-hidden className="absolute left-[12%] right-[12%] top-[2.35rem] hidden h-px bg-line lg:block" />
          {about.commitments.map((item, i) => {
            const Icon = stepIcons[i] ?? Blocks;
            return (
              <li
                key={item.title}
                className="relative flex flex-col rounded-xl border border-line bg-sky-50 p-5"
              >
                <div className="flex items-center gap-3">
                  <span className="relative flex size-11 items-center justify-center rounded-full bg-navy-900 text-white ring-4 ring-white">
                    <Icon aria-hidden className="size-5" />
                  </span>
                  <span className="text-xs font-semibold tabular-nums text-muted">0{i + 1}</span>
                </div>
                <h4 className="mt-4 text-base font-semibold leading-snug text-navy-900">{item.title}</h4>
                <p className="mt-2 text-[15px] leading-relaxed text-ink/85">{item.short}</p>
                <More more={ui.readMore} less={ui.showLess} className="mt-auto pt-4">
                  <p className="text-sm leading-relaxed text-ink/80">{item.body}</p>
                  <div className="mt-3 border-t border-line pt-3">
                    <p className="mb-2 flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-muted">
                      {about.deckBulletsLabel}
                      <SourceMark label={ui.deckOnly} />
                    </p>
                    <Bullets items={item.bullets} className="text-[13px] leading-snug text-muted" />
                  </div>
                </More>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
