import { site } from "@/data/site";
import { img } from "@/data/images";
import Reveal from "@/components/Reveal";
import Expertise from "./Expertise";
import Credentials from "./Credentials";

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="scroll-mt-16 py-16 sm:py-24">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="mx-auto w-full max-w-sm lg:col-span-5 lg:max-w-none">
            <div className="aspect-[4/5] overflow-hidden rounded-[1.75rem] border border-line bg-alt">
              <img
                src={img.profileAbout}
                alt="Praise Adeogun smiling, wearing glasses and a pearl necklace"
                width={865}
                height={731}
                loading="lazy"
                className="size-full object-cover object-[45%_30%]"
              />
            </div>
          </Reveal>

          <Reveal className="lg:col-span-7" delay={80}>
            <p className="t-label mb-3 text-accent">About me</p>
            <h2 id="about-title" className="sr-only">About me</h2>
            <div className="space-y-5 text-lg leading-relaxed text-fg/85">
              {site.about.map((p) => <p key={p}>{p}</p>)}
            </div>
          </Reveal>
        </div>

        <div className="mt-20 sm:mt-28"><Expertise /></div>
        <div className="mt-20 sm:mt-28"><Credentials /></div>
      </div>
    </section>
  );
}
