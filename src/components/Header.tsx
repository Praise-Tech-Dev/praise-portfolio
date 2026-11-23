import { useEffect, useRef, useState, type MouseEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaXmark } from "react-icons/fa6";
import { navItems, site } from "@/data/site";
import { useActiveSection } from "@/hooks/useActiveSection";
import { scrollToSection } from "@/lib/scroll";
import ThemeToggle from "./ThemeToggle";

const sectionIds = navItems.map((n) => n.id);

export default function Header() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const onHome = pathname === "/";
  const activeOnHome = useActiveSection(sectionIds, onHome);
  // On a case-study page the "Projects" link stays highlighted.
  const current = onHome ? activeOnHome : pathname.startsWith("/projects") ? "projects" : "";

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mobile menu: Esc closes it and returns focus to the button; it also closes
  // if the window grows to the desktop layout.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(false); menuButton.current?.focus(); }
    };
    const mq = window.matchMedia("(min-width: 1024px)");
    const onResize = () => mq.matches && setOpen(false);
    document.addEventListener("keydown", onKey);
    mq.addEventListener("change", onResize);
    return () => { document.removeEventListener("keydown", onKey); mq.removeEventListener("change", onResize); };
  }, [open]);

  const href = (id: string) => (id === "home" ? "/" : `/#${id}`);

  const goTo = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return; // keep "open in new tab" working
    e.preventDefault();
    setOpen(false);
    if (onHome) {
      scrollToSection(id);
      window.history.replaceState(null, "", href(id));
    } else {
      navigate(id === "home" ? "/" : { pathname: "/", hash: `#${id}` });
    }
  };

  const linkClass = (id: string) =>
    `relative py-2 text-[0.9375rem] font-medium transition-colors hover:text-fg ${
      current === id ? "text-fg" : "text-muted"
    }`;

  return (
    <header
      className={`sticky top-0 z-40 border-b bg-bg transition-colors ${scrolled || open ? "border-line" : "border-transparent"}`}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link
          to="/"
          onClick={(e) => goTo(e, "home")}
          className="font-display text-lg font-extrabold tracking-tight"
          aria-label={`${site.name}, home`}
        >
          Praise<span className="text-accent"> Adeogun</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          {navItems.map((n) => (
            <a
              key={n.id}
              href={href(n.id)}
              onClick={(e) => goTo(e, n.id)}
              aria-current={current === n.id ? "location" : undefined}
              className={linkClass(n.id)}
            >
              {n.label}
              {current === n.id && (
                <span className="absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-accent" aria-hidden="true" />
              )}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <a
            href={site.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost hidden min-h-10 px-4 sm:inline-flex"
          >
            Resume
          </a>
          <ThemeToggle />
          <button
            ref={menuButton}
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-lg text-fg lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <FaXmark size={20} aria-hidden="true" /> : <FaBars size={20} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="absolute inset-x-0 top-full max-h-[calc(100dvh-4rem)] overflow-y-auto border-b border-line bg-bg lg:hidden"
        >
          <ul className="mx-auto max-w-6xl px-5 py-3 sm:px-8">
            {navItems.map((n) => (
              <li key={n.id} className="border-b border-line last:border-0">
                <a
                  href={href(n.id)}
                  onClick={(e) => goTo(e, n.id)}
                  aria-current={current === n.id ? "location" : undefined}
                  className={`flex min-h-12 items-center justify-between text-lg font-semibold ${
                    current === n.id ? "text-accent" : "text-fg"
                  }`}
                >
                  {n.label}
                </a>
              </li>
            ))}
            <li className="py-4">
              <a href={site.resumeUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary w-full">
                Resume
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
