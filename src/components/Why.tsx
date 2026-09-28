import Image from "next/image";
import type { Content } from "@/content/types";
import { Bullets, Container, SectionHeader, SourceMark, icons } from "./ui";

export function Why({ c }: { c: Content }) {
  const { why, ui } = c;
  return (
    <section id="why-azerbaijan" className="bg-white py-16 sm:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[340px_1fr]">
          <div className="relative overflow-hidden rounded-2xl bg-navy-800 lg:min-h-[560px]">
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
          <div className="flex flex-col justify-center">
            <p className="text-pretty text-lg leading-relaxed text-muted">{why.lead}</p>
            <ol className="mt-8 divide-y divide-line">
              {why.reasons.map((r) => {
                const Icon = icons[r.icon];
                return (
                  <li key={r.title} className="grid gap-4 py-7 first:pt-0 sm:grid-cols-[56px_1fr]">
                    <span className="flex size-12 items-center justify-center rounded-xl bg-sky-100 text-brand">
                      <Icon aria-hidden className="size-6" />
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold text-navy-900">{r.title}</h3>
                      <p className="mt-2 text-[15px] leading-relaxed text-ink/85">{r.body}</p>
                      <div className="mt-4 rounded-lg bg-sky-50 p-4">
                        <p className="mb-2 flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-muted">
                          {c.about.deckBulletsLabel} <SourceMark label={ui.deckOnly} />
                        </p>
                        <Bullets items={r.bullets} className="text-sm text-muted" />
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  );
}
