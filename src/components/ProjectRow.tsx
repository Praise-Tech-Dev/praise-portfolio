import type { Project } from "@/data/projects";
import { kindLabel } from "@/data/projects";
import { TechLabel } from "@/lib/tech";
import ProjectLinks from "./ProjectLinks";
import Reveal from "./Reveal";
import ShotPreview, { NoPreview } from "./ShotPreview";

/**
 * A featured project. On desktop the preview alternates sides (odd rows flip);
 * on mobile it is always preview first, then text, in a single column.
 */
export default function ProjectRow({
  project, index, onOpenShot,
}: { project: Project; index: number; onOpenShot: (project: Project) => void }) {
  const flip = index % 2 === 1;
  const professional = project.kind === "professional";

  return (
    <Reveal as="article" className="grid items-center gap-8 lg:grid-cols-12 lg:gap-14">
      <div className={`lg:col-span-7 ${flip ? "lg:order-2" : ""}`}>
        {project.cover ? (
          <ShotPreview shot={project.cover} onOpen={() => onOpenShot(project)} priority={index === 0} />
        ) : (
          <NoPreview title={project.title} />
        )}
      </div>

      <div className={`lg:col-span-5 ${flip ? "lg:order-1" : ""}`}>
        <p className="t-label mb-3 flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="text-muted">{String(index + 1).padStart(2, "0")}</span>
          <span className={professional ? "text-accent-2" : "text-accent"}>
            {professional && project.client ? `${kindLabel[project.kind]} · ${project.client}` : kindLabel[project.kind]}
          </span>
        </p>
        <h3 className="t-sub">{project.title}</h3>
        <p className="mt-1 text-sm font-medium text-muted">{project.status}</p>
        <p className="mt-4 leading-relaxed text-fg/85">{project.summary}</p>
        <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2" aria-label="Technologies">
          {project.tech.map((t) => <li key={t}><TechLabel id={t} /></li>)}
        </ul>
        <div className="mt-7"><ProjectLinks project={project} caseStudy /></div>
      </div>
    </Reveal>
  );
}
