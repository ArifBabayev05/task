/**
 * Auth helpers shared by the proxy, the admin pages and the admin Server Actions.
 * Web Crypto only, so this runs in any runtime.
 *
 * Admin sign-in uses a signed session cookie: "<expiry>.<HMAC-SHA256(secret, user:expiry)>".
 * The secret is ADMIN_SESSION_SECRET, falling back to ADMIN_PASSWORD, so changing the
 * password signs everyone out.
 */

export const SESSION_COOKIE = "cluster_admin";
export const SESSION_TTL_SECONDS = 8 * 60 * 60;

export const adminCredentials = () => {
  const password = process.env.ADMIN_PASSWORD;
  return password ? { user: process.env.ADMIN_USER || "admin", password } : null;
};

const encoder = new TextEncoder();

async function sign(message: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = new Uint8Array(await crypto.subtle.sign("HMAC", key, encoder.encode(message)));
  return btoa(String.fromCharCode(...sig)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function sessionSecret(admin: { user: string; password: string }) {
  return `session:${process.env.ADMIN_SESSION_SECRET || admin.password}`;
}

export async function createSessionToken(): Promise<string | null> {
  const admin = adminCredentials();
  if (!admin) return null;
  const exp = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS;
  return `${exp}.${await sign(`${admin.user}:${exp}`, sessionSecret(admin))}`;
}

export async function verifySessionToken(token: string | undefined | null): Promise<boolean> {
  const admin = adminCredentials();
  if (!admin || !token) return false;
  const dot = token.indexOf(".");
  const exp = Number(token.slice(0, dot));
  if (dot < 1 || !Number.isFinite(exp) || exp < Date.now() / 1000) return false;
  const expected = await sign(`${admin.user}:${exp}`, sessionSecret(admin));
  return safeEqual(token.slice(dot + 1), expected);
}

/** True when the Authorization header carries exactly these credentials (whole-site gate). */
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
