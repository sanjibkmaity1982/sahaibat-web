export function Section({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="py-10">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        {subtitle ? (
          <p className="mt-2 max-w-2xl text-slate-600">{subtitle}</p>
        ) : null}
      </div>
      {children}
    </section>
  );
}

