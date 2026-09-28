"use client";

import { useState } from "react";

type Program = { key: string; label: string; amount: number; color: string; ink: "white" | "dark" };

/** Toggle the two target-market programs to see the combined annual ceiling per company. */
export function ExportBuilder({
  programs,
  locale,
  hint,
  totalNote,
}: {
  programs: Program[];
  locale: string;
  hint: string;
  totalNote: string;
}) {
  const [on, setOn] = useState<Record<string, boolean>>(() => Object.fromEntries(programs.map((p) => [p.key, true])));
  // Deterministic formatting (Intl output differs between Node and browsers for "az",
  // which would break hydration). Matches the copy: "$20,000" (en) / "$20 000" (az).
  const fmt = {
    format: (n: number) => `$${String(n).replace(/\B(?=(\d{3})+(?!\d))/g, locale === "az" ? " " : ",")}`,
  };
  const max = programs.reduce((s, p) => s + p.amount, 0);
  const total = programs.reduce((s, p) => s + (on[p.key] ? p.amount : 0), 0);

  return (
    <div>
      <p className="text-xs text-muted">{hint}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {programs.map((p) => (
          <button
            key={p.key}
            type="button"
            aria-pressed={on[p.key]}
            onClick={() => setOn((s) => ({ ...s, [p.key]: !s[p.key] }))}
            className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan ${
              on[p.key] ? "border-navy-900 bg-navy-900 text-white" : "border-line bg-white text-muted hover:text-navy-900"
            }`}
          >
            <span aria-hidden className={`size-2.5 rounded-sm ${p.color} ${on[p.key] ? "" : "opacity-40"}`} />
            {p.label}
            <span className="tabular-nums opacity-80">{fmt.format(p.amount)}</span>
          </button>
        ))}
      </div>

      <div className="mt-5 flex items-end justify-between gap-4">
        <p className="text-4xl font-semibold tracking-tight text-navy-900 sm:text-5xl" aria-live="polite">
          {fmt.format(total)}
        </p>
        <p className="pb-1 text-right text-xs text-muted">/ {fmt.format(max)}</p>
      </div>
      <div className="mt-3 flex h-9 gap-0.5 rounded-[4px] bg-sky-100">
        {programs.map((p, i) => {
          const pct = on[p.key] ? (p.amount / max) * 100 : 0;
          return (
            <span
              key={p.key}
              className={`flex items-center justify-center overflow-hidden text-xs font-semibold transition-[width] duration-500 ease-out ${p.color} ${
                p.ink === "white" ? "text-white" : "text-navy-950"
              } ${i === 0 ? "rounded-l-[4px]" : ""} ${i === programs.length - 1 ? "rounded-r-[4px]" : ""}`}
              style={{ width: `${pct}%` }}
              title={`${p.label}: ${fmt.format(p.amount)}`}
            >
              {pct > 18 && fmt.format(p.amount)}
            </span>
          );
        })}
      </div>
      <p className="mt-3 text-xs text-muted">{totalNote}</p>
    </div>
  );
}
