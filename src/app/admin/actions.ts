"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { adminCredentials, basicAuthMatches } from "@/lib/auth";
import { deleteApplication, isStatus, setApplicationStatus } from "@/lib/store";

/**
 * Server Actions can be invoked by POSTing to any route, not only /admin, so the proxy's
 * Basic Auth gate is not enough: every admin action re-checks the credentials itself.
 */
async function requireAdmin() {
  const admin = adminCredentials();
  const header = (await headers()).get("authorization");
  if (!admin || !basicAuthMatches(header, admin.user, admin.password)) throw new Error("Unauthorized");
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
