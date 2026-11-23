import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import { experience } from "@/data/experience";
import { WaveEdge } from "@/components/Wave";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

export default function Experience() {
  return (
    <>
      <WaveEdge />
      <section id="experience" aria-labelledby="experience-title" className="scroll-mt-16 bg-alt pb-8 pt-4 sm:pb-12">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
          <SectionHeading id="experience-title" label="Experience" title="Professional experience">
            Internship work with real teams, listed newest first.
          </SectionHeading>

          <ol className="relative">
            {/* The vertical line; each entry hangs a marker off it. */}
            <span className="absolute bottom-2 left-[0.4375rem] top-2 w-px bg-line md:left-[calc(25%-0.625rem)]" aria-hidden="true" />
            {experience.map((e) => (
              <li key={e.company} className="relative pb-12 pl-9 last:pb-0 md:grid md:grid-cols-4 md:gap-10 md:pl-0">
                <span
                  className={`absolute left-0 top-1.5 size-4 rounded-full border-2 md:left-[calc(25%-1.125rem)] ${
                    e.current ? "border-accent bg-accent" : "border-accent bg-alt"
                  }`}
                  aria-hidden="true"
                />
                <div className="md:pr-8 md:text-right">
                  <p className="font-semibold">{e.period}</p>
                  <p className="text-sm text-muted">{e.location}</p>
                  {e.current && <p className="t-label mt-2 text-accent">Current</p>}
                </div>
                <Reveal as="article" className="mt-3 md:col-span-3 md:mt-0 md:pl-8">
                  <h3 className="t-sub">{e.role}</h3>
                  <p className="mt-1 font-semibold text-accent">
                    {e.company}
                    {e.subtitle && <span className="font-normal text-muted"> · {e.subtitle}</span>}
                  </p>
                  <ul className="mt-4 space-y-3 text-fg/85">
                    {e.points.map((pt) => (
                      <li key={pt} className="flex gap-3">
                        <span className="mt-[0.7rem] h-px w-3 shrink-0 bg-accent" aria-hidden="true" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                  {e.related && (
                    <Link to={e.related.to} className="link-inline mt-5 inline-flex items-center gap-2 text-sm">
                      {e.related.label} <FaArrowRight size={11} aria-hidden="true" />
                    </Link>
                  )}
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <WaveEdge flip />
    </>
  );
}
