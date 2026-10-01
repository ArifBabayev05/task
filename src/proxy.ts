import { NextResponse, type NextRequest } from "next/server";
import { adminCredentials, basicAuthMatches } from "@/lib/auth";

/**
 * HTTP Basic Auth gates. Configure in .env.local (local) or on Vercel
 * (Project → Settings → Environment Variables), then restart / redeploy.
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
    const admin = adminCredentials();
    if (!admin) return new NextResponse("Not found", { status: 404 });
    return gate(request, admin.user, admin.password, "Cluster applications");
  }

  const sitePassword = process.env.SITE_PASSWORD;
  if (!sitePassword) return NextResponse.next();
  return gate(request, process.env.SITE_USER || "team", sitePassword, "Resilience Cluster");
}

function gate(request: NextRequest, user: string, password: string, realm: string) {
  if (basicAuthMatches(request.headers.get("authorization"), user, password)) return NextResponse.next();
  return new NextResponse("Authentication required.", {
    status: 401,
    headers: { "WWW-Authenticate": `Basic realm="${realm}", charset="UTF-8"`, "Cache-Control": "no-store" },
  });
}

export const config = {
  matcher: ["/:path*"],
};
