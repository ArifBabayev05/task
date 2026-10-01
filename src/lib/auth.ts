/** HTTP Basic Auth helpers shared by the proxy and the admin Server Actions (edge + node safe). */

export const adminCredentials = () => {
  const password = process.env.ADMIN_PASSWORD;
  return password ? { user: process.env.ADMIN_USER || "admin", password } : null;
};

/** True when the Authorization header carries exactly these credentials. */
export function basicAuthMatches(header: string | null, user: string, password: string): boolean {
  if (!header?.startsWith("Basic ")) return false;
  let decoded = "";
  try {
    decoded = new TextDecoder().decode(Uint8Array.from(atob(header.slice(6)), (ch) => ch.charCodeAt(0)));
  } catch {
    return false;
  }
  const sep = decoded.indexOf(":");
  if (sep === -1) return false;
  const okUser = safeEqual(decoded.slice(0, sep), user);
  const okPass = safeEqual(decoded.slice(sep + 1), password);
  return okUser && okPass;
}

/** Constant-time string comparison (length difference still returns false). */
export function safeEqual(a: string, b: string): boolean {
  const len = Math.max(a.length, b.length);
  let diff = a.length ^ b.length;
  for (let i = 0; i < len; i++) {
    diff |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0);
  }
  return diff === 0;
}
