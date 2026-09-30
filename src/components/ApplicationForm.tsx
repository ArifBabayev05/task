"use client";

import { CircleCheck, CircleAlert, Send } from "lucide-react";
import { useActionState, useEffect, useRef, useState } from "react";
import type { ApplicationFormText } from "@/content/types";
import { initialApplyState, type ApplyState, type Field } from "@/lib/application";
import { submitApplication } from "@/lib/apply";

type Domain = { id: string; title: string };
type Props = { text: ApplicationFormText; domains: Domain[]; locale: string };

/** Remounting via `key` resets the action state for "send another application". */
export function ApplicationForm(props: Props) {
  const [round, setRound] = useState(0);
  return <FormBody key={round} {...props} onReset={() => setRound((r) => r + 1)} />;
}

const inputCls =
  "w-full rounded-lg border bg-white px-3.5 py-2.5 text-[15px] text-ink placeholder:text-muted/60 focus:outline-none focus:ring-2";
const okCls = "border-line focus:border-series-1 focus:ring-series-1/25";
const badCls = "border-danger focus:border-danger focus:ring-danger/20";

function FormBody({ text, domains, locale, onReset }: Props & { onReset: () => void }) {
  const [state, action, pending] = useActionState<ApplyState, FormData>(submitApplication, initialApplyState);
  const startedRef = useRef<HTMLInputElement>(null);
  const alertRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const f = text.fields;
  const errors = state.errors ?? {};
  const values = state.values ?? {};

  // Time-on-form spam guard; re-armed after every submission (React resets the form).
  useEffect(() => {
    if (startedRef.current) startedRef.current.value = String(Date.now());
    if (state.status === "error" || state.status === "failed") alertRef.current?.focus();
    if (state.status === "success") successRef.current?.focus();
  }, [state]);

  if (state.status === "success") {
    return (
      <div className="rounded-2xl border border-line bg-white p-8 text-center sm:p-10">
        <CircleCheck aria-hidden className="mx-auto size-12 text-series-1" />
        <h3 ref={successRef} tabIndex={-1} className="mt-4 text-2xl font-semibold text-navy-900 outline-none">
          {text.success.title}
        </h3>
        <p className="mx-auto mt-3 max-w-lg text-[15px] leading-relaxed text-ink/80">{text.success.body}</p>
        <button
          type="button"
          onClick={onReset}
          className="mt-6 rounded-md border border-line px-4 py-2 text-sm font-semibold text-navy-900 hover:border-series-1"
        >
          {text.success.again}
        </button>
      </div>
    );
  }

  const val = (k: Field) => (typeof values[k] === "string" ? (values[k] as string) : "");
  const err = (k: Field) => errors[k];
  const describedBy = (k: Field, hint?: boolean) =>
    [hint ? `${k}-hint` : "", err(k) ? `${k}-error` : ""].filter(Boolean).join(" ") || undefined;
  const errorText = (k: Field) =>
    err(k) ? (
      <p id={`${k}-error`} className="mt-1.5 text-sm text-danger">
        {text.errors[err(k)!]}
      </p>
    ) : null;
  const label = (htmlFor: string, children: React.ReactNode, required?: boolean) => (
    <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-navy-900">
      {children}
      {required ? <span className="text-danger"> *</span> : <span className="font-normal text-muted"> ({text.optional})</span>}
    </label>
  );
  const textInput = ({
    k,
    type = "text",
    required,
    autoComplete,
    hint,
    inputMode,
  }: {
    k: Field;
    type?: string;
    required?: boolean;
    autoComplete?: string;
    hint?: string;
    inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  }) => (
    <div>
      {label(k, f[k as "company"], required)}
      <input
        id={k}
        name={k}
        type={type}
        required={required}
        autoComplete={autoComplete}
        inputMode={inputMode}
        maxLength={200}
        defaultValue={val(k)}
        aria-invalid={err(k) ? true : undefined}
        aria-describedby={describedBy(k, Boolean(hint))}
        placeholder={hint}
        className={`${inputCls} ${err(k) ? badCls : okCls}`}
      />
      {errorText(k)}
    </div>
  );

  const selectedDomains = Array.isArray(values.domains) ? values.domains : [];
  const hasErrors = state.status === "error";

  return (
    <form action={action} noValidate className="rounded-2xl border border-line bg-white p-5 sm:p-8">
      {/* spam guards + locale */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Fax <input type="text" name="fax" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>
      <input ref={startedRef} type="hidden" name="startedAt" defaultValue="" />
      <input type="hidden" name="locale" value={locale} />

      {(hasErrors || state.status === "failed") && (
        <div
          ref={alertRef}
          tabIndex={-1}
          role="alert"
          className="mb-6 flex gap-3 rounded-lg border border-danger/30 bg-danger/5 p-4 text-sm text-danger outline-none"
        >
          <CircleAlert aria-hidden className="mt-0.5 size-5 shrink-0" />
          <span>{hasErrors ? text.errors.summary : text.errors.failed}</span>
        </div>
      )}

      <p className="mb-6 text-sm text-muted">{text.requiredNote}</p>

      {/* 1. Application type */}
      <fieldset aria-describedby={err("type") ? "type-error" : undefined}>
        <legend className="mb-3 text-base font-semibold text-navy-900">
          {f.type.label} <span className="text-danger">*</span>
        </legend>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {f.type.options.map((o, i) => (
            <label
              key={o.value}
              className="flex cursor-pointer items-center gap-3 rounded-lg border border-line p-4 has-[:checked]:border-series-1 has-[:checked]:bg-sky-50"
            >
              <input
                type="radio"
                name="type"
                value={o.value}
                defaultChecked={val("type") ? val("type") === o.value : i === 0}
                className="size-4 accent-[var(--color-series-1)]"
              />
              <span className="text-[15px] font-medium text-navy-900">{o.label}</span>
            </label>
          ))}
        </div>
        {errorText("type")}
      </fieldset>

      {/* 2. Company */}
      <fieldset className="mt-8 border-t border-line pt-6">
        <legend className="float-left mb-4 w-full text-base font-semibold text-navy-900">{text.groups.company}</legend>
        <div className="clear-both grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            {textInput({ k: "company", required: true, autoComplete: "organization" })}
          </div>
          {textInput({ k: "taxId", inputMode: "numeric" })}
          {textInput({ k: "website", type: "url", autoComplete: "url", hint: f.websiteHint })}
        </div>
        <fieldset className="mt-5" aria-describedby={err("resident") ? "resident-error" : undefined}>
          <legend className="mb-2 text-sm font-medium text-navy-900">
            {f.resident.label} <span className="text-danger">*</span>
          </legend>
          <div className="flex flex-wrap gap-2">
            {f.resident.options.map((o) => (
              <label
                key={o.value}
                className="flex cursor-pointer items-center gap-2 rounded-full border border-line px-3.5 py-2 text-sm has-[:checked]:border-series-1 has-[:checked]:bg-sky-50"
              >
                <input
                  type="radio"
                  name="resident"
                  value={o.value}
                  defaultChecked={val("resident") === o.value}
                  className="size-4 accent-[var(--color-series-1)]"
                />
                {o.label}
              </label>
            ))}
          </div>
          {errorText("resident")}
        </fieldset>
      </fieldset>

      {/* 3. Activity */}
      <fieldset className="mt-8 border-t border-line pt-6">
        <legend className="float-left mb-4 w-full text-base font-semibold text-navy-900">{text.groups.activity}</legend>
        <fieldset className="clear-both" aria-describedby={["domains-hint", err("domains") ? "domains-error" : ""].filter(Boolean).join(" ")}>
          <legend className="mb-1 text-sm font-medium text-navy-900">
            {f.domains} <span className="text-danger">*</span>
          </legend>
          <p id="domains-hint" className="mb-2 text-xs text-muted">
            {f.domainsHint}
          </p>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {domains.map((d) => (
              <label
                key={d.id}
                className="flex cursor-pointer items-center gap-2.5 rounded-lg border border-line px-3 py-2.5 text-sm text-ink has-[:checked]:border-series-1 has-[:checked]:bg-sky-50"
              >
                <input
                  type="checkbox"
                  name="domains"
                  value={d.id}
                  defaultChecked={selectedDomains.includes(d.id)}
                  className="size-4 accent-[var(--color-series-1)]"
                />
                {d.title}
              </label>
            ))}
          </div>
          {errorText("domains")}
        </fieldset>
        <div className="mt-5">
          {label("product", f.product, true)}
          <p id="product-hint" className="mb-2 text-xs text-muted">
            {f.productHint}
          </p>
          <textarea
            id="product"
            name="product"
            rows={4}
            required
            maxLength={2000}
            defaultValue={val("product")}
            aria-invalid={err("product") ? true : undefined}
            aria-describedby={describedBy("product", true)}
            className={`${inputCls} ${err("product") ? badCls : okCls}`}
          />
          {errorText("product")}
        </div>
        <div className="mt-5 sm:max-w-xs">
          {label("teamSize", f.teamSize.label)}
          <select
            id="teamSize"
            name="teamSize"
            defaultValue={val("teamSize")}
            aria-invalid={err("teamSize") ? true : undefined}
            aria-describedby={describedBy("teamSize")}
            className={`${inputCls} ${err("teamSize") ? badCls : okCls}`}
          >
            <option value="">{f.teamSize.placeholder}</option>
            {f.teamSize.options.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
          {errorText("teamSize")}
        </div>
      </fieldset>

      {/* 4. Contact */}
      <fieldset className="mt-8 border-t border-line pt-6">
        <legend className="float-left mb-4 w-full text-base font-semibold text-navy-900">{text.groups.contact}</legend>
        <div className="clear-both grid grid-cols-1 gap-4 sm:grid-cols-2">
          {textInput({ k: "name", required: true, autoComplete: "name" })}
          {textInput({ k: "role", autoComplete: "organization-title" })}
          {textInput({ k: "email", type: "email", required: true, autoComplete: "email", inputMode: "email" })}
          {textInput({ k: "phone", type: "tel", autoComplete: "tel", inputMode: "tel" })}
          <div className="sm:col-span-2">
            {label("message", f.message)}
            <textarea
              id="message"
              name="message"
              rows={3}
              maxLength={2000}
              defaultValue={val("message")}
              aria-invalid={err("message") ? true : undefined}
              aria-describedby={describedBy("message")}
              className={`${inputCls} ${err("message") ? badCls : okCls}`}
            />
            {errorText("message")}
          </div>
        </div>
      </fieldset>

      <div className="mt-8 border-t border-line pt-6">
        <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-ink/85">
          <input
            type="checkbox"
            name="consent"
            defaultChecked={val("consent") === "on"}
            aria-invalid={err("consent") ? true : undefined}
            aria-describedby={err("consent") ? "consent-error" : undefined}
            className="mt-0.5 size-4 shrink-0 accent-[var(--color-series-1)]"
          />
          <span>
            {f.consent} <span className="text-danger">*</span>
          </span>
        </label>
        {errorText("consent")}
      </div>

      <button
        type="submit"
        disabled={pending}
        className="mt-6 inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 text-[15px] font-semibold text-navy-950 hover:bg-[#f6cf57] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-series-1 disabled:cursor-wait disabled:opacity-70"
      >
        <Send aria-hidden className="size-4" />
        {pending ? text.submitting : text.submit}
      </button>
    </form>
  );
}
