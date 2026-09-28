"use client";

import { useId, useRef, useState } from "react";

/** Accessible tabs; panels are pre-rendered (server) nodes. */
export function Tabs({
  items,
  variant = "pill",
  label,
}: {
  items: { id: string; label: React.ReactNode; panel: React.ReactNode }[];
  variant?: "pill" | "underline" | "tiles";
  label: string;
}) {
  const [active, setActive] = useState(0);
  const base = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const n = items.length;
    let next = -1;
    if (e.key === "ArrowRight") next = (i + 1) % n;
    if (e.key === "ArrowLeft") next = (i - 1 + n) % n;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = n - 1;
    if (next >= 0) {
      e.preventDefault();
      setActive(next);
      refs.current[next]?.focus();
    }
  };

  return (
    <div>
      <div
        role="tablist"
        aria-label={label}
        className={
          variant === "tiles"
            ? "grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6"
            : `no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1 ${variant === "underline" ? "border-b border-line" : ""}`
        }
      >
        {items.map((it, i) => {
          const selected = i === active;
          return (
            <button
              key={it.id}
              ref={(el) => {
                refs.current[i] = el;
              }}
              role="tab"
              id={`${base}-tab-${i}`}
              aria-selected={selected}
              aria-controls={`${base}-panel-${i}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => onKey(e, i)}
              className={
                variant === "tiles"
                  ? `flex h-full flex-col items-start rounded-xl border p-4 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan ${
                      selected
                        ? "border-navy-900 bg-navy-900 text-white shadow-lg shadow-navy-900/20"
                        : "border-line bg-white text-navy-900 hover:border-brand/40"
                    }`
                  : variant === "pill"
                  ? `shrink-0 rounded-full border px-4 py-2 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan ${
                      selected
                        ? "border-navy-900 bg-navy-900 text-white"
                        : "border-line bg-white text-ink/80 hover:border-brand/40 hover:text-navy-900"
                    }`
                  : `-mb-px shrink-0 border-b-2 px-3 py-2.5 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-cyan ${
                      selected ? "border-series-1 text-navy-900" : "border-transparent text-muted hover:text-navy-900"
                    }`
              }
            >
              {it.label}
            </button>
          );
        })}
      </div>
      {items.map((it, i) => (
        <div
          key={it.id}
          role="tabpanel"
          id={`${base}-panel-${i}`}
          aria-labelledby={`${base}-tab-${i}`}
          hidden={i !== active}
          className=" pt-5"
        >
          {it.panel}
        </div>
      ))}
    </div>
  );
}
