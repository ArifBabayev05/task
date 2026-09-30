import Image from "next/image";
import Link from "next/link";
import { locales, type Locale } from "@/content";
import type { Content } from "@/content/types";

export function Header({ c, lang }: { c: Content; lang: Locale }) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-navy-950 text-white">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-2.5 sm:px-6 lg:px-8">
        <a href="#top" className="flex min-w-0 items-center gap-4" aria-label={c.meta.title}>
          <Image
            src="/images/ministry-logo-white.png"
            alt="Azərbaycan Respublikası Rəqəmsal İnkişaf və Nəqliyyat Nazirliyi"
            width={919}
            height={266}
            priority
            className="h-8 w-auto shrink-0 sm:h-9"
          />
          <span aria-hidden className="hidden h-7 w-px bg-white/20 md:block" />
          <span className="hidden text-[13px] font-medium leading-tight text-white/80 md:block">{c.ui.org}</span>
        </a>
        <nav aria-label={c.ui.languageLabel} className="ml-auto flex rounded-md border border-white/20 p-0.5 text-xs font-semibold">
          {locales.map((l) => (
            <Link
              key={l}
              href={`/${l}`}
              hrefLang={l}
              aria-current={l === lang ? "true" : undefined}
              className={`rounded px-2 py-1 uppercase ${l === lang ? "bg-white text-navy-900" : "text-white/75 hover:text-white"}`}
            >
              {l}
            </Link>
          ))}
        </nav>
      </div>
      <nav aria-label={c.ui.sectionsLabel} className="border-t border-white/10">
        <ul className="no-scrollbar mx-auto flex max-w-6xl gap-1 overflow-x-auto px-2 sm:px-4 lg:px-6">
          {c.ui.nav.map((item, i) => (
            <li key={item.id} className="shrink-0">
              <a
                href={`#${item.id}`}
                className="block whitespace-nowrap px-2.5 py-2.5 text-[13px] font-medium text-white/75 hover:text-white"
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
