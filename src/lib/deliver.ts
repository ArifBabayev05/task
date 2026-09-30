import "server-only";
import { az } from "@/content/az";
import type { Application } from "./application";
import { saveApplication, storeConfigured } from "./store";

/**
 * Stores an application and sends optional notifications. Configure on Vercel
 * (Project → Settings → Environment Variables / Storage), then redeploy:
 *
 *   Storage (primary; viewed at /admin): Upstash Redis, see ./store.ts
 *
 *   Email notification via Resend (https://resend.com), optional:
 *     RESEND_API_KEY          API key
 *     APPLICATION_EMAIL_TO    recipient(s), comma-separated
 *     APPLICATION_EMAIL_FROM  sender on a verified domain, e.g. "Klaster <noreply@example.az>"
 *                             (defaults to Resend's test sender, which only delivers to the account owner)
 *
 *   Webhook (Google Apps Script / Sheets, Slack, Make, Zapier, …), optional:
 *     APPLICATION_WEBHOOK_URL     receives the application as JSON (POST)
 *     APPLICATION_WEBHOOK_SECRET  optional, sent as the X-Webhook-Secret header
 *
 * Returns true when the application was stored or accepted by at least one destination.
 */
export async function deliverApplication(app: Application): Promise<boolean> {
  const tasks: Promise<boolean>[] = [];
  if (storeConfigured()) tasks.push(store(app));
  if (process.env.RESEND_API_KEY && process.env.APPLICATION_EMAIL_TO) tasks.push(sendEmail(app));
  if (process.env.APPLICATION_WEBHOOK_URL) tasks.push(sendWebhook(app));

  if (tasks.length === 0) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[application] No destination configured; application received in development:", app);
      return true;
    }
    console.error("[application] No destination configured (connect Upstash Redis, or set RESEND_API_KEY + APPLICATION_EMAIL_TO or APPLICATION_WEBHOOK_URL).");
    return false;
  }

  const results = await Promise.all(tasks);
  return results.some(Boolean);
}

async function store(app: Application): Promise<boolean> {
  try {
    await saveApplication(app);
    return true;
  } catch (err) {
    console.error("[application] Storing failed", err);
    return false;
  }
}

/** Human-readable summary using the Azerbaijani labels (the team's working language). */
export function formatApplication(app: Application): string {
  const f = az.form.fields;
  const domainTitle = new Map(az.domains.items.map((d) => [d.id, d.title]));
  const opt = <T extends string>(list: { value: T; label: string }[], v: T) => list.find((o) => o.value === v)?.label ?? v;
  const rows: [string, string][] = [
    [f.type.label, opt(f.type.options, app.type)],
    [f.company, app.company],
    [f.taxId, app.taxId],
    [f.website, app.website],
    [f.resident.label, opt(f.resident.options, app.resident)],
    [f.domains, app.domains.map((d) => domainTitle.get(d) ?? d).join(", ")],
    [f.product, app.product],
    [f.teamSize.label, app.teamSize],
    [f.name, app.name],
    [f.role, app.role],
    [f.email, app.email],
    [f.phone, app.phone],
    [f.message, app.message],
    ["Dil / Language", app.locale],
    ["Tarix / Date", app.submittedAt],
  ];
  return rows
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}:\n${v}`)
    .join("\n\n");
}

async function sendEmail(app: Application): Promise<boolean> {
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.APPLICATION_EMAIL_FROM || "Dayanıqlılıq Klasteri <onboarding@resend.dev>",
        to: process.env.APPLICATION_EMAIL_TO!.split(",").map((s) => s.trim()).filter(Boolean),
        reply_to: app.email,
        subject: `Yeni müraciət: ${app.company}`,
        text: formatApplication(app),
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) console.error("[application] Resend error", res.status, await res.text().catch(() => ""));
    return res.ok;
  } catch (err) {
    console.error("[application] Resend request failed", err);
    return false;
  }
}

async function sendWebhook(app: Application): Promise<boolean> {
  try {
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (process.env.APPLICATION_WEBHOOK_SECRET) headers["X-Webhook-Secret"] = process.env.APPLICATION_WEBHOOK_SECRET;
    const res = await fetch(process.env.APPLICATION_WEBHOOK_URL!, {
      method: "POST",
      headers,
      body: JSON.stringify({ ...app, summary: formatApplication(app) }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) console.error("[application] Webhook error", res.status);
    return res.ok;
  } catch (err) {
    console.error("[application] Webhook request failed", err);
    return false;
  }
}
