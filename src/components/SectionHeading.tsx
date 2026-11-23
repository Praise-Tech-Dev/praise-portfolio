import type { ReactNode } from "react";

export default function SectionHeading({
  label, title, children, id,
}: { label: string; title: string; children?: ReactNode; id?: string }) {
  return (
    <div className="mb-10 max-w-2xl sm:mb-14">
      <p className="t-label mb-3 text-accent">{label}</p>
      <h2 id={id} className="t-title">{title}</h2>
      {children && <p className="mt-4 text-lg text-muted">{children}</p>}
    </div>
  );
}
