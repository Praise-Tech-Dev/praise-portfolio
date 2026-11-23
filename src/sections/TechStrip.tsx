import { heroStack } from "@/data/site";
import { TECH, TechIcon } from "@/lib/tech";

/** A slim snapshot only; the full picture is in About → Technical Expertise. */
export default function TechStrip() {
  return (
    <div className="border-y border-line bg-bg">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-5 py-5 sm:px-8 md:flex-row md:items-center md:gap-10">
        <p className="t-label shrink-0 text-muted">Tech Stack</p>
        <ul className="flex flex-wrap items-center gap-x-8 gap-y-3" aria-label="Main technologies">
          {heroStack.map((id) => (
            <li key={id} className="flex items-center gap-2.5 text-[0.9375rem] font-semibold">
              <TechIcon id={id} size={22} />
              {TECH[id].name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
