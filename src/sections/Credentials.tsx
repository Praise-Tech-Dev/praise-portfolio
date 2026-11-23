import { certifications, education, leadership, recognition } from "@/data/education";

/** Education, recognition, leadership and certifications as ruled lists rather than cards. */
export default function Credentials() {
  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
      <div className="lg:col-span-5">
        <h3 className="t-sub mb-6">Education</h3>
        <div className="border-t border-line pt-5">
          <p className="font-display text-xl font-extrabold">{education.school}</p>
          <p className="mt-1 text-fg">{education.degree}</p>
          <p className="mt-1 text-sm text-muted">{education.period}</p>
          <p className="mt-3 text-sm">
            <span className="text-muted">GPA </span>
            <span className="font-semibold">{education.gpa}</span>
          </p>
        </div>

        <h3 className="t-sub mb-6 mt-12">Recognition</h3>
        <ul className="border-t border-line">
          {recognition.map((r) => (
            <li key={r} className="border-b border-line py-3 text-[0.9375rem]">{r}</li>
          ))}
        </ul>
      </div>

      <div className="lg:col-span-7">
        <h3 className="t-sub mb-6">Certifications &amp; training</h3>
        <ul className="border-t border-line">
          {certifications.map((c) => (
            <li key={c.title} className="grid gap-1 border-b border-line py-4 sm:grid-cols-[1fr_auto] sm:gap-6">
              <div>
                <p className="font-semibold">{c.title}</p>
                <p className="text-sm text-muted">{c.issuer}</p>
              </div>
              <p className="text-sm text-muted sm:text-right">{c.date}</p>
            </li>
          ))}
        </ul>

        <h3 className="t-sub mb-6 mt-12">Leadership</h3>
        <ul className="border-t border-line">
          {leadership.map((l) => (
            <li key={l.role} className="border-b border-line py-4">
              <p className="font-semibold">{l.role}</p>
              <p className="text-sm text-muted">{l.detail}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
