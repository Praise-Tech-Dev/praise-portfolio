import { useState } from "react";
import { featuredProjects, moreProjects, type Project } from "@/data/projects";
import Lightbox from "@/components/Lightbox";
import ProjectCompact from "@/components/ProjectCompact";
import ProjectRow from "@/components/ProjectRow";
import SectionHeading from "@/components/SectionHeading";

export default function Projects() {
  const [open, setOpen] = useState<{ project: Project; index: number } | null>(null);

  // A project's gallery if it has one, otherwise just its cover.
  const shotsOf = (p: Project) => p.gallery ?? (p.cover ? [p.cover] : []);
  const openShot = (p: Project) => setOpen({ project: p, index: 0 });

  return (
    <section id="projects" aria-labelledby="projects-title" className="scroll-mt-16 py-16 sm:py-24">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <SectionHeading id="projects-title" label="Projects" title="Selected work">
          Featured projects have their own case study. Professional work is labelled as such.
        </SectionHeading>

        <div className="space-y-20 sm:space-y-28">
          {featuredProjects.map((p, i) => (
            <ProjectRow key={p.slug} project={p} index={i} onOpenShot={openShot} />
          ))}
        </div>

        <h3 className="t-sub mb-8 mt-24 sm:mt-32">More projects</h3>
        {/* Uneven column widths on desktop keep this from reading as a grid of identical cards. */}
        <div className="grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-12">
          {moreProjects.map((p, i) => (
            <ProjectCompact
              key={p.slug}
              project={p}
              onOpenShot={openShot}
              className={[
                "lg:col-span-7",
                "lg:col-span-5",
                "lg:col-span-5",
                "lg:col-span-7",
              ][i % 4]}
            />
          ))}
        </div>
      </div>

      {open && (
        <Lightbox
          shots={shotsOf(open.project)}
          index={open.index}
          onIndex={(index) => setOpen({ ...open, index })}
          onClose={() => setOpen(null)}
        />
      )}
    </section>
  );
}
