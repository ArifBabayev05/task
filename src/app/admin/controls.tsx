"use client";

import { Trash2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { removeApplication, updateStatus } from "./actions";

type Option = { value: string; label: string };

/** Status dropdown that saves as soon as a new value is picked. */
export function StatusSelect({ id, value, options }: { id: string; value: string; options: Option[] }) {
  return (
    <form action={updateStatus}>
      <input type="hidden" name="id" value={id} />
      <label className="sr-only" htmlFor={`status-${id}`}>
        Status
      </label>
      <select
        id={`status-${id}`}
        name="status"
        defaultValue={value}
        onChange={(e) => e.currentTarget.form?.requestSubmit()}
        className="rounded-[var(--radius-card)] border border-line bg-white px-3 py-2 text-sm text-ink focus:border-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-700/20"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </form>
  );
}

export function DeleteButton({ id, company }: { id: string; company: string }) {
  return (
    <form
      action={removeApplication}
      onSubmit={(e) => {
        if (!window.confirm(`"${company}" müraciəti silinsin? Bu əməliyyat geri qaytarılmır.`)) e.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={id} />
      <DeleteSubmit />
    </form>
  );
}

function DeleteSubmit() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center gap-1.5 rounded-[var(--radius-card)] border border-line px-3 py-2 text-sm font-medium text-danger hover:border-danger/40 hover:bg-danger/5 disabled:opacity-60"
    >
      <Trash2 aria-hidden className="size-4" strokeWidth={1.5} />
      {pending ? "Silinir…" : "Sil"}
    </button>
  );
}
