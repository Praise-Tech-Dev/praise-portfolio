import { useEffect, useRef } from "react";
import { FaChevronLeft, FaChevronRight, FaXmark } from "react-icons/fa6";
import type { Shot } from "@/data/projects";

/**
 * Built on the native <dialog> element: showModal() gives us the focus trap,
 * Esc-to-close, the backdrop, and focus returning to the button that opened it.
 * Tall screenshots scroll inside the frame instead of being squashed.
 */
export default function Lightbox({
  shots, index, onClose, onIndex,
}: { shots: Shot[]; index: number; onClose: () => void; onIndex: (i: number) => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const shot = shots[index];
  const many = shots.length > 1;

  useEffect(() => {
    const dialog = ref.current;
    if (dialog && !dialog.open) dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const step = (d: number) => onIndex((index + d + shots.length) % shots.length);

  return (
    <dialog
      ref={ref}
      aria-label={`Screenshot ${index + 1} of ${shots.length}`}
      onClose={onClose}
      onClick={(e) => { if (e.target === ref.current) ref.current?.close(); }}
      onKeyDown={(e) => {
        if (!many) return;
        if (e.key === "ArrowRight") step(1);
        if (e.key === "ArrowLeft") step(-1);
      }}
      className="m-auto max-h-[94dvh] w-[min(96vw,1180px)] flex-col rounded-lg border border-line bg-surface p-0 text-fg backdrop:bg-black/75 open:flex"
    >
      <div className="flex items-start justify-between gap-4 border-b border-line px-4 py-3 sm:px-5">
        <p className="text-sm text-muted">
          <span className="font-semibold text-fg">{index + 1} / {shots.length}</span> · {shot.caption}
        </p>
        <button
          type="button"
          onClick={() => ref.current?.close()}
          aria-label="Close screenshot"
          className="-mr-2 -mt-1 inline-flex size-10 shrink-0 items-center justify-center rounded-lg text-fg hover:text-accent"
        >
          <FaXmark size={18} aria-hidden="true" />
        </button>
      </div>

      <div className="min-h-0 flex-1 overflow-auto bg-alt">
        <img src={shot.src} alt={shot.alt} className="mx-auto block h-auto w-full max-w-full" />
      </div>

      {many && (
        <div className="flex items-center justify-between border-t border-line px-4 py-3 sm:px-5">
          <button type="button" onClick={() => step(-1)} className="btn btn-ghost min-h-10">
            <FaChevronLeft size={12} aria-hidden="true" /> Previous
          </button>
          <button type="button" onClick={() => step(1)} className="btn btn-ghost min-h-10">
            Next <FaChevronRight size={12} aria-hidden="true" />
          </button>
        </div>
      )}
    </dialog>
  );
}
