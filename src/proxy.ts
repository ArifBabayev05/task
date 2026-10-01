import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, adminCredentials, basicAuthMatches, verifySessionToken } from "@/lib/auth";

/**
 * Access gates. Configure in .env.local (local) or on Vercel
 * (Project → Settings → Environment Variables), then restart / redeploy.
 *
 * Admin area (/admin, application list and CSV export), always protected:
 *   ADMIN_PASSWORD        required; without it /admin returns 404
 *   ADMIN_USER            optional, defaults to "admin"
 *   ADMIN_SESSION_SECRET  optional, signs the session cookie (defaults to ADMIN_PASSWORD)
 *   Sign-in page: /admin/login. Signed-out visitors are redirected there.
 *
 * Whole site (pages and static assets), optional HTTP Basic Auth; the site is public unless set:
 *   SITE_PASSWORD   turns the gate on
 *   SITE_USER       optional, defaults to "team"
 */
export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    if (!adminCredentials()) return new NextResponse("Not found", { status: 404 });
    if (pathname === "/admin/login") return NextResponse.next();
    if (await verifySessionToken(request.cookies.get(SESSION_COOKIE)?.value)) return NextResponse.next();

    const login = new URL("/admin/login", request.url);
    if (pathname !== "/admin" || search) login.searchParams.set("next", pathname + search);
    return NextResponse.redirect(login);
  }

  const sitePassword = process.env.SITE_PASSWORD;
  if (!sitePassword) return NextResponse.next();
  const user = process.env.SITE_USER || "team";
  if (basicAuthMatches(request.headers.get("authorization"), user, sitePassword)) return NextResponse.next();
  return new NextResponse("Authentication required.", {
    status: 401,
    headers: { "WWW-Authenticate": `Basic realm="Resilience Cluster", charset="UTF-8"`, "Cache-Control": "no-store" },
  });
}

export const config = {
  matcher: ["/:path*"],
};
