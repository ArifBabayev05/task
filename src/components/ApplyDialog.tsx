"use client";

import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import type { ApplicationFormText } from "@/content/types";
import { ApplicationForm } from "./ApplicationForm";

const OPEN_EVENT = "apply:open";
const HASH = "#muraciet";

/** Any number of these can open the single application dialog. */
export function ApplyButton({
  children,
  variant = "primary",
  className = "",
}: {
  children: React.ReactNode;
  variant?: "primary" | "inverse" | "compact";
  className?: string;
}) {
  const styles = {
    primary: "bg-brand-900 px-5 py-3 text-[15px] text-white hover:bg-brand-800",
    inverse: "bg-white px-5 py-3 text-[15px] text-brand-900 hover:bg-brand-100",
    compact: "bg-white px-3.5 py-2 text-sm text-brand-900 hover:bg-brand-100",
  }[variant];
  return (
    <button
      type="button"
      aria-haspopup="dialog"
      onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}
      className={`inline-flex items-center justify-center gap-2 rounded-[var(--radius-card)] font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700 ${styles} ${className}`}
    >
      {children}
    </button>
  );
}

export function ApplyDialog({
  text,
  domains,
  locale,
  closeLabel,
}: {
  text: ApplicationFormText;
  domains: { id: string; title: string }[];
  locale: string;
  closeLabel: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    const open = () => {
      if (!dialog.open) dialog.showModal();
    };
    const onHash = () => {
      if (window.location.hash === HASH) open();
    };
    window.addEventListener(OPEN_EVENT, open);
    window.addEventListener("hashchange", onHash);
    onHash(); // deep link: /az#muraciet opens the form
    return () => {
      window.removeEventListener(OPEN_EVENT, open);
      window.removeEventListener("hashchange", onHash);
    };
  }, []);

  const onClose = () => {
    if (window.location.hash === HASH) {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }
  };

  return (
    <dialog
      ref={ref}
      aria-labelledby="apply-title"
      onClose={onClose}
      onClick={(e) => {
        // Click on the backdrop (outside the panel) closes the dialog.
        if (e.target === e.currentTarget) e.currentTarget.close();
      }}
      className="m-auto w-[min(100%-2rem,48rem)] max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-[var(--radius-card)] bg-white p-0 text-ink shadow-2xl"
    >
      <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-line bg-white px-5 py-4 sm:px-8">
        <div>
          <h2 id="apply-title" className="text-xl font-semibold text-brand-900">
            {text.title}
          </h2>
          <p className="mt-1 text-sm text-muted">{text.lead}</p>
        </div>
        <button
          type="button"
          onClick={() => ref.current?.close()}
          aria-label={closeLabel}
          className="-mr-2 rounded p-2 text-muted hover:bg-surface hover:text-brand-900 focus-visible:outline-2 focus-visible:outline-brand-700"
        >
          <X aria-hidden className="size-5" />
        </button>
      </div>
      <div className="px-5 py-6 sm:px-8">
        <ApplicationForm text={text} domains={domains} locale={locale} />
      </div>
    </dialog>
  );
}
