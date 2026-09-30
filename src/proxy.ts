import { NextResponse, type NextRequest } from "next/server";

/**
 * HTTP Basic Auth gates. Configure on Vercel (Project → Settings → Environment Variables), then redeploy.
 *
 * Admin area (/admin, application list and CSV export), always protected:
 *   ADMIN_PASSWORD  required; without it /admin returns 404
 *   ADMIN_USER      optional, defaults to "admin"
 *
 * Whole site (pages and static assets), optional; the site is public unless set:
 *   SITE_PASSWORD   turns the gate on
 *   SITE_USER       optional, defaults to "team"
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    const password = process.env.ADMIN_PASSWORD;
    if (!password) return new NextResponse("Not found", { status: 404 });
    return checkBasicAuth(request, process.env.ADMIN_USER || "admin", password, "Cluster applications");
  }

  const sitePassword = process.env.SITE_PASSWORD;
  if (!sitePassword) return NextResponse.next();
  return checkBasicAuth(request, process.env.SITE_USER || "team", sitePassword, "Resilience Cluster");
}

function checkBasicAuth(request: NextRequest, user: string, password: string, realm: string) {
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
    headers: { "WWW-Authenticate": `Basic realm="${realm}", charset="UTF-8"`, "Cache-Control": "no-store" },
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
