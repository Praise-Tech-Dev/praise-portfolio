import { useEffect, useRef, type ElementType, type ReactNode } from "react";

/**
 * Fades content up once as it enters the viewport. Without JavaScript, or with
 * reduced motion, the content is simply visible (see .reveal in index.css).
 */
export default function Reveal({
  as: Tag = "div", className = "", children, delay = 0,
}: { as?: ElementType; className?: string; children: ReactNode; delay?: number }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) { el.dataset.in = "true"; return; }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { el.dataset.in = "true"; io.disconnect(); }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={`reveal ${className}`} style={delay ? { transitionDelay: `${delay}ms` } : undefined}>
      {children}
    </Tag>
  );
}
