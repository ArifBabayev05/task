import { notFound } from "next/navigation";
import { ApplyDialog } from "@/components/ApplyDialog";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About, Benefits, Domains, Join, Partners } from "@/components/Sections";
import { getContent, hasLocale } from "@/content";

export default async function Page({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const c = getContent(lang);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-white focus:px-3 focus:py-2 focus:text-brand-900"
      >
        {c.ui.skipToContent}
      </a>
      <Header c={c} lang={lang} />
      <main id="main">
        <Hero c={c} />
        <About c={c} />
        <Domains c={c} />
        <Partners c={c} />
        <Benefits c={c} />
        <Join c={c} />
      </main>
      <Footer c={c} />
      <ApplyDialog
        text={c.form}
        locale={c.meta.locale}
        closeLabel={c.ui.close}
        domains={c.domains.items.map((d) => ({ id: d.id, title: d.title }))}
      />
    </>
  );
}
