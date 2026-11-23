import { useEffect } from "react";

const DEFAULT_TITLE = "Praise Adeogun — Frontend-Focused Software Engineer";

/** Sets the tab title (and description) for the current page, restoring on leave. */
export function usePageMeta(title?: string, description?: string) {
  useEffect(() => {
    document.title = title ? `${title} · Praise Adeogun` : DEFAULT_TITLE;
    const meta = document.querySelector('meta[name="description"]');
    const previous = meta?.getAttribute("content") ?? "";
    if (description) meta?.setAttribute("content", description);
    return () => {
      document.title = DEFAULT_TITLE;
      meta?.setAttribute("content", previous);
    };
  }, [title, description]);
}
