import Link from "next/link";
import { connection } from "next/server";
import { az } from "@/content/az";
import { domainLabels, formatDate, residentLabel, statusLabel, statusLabels, typeLabel } from "@/lib/labels";
import {
  STATUSES,
  isStatus,
  listApplications,
  storeBackend,
  storeFile,
  type StoredApplication,
} from "@/lib/store";
import { DeleteButton, StatusSelect } from "./controls";

const statusTone: Record<string, string> = {
  new: "bg-brand-100 text-brand-900",
  review: "bg-accent/10 text-accent",
  accepted: "bg-success/10 text-success",
  rejected: "bg-surface text-muted",
};

export default async function AdminPage({ searchParams }: PageProps<"/admin">) {
  await connection();
  const sp = await searchParams;
  const one = (v: string | string[] | undefined) => (typeof v === "string" ? v : "");
  const statusFilter = isStatus(one(sp.status)) ? one(sp.status) : "";
  const typeFilter = one(sp.type) === "member" || one(sp.type) === "anchor" ? one(sp.type) : "";
  const q = one(sp.q).trim();

  const f = az.form.fields;
  const backend = storeBackend();

  let apps: StoredApplication[] = [];
  let error: string | null = null;
  if (!backend) {
    error = "Verilənlər bazası qoşulmayıb. Vercel → Storage bölməsində Upstash Redis qoşun və layihəni yenidən deploy edin.";
  } else {
    try {
      apps = await listApplications();
    } catch (e) {
      console.error("[admin] listing failed", e);
      error = "Müraciətləri yükləmək mümkün olmadı. Bir az sonra yenidən cəhd edin.";
    }
  }

  const counts = Object.fromEntries(STATUSES.map((s) => [s, apps.filter((a) => a.status === s).length]));
  const needle = q.toLocaleLowerCase("az");
  const shown = apps.filter(
    (a) =>
      (!statusFilter || a.status === statusFilter) &&
      (!typeFilter || a.type === typeFilter) &&
      (!needle ||
        [a.company, a.name, a.email, a.taxId, a.phone].some((v) => v?.toLocaleLowerCase("az").includes(needle))),
  );

  const href = (patch: Record<string, string>) => {
    const p = new URLSearchParams({ status: statusFilter, type: typeFilter, q, ...patch });
    for (const [k, v] of [...p.entries()]) if (!v) p.delete(k);
    const s = p.toString();
    return s ? `/admin?${s}` : "/admin";
  };
  const statusOptions = STATUSES.map((s) => ({ value: s, label: statusLabels[s] }));

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <header className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-6">
        <div>
          <p className="text-sm text-muted">Azərbaycan Texnoloji Dayanıqlılıq Klasteri</p>
          <h1 className="mt-1 text-2xl font-semibold text-brand-900">Müraciətlər</h1>
          <p className="mt-1 text-sm text-muted">
            Cəmi: {apps.length}
            {backend === "file" && <> · Saxlama: lokal fayl ({storeFile()})</>}
            {backend === "redis" && <> · Saxlama: Upstash Redis</>}
          </p>
        </div>
        {apps.length > 0 && (
          <a
            href="/admin/export.csv"
            className="rounded-[var(--radius-card)] bg-brand-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-800"
          >
            CSV yüklə (Excel)
          </a>
        )}
      </header>

      {error && (
        <p className="mt-6 rounded-[var(--radius-card)] border border-danger/30 bg-danger/5 p-4 text-sm text-danger">{error}</p>
      )}

      {!error && (
        <>
          <nav aria-label="Status üzrə filtr" className="mt-6 flex flex-wrap gap-2 text-sm">
            <Link
              href={href({ status: "" })}
              aria-current={!statusFilter ? "page" : undefined}
              className={`rounded-full border px-3.5 py-1.5 ${!statusFilter ? "border-brand-900 bg-brand-900 text-white" : "border-line bg-white text-ink hover:border-brand-700"}`}
            >
              Hamısı <span className="tabular-nums opacity-70">{apps.length}</span>
            </Link>
            {STATUSES.map((s) => (
              <Link
                key={s}
                href={href({ status: s })}
                aria-current={statusFilter === s ? "page" : undefined}
                className={`rounded-full border px-3.5 py-1.5 ${statusFilter === s ? "border-brand-900 bg-brand-900 text-white" : "border-line bg-white text-ink hover:border-brand-700"}`}
              >
                {statusLabels[s]} <span className="tabular-nums opacity-70">{counts[s]}</span>
              </Link>
            ))}
          </nav>

          <form method="get" action="/admin" className="mt-4 flex flex-wrap items-end gap-3">
            {statusFilter && <input type="hidden" name="status" value={statusFilter} />}
            <div className="min-w-0 flex-1 basis-60">
              <label htmlFor="q" className="mb-1 block text-xs font-medium text-muted">
                Axtarış (şirkət, ad, email, VÖEN, telefon)
              </label>
              <input
                id="q"
                name="q"
                type="search"
                defaultValue={q}
                className="w-full rounded-[var(--radius-card)] border border-line bg-white px-3 py-2 text-sm focus:border-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-700/20"
              />
            </div>
            <div>
              <label htmlFor="type" className="mb-1 block text-xs font-medium text-muted">
                {f.type.label}
              </label>
              <select
                id="type"
                name="type"
                defaultValue={typeFilter}
                className="rounded-[var(--radius-card)] border border-line bg-white px-3 py-2 text-sm focus:border-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-700/20"
              >
                <option value="">Hamısı</option>
                {f.type.options.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="rounded-[var(--radius-card)] border border-brand-900 px-4 py-2 text-sm font-semibold text-brand-900 hover:bg-brand-100"
            >
              Tətbiq et
            </button>
            {(q || typeFilter || statusFilter) && (
              <Link href="/admin" className="py-2 text-sm text-brand-700 underline underline-offset-4">
                Filtri təmizlə
              </Link>
            )}
          </form>

          {apps.length === 0 && <p className="mt-6 text-sm text-muted">Hələ müraciət yoxdur.</p>}
          {apps.length > 0 && shown.length === 0 && (
            <p className="mt-6 text-sm text-muted">Filtrə uyğun müraciət tapılmadı.</p>
          )}
        </>
      )}

      <ol className="mt-6 space-y-3">
        {shown.map((a) => (
          <li key={a.id} className="rounded-[var(--radius-card)] border border-line bg-white">
            <details className="group">
              <summary className="grid cursor-pointer list-none grid-cols-1 gap-x-6 gap-y-1 p-4 sm:grid-cols-[9rem_1fr_1fr_auto] sm:items-center [&::-webkit-details-marker]:hidden">
                <span className="text-sm tabular-nums text-muted">{formatDate(a.submittedAt)}</span>
                <span className="font-semibold text-brand-900">{a.company}</span>
                <span className="text-sm text-ink/80">
                  {a.name} · {a.email}
                </span>
                <span className="flex flex-wrap gap-1.5 sm:justify-end">
                  <span className="rounded-full bg-surface px-2.5 py-0.5 text-xs font-medium text-brand-900">
                    {typeLabel(a.type)}
                  </span>
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusTone[a.status]}`}>
                    {statusLabel(a.status)}
                  </span>
                </span>
              </summary>
              <div className="border-t border-line p-4">
                <div className="mb-4 flex flex-wrap items-center gap-3 border-b border-line pb-4">
                  <StatusSelect id={a.id} value={a.status} options={statusOptions} />
                  <a
                    href={`mailto:${a.email}`}
                    className="rounded-[var(--radius-card)] border border-line px-3 py-2 text-sm font-medium text-brand-700 hover:border-brand-700"
                  >
                    Email yaz
                  </a>
                  <span className="ml-auto">
                    <DeleteButton id={a.id} company={a.company} />
                  </span>
                </div>
                <dl className="grid grid-cols-1 gap-x-8 gap-y-3 text-sm sm:grid-cols-2">
                  {(
                    [
                      [f.email, a.email],
                      [f.taxId, a.taxId],
                      [f.website, a.website],
                      [f.resident.label, residentLabel(a.resident)],
                      [f.teamSize.label, a.teamSize],
                      [f.domains, domainLabels(a.domains).join(", ")],
                      [f.role, a.role],
                      [f.phone, a.phone],
                      ["Dil", a.locale],
                    ] as [string, string][]
                  )
                    .filter(([, v]) => v)
                    .map(([k, v]) => (
                      <div key={k}>
                        <dt className="text-muted">{k}</dt>
                        <dd className="mt-0.5 break-words text-ink">{v}</dd>
                      </div>
                    ))}
                  <div className="sm:col-span-2">
                    <dt className="text-muted">{f.product}</dt>
                    <dd className="mt-0.5 whitespace-pre-line text-ink">{a.product}</dd>
                  </div>
                  {a.message && (
                    <div className="sm:col-span-2">
                      <dt className="text-muted">{f.message}</dt>
                      <dd className="mt-0.5 whitespace-pre-line text-ink">{a.message}</dd>
                    </div>
                  )}
                </dl>
              </div>
            </details>
          </li>
        ))}
      </ol>
    </main>
  );
}
