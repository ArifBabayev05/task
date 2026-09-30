import { connection } from "next/server";
import { az } from "@/content/az";
import { domainLabels, formatDate, residentLabel, typeLabel } from "@/lib/labels";
import { listApplications, storeConfigured, type StoredApplication } from "@/lib/store";

export default async function AdminPage() {
  await connection();
  const f = az.form.fields;

  let apps: StoredApplication[] = [];
  let error: string | null = null;
  if (!storeConfigured()) {
    error = "Verilənlər bazası qoşulmayıb. Vercel → Storage bölməsində Upstash Redis qoşun və layihəni yenidən deploy edin.";
  } else {
    try {
      apps = await listApplications();
    } catch (e) {
      console.error("[admin] listing failed", e);
      error = "Müraciətləri yükləmək mümkün olmadı. Bir az sonra yenidən cəhd edin.";
    }
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <header className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-6">
        <div>
          <p className="text-sm text-muted">Azərbaycan Texnoloji Dayanıqlılıq Klasteri</p>
          <h1 className="mt-1 text-2xl font-semibold text-brand-900">Müraciətlər</h1>
          <p className="mt-1 text-sm text-muted">Cəmi: {apps.length}</p>
        </div>
        {apps.length > 0 && (
          <a
            href="/admin/export.csv"
            className="rounded bg-brand-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-800"
          >
            CSV yüklə (Excel)
          </a>
        )}
      </header>

      {error && <p className="mt-6 rounded border border-danger/30 bg-danger/5 p-4 text-sm text-danger">{error}</p>}
      {!error && apps.length === 0 && <p className="mt-6 text-sm text-muted">Hələ müraciət yoxdur.</p>}

      <ol className="mt-6 space-y-3">
        {apps.map((a) => (
          <li key={a.id} className="rounded border border-line bg-white">
            <details className="group">
              <summary className="grid cursor-pointer list-none grid-cols-1 gap-x-6 gap-y-1 p-4 sm:grid-cols-[9rem_1fr_1fr_auto] sm:items-center [&::-webkit-details-marker]:hidden">
                <span className="text-sm tabular-nums text-muted">{formatDate(a.submittedAt)}</span>
                <span className="font-semibold text-brand-900">{a.company}</span>
                <span className="text-sm text-ink/80">
                  {a.name} · <a className="text-brand-700 underline" href={`mailto:${a.email}`}>{a.email}</a>
                </span>
                <span className="justify-self-start rounded-sm bg-surface px-2 py-0.5 text-xs font-medium text-brand-900 sm:justify-self-end">
                  {typeLabel(a.type)}
                </span>
              </summary>
              <dl className="grid grid-cols-1 gap-x-8 gap-y-3 border-t border-line p-4 text-sm sm:grid-cols-2">
                {(
                  [
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
                      <dd className="mt-0.5 text-ink">{v}</dd>
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
            </details>
          </li>
        ))}
      </ol>
    </main>
  );
}
