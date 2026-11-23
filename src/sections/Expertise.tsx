import { expertise } from "@/data/expertise";
import { TECH, TechIcon } from "@/lib/tech";
import Reveal from "@/components/Reveal";

/**
 * Three treatments on purpose, so the layout itself shows the weighting:
 * Frontend is large and filled, Backend is outlined, AI is lighter and dashed.
 */
export default function Expertise() {
  const [frontend, backend, ai] = expertise;
  return (
    <div>
      <h3 id="expertise-title" className="t-sub mb-2">Technical Expertise</h3>
      <p className="mb-8 max-w-2xl text-muted">
        Grouped by depth of experience, with frontend as the strongest area.
      </p>

      <div className="grid gap-5 lg:grid-cols-12">
        <Reveal className="rounded-xl bg-accent-soft p-6 sm:p-8 lg:col-span-7">
          <div className="mb-6 flex flex-wrap items-baseline justify-between gap-2">
            <h4 className="text-xl font-extrabold">{frontend.title}</h4>
            <span className="t-label text-accent">{frontend.level}</span>
          </div>
          <ul className="grid grid-cols-2 content-start gap-x-4 gap-y-8 sm:grid-cols-3">
            {frontend.items.map((id) => (
              <li key={id} className="flex items-center gap-3.5 text-base font-semibold">
                <TechIcon id={id} size={32} />
                {TECH[id].name}
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
          <Reveal delay={80} className="rounded-xl border border-line p-6">
            <div className="mb-1 flex flex-wrap items-baseline justify-between gap-2">
              <h4 className="text-lg font-bold">{backend.title}</h4>
              <span className="t-label text-muted">{backend.level}</span>
            </div>
            <p className="mb-4 text-sm text-muted">{backend.note}</p>
            <ul className="grid grid-cols-2 gap-x-3 gap-y-3">
              {backend.items.map((id) => (
                <li key={id} className="flex items-center gap-2.5 text-sm font-medium">
                  <TechIcon id={id} size={20} />
                  {TECH[id].name}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={160} className="rounded-xl border border-dashed border-line p-6">
            <div className="mb-1 flex flex-wrap items-baseline justify-between gap-2">
              <h4 className="text-lg font-bold">{ai.title}</h4>
              <span className="t-label text-muted">{ai.level}</span>
            </div>
            <p className="mb-4 text-sm text-muted">{ai.note}</p>
            <ul className="grid grid-cols-2 gap-x-3 gap-y-3">
              {ai.items.map((id) => (
                <li key={id} className="flex items-center gap-2.5 text-sm font-medium">
                  <TechIcon id={id} size={20} />
                  {TECH[id].name}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
