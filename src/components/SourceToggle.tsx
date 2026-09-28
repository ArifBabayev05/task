"use client";

import { Eye, EyeOff } from "lucide-react";
import { useSyncExternalStore } from "react";

const subscribe = (onChange: () => void) => {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-sources"] });
  return () => observer.disconnect();
};
const getSnapshot = () => document.documentElement.dataset.sources === "on";
const getServerSnapshot = () => false;

export function SourceToggle({ onLabel, offLabel }: { onLabel: string; offLabel: string }) {
  const visible = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = () => {
    const next = visible ? "off" : "on";
    if (next === "on") document.documentElement.dataset.sources = "on";
    else delete document.documentElement.dataset.sources;
    try {
      localStorage.setItem("sources", next);
    } catch {
      // Storage unavailable (private mode); the toggle still works for this visit.
    }
  };

  const Icon = visible ? Eye : EyeOff;
  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={visible}
      className="inline-flex items-center gap-1.5 rounded-md border border-white/20 px-2.5 py-1.5 text-xs font-medium text-white/85 hover:border-white/40 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
    >
      <Icon aria-hidden className="size-3.5" />
      <span className="hidden sm:inline">{visible ? onLabel : offLabel}</span>
    </button>
  );
}
