import type { Content } from "@/content/types";
import { Container } from "./ui";

export function Footer({ c }: { c: Content }) {
  return (
    <footer className="bg-brand-950 text-white/70">
      <Container className="grid grid-cols-1 gap-8 py-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="flex items-center gap-2.5 text-[15px] font-semibold text-white">
            <span aria-hidden className="size-2 shrink-0 rounded-full bg-accent-300" />
            {c.meta.title}
          </p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed">{c.meta.description}</p>
        </div>
        <nav aria-label={c.ui.sectionsLabel} className="md:col-span-7">
          <ul className="grid grid-cols-1 gap-x-8 gap-y-2.5 text-sm sm:grid-cols-2">
            {c.ui.nav.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className="hover:text-white">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-3 py-5 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>{c.footer.text}</p>
          <a href="#top" className="hover:text-white">
            {c.ui.backToTop}
          </a>
        </Container>
      </div>
    </footer>
  );
}
