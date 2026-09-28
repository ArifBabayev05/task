"use client";

import { useEffect, useId, useRef, useState } from "react";

/**
 * Observes every [data-reveal] element once and sets data-shown when it scrolls into view.
 * Hidden-until-shown styling only applies under html.js (set by an inline script), so the
 * page stays fully visible without JavaScript.
 */
export function RevealObserver() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-shown])"));
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.setAttribute("data-shown", ""));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.setAttribute("data-shown", "");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}

/** Highlights the nav link of the section in view and draws a reading-progress bar. */
export function ScrollSpy({ ids }: { ids: string[] }) {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const links = new Map(
      ids.map((id) => [id, document.querySelector<HTMLAnchorElement>(`[data-nav="${id}"]`)] as const),
    );
    let last: string | null | undefined;
    const setActive = (id: string | null) => {
      if (id === last) return;
      last = id;
      links.forEach((a, key) => {
        if (!a) return;
        if (key === id) a.setAttribute("aria-current", "location");
        else a.removeAttribute("aria-current");
      });
      if (id) links.get(id)?.scrollIntoView({ block: "nearest", inline: "nearest" });
    };

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const doc = document.documentElement;
        const max = doc.scrollHeight - window.innerHeight;
        if (barRef.current) barRef.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
        const probe = window.innerHeight * 0.3;
        let current: string | null = null;
        for (const id of ids) {
          const el = document.getElementById(id);
          if (el && el.getBoundingClientRect().top <= probe) current = id;
        }
        setActive(current);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ids]);

  return (
    <div aria-hidden className="absolute inset-x-0 bottom-0 h-0.5 bg-transparent">
      <div ref={barRef} className="h-full origin-left scale-x-0 bg-cyan" />
    </div>
  );
}

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
                  ? `flex h-full flex-col items-start rounded-xl border p-4 text-left transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan ${
                      selected
                        ? "border-navy-900 bg-navy-900 text-white shadow-lg shadow-navy-900/20"
                        : "border-line bg-white text-navy-900 hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-md"
                    }`
                  : variant === "pill"
                  ? `shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan ${
                      selected
                        ? "border-navy-900 bg-navy-900 text-white"
                        : "border-line bg-white text-ink/80 hover:border-brand/40 hover:text-navy-900"
                    }`
                  : `-mb-px shrink-0 border-b-2 px-3 py-2.5 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-cyan ${
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
          className="animate-[fadeIn_.25s_ease-out] pt-5"
        >
          {it.panel}
        </div>
      ))}
    </div>
  );
}
