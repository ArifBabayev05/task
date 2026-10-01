import { ChevronDown, Download, ExternalLink, LogOut, Mail, Search } from "lucide-react";
import Link from "next/link";
import { connection } from "next/server";
import { az } from "@/content/az";
import { domainLabels, formatDate, residentLabel, statusLabel, statusLabels, typeLabel } from "@/lib/labels";
import { STATUSES, isStatus, listApplications, storeBackend, type StoredApplication } from "@/lib/store";
import { logout } from "./actions";
import { DeleteButton, StatusSelect } from "./controls";

const statusTone: Record<string, string> = {
  new: "bg-brand-100 text-brand-900",
  review: "bg-accent/10 text-accent",
  accepted: "bg-success/10 text-success",
  rejected: "bg-surface text-muted",
};

const statusDot: Record<string, string> = {
  new: "bg-brand-700",
  review: "bg-accent",
  accepted: "bg-success",
  rejected: "bg-muted/50",
};

const fieldCls =
  "rounded-[var(--radius-card)] border border-line bg-white px-3 py-2 text-sm text-ink focus:border-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-700/20";

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
  const filtered = Boolean(q || typeFilter || statusFilter);

  const href = (patch: Record<string, string>) => {
    const p = new URLSearchParams({ status: statusFilter, type: typeFilter, q, ...patch });
    for (const [k, v] of [...p.entries()]) if (!v) p.delete(k);
    const s = p.toString();
    return s ? `/admin?${s}` : "/admin";
  };
  const statusOptions = STATUSES.map((s) => ({ value: s, label: statusLabels[s] }));
  const cards = [{ key: "", label: "Hamısı", count: apps.length }, ...STATUSES.map((s) => ({ key: s, label: statusLabels[s], count: counts[s] }))];

  return (
    <>
      <header className="sticky top-0 z-10 bg-brand-900 text-white">
        <div className="mx-auto flex h-14 max-w-6xl items-center gap-4 px-4 sm:px-6">
          <p className="flex min-w-0 items-center gap-2.5 text-sm font-semibold">
            <span aria-hidden className="size-2 shrink-0 rounded-full bg-accent-300" />
            <span className="truncate">Dayanıqlılıq Klasteri</span>
            <span className="hidden text-white/50 sm:inline">/ Admin</span>
          </p>
          <div className="ml-auto flex items-center gap-1 text-sm">
            <a
              href="/az"
              target="_blank"
              rel="noreferrer"
              className="hidden items-center gap-1.5 rounded-[var(--radius-card)] px-3 py-2 text-white/80 hover:bg-white/10 hover:text-white sm:inline-flex"
            >
              <ExternalLink aria-hidden className="size-4" strokeWidth={1.75} />
              Sayt
            </a>
            <form action={logout}>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 rounded-[var(--radius-card)] px-3 py-2 text-white/80 hover:bg-white/10 hover:text-white"
              >
                <LogOut aria-hidden className="size-4" strokeWidth={1.75} />
                Çıxış
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-brand-900">Müraciətlər</h1>
            <p className="mt-1 text-sm text-muted">
              {backend === "redis" ? "Upstash Redis bazası" : backend === "file" ? "Lokal fayl (data/applications.json)" : "Baza qoşulmayıb"}
            </p>
          </div>
          {apps.length > 0 && (
            <a
              href="/admin/export.csv"
              className="inline-flex items-center gap-2 rounded-[var(--radius-card)] bg-brand-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-800"
            >
              <Download aria-hidden className="size-4" />
              CSV yüklə (Excel)
            </a>
          )}
        </div>

        {error && (
          <p className="mt-6 rounded-[var(--radius-card)] border border-danger/30 bg-danger/5 p-4 text-sm text-danger">{error}</p>
        )}

        {!error && (
          <>
            <nav aria-label="Status üzrə filtr" className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-5">
              {cards.map((c) => {
                const active = statusFilter === c.key;
                return (
                  <Link
                    key={c.key || "all"}
                    href={href({ status: c.key })}
                    aria-current={active ? "page" : undefined}
                    className={`rounded-[var(--radius-card)] border px-4 py-3 ${
                      active ? "border-brand-900 bg-brand-900 text-white" : "border-line bg-white text-ink hover:border-brand-700"
                    } ${c.key === "" ? "col-span-2 sm:col-span-1" : ""}`}
                  >
                    <span className={`flex items-center gap-2 text-xs font-medium ${active ? "text-white/80" : "text-muted"}`}>
                      {c.key && <span aria-hidden className={`size-2 rounded-full ${statusDot[c.key]}`} />}
                      {c.label}
                    </span>
                    <span className="mt-1 block text-2xl font-semibold tabular-nums">{c.count}</span>
                  </Link>
                );
              })}
            </nav>

            <form method="get" action="/admin" className="mt-4 flex flex-wrap items-center gap-2">
              {statusFilter && <input type="hidden" name="status" value={statusFilter} />}
              <div className="relative min-w-0 flex-1 basis-64">
                <Search aria-hidden className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
                <label htmlFor="q" className="sr-only">
                  Axtarış
                </label>
                <input
                  id="q"
                  name="q"
                  type="search"
                  defaultValue={q}
                  placeholder="Şirkət, ad, email, VÖEN və ya telefon"
                  className={`${fieldCls} w-full pl-9`}
                />
              </div>
              <label htmlFor="type" className="sr-only">
                {f.type.label}
              </label>
              <select id="type" name="type" defaultValue={typeFilter} className={fieldCls}>
                <option value="">Bütün növlər</option>
                {f.type.options.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                className="rounded-[var(--radius-card)] border border-brand-900 px-4 py-2 text-sm font-semibold text-brand-900 hover:bg-brand-100"
              >
                Axtar
              </button>
              {filtered && (
                <Link href="/admin" className="px-2 py-2 text-sm text-brand-700 underline underline-offset-4">
                  Təmizlə
                </Link>
              )}
            </form>

            {apps.length === 0 ? (
              <div className="mt-6 rounded-[var(--radius-card)] border border-dashed border-line bg-white px-6 py-14 text-center">
                <p className="font-semibold text-brand-900">Hələ müraciət yoxdur</p>
                <p className="mt-1 text-sm text-muted">Saytdakı formdan göndərilən müraciətlər burada görünəcək.</p>
              </div>
            ) : (
              <p className="mt-6 text-sm text-muted">
                {filtered ? `${apps.length} müraciətdən ${shown.length} göstərilir` : `${apps.length} müraciət`}
              </p>
            )}
            {apps.length > 0 && shown.length === 0 && (
              <p className="mt-3 rounded-[var(--radius-card)] border border-line bg-white p-6 text-center text-sm text-muted">
                Filtrə uyğun müraciət tapılmadı.
              </p>
            )}
          </>
        )}

        {shown.length > 0 && (
          <ol className="mt-3 divide-y divide-line overflow-hidden rounded-[var(--radius-card)] border border-line bg-white">
            {shown.map((a) => (
              <li key={a.id}>
                <details className="group">
                  <summary className="grid cursor-pointer list-none grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1 px-4 py-3.5 hover:bg-surface/60 sm:grid-cols-[minmax(0,1fr)_12rem_8.5rem_auto] sm:px-5 [&::-webkit-details-marker]:hidden">
                    <span className="min-w-0">
                      <span className="block truncate font-semibold text-brand-900">{a.company}</span>
                      <span className="block truncate text-sm text-muted">
                        {a.name} · {a.email}
                      </span>
                    </span>
                    <span className="col-start-2 row-start-1 flex items-center gap-2 sm:col-start-4">
                      <span className={`whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-medium ${statusTone[a.status]}`}>
                        {statusLabel(a.status)}
                      </span>
                      <ChevronDown aria-hidden className="size-4 text-muted group-open:rotate-180" />
                    </span>
                    <span className="truncate text-sm text-ink/80 sm:col-start-2 sm:row-start-1">{typeLabel(a.type)}</span>
                    <span className="whitespace-nowrap text-sm tabular-nums text-muted sm:col-start-3 sm:row-start-1">{formatDate(a.submittedAt)}</span>
                  </summary>

                  <div className="border-t border-line bg-surface/40 px-4 py-5 sm:px-5">
                    <div className="flex flex-wrap items-center gap-2">
                      <StatusSelect id={a.id} value={a.status} options={statusOptions} />
                      <a
                        href={`mailto:${a.email}`}
                        className="inline-flex items-center gap-1.5 rounded-[var(--radius-card)] border border-line bg-white px-3 py-2 text-sm font-medium text-brand-900 hover:border-brand-700"
                      >
                        <Mail aria-hidden className="size-4" strokeWidth={1.5} />
                        Email yaz
                      </a>
                      <span className="ml-auto">
                        <DeleteButton id={a.id} company={a.company} />
                      </span>
                    </div>

                    <dl className="mt-5 grid grid-cols-1 gap-x-8 gap-y-4 text-sm sm:grid-cols-2 lg:grid-cols-3">
                      {(
                        [
                          [f.email, a.email],
                          [f.phone, a.phone],
                          [f.role, a.role],
                          [f.taxId, a.taxId],
                          [f.website, a.website],
                          [f.resident.label, residentLabel(a.resident)],
                          [f.teamSize.label, a.teamSize],
                          ["Dil", a.locale === "en" ? "İngilis" : "Azərbaycan"],
                          ["Göndərilib", formatDate(a.submittedAt)],
                        ] as [string, string][]
                      )
                        .filter(([, v]) => v)
                        .map(([k, v]) => (
                          <div key={k}>
                            <dt className="text-xs font-medium uppercase tracking-wide text-muted">{k}</dt>
                            <dd className="mt-1 break-words text-ink">{v}</dd>
                          </div>
                        ))}
                      <div className="sm:col-span-2 lg:col-span-3">
                        <dt className="text-xs font-medium uppercase tracking-wide text-muted">{f.domains}</dt>
                        <dd className="mt-1.5 flex flex-wrap gap-1.5">
                          {domainLabels(a.domains).map((d) => (
                            <span key={d} className="rounded-full border border-line bg-white px-2.5 py-0.5 text-xs text-ink">
                              {d}
                            </span>
                          ))}
                        </dd>
                      </div>
                      <div className="sm:col-span-2 lg:col-span-3">
                        <dt className="text-xs font-medium uppercase tracking-wide text-muted">{f.product}</dt>
                        <dd className="mt-1 whitespace-pre-line text-ink">{a.product}</dd>
                      </div>
                      {a.message && (
                        <div className="sm:col-span-2 lg:col-span-3">
                          <dt className="text-xs font-medium uppercase tracking-wide text-muted">{f.message}</dt>
                          <dd className="mt-1 whitespace-pre-line text-ink">{a.message}</dd>
                        </div>
                      )}
                    </dl>
                  </div>
                </details>
              </li>
            ))}
          </ol>
        )}
      </main>
    </>
  );
}
