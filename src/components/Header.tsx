import Image from "next/image";
import Link from "next/link";
import { Lock } from "lucide-react";
import { locales, type Locale } from "@/content";
import type { Content } from "@/content/types";
import { SourceToggle } from "./SourceToggle";

export function Header({ c, lang }: { c: Content; lang: Locale }) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-navy-950/95 text-white backdrop-blur supports-[backdrop-filter]:bg-navy-950/85">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-2.5 sm:px-6 lg:px-8">
        <a href="#top" className="flex min-w-0 items-center gap-3" aria-label={c.meta.title}>
          <Image
            src="/images/ministry-logo-white.png"
            alt="Azərbaycan Respublikası Rəqəmsal İnkişaf və Nəqliyyat Nazirliyi"
            width={919}
            height={266}
            priority
            className="h-8 w-auto sm:h-9"
          />
        </a>
        <span className="ml-1 hidden items-center gap-1.5 rounded-full bg-accent/15 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-accent md:inline-flex">
          <Lock aria-hidden className="size-3" />
          {c.ui.internalBadge}
        </span>
        <div className="ml-auto flex items-center gap-2">
          <SourceToggle onLabel={c.ui.sourcesOn} offLabel={c.ui.sourcesOff} />
          <nav aria-label={c.ui.languageLabel} className="flex rounded-md border border-white/20 p-0.5 text-xs font-semibold">
            {locales.map((l) => (
              <Link
                key={l}
                href={`/${l}`}
                hrefLang={l}
                aria-current={l === lang ? "true" : undefined}
                className={`rounded px-2 py-1 uppercase transition ${
                  l === lang ? "bg-white text-navy-900" : "text-white/75 hover:text-white"
                }`}
              >
                {l}
              </Link>
            ))}
          </nav>
        </div>
      </div>
      <nav aria-label="Sections" className="border-t border-white/10">
        <ul className="no-scrollbar mx-auto flex max-w-6xl gap-1 overflow-x-auto px-2 sm:px-4 lg:px-6">
          {c.ui.nav.map((item, i) => (
            <li key={item.id} className={`shrink-0 ${item.id === "strategy" ? "ml-2 border-l border-white/15 pl-2" : ""}`}>
              <a
                href={`#${item.id}`}
                className="block whitespace-nowrap px-2.5 py-2.5 text-[13px] font-medium text-white/75 transition hover:text-white"
              >
                <span className="mr-1.5 tabular-nums text-white/40">{String(i + 1).padStart(2, "0")}</span>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
