import { Link } from "react-router-dom";
import { FaArrowRight, FaArrowUpRightFromSquare, FaGithub } from "react-icons/fa6";
import type { Project } from "@/data/projects";

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

/** Only renders the links a project actually has. */
export default function ProjectLinks({ project, caseStudy = false }: { project: Project; caseStudy?: boolean }) {
  const { links } = project;
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
      {caseStudy && project.caseStudy && (
        <Link to={`/projects/${project.slug}`} className="btn btn-primary">
          View Case Study <FaArrowRight size={12} aria-hidden="true" />
        </Link>
      )}
      {links.live && (
        <a href={links.live} {...ext} className="link-inline inline-flex items-center gap-2">
          Live Demo <FaArrowUpRightFromSquare size={12} aria-hidden="true" />
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      )}
      {links.docs && (
        <a href={links.docs} {...ext} className="link-inline inline-flex items-center gap-2">
          API Docs <FaArrowUpRightFromSquare size={12} aria-hidden="true" />
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      )}
      {links.code && (
        <a href={links.code} {...ext} className="link-inline inline-flex items-center gap-2">
          <FaGithub size={15} aria-hidden="true" /> Code
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      )}
    </div>
  );
}
