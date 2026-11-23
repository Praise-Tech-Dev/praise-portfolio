import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { scrollToSection } from "@/lib/scroll";

/**
 * A single-page app does not reset scroll when the route changes, so this does:
 * - route with a #hash (e.g. /#projects): scroll to that section once it exists
 * - any other route change: jump to the top
 */
export default function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.slice(1);
      const frame = requestAnimationFrame(() => {
        if (!scrollToSection(id)) window.scrollTo({ top: 0 });
      });
      return () => cancelAnimationFrame(frame);
    }
    window.scrollTo({ top: 0 });
  }, [pathname, hash]);

  return null;
}
