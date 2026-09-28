import Image from "next/image";
import { ArrowUp } from "lucide-react";
import type { Content } from "@/content/types";
import { Container } from "./ui";

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
        </div>
        <a
          href="#top"
          className="inline-flex items-center gap-2 self-start rounded-md border border-white/20 px-3 py-2 text-sm text-white/85 hover:border-white/40 hover:text-white sm:self-auto"
        >
          <ArrowUp aria-hidden className="size-4" /> {ui.backToTop}
        </a>
      </Container>
    </footer>
  );
}
