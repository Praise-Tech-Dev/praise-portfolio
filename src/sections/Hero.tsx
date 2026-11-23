import type { CSSProperties } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { site } from "@/data/site";
import { img } from "@/data/images";
import { WaveRibbon } from "@/components/Wave";

const iconLink =
  "inline-flex size-11 items-center justify-center rounded-lg border border-line text-fg transition-colors hover:border-accent hover:text-accent";

export default function Hero() {
  return (
    <section id="home" aria-labelledby="hero-title" className="relative scroll-mt-16 overflow-hidden">
      {/* Decorative ribbon: anchored to the bottom and faded at the top so it never runs under the text. */}
      <WaveRibbon className="pointer-events-none absolute inset-x-0 bottom-0 h-36 w-full [mask-image:linear-gradient(to_bottom,transparent,black_60%)] sm:h-1/3 lg:h-2/5" />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-10 px-5 pb-40 pt-10 sm:px-8 sm:pb-24 sm:pt-14 lg:grid-cols-12 lg:gap-14 lg:pb-28 lg:pt-20">
        {/* Portrait in an asymmetric arch: a full semicircle on top, three different corners below. */}
        <div className="rise relative mx-auto w-48 sm:w-64 lg:col-span-5 lg:w-full lg:max-w-sm" style={{ "--i": 0 } as CSSProperties}>
          <div
            className="absolute inset-0 translate-x-3 translate-y-3 rounded-t-[999px] rounded-bl-[3rem] rounded-br-md border-2 border-accent-2 sm:translate-x-4 sm:translate-y-4"
            aria-hidden="true"
          />
          <div className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-bl-[3rem] rounded-br-md bg-accent-soft">
            <img
              src={img.profileHero}
              alt="Portrait of Praise Adeogun"
              width={537}
              height={671}
              className="size-full object-cover object-[50%_30%]"
            />
          </div>
        </div>

        <div className="lg:col-span-7">
          <p className="rise t-label mb-4 text-accent" style={{ "--i": 1 } as CSSProperties}>
            {site.title}
          </p>
          <h1 id="hero-title" className="rise t-display" style={{ "--i": 2 } as CSSProperties}>
            {site.name}
          </h1>
          <p className="rise mt-6 max-w-xl text-lg leading-relaxed text-muted" style={{ "--i": 3 } as CSSProperties}>
            {site.intro}
          </p>
          <div className="rise mt-8 flex flex-wrap items-center gap-3" style={{ "--i": 4 } as CSSProperties}>
            <a href={site.resumeUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              Resume
            </a>
            <a href={site.github} target="_blank" rel="noopener noreferrer" className={iconLink} aria-label="GitHub (opens in a new tab)">
              <FaGithub size={20} aria-hidden="true" />
            </a>
            <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className={iconLink} aria-label="LinkedIn (opens in a new tab)">
              <FaLinkedin size={20} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
