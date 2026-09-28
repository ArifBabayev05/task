import Image from "next/image";
import {
  Award,
  Bridge,
  ChartColumn,
  Cloud,
  Cog,
  DraftingCompass,
  Gavel,
  Globe,
  Handshake,
  Landmark,
  MapPin,
  Monitor,
  Network,
  Share2,
  ShieldCheck,
  Ship,
  Wrench,
  Hammer,
  type LucideIcon,
} from "lucide-react";
import { logoSizes } from "@/content/companies";
import type { LogoRef } from "@/content/types";

export const icons: Record<string, LucideIcon> = {
  landmark: Landmark,
  bridge: Bridge,
  gavel: Gavel,
  cog: Cog,
  chart: ChartColumn,
  network: Network,
  globe: Globe,
  cloud: Cloud,
  pin: MapPin,
  hub: Share2,
  handshake: Handshake,
  shield: ShieldCheck,
  blueprint: DraftingCompass,
  monitor: Monitor,
  wrench: Wrench,
  certificate: Award,
  tools: Hammer,
  ship: Ship,
};

export function Container({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

/** Small pill marking content that exists in only one of the two BCG sources. */
export function SourceMark({ label, tone = "light" }: { label: string; tone?: "light" | "dark" }) {
  const styles =
    tone === "dark"
      ? "border-white/30 bg-white/10 text-white/85"
      : "border-cyan/40 bg-cyan-soft text-brand";
  return (
    <span
      className={`source-mark inline-flex shrink-0 items-center gap-1 whitespace-nowrap rounded-full border px-2 py-0.5 align-middle text-[10px] font-semibold uppercase tracking-wide ${styles}`}
    >
      <span aria-hidden className="size-1.5 rounded-full bg-current opacity-70" />
      {label}
    </span>
  );
}

export function SectionHeader({
  kicker,
  title,
  lead,
  dark = false,
  aside,
}: {
  kicker: string;
  title: string;
  lead?: string;
  dark?: boolean;
  aside?: React.ReactNode;
}) {
  return (
    <header className="max-w-3xl">
      <p className={`text-xs font-semibold uppercase tracking-[0.18em] ${dark ? "text-accent" : "text-brand-600"}`}>
        {kicker}
      </p>
      <h2
        className={`mt-3 text-balance text-2xl font-semibold leading-tight tracking-tight sm:text-3xl ${
          dark ? "text-white" : "text-navy-900"
        }`}
      >
        {title} {aside}
      </h2>
      {lead && (
        <p className={`mt-4 text-pretty text-base leading-relaxed sm:text-lg ${dark ? "text-white/80" : "text-muted"}`}>
          {lead}
        </p>
      )}
    </header>
  );
}

/** Deck-style slide heading: yellow kicker followed by the headline. */
export function SlideTitle({ kicker, title, as: Tag = "h3" }: { kicker: string; title: string; as?: "h3" | "h4" }) {
  return (
    <Tag className="text-balance text-xl font-semibold leading-snug tracking-tight text-navy-900 sm:text-2xl">
      <span className="text-brand-600">{kicker}</span>
      <span aria-hidden className="mx-2 text-line">
        |
      </span>
      {title}
    </Tag>
  );
}

/**
 * Renders a company logo at a size normalized by visual area, so wide word-marks
 * and square emblems read at a similar weight (as in the deck).
 */
export function Logo({
  company,
  area = 2400,
  maxWidth = 130,
  maxHeight = 44,
}: {
  company: LogoRef;
  area?: number;
  maxWidth?: number;
  maxHeight?: number;
}) {
  const size = company.logo ? logoSizes[company.logo] : undefined;
  let box: { width: number; height: number } | undefined;
  if (size) {
    const ratio = size[0] / size[1];
    let height = Math.min(maxHeight, Math.max(16, Math.sqrt(area / ratio)));
    if (height * ratio > maxWidth) height = maxWidth / ratio;
    box = { width: Math.round(height * ratio), height: Math.round(height) };
  }
  return (
    <span className="relative inline-flex items-center" title={company.name}>
      {company.logo && size && box ? (
        <Image
          src={`/logos/${company.logo}.png`}
          alt={company.name}
          width={size[0]}
          height={size[1]}
          style={box}
          className="max-w-full object-contain"
        />
      ) : (
        <span className="text-sm font-semibold tracking-tight text-brand">{company.name}</span>
      )}
      {(company.estonian || company.mark) && (
        <sup className="ml-0.5 text-[10px] font-semibold text-muted" aria-label={company.estonian ? "Estonian" : undefined}>
          {company.estonian ? "2" : company.mark}
        </sup>
      )}
    </span>
  );
}

export function Bullets({ items, className = "", dotClass = "bg-cyan" }: { items: string[]; className?: string; dotClass?: string }) {
  return (
    <ul className={`space-y-1.5 ${className}`}>
      {items.map((item) => (
        <li key={item} className="flex gap-2.5">
          <span aria-hidden className={`mt-[0.55em] size-1.5 shrink-0 rounded-full ${dotClass}`} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
