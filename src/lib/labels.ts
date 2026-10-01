import { az } from "@/content/az";
import type { Application } from "./application";

/** Azerbaijani display labels for stored applications (admin list and CSV). */
const f = az.form.fields;
const domainTitle = new Map(az.domains.items.map((d) => [d.id, d.title]));

export const typeLabel = (v: Application["type"]) => f.type.options.find((o) => o.value === v)?.label ?? v;
export const residentLabel = (v: Application["resident"]) => f.resident.options.find((o) => o.value === v)?.label ?? v;
export const domainLabels = (ids: string[]) => ids.map((d) => domainTitle.get(d as never) ?? d);

export const formatDate = (iso: string) => {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  const pad = (n: number) => String(n).padStart(2, "0");
  // Baku time (UTC+4, no DST)
  const b = new Date(d.getTime() + 4 * 3600_000);
  return `${pad(b.getUTCDate())}.${pad(b.getUTCMonth() + 1)}.${b.getUTCFullYear()} ${pad(b.getUTCHours())}:${pad(b.getUTCMinutes())}`;
};

export const statusLabels = {
  new: "Yeni",
  review: "Baxılır",
  accepted: "Qəbul edildi",
  rejected: "Rədd edildi",
} as const;

export const statusLabel = (v: string) => statusLabels[v as keyof typeof statusLabels] ?? v;
