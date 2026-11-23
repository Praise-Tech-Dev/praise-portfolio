import type { Project } from "@/data/projects";
import { kindLabel } from "@/data/projects";
import { TechIcon, TECH } from "@/lib/tech";
import ProjectLinks from "./ProjectLinks";
import Reveal from "./Reveal";
import ShotPreview from "./ShotPreview";

/**
 * Compact entries for "More projects". Entries with a screenshot show it; text-only
 * entries (no screenshot) rely on a rule and typography instead of a placeholder box.
 */
export default function ProjectCompact({
  project, onOpenShot, className = "",
}: { project: Project; onOpenShot: (project: Project) => void; className?: string }) {
  return (
    <Reveal as="article" className={`flex flex-col border-t border-line pt-6 ${className}`}>
      {project.cover && (
        <div className="mb-5">
          <ShotPreview shot={project.cover} onOpen={() => onOpenShot(project)} ratio="aspect-[16/9]" />
        </div>
      )}
      <p className="t-label mb-2 text-muted">
        {kindLabel[project.kind]}{project.client ? ` · ${project.client}` : ""}
      </p>
      <h3 className="text-xl font-extrabold">{project.title}</h3>
      <p className="mt-1 text-sm text-muted">{project.status}</p>
      <p className="mt-3 text-[0.9375rem] leading-relaxed text-fg/85">{project.summary}</p>
      {project.note && <p className="mt-3 text-sm font-medium text-fg">{project.note}</p>}
      <ul className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2" aria-label="Technologies">
        {project.tech.map((t) => (
          <li key={t} className="inline-flex items-center gap-1.5 text-sm text-muted">
            <TechIcon id={t} size={16} /> {TECH[t].name}
          </li>
        ))}
      </ul>
      <div className="mt-5 pb-2"><ProjectLinks project={project} /></div>
    </Reveal>
  );
}
