import type { Content } from "@/content/types";
import { Bullets, Container, SectionHeader, SourceMark } from "./ui";

export function About({ c }: { c: Content }) {
  const { about, ui } = c;
  return (
    <section id="about" className="bg-white py-16 sm:py-24">
      <Container>
        <SectionHeader kicker={about.kicker} title={about.title} lead={about.lead} />
        <div className="mt-14 flex flex-wrap items-end justify-between gap-3 border-b border-line pb-4">
          <h3 className="text-xl font-semibold text-navy-900">{about.modelTitle}</h3>
          <p className="text-sm text-muted">{about.modelLead}</p>
        </div>
        <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {about.commitments.map((item, i) => (
            <li key={item.title} className="flex flex-col rounded-xl border border-line bg-sky-50 p-5">
              <span className="flex size-9 items-center justify-center rounded-full bg-navy-900 text-sm font-semibold text-white">
                {i + 1}
              </span>
              <h4 className="mt-4 text-base font-semibold leading-snug text-navy-900">{item.title}</h4>
              <p className="mt-2 text-sm leading-relaxed text-ink/85">{item.body}</p>
              <div className="mt-auto pt-5">
                <div className="border-t border-line pt-4">
                  <p className="mb-2 flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-muted">
                    {about.deckBulletsLabel}
                    <SourceMark label={ui.deckOnly} />
                  </p>
                  <Bullets items={item.bullets} className="text-[13px] leading-snug text-muted" />
                </div>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
