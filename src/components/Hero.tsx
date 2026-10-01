import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Content } from "@/content/types";
import { ApplyButton } from "./ApplyDialog";
import { Container } from "./ui";

export function Hero({ c }: { c: Content }) {
  const { hero } = c;
  return (
    <section id="top" className="bg-white">
      <Container className="grid grid-cols-1 items-center gap-10 py-14 sm:py-20 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <p className="flex items-center gap-2 text-sm font-medium text-brand-700">
            <span aria-hidden className="size-2 shrink-0 rounded-full bg-accent" />
            {c.ui.org}
          </p>
          <h1 className="mt-4 text-balance text-4xl font-semibold leading-[1.1] tracking-tight text-brand-900 sm:text-5xl">
            {hero.title}
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted">{hero.lead}</p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            <ApplyButton>{hero.primary.label}</ApplyButton>
            <a
              href={hero.secondary.href}
              className="inline-flex items-center gap-2 text-[15px] font-semibold text-brand-900 underline-offset-4 hover:underline"
            >
              {hero.secondary.label} <ArrowRight aria-hidden className="size-4" />
            </a>
          </div>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] bg-brand-900 lg:col-span-5 lg:aspect-[4/5]">
          <Image
            src="/images/boardroom.jpg"
            alt=""
            fill
            priority
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover"
          />
        </div>
      </Container>
      <div className="border-y border-line bg-surface">
        <Container>
          <dl className="grid grid-cols-1 divide-y divide-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {hero.facts.map((f) => (
              <div key={f.label} className="flex flex-col-reverse justify-end gap-1 py-6 sm:px-8 sm:first:pl-0">
                <dt className="text-sm leading-snug text-muted">{f.label}</dt>
                <dd className="text-2xl font-semibold tracking-tight text-brand-900">{f.value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </div>
    </section>
  );
}
