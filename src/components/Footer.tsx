import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa6";
import { site } from "@/data/site";

const linkClass = "inline-flex size-11 items-center justify-center rounded-lg text-muted transition-colors hover:text-accent";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-bg">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-5 py-10 sm:px-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-lg font-extrabold">{site.name}</p>
          <p className="text-sm text-muted">{site.title} · {site.location}</p>
        </div>
        <ul className="flex items-center gap-1" aria-label="Social links">
          <li><a className={linkClass} href={site.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub (opens in a new tab)"><FaGithub size={20} aria-hidden="true" /></a></li>
          <li><a className={linkClass} href={site.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn (opens in a new tab)"><FaLinkedin size={20} aria-hidden="true" /></a></li>
          <li><a className={linkClass} href={`mailto:${site.email}`} aria-label="Email"><FaEnvelope size={19} aria-hidden="true" /></a></li>
        </ul>
        <p className="text-sm text-muted">© {new Date().getFullYear()} {site.name}</p>
      </div>
    </footer>
  );
}
