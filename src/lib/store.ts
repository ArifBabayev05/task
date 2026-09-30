import "server-only";
import type { Application } from "./application";

/**
 * Application storage in Upstash Redis (REST API, no SDK).
 *
 * On Vercel: Project → Storage → Create/Connect → "Upstash for Redis" (free plan).
 * The integration adds KV_REST_API_URL / KV_REST_API_TOKEN (or UPSTASH_REDIS_REST_URL /
 * UPSTASH_REDIS_REST_TOKEN) to the project; redeploy afterwards.
 */
const KEY = "cluster:applications";

export type StoredApplication = Application & { id: string };

function config() {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  return url && token ? { url: url.replace(/\/$/, ""), token } : null;
}

export const storeConfigured = () => config() !== null;

async function command<T>(args: (string | number)[]): Promise<T> {
  const cfg = config();
  if (!cfg) throw new Error("Application store is not configured");
  const res = await fetch(cfg.url, {
    method: "POST",
    headers: { Authorization: `Bearer ${cfg.token}`, "Content-Type": "application/json" },
    body: JSON.stringify(args),
    cache: "no-store",
    signal: AbortSignal.timeout(10_000),
  });
  const data = (await res.json().catch(() => ({}))) as { result?: T; error?: string };
  if (!res.ok || data.error) throw new Error(`Redis ${args[0]} failed: ${res.status} ${data.error ?? ""}`);
  return data.result as T;
}

export async function saveApplication(app: Application): Promise<StoredApplication> {
  const stored: StoredApplication = { id: crypto.randomUUID(), ...app };
  await command<number>(["LPUSH", KEY, JSON.stringify(stored)]);
  return stored;
}

/** Newest first. */
export async function listApplications(): Promise<StoredApplication[]> {
  const rows = await command<string[]>(["LRANGE", KEY, 0, -1]);
  return rows.flatMap((r) => {
    try {
      return [JSON.parse(r) as StoredApplication];
    } catch {
      return [];
    }
  });
}
