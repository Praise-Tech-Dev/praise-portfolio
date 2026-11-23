import { Link } from "react-router-dom";
import { usePageMeta } from "@/hooks/usePageMeta";

export default function NotFound() {
  usePageMeta("Page not found");
  return (
    <section className="mx-auto w-full max-w-3xl px-5 py-28 sm:px-8">
      <p className="t-label mb-3 text-accent">404</p>
      <h1 className="t-title">That page doesn't exist</h1>
      <p className="mt-4 text-lg text-muted">The link may be old or mistyped.</p>
      <Link to="/" className="btn btn-primary mt-8">Back to the portfolio</Link>
    </section>
  );
}
