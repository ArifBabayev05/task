import Image from "next/image";
import { ArrowUp } from "lucide-react";
import type { Content } from "@/content/types";
import { Container, SectionHeader } from "./ui";

const severityStyles = {
  high: "bg-alert text-white",
  medium: "bg-accent text-navy-950",
  low: "bg-sky-100 text-brand",
} as const;

export function Review({ c }: { c: Content }) {
  const { review, ui } = c;
  return (
    <section id="review" className="border-t border-line bg-sky-50 py-16 sm:py-24">
      <Container>
        <SectionHeader kicker={review.kicker} title={review.title} lead={review.lead} />
        <p className="mt-4 max-w-3xl text-sm text-muted">{ui.sourceLegend}</p>
        <ol className="mt-10 grid gap-4 md:grid-cols-2">
          {review.items.map((item, i) => (
            <li key={item.title} className="flex gap-4 rounded-xl border border-line bg-white p-5">
              <span className="w-6 shrink-0 pt-0.5 text-sm font-semibold tabular-nums text-muted">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${severityStyles[item.severity]}`}
                  >
                    {review.severity[item.severity]}
                  </span>
                  <h3 className="font-semibold leading-snug text-navy-900">{item.title}</h3>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-ink/80">{item.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

export function Footer({ c }: { c: Content }) {
  const { footer, ui } = c;
  return (
    <footer className="bg-navy-950 py-10 text-white/70">
      <Container className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-3">
          <Image
            src="/images/ministry-logo-white.png"
            alt="Azərbaycan Respublikası Rəqəmsal İnkişaf və Nəqliyyat Nazirliyi"
            width={919}
            height={266}
            className="h-10 w-auto"
          />
          <p className="max-w-xl text-sm">{footer.prepared}</p>
          <p className="max-w-xl text-xs text-white/50">{footer.sources}</p>
          <p className="text-xs font-semibold text-accent">{footer.confidentiality}</p>
        </div>
        <a
          href="#top"
          className="inline-flex items-center gap-2 self-start rounded-md border border-white/20 px-3 py-2 text-sm text-white/85 transition hover:border-white/40 hover:text-white sm:self-auto"
        >
          <ArrowUp aria-hidden className="size-4" /> {ui.backToTop}
        </a>
      </Container>
    </footer>
  );
}
