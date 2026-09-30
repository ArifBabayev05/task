import Image from "next/image";
import Link from "next/link";
import { locales, type Locale } from "@/content";
import type { Content } from "@/content/types";
import { ApplyButton } from "./ApplyDialog";

export function Header({ c, lang }: { c: Content; lang: Locale }) {
  return (
    <header className="sticky top-0 z-40">
      <div className="bg-brand-900 text-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
          <a href="#top" className="flex min-w-0 items-center gap-4" aria-label={c.meta.title}>
            <Image
              src="/images/ministry-logo-white.png"
              alt="Azərbaycan Respublikası Rəqəmsal İnkişaf və Nəqliyyat Nazirliyi"
              width={919}
              height={266}
              priority
              className="h-9 w-auto shrink-0"
            />
            <span aria-hidden className="hidden h-8 w-px bg-white/25 md:block" />
            <span className="hidden max-w-[16rem] text-[13px] font-medium leading-snug text-white/85 md:block">{c.ui.org}</span>
          </a>
          <div className="ml-auto flex items-center gap-3">
            <nav aria-label={c.ui.languageLabel} className="flex text-xs font-semibold">
              {locales.map((l) => (
                <Link
                  key={l}
                  href={`/${l}`}
                  hrefLang={l}
                  aria-current={l === lang ? "true" : undefined}
                  className={`px-2 py-1 uppercase ${l === lang ? "text-white underline underline-offset-4" : "text-white/60 hover:text-white"}`}
                >
                  {l}
                </Link>
              ))}
            </nav>
            <ApplyButton variant="compact" className="hidden sm:inline-flex">
              {c.ui.applyCta}
            </ApplyButton>
          </div>
        </div>
      </div>
      <nav aria-label={c.ui.sectionsLabel} className="border-b border-line bg-white">
        <ul className="no-scrollbar mx-auto flex max-w-7xl gap-6 overflow-x-auto px-4 sm:px-6 lg:px-8">
          {c.ui.nav.map((item) => (
            <li key={item.id} className="shrink-0">
              <a
                href={`#${item.id}`}
                className="block whitespace-nowrap border-b-2 border-transparent py-3.5 text-sm font-medium text-ink/80 hover:border-brand-700 hover:text-brand-900"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
