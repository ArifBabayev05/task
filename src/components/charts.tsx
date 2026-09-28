/**
 * Lightweight, server-rendered charts (HTML/CSS, no chart library).
 * Conventions: bars ≤ 20px thick with a 4px rounded data-end and square baseline,
 * hairline solid grid, values in text tokens (never the series color), a hover/focus
 * tooltip on every mark, and a table twin behind a <details> toggle.
 */

type Row = { key: string; label: string; value: number | null; display: string };

export function ChartCard({
  title,
  subtitle,
  children,
  className = "",
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <figure className={`flex flex-col rounded-xl border border-line bg-white p-5 sm:p-6 ${className}`}>
      <figcaption>
        <p className="font-semibold text-navy-900">{title}</p>
        {subtitle && <p className="mt-0.5 text-xs text-muted">{subtitle}</p>}
      </figcaption>
      <div className="mt-5 flex flex-1 flex-col">{children}</div>
    </figure>
  );
}

function Tooltip({ children }: { children: React.ReactNode }) {
  return (
    <span
      role="tooltip"
      className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 hidden -translate-x-1/2 whitespace-nowrap rounded-md bg-navy-950 px-2.5 py-1.5 text-xs font-medium text-white shadow-lg group-hover:block group-focus-visible:block"
    >
      {children}
    </span>
  );
}

function TableTwin({ label, headers, rows }: { label: string; headers: string[]; rows: string[][] }) {
  return (
    <details className="mt-4 text-xs text-muted">
      <summary className="cursor-pointer select-none font-medium text-brand hover:underline">{label}</summary>
      <table className="mt-2 w-full border-collapse text-left">
        <thead>
          <tr className="border-b border-line">
            {headers.map((h) => (
              <th key={h} scope="col" className="py-1.5 pr-3 font-semibold text-ink/80">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.join("|")} className="border-b border-line/60">
              {r.map((cell, i) => (
                <td key={i} className={`py-1.5 pr-3 ${i > 0 ? "tabular-nums" : ""}`}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </details>
  );
}

/** Single-series horizontal bar chart (magnitude). Rows with `value: null` render a muted note. */
export function HBarChart({
  rows,
  max,
  unit,
  nullLabel,
  tableLabel,
  headers,
  color = "bg-series-1",
  baseline,
}: {
  rows: Row[];
  max: number;
  unit: string;
  nullLabel?: string;
  tableLabel: string;
  headers: [string, string];
  color?: string;
  /** Optional reference value drawn as a hairline (e.g. 100 = full deductibility). */
  baseline?: { value: number; label: string };
}) {
  return (
    <div>
      <ul className="relative space-y-3">
        {rows.map((r) => {
          const pct = r.value === null ? 0 : (r.value / max) * 100;
          return (
            <li key={r.key} className="grid grid-cols-[minmax(0,9.5rem)_1fr] items-center gap-3 sm:grid-cols-[minmax(0,12rem)_1fr]">
              <span className="text-[13px] leading-snug text-ink/85">{r.label}</span>
              {r.value === null ? (
                <span className="text-xs italic text-muted">{nullLabel}</span>
              ) : (
                <span className="relative flex items-center gap-2">
                  <span className="relative h-5 flex-1 rounded-r-sm">
                    {baseline && (
                      <span
                        aria-hidden
                        className="absolute inset-y-[-6px] w-px bg-muted/50"
                        style={{ left: `${(baseline.value / max) * 100}%` }}
                      />
                    )}
                    <span
                      tabIndex={0}
                      aria-label={`${r.label}: ${r.display}`}
                      className={`group relative block h-5 rounded-r-[4px] outline-none focus-visible:ring-2 focus-visible:ring-cyan ${color}`}
                      style={{ width: `${pct}%` }}
                    >
                      <Tooltip>
                        {r.label}: {r.display} {unit}
                      </Tooltip>
                    </span>
                  </span>
                  <span className="w-12 shrink-0 text-sm font-semibold text-navy-900">{r.display}</span>
                </span>
              )}
            </li>
          );
        })}
      </ul>
      {baseline && (
        <p className="mt-3 flex items-center gap-2 text-xs text-muted">
          <span aria-hidden className="inline-block h-3 w-px bg-muted/60" /> {baseline.label}
        </p>
      )}
      <TableTwin
        label={tableLabel}
        headers={headers}
        rows={rows.map((r) => [r.label, r.value === null ? nullLabel ?? "—" : `${r.display} ${unit}`])}
      />
    </div>
  );
}

/** Part-to-whole bar with a 2px surface gap between segments and a legend. */
export function StackedBar({
  segments,
  tableLabel,
  headers,
  note,
}: {
  segments: { key: string; label: string; value: number; display: string; color: string; ink: "white" | "dark" }[];
  tableLabel: string;
  headers: [string, string];
  note?: string;
}) {
  const total = segments.reduce((s, x) => s + x.value, 0);
  return (
    <div>
      <div className="flex h-9 gap-0.5 bg-white">
        {segments.map((s, i) => {
          const pct = (s.value / total) * 100;
          const fits = pct >= 22;
          return (
            <span
              key={s.key}
              tabIndex={0}
              aria-label={`${s.label}: ${s.display}`}
              className={`group relative flex items-center justify-center overflow-visible outline-none focus-visible:ring-2 focus-visible:ring-cyan ${s.color} ${
                i === 0 ? "rounded-l-[4px]" : ""
              } ${i === segments.length - 1 ? "rounded-r-[4px]" : ""}`}
              style={{ width: `${pct}%` }}
            >
              {fits && (
                <span className={`text-xs font-semibold ${s.ink === "white" ? "text-white" : "text-navy-950"}`}>
                  {s.display}
                </span>
              )}
              <Tooltip>
                {s.label}: {s.display}
              </Tooltip>
            </span>
          );
        })}
      </div>
      <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-ink/80">
        {segments.map((s) => (
          <li key={s.key} className="flex items-center gap-1.5">
            <span aria-hidden className={`size-2.5 rounded-sm ${s.color}`} />
            {s.label} <span className="font-semibold text-navy-900">{s.display}</span>
          </li>
        ))}
      </ul>
      {note && <p className="mt-3 text-sm font-semibold text-navy-900">{note}</p>}
      <TableTwin label={tableLabel} headers={headers} rows={segments.map((s) => [s.label, s.display])} />
    </div>
  );
}

/** Timeline of dated events; year-only entries render as a light band spanning that year. */
export function Timeline({
  items,
  from,
  to,
  legend,
  tableLabel,
  headers,
  locale,
}: {
  items: { key: string; label: string; year: number; month?: number; display: string; extra: string }[];
  from: number;
  to: number;
  legend: { exact: string; yearOnly: string };
  tableLabel: string;
  headers: [string, string, string];
  locale: string;
}) {
  const months = (to - from + 1) * 12;
  const pos = (year: number, month: number) => ((year - from) * 12 + (month - 1) + 0.5) / months * 100;
  const ticks: { label: string; left: number }[] = [];
  for (let y = from; y <= to; y++) {
    for (const m of [1, 7]) {
      ticks.push({
        label: new Date(y, m - 1, 1).toLocaleDateString(locale, { month: "short", year: "numeric" }),
        left: ((y - from) * 12 + (m - 1)) / months * 100,
      });
    }
  }
  return (
    <div>
      <div className="grid grid-cols-[minmax(0,6.5rem)_1fr] gap-x-3">
        <span />
        <div className="relative h-5 text-[11px] text-muted">
          {ticks.map((t, i) => (
            <span
              key={t.label}
              className={`absolute top-0 whitespace-nowrap ${i % 2 === 1 ? "hidden sm:block" : ""}`}
              style={{ left: `${t.left}%` }}
            >
              {t.label}
            </span>
          ))}
        </div>
        {items.map((it) => (
          <div key={it.key} className="contents">
            <span className="flex h-9 items-center text-[13px] font-medium text-ink/85">{it.label}</span>
            <div className="relative h-9 border-t border-grid">
              {ticks.map((t) => (
                <span key={t.label} aria-hidden className="absolute inset-y-0 w-px bg-grid" style={{ left: `${t.left}%` }} />
              ))}
              {it.month ? (
                <span
                  tabIndex={0}
                  aria-label={`${it.label}: ${it.display}`}
                  className="group absolute top-1/2 size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-series-1 ring-2 ring-white outline-none focus-visible:ring-cyan"
                  style={{ left: `${pos(it.year, it.month)}%` }}
                >
                  <Tooltip>
                    {it.label}: {it.display}
                  </Tooltip>
                </span>
              ) : (
                <span
                  tabIndex={0}
                  aria-label={`${it.label}: ${it.display}`}
                  className="group absolute top-1/2 flex h-5 -translate-y-1/2 items-center justify-center rounded-[4px] bg-series-1/20 text-xs font-semibold text-navy-900 outline-none focus-visible:ring-2 focus-visible:ring-cyan"
                  style={{ left: `${((it.year - from) * 12) / months * 100}%`, width: `${(12 / months) * 100}%` }}
                >
                  {it.display}
                  <Tooltip>
                    {it.label}: {it.display}
                  </Tooltip>
                </span>
              )}
              {it.month && (
                <span
                  className="absolute top-1/2 ml-3 -translate-y-1/2 whitespace-nowrap text-xs font-semibold text-navy-900"
                  style={{ left: `${pos(it.year, it.month)}%` }}
                >
                  {it.display}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
      <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-ink/80">
        <li className="flex items-center gap-1.5">
          <span aria-hidden className="size-3 rounded-full bg-series-1" /> {legend.exact}
        </li>
        <li className="flex items-center gap-1.5">
          <span aria-hidden className="h-3 w-6 rounded-[3px] bg-series-1/20" /> {legend.yearOnly}
        </li>
      </ul>
      <TableTwin label={tableLabel} headers={headers} rows={items.map((it) => [it.label, it.display, it.extra])} />
    </div>
  );
}
