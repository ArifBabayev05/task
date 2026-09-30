import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Müraciətlər · Dayanıqlılıq Klasteri",
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="az">
      <body className="min-h-dvh bg-surface">{children}</body>
    </html>
  );
}
