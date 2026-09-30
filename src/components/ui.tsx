export function Container({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

export function Heading({ title, lead, inverse = false }: { title: string; lead?: string; inverse?: boolean }) {
  return (
    <div>
      <h2
        className={`text-balance text-[1.75rem] font-semibold leading-tight tracking-tight sm:text-[2rem] ${
          inverse ? "text-white" : "text-brand-900"
        }`}
      >
        {title}
      </h2>
      {lead && (
        <p className={`mt-4 max-w-xl text-pretty text-[1.0625rem] leading-relaxed ${inverse ? "text-white/80" : "text-muted"}`}>
          {lead}
        </p>
      )}
    </div>
  );
}
