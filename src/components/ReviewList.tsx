"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

type Severity = "high" | "medium" | "low" | "done";
type Item = { severity: Severity; title: string; body: string };

const styles: Record<Severity, string> = {
  high: "bg-alert text-white",
  medium: "bg-accent text-navy-950",
  low: "bg-sky-100 text-brand",
  done: "bg-leaf text-white",
};
const order: Severity[] = ["done", "high", "medium", "low"];

export function ReviewList({
  items,
  labels,
  all,
  filterLabel,
}: {
  items: Item[];
  labels: Record<Severity, string>;
  all: string;
  filterLabel: string;
}) {
  const [filter, setFilter] = useState<Severity | null>(null);
  const counts = new Map<Severity, number>();
  items.forEach((it) => counts.set(it.severity, (counts.get(it.severity) ?? 0) + 1));
  const shown = filter ? items.filter((it) => it.severity === filter) : items;

  const chip = (key: Severity | null, label: string, n: number) => {
    const active = filter === key;
    return (
      <button
        key={key ?? "all"}
        type="button"
        aria-pressed={active}
        onClick={() => setFilter(key)}
        className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan ${
          active ? "border-navy-900 bg-navy-900 text-white" : "border-line bg-white text-ink/80 hover:text-navy-900"
        }`}
      >
        {key && <span aria-hidden className={`size-2 rounded-full ${styles[key].split(" ")[0]}`} />}
        {label}
        <span className="tabular-nums opacity-70">{n}</span>
      </button>
    );
  };

  return (
    <div>
      <div role="group" aria-label={filterLabel} className="flex flex-wrap gap-2">
        {chip(null, all, items.length)}
        {order.filter((s) => counts.has(s)).map((s) => chip(s, labels[s], counts.get(s) ?? 0))}
      </div>
      <ol className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2">
        {shown.map((item) => (
          <li key={item.title} className="animate-[fadeIn_.3s_ease-out_both]">
            <details className="group h-full rounded-xl border border-line bg-white transition open:shadow-md">
              <summary className="flex cursor-pointer list-none items-start gap-3 p-4 [&::-webkit-details-marker]:hidden">
                <span
                  className={`mt-0.5 shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${styles[item.severity]}`}
                >
                  {labels[item.severity]}
                </span>
                <span className="flex-1 font-semibold leading-snug text-navy-900">{item.title}</span>
                <ChevronDown aria-hidden className="mt-0.5 size-4 shrink-0 text-muted transition group-open:rotate-180" />
              </summary>
              <p className="border-t border-line px-4 py-3 text-sm leading-relaxed text-ink/80">{item.body}</p>
            </details>
          </li>
        ))}
      </ol>
    </div>
  );
}
