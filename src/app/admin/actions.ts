"use server";

import { revalidatePath } from "next/cache";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import {
  SESSION_COOKIE,
  SESSION_TTL_SECONDS,
  adminCredentials,
  createSessionToken,
  safeEqual,
  verifySessionToken,
} from "@/lib/auth";
import {
  clearLoginFailures,
  deleteApplication,
  isStatus,
  loginFailures,
  recordLoginFailure,
  setApplicationStatus,
} from "@/lib/store";

const MAX_FAILURES = 8;
const FAILURE_WINDOW_SECONDS = 15 * 60;

/**
 * Server Actions can be invoked by POSTing to any route, not only /admin, so the proxy's
 * gate is not enough: every admin action re-checks the session itself.
 */
async function requireAdmin() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!(await verifySessionToken(token))) throw new Error("Unauthorized");
}

export type LoginState = { error?: "invalid" | "locked" | "unavailable"; user?: string };

const safeNext = (v: FormDataEntryValue | null) =>
  typeof v === "string" && /^\/admin(\/(?!login)|\?|$)/.test(v) ? v : "/admin";

export async function login(_prev: LoginState, fd: FormData): Promise<LoginState> {
  const admin = adminCredentials();
  if (!admin) return { error: "unavailable" };
  const user = typeof fd.get("user") === "string" ? (fd.get("user") as string).trim() : "";
  const password = typeof fd.get("password") === "string" ? (fd.get("password") as string) : "";

  const h = await headers();
  const ip = (h.get("x-forwarded-for")?.split(",")[0] || h.get("x-real-ip") || "local").trim();
  try {
    if ((await loginFailures(ip)) >= MAX_FAILURES) return { error: "locked", user };
  } catch (err) {
    console.error("[admin] sign-in throttle check failed", err);
  }

  const ok = safeEqual(user, admin.user) && safeEqual(password, admin.password);
  if (!ok) {
    await recordLoginFailure(ip, FAILURE_WINDOW_SECONDS).catch((err) => console.error("[admin] throttle write failed", err));
    await new Promise((r) => setTimeout(r, 600)); // slow down guessing
    return { error: "invalid", user };
  }

  await clearLoginFailures(ip).catch(() => {});
  (await cookies()).set(SESSION_COOKIE, (await createSessionToken())!, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/admin",
    maxAge: SESSION_TTL_SECONDS,
  });
  redirect(safeNext(fd.get("next")));
}

export async function logout() {
  (await cookies()).set(SESSION_COOKIE, "", { path: "/admin", maxAge: 0 });
  redirect("/admin/login");
}

export async function updateStatus(fd: FormData) {
  await requireAdmin();
  const id = fd.get("id");
  const status = fd.get("status");
  if (typeof id !== "string" || !id || !isStatus(status)) return;
  await setApplicationStatus(id, status);
  revalidatePath("/admin");
}

export async function removeApplication(fd: FormData) {
  await requireAdmin();
  const id = fd.get("id");
  if (typeof id !== "string" || !id) return;
  await deleteApplication(id);
  revalidatePath("/admin");
}
