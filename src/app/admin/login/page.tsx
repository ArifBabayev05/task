import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import { LoginForm } from "./LoginForm";

export default async function LoginPage({ searchParams }: PageProps<"/admin/login">) {
  if (await verifySessionToken((await cookies()).get(SESSION_COOKIE)?.value)) redirect("/admin");
  const next = (await searchParams).next;

  return (
    <main className="flex min-h-dvh items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <p className="flex items-center gap-2 text-sm font-medium text-brand-700">
          <span aria-hidden className="size-2 rounded-full bg-accent" />
          Azərbaycan Texnoloji Dayanıqlılıq Klasteri
        </p>
        <div className="mt-4 rounded-[var(--radius-card)] border border-line bg-white p-6 shadow-sm sm:p-8">
          <h1 className="text-2xl font-semibold tracking-tight text-brand-900">Admin girişi</h1>
          <p className="mt-1.5 text-sm text-muted">Müraciətləri görmək üçün daxil olun.</p>
          <div className="mt-6">
            <LoginForm next={typeof next === "string" ? next : "/admin"} />
          </div>
        </div>
      </div>
    </main>
  );
}
