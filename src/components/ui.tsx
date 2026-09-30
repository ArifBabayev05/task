export function Container({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

export function SectionHeader({
  kicker,
  title,
  lead,
  dark = false,
}: {
  kicker: string;
  title: string;
  lead?: string;
  dark?: boolean;
}) {
  return (
    <header className="max-w-3xl">
      <p className={`text-xs font-semibold uppercase tracking-[0.18em] ${dark ? "text-accent" : "text-brand-600"}`}>
        {kicker}
      </p>
      <h2
        className={`mt-3 text-balance text-2xl font-semibold leading-tight tracking-tight sm:text-3xl ${
          dark ? "text-white" : "text-navy-900"
        }`}
      >
        {title}
      </h2>
      {lead && (
        <p className={`mt-4 text-pretty text-base leading-relaxed sm:text-lg ${dark ? "text-white/80" : "text-muted"}`}>
          {lead}
        </p>
      )}
    </header>
  );
}

/** Primary (accent) and secondary (outline) link buttons used in the hero and the join box. */
export function ButtonLink({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
}) {
  const styles =
    variant === "primary"
      ? "bg-accent text-navy-950 hover:bg-[#f6cf57]"
      : "border border-white/30 text-white hover:border-white/60";
  return (
    <a
      href={href}
      className={`inline-flex items-center gap-2 rounded-md px-5 py-3 text-[15px] font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${styles}`}
    >
      {children}
    </a>
  );
}
