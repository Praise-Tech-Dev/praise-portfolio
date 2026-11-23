import { useState, type ReactNode } from "react";
import { Link, useParams } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { featuredProjects, getProject, kindLabel } from "@/data/projects";
import { usePageMeta } from "@/hooks/usePageMeta";
import { TechLabel } from "@/lib/tech";
import Lightbox from "@/components/Lightbox";
import ProjectLinks from "@/components/ProjectLinks";
import ShotPreview from "@/components/ShotPreview";
import NotFound from "./NotFound";

/** One editorial row: a small label on the left, the content on the right. */
function Part({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="grid gap-4 border-t border-line py-10 md:grid-cols-12 md:gap-10">
      <h2 className="t-label text-accent md:col-span-3">{title}</h2>
      <div className="md:col-span-9">{children}</div>
    </section>
  );
}

const Blocks = ({ items }: { items: { title: string; body: string }[] }) => (
  <dl className="space-y-5">
    {items.map((b) => (
      <div key={b.title}>
        <dt className="font-semibold">{b.title}</dt>
        <dd className="mt-1 text-fg/85">{b.body}</dd>
      </div>
    ))}
  </dl>
);

export default function CaseStudy() {
  const { slug = "" } = useParams();
  const project = getProject(slug);
  const [open, setOpen] = useState<number | null>(null);
  usePageMeta(project?.title, project?.summary);

  if (!project || !project.caseStudy) return <NotFound />;
  const cs = project.caseStudy;
  const gallery = project.gallery ?? [];

  const i = featuredProjects.findIndex((p) => p.slug === project.slug);
  const prev = featuredProjects[(i - 1 + featuredProjects.length) % featuredProjects.length];
  const next = featuredProjects[(i + 1) % featuredProjects.length];

  return (
    <article className="mx-auto w-full max-w-6xl px-5 pb-20 pt-8 sm:px-8 sm:pt-12">
      <Link to="/#projects" className="link-inline inline-flex items-center gap-2 text-sm">
        <FaArrowLeft size={11} aria-hidden="true" /> All projects
      </Link>

      <header className="mb-12 mt-8 max-w-3xl">
        <p className="t-label mb-3 text-accent">
          {kindLabel[project.kind]}{project.client ? ` · ${project.client}` : ""}
        </p>
        <h1 className="t-display">{project.title}</h1>
        <p className="mt-3 font-medium text-muted">{project.status}</p>
        <p className="mt-6 text-lg leading-relaxed text-fg/85">{project.summary}</p>
        <div className="mt-8"><ProjectLinks project={project} /></div>
      </header>

      {project.cover && (
        <div className="mb-14">
          <ShotPreview shot={project.cover} onOpen={() => setOpen(0)} ratio="aspect-[16/9]" priority />
        </div>
      )}

      <Part title="Overview">
        <div className="space-y-4 text-lg text-fg/85">{cs.overview.map((p) => <p key={p}>{p}</p>)}</div>
        <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2" aria-label="Technologies">
          {project.tech.map((t) => <li key={t}><TechLabel id={t} /></li>)}
        </ul>
      </Part>

      {cs.purpose && <Part title="Purpose"><p className="text-fg/85">{cs.purpose}</p></Part>}
      {cs.role && <Part title="My role"><p className="text-fg/85">{cs.role}</p></Part>}

      <Part title="Main features">
        <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
          {cs.features.map((f) => (
            <li key={f} className="flex gap-3 text-fg/85">
              <span className="mt-[0.7rem] h-px w-3 shrink-0 bg-accent" aria-hidden="true" />
              {f}
            </li>
          ))}
        </ul>
      </Part>

      <Part title="Technical implementation"><Blocks items={cs.implementation} /></Part>
      {cs.decisions && <Part title="Engineering decisions"><Blocks items={cs.decisions} /></Part>}
      {cs.challenges && <Part title="Challenges & lessons"><Blocks items={cs.challenges} /></Part>}

      {cs.notice && (
        <Part title="Demo access">
          <div className="rounded-lg border border-line bg-accent-soft p-5">
            <p className="font-semibold">{cs.notice.title}</p>
            <p className="mt-1 text-fg/85">{cs.notice.body}</p>
          </div>
        </Part>
      )}

      {gallery.length > 0 && (
        <Part title="Screenshots">
          <ul className="grid gap-6 sm:grid-cols-2">
            {gallery.map((s, idx) => (
              <li key={s.src}>
                <ShotPreview shot={s} onOpen={() => setOpen(idx)} />
                <p className="mt-2 text-sm text-muted">{s.caption}</p>
              </li>
            ))}
          </ul>
        </Part>
      )}

      {cs.next && <Part title="What's next"><p className="text-fg/85">{cs.next}</p></Part>}

      <nav aria-label="More case studies" className="grid gap-4 border-t border-line pt-10 sm:grid-cols-2">
        <Link to={`/projects/${prev.slug}`} className="group rounded-lg border border-line p-5 transition-colors hover:border-accent">
          <span className="t-label flex items-center gap-2 text-muted"><FaArrowLeft size={10} aria-hidden="true" /> Previous</span>
          <span className="mt-2 block font-display text-lg font-bold group-hover:text-accent">{prev.title}</span>
        </Link>
        <Link to={`/projects/${next.slug}`} className="group rounded-lg border border-line p-5 text-right transition-colors hover:border-accent">
          <span className="t-label flex items-center justify-end gap-2 text-muted">Next <FaArrowRight size={10} aria-hidden="true" /></span>
          <span className="mt-2 block font-display text-lg font-bold group-hover:text-accent">{next.title}</span>
        </Link>
      </nav>

      {open !== null && gallery.length > 0 && (
        <Lightbox shots={gallery} index={open} onIndex={setOpen} onClose={() => setOpen(null)} />
      )}
    </article>
  );
}
