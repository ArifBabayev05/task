"use client";

import { useMemo, useState } from "react";
import type { LogoRef } from "@/content/types";
import { Logo } from "./ui";

type Group = { title: string; companies: LogoRef[] };

/**
 * Clickable bar chart (counts per group) that filters a logo wall.
 * Two groupings from the deck: by domain (slide 8) and by priority pool (slide 9).
 */
export function CompanyExplorer({
  modes,
  labels,
}: {
  modes: { id: string; label: string; groups: Group[] }[];
  labels: { all: string; showing: string; unit: string; hint: string; multiDomain: string };
}) {
  const [modeIdx, setModeIdx] = useState(0);
  const [sel, setSel] = useState<number | null>(null);
  const mode = modes[modeIdx];

  // Companies listed in more than one domain (first mode = domains).
  const multi = useMemo(() => {
    const count = new Map<string, number>();
    for (const g of modes[0].groups) for (const co of g.companies) count.set(co.name, (count.get(co.name) ?? 0) + 1);
    return new Set([...count].filter(([, n]) => n > 1).map(([name]) => name));
  }, [modes]);

  const shown = useMemo(() => {
    if (sel !== null) return mode.groups[sel].companies;
    const seen = new Map<string, LogoRef>();
    for (const g of mode.groups) for (const co of g.companies) if (!seen.has(co.name)) seen.set(co.name, co);
    return [...seen.values()];
  }, [mode, sel]);

  const max = Math.max(...mode.groups.map((g) => g.companies.length));

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
      <div>
        <div role="radiogroup" className="flex flex-wrap gap-2">
          {modes.map((m, i) => (
            <button
              key={m.id}
              type="button"
              role="radio"
              aria-checked={i === modeIdx}
              onClick={() => {
                setModeIdx(i);
                setSel(null);
              }}
              className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan ${
                i === modeIdx ? "border-navy-900 bg-navy-900 text-white" : "border-line bg-white text-ink/80 hover:text-navy-900"
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
        <p className="mt-3 text-xs text-muted">{labels.hint}</p>
        <ul className="mt-3 space-y-1.5">
          {mode.groups.map((g, i) => {
            const active = sel === i;
            const dim = sel !== null && !active;
            return (
              <li key={g.title}>
                <button
                  type="button"
                  aria-pressed={active}
                  onClick={() => setSel(active ? null : i)}
                  className={`grid w-full grid-cols-[minmax(0,10rem)_1fr_2rem] items-center gap-3 rounded-lg px-2 py-1.5 text-left transition hover:bg-sky-50 focus-visible:outline-2 focus-visible:outline-cyan sm:grid-cols-[minmax(0,12rem)_1fr_2rem] ${
                    active ? "bg-sky-50" : ""
                  }`}
                >
                  <span className={`text-[13px] leading-snug ${active ? "font-semibold text-navy-900" : "text-ink/85"}`}>{g.title}</span>
                  <span className="h-5">
                    <span
                      className={`block h-5 rounded-r-[4px] transition-all duration-500 ${dim ? "bg-series-1/25" : "bg-series-1"}`}
                      style={{ width: `${(g.companies.length / max) * 100}%` }}
                    />
                  </span>
                  <span className="text-sm font-semibold tabular-nums text-navy-900">{g.companies.length}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="rounded-xl border border-line bg-white p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm text-muted">
            {labels.showing}:{" "}
            <span className="font-semibold text-navy-900">{sel === null ? labels.all : mode.groups[sel].title}</span>
          </p>
          <p className="text-sm font-semibold tabular-nums text-navy-900">
            {shown.length} {labels.unit}
          </p>
        </div>
        <ul key={`${modeIdx}-${sel}`} className="mt-4 grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-3 xl:grid-cols-4">
          {shown.map((co, i) => (
            <li
              key={co.name}
              className="relative flex min-h-12 animate-[fadeIn_.35s_ease-out_both] items-center justify-center rounded-lg px-2 py-2 transition hover:bg-sky-50"
              style={{ animationDelay: `${Math.min(i * 20, 400)}ms` }}
            >
              <Logo company={co} area={2000} maxWidth={110} maxHeight={40} />
              {multi.has(co.name) && (
                <span
                  aria-label={labels.multiDomain}
                  title={labels.multiDomain}
                  className="absolute right-1 top-1 size-2 rounded-full bg-series-2"
                />
              )}
            </li>
          ))}
        </ul>
        <p className="mt-4 flex items-center gap-1.5 border-t border-line pt-3 text-xs text-muted">
          <span aria-hidden className="size-2 rounded-full bg-series-2" /> {labels.multiDomain}
        </p>
      </div>
    </div>
  );
}
