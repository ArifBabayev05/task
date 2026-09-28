import { NextResponse, type NextRequest } from "next/server";

/**
 * HTTP Basic Auth gate for the whole site (pages and static assets).
 *
 * Configure on Vercel (Project → Settings → Environment Variables):
 *   SITE_USER      (optional, defaults to "team")
 *   SITE_PASSWORD  (required in production)
 *
 * Fails closed: in production, if SITE_PASSWORD is missing, every request is refused.
 * In development without SITE_PASSWORD the gate is skipped.
 */
export function proxy(request: NextRequest) {
  const password = process.env.SITE_PASSWORD;
  const user = process.env.SITE_USER || "team";

  if (!password) {
    if (process.env.NODE_ENV !== "production") return NextResponse.next();
    return new NextResponse("Site password is not configured.", { status: 503 });
  }

  const header = request.headers.get("authorization") ?? "";
  if (header.startsWith("Basic ")) {
    let decoded = "";
    try {
      decoded = atob(header.slice(6));
    } catch {
      decoded = "";
    }
    const sep = decoded.indexOf(":");
    if (sep !== -1) {
      const okUser = safeEqual(decoded.slice(0, sep), user);
      const okPass = safeEqual(decoded.slice(sep + 1), password);
      if (okUser && okPass) return NextResponse.next();
    }
  }

  return new NextResponse("Authentication required.", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Resilience Cluster (internal)", charset="UTF-8"' },
  });
}

/** Constant-time string comparison (length difference still returns false). */
function safeEqual(a: string, b: string): boolean {
  const len = Math.max(a.length, b.length);
  let diff = a.length ^ b.length;
  for (let i = 0; i < len; i++) {
    diff |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0);
  }
  return diff === 0;
}

export const config = {
  matcher: ["/:path*"],
};
