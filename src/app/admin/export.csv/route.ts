import { connection } from "next/server";
import { az } from "@/content/az";
import { domainLabels, formatDate, residentLabel, statusLabel, typeLabel } from "@/lib/labels";
import { listApplications, storeConfigured } from "@/lib/store";

/** CSV export of all applications (UTF-8 with BOM and ";" separator so Excel opens it directly). */
export async function GET() {
  await connection();
  if (!storeConfigured()) return new Response("Store is not configured", { status: 503 });

  const f = az.form.fields;
  const apps = await listApplications();
  const header = [
    "Tarix",
    "Status",
    f.type.label,
    f.company,
    f.taxId,
    f.website,
    f.resident.label,
    f.domains,
    f.product,
    f.teamSize.label,
    f.name,
    f.role,
    f.email,
    f.phone,
    f.message,
    "Dil",
    "ID",
  ];
  const rows = apps.map((a) => [
    formatDate(a.submittedAt),
    statusLabel(a.status),
    typeLabel(a.type),
    a.company,
    a.taxId,
    a.website,
    residentLabel(a.resident),
    domainLabels(a.domains).join(", "),
    a.product,
    a.teamSize,
    a.name,
    a.role,
    a.email,
    a.phone,
    a.message,
    a.locale,
    a.id,
  ]);
  const cell = (v: string) => {
    // Neutralise spreadsheet formulas and quote every cell.
    const safe = /^[=+\-@\t\r]/.test(v) ? `'${v}` : v;
    return `"${safe.replace(/"/g, '""')}"`;
  };
  const csv = "﻿" + [header, ...rows].map((r) => r.map((v) => cell(String(v ?? ""))).join(";")).join("\r\n");
  const date = new Date().toISOString().slice(0, 10);
  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="muracietler-${date}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
