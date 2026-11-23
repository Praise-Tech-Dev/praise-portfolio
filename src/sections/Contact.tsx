import { FaEnvelope, FaGithub, FaLinkedin, FaLocationDot, FaPhone } from "react-icons/fa6";
import { site } from "@/data/site";
import ContactForm from "@/components/ContactForm";
import { WaveEdge } from "@/components/Wave";
import SectionHeading from "@/components/SectionHeading";

const row = "flex items-start gap-4 border-b border-line py-4";
const iconBox = "mt-1 text-accent";

export default function Contact() {
  return (
    <>
      <WaveEdge />
      <section id="contact" aria-labelledby="contact-title" className="scroll-mt-16 bg-alt pb-16 pt-4 sm:pb-24">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
          <SectionHeading id="contact-title" label="Contact" title="Get in touch">
            Questions, internship opportunities or feedback on my work are all welcome.
          </SectionHeading>

          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <dl className="border-t border-line lg:col-span-5">
              <div className={row}>
                <dt className={iconBox}><FaEnvelope aria-hidden="true" /><span className="sr-only">Email</span></dt>
                <dd><a className="link-inline break-all" href={`mailto:${site.email}`}>{site.email}</a></dd>
              </div>
              <div className={row}>
                <dt className={iconBox}><FaPhone aria-hidden="true" /><span className="sr-only">Phone</span></dt>
                <dd><a className="link-inline" href={site.phoneHref}>{site.phone}</a></dd>
              </div>
              <div className={row}>
                <dt className={iconBox}><FaLocationDot aria-hidden="true" /><span className="sr-only">Location</span></dt>
                <dd>{site.location}</dd>
              </div>
              <div className={row}>
                <dt className={iconBox}><FaGithub aria-hidden="true" /><span className="sr-only">GitHub</span></dt>
                <dd><a className="link-inline break-all" href={site.github} target="_blank" rel="noopener noreferrer">github.com/Praise-Tech-Dev</a></dd>
              </div>
              <div className={row}>
                <dt className={iconBox}><FaLinkedin aria-hidden="true" /><span className="sr-only">LinkedIn</span></dt>
                <dd><a className="link-inline" href={site.linkedin} target="_blank" rel="noopener noreferrer">Praise Adeogun on LinkedIn</a></dd>
              </div>
            </dl>

            <div className="lg:col-span-7"><ContactForm /></div>
          </div>
        </div>
      </section>
    </>
  );
}
