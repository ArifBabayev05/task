import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getContent, hasLocale, locales } from "@/content";
import "../globals.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { meta } = getContent(lang);
  return {
    title: meta.title,
    description: meta.description,
    robots: { index: false, follow: false, nocache: true },
    icons: { icon: "/images/ministry-emblem.png" },
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <html lang={lang}>
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
