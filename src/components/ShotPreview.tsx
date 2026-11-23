import { FaExpand } from "react-icons/fa6";
import type { Shot } from "@/data/projects";

/**
 * A fixed-ratio frame that crops a screenshot from the top. It is a real button:
 * tapping or pressing Enter opens the larger view. There is no hover-scrolling,
 * so it never interferes with scrolling the page on touch screens.
 */
export default function ShotPreview({
  shot, onOpen, ratio = "aspect-[16/10]", priority = false,
}: { shot: Shot; onOpen: () => void; ratio?: string; priority?: boolean }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`View larger screenshot: ${shot.caption}`}
      className={`group relative block w-full cursor-zoom-in overflow-hidden rounded-lg border border-line bg-surface ${ratio}`}
    >
      <img
        src={shot.src}
        alt={shot.alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className="size-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.015]"
      />
      <span className="absolute bottom-2 right-2 inline-flex items-center gap-1.5 rounded-md bg-bg px-2.5 py-1 text-xs font-semibold text-fg shadow-sm">
        <FaExpand size={11} aria-hidden="true" /> Enlarge
      </span>
    </button>
  );
}

/** Shown when a project has no screenshot, instead of inventing one. */
export function NoPreview({ title, ratio = "aspect-[16/10]" }: { title: string; ratio?: string }) {
  return (
    <div className={`flex items-end rounded-lg border border-dashed border-line bg-alt p-5 ${ratio}`}>
      <p className="text-sm text-muted">
        <span className="block font-display font-bold text-fg">{title}</span>
        No screenshot available for this project.
      </p>
    </div>
  );
}
