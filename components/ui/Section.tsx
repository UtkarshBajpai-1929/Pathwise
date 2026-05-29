export function Section({
  eyebrow,
  title,
  description,
  children,
  className = "",
}: {
  eyebrow?: string;
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8 ${className}`}>
      {(eyebrow || title || description) && (
        <div className="mb-8 max-w-3xl">
          {eyebrow && <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-emerald-700">{eyebrow}</p>}
          {title && <h2 className="text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">{title}</h2>}
          {description && <p className="mt-3 text-base leading-7 text-slate-600">{description}</p>}
        </div>
      )}
      {children}
    </section>
  );
}
