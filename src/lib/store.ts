import "server-only";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import type { Application } from "./application";

/**
 * Application storage. Two backends, picked automatically:
 *
 * 1. Upstash Redis (REST API, no SDK), used whenever it is configured. Required on Vercel.
 *    Vercel: Project → Storage → Create/Connect → "Upstash for Redis" (free plan). The integration
 *    adds KV_REST_API_URL / KV_REST_API_TOKEN (or UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN).
 *
 * 2. A local JSON file, used otherwise (local development and self-hosted `npm start` servers).
 *    Default path: data/applications.json, override with APPLICATIONS_FILE. Not available on
 *    Vercel, whose filesystem is read-only.
 */
const KEY = "cluster:applications";
const STATUS_KEY = "cluster:application-status";

export const STATUSES = ["new", "review", "accepted", "rejected"] as const;
export type Status = (typeof STATUSES)[number];
export const isStatus = (v: unknown): v is Status => (STATUSES as readonly unknown[]).includes(v);

export type StoredApplication = Application & { id: string; status: Status };

type Backend = "redis" | "file";

function redisConfig() {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  return url && token ? { url: url.replace(/\/$/, ""), token } : null;
}

export function storeBackend(): Backend | null {
  if (redisConfig()) return "redis";
  if (!process.env.VERCEL) return "file";
  return null;
}

export const storeConfigured = () => storeBackend() !== null;

export const storeFile = () => path.resolve(/*turbopackIgnore: true*/ process.env.APPLICATIONS_FILE || path.join(process.cwd(), "data", "applications.json"));

// --- Redis -------------------------------------------------------------------

async function command<T>(args: (string | number)[]): Promise<T> {
  const cfg = redisConfig();
  if (!cfg) throw new Error("Redis is not configured");
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

async function redisRows(): Promise<{ raw: string; app: StoredApplication }[]> {
  const [rows, statusList] = await Promise.all([
    command<string[]>(["LRANGE", KEY, 0, -1]),
    command<string[]>(["HGETALL", STATUS_KEY]),
  ]);
  const status = new Map<string, string>();
  for (let i = 0; i + 1 < statusList.length; i += 2) status.set(statusList[i], statusList[i + 1]);
  return rows.flatMap((raw) => {
    try {
      const app = JSON.parse(raw) as StoredApplication;
      const s = status.get(app.id);
      return [{ raw, app: { ...app, status: isStatus(s) ? s : "new" } }];
    } catch {
      return [];
    }
  });
}

// --- File --------------------------------------------------------------------

// Serialises writes within this server process so concurrent submissions don't overwrite each other.
let fileQueue: Promise<unknown> = Promise.resolve();

async function readFileStore(): Promise<StoredApplication[]> {
  try {
    const data = JSON.parse(await readFile(/*turbopackIgnore: true*/ storeFile(), "utf8")) as StoredApplication[];
    return Array.isArray(data) ? data.map((a) => ({ ...a, status: isStatus(a.status) ? a.status : "new" })) : [];
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw err;
  }
}

function updateFileStore(change: (apps: StoredApplication[]) => StoredApplication[]): Promise<void> {
  const run = fileQueue.then(async () => {
    const file = storeFile();
    const next = change(await readFileStore());
    await mkdir(/*turbopackIgnore: true*/ path.dirname(file), { recursive: true });
    const tmp = `${file}.${process.pid}.tmp`;
    await writeFile(/*turbopackIgnore: true*/ tmp, JSON.stringify(next, null, 2), "utf8");
    await rename(/*turbopackIgnore: true*/ tmp, file); // atomic replace
  });
  fileQueue = run.catch(() => {});
  return run;
}

// --- Public API --------------------------------------------------------------

export async function saveApplication(app: Application): Promise<StoredApplication> {
  const base = { id: crypto.randomUUID(), ...app };
  const stored: StoredApplication = { ...base, status: "new" };
  if (storeBackend() === "redis") {
    // Status lives in a separate hash so list entries never have to be rewritten.
    await command<number>(["LPUSH", KEY, JSON.stringify(base)]);
  } else {
    await updateFileStore((apps) => [stored, ...apps]);
  }
  return stored;
}

/** Newest first. */
export async function listApplications(): Promise<StoredApplication[]> {
  const backend = storeBackend();
  if (backend === "redis") return (await redisRows()).map((r) => r.app);
  if (backend === "file") return readFileStore();
  throw new Error("Application store is not configured");
}

export async function setApplicationStatus(id: string, status: Status): Promise<void> {
  if (storeBackend() === "redis") {
    await command<number>(["HSET", STATUS_KEY, id, status]);
  } else {
    await updateFileStore((apps) => apps.map((a) => (a.id === id ? { ...a, status } : a)));
  }
}

export async function deleteApplication(id: string): Promise<void> {
  if (storeBackend() === "redis") {
    const row = (await redisRows()).find((r) => r.app.id === id);
    if (row) await command<number>(["LREM", KEY, 1, row.raw]);
    await command<number>(["HDEL", STATUS_KEY, id]);
  } else {
    await updateFileStore((apps) => apps.filter((a) => a.id !== id));
  }
}
