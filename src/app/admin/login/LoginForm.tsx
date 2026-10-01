"use client";

import { CircleAlert, LogIn } from "lucide-react";
import { useActionState, useEffect, useRef } from "react";
import { login, type LoginState } from "../actions";

const messages: Record<NonNullable<LoginState["error"]>, string> = {
  invalid: "İstifadəçi adı və ya şifrə yanlışdır.",
  locked: "Çox sayda uğursuz cəhd oldu. 15 dəqiqə sonra yenidən cəhd edin.",
  unavailable: "Admin girişi konfiqurasiya olunmayıb.",
};

const inputCls =
  "w-full rounded-[var(--radius-card)] border border-line bg-white px-3.5 py-2.5 text-[15px] text-ink focus:border-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-700/20";

export function LoginForm({ next }: { next: string }) {
  const [state, action, pending] = useActionState<LoginState, FormData>(login, {});
  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (state.error) {
      passwordRef.current?.select();
      passwordRef.current?.focus();
    }
  }, [state]);

  return (
    <form action={action} className="space-y-5">
      <input type="hidden" name="next" value={next} />
      {state.error && (
        <div
          role="alert"
          className="flex gap-2.5 rounded-[var(--radius-card)] border border-danger/30 bg-danger/5 p-3 text-sm text-danger"
        >
          <CircleAlert aria-hidden className="mt-0.5 size-4 shrink-0" />
          <span>{messages[state.error]}</span>
        </div>
      )}
      <div>
        <label htmlFor="user" className="mb-1.5 block text-sm font-medium text-brand-900">
          İstifadəçi adı
        </label>
        <input
          id="user"
          name="user"
          autoComplete="username"
          required
          defaultValue={state.user ?? "admin"}
          className={inputCls}
        />
      </div>
      <div>
        <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-brand-900">
          Şifrə
        </label>
        <input
          ref={passwordRef}
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          autoFocus
          aria-invalid={state.error === "invalid" ? true : undefined}
          className={inputCls}
        />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="inline-flex w-full items-center justify-center gap-2 rounded-[var(--radius-card)] bg-brand-900 px-5 py-3 text-[15px] font-semibold text-white hover:bg-brand-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700 disabled:cursor-wait disabled:opacity-70"
      >
        <LogIn aria-hidden className="size-4" />
        {pending ? "Yoxlanılır…" : "Daxil ol"}
      </button>
    </form>
  );
}
