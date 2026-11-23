import { useEffect, useRef, useState, type FormEvent } from "react";
import emailjs from "@emailjs/browser";
import { FaCircleCheck, FaTriangleExclamation } from "react-icons/fa6";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+]?[\d\s\-().]{7,15}$/;

type Errors = { name?: string; contact?: string; message?: string };
type Notice = { kind: "success" | "error"; text: string } | null;

const field =
  "mt-2 w-full rounded-lg border bg-surface px-4 py-3 text-fg placeholder:text-muted/70 transition-colors focus-visible:border-accent";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [notice, setNotice] = useState<Notice>(null);
  const honeypot = useRef<HTMLInputElement>(null);

  // The notice doubles as the toast and as a polite live-region announcement.
  useEffect(() => {
    if (!notice) return;
    const t = window.setTimeout(() => setNotice(null), 6000);
    return () => window.clearTimeout(t);
  }, [notice]);

  const validate = (): Errors => {
    const next: Errors = {};
    if (!name.trim()) next.name = "Please enter your name.";
    if (!EMAIL_RE.test(contact.trim()) && !PHONE_RE.test(contact.trim())) {
      next.contact = "Please enter a valid email address or phone number.";
    }
    if (!message.trim()) next.message = "Please write a message.";
    return next;
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (honeypot.current?.value) return; // a bot filled the hidden field: silently ignore
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length) return;

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      setNotice({ kind: "error", text: "The contact form isn't configured yet. Please email me directly instead." });
      return;
    }

    setSending(true);
    try {
      // Same three template fields the original form used: name, email, message.
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, { name, email: contact, message }, PUBLIC_KEY);
      setNotice({ kind: "success", text: "Message sent! I'll get back to you soon." });
      setName(""); setContact(""); setMessage(""); setErrors({});
    } catch {
      setNotice({ kind: "error", text: "Something went wrong. Please try again, or email me directly." });
    } finally {
      setSending(false);
    }
  };

  const border = (bad?: string) => (bad ? "border-red-600 dark:border-red-400" : "border-line");
  const errClass = "mt-1.5 text-sm font-medium text-red-700 dark:text-red-300";

  return (
    <>
      <form onSubmit={onSubmit} noValidate className="space-y-6">
        {/* Hidden from people; bots tend to fill every input. */}
        <div className="absolute -left-[9999px]" aria-hidden="true">
          <label>Leave this empty<input ref={honeypot} type="text" name="website" tabIndex={-1} autoComplete="off" /></label>
        </div>

        <div>
          <label htmlFor="cf-name" className="font-semibold">Your name</label>
          <input
            id="cf-name" name="name" type="text" autoComplete="name" value={name}
            onChange={(e) => setName(e.target.value)}
            aria-invalid={!!errors.name} aria-describedby={errors.name ? "cf-name-err" : undefined}
            placeholder="What's your name?" className={`${field} ${border(errors.name)}`}
          />
          {errors.name && <p id="cf-name-err" className={errClass}>{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="cf-contact" className="font-semibold">Email or phone</label>
          <input
            id="cf-contact" name="contact" type="text" inputMode="email" autoComplete="email" value={contact}
            onChange={(e) => setContact(e.target.value)}
            aria-invalid={!!errors.contact} aria-describedby={errors.contact ? "cf-contact-err" : undefined}
            placeholder="How can I reach you?" className={`${field} ${border(errors.contact)}`}
          />
          {errors.contact && <p id="cf-contact-err" className={errClass}>{errors.contact}</p>}
        </div>

        <div>
          <label htmlFor="cf-message" className="font-semibold">Message</label>
          <textarea
            id="cf-message" name="message" rows={7} maxLength={3000} value={message}
            onChange={(e) => setMessage(e.target.value)}
            aria-invalid={!!errors.message} aria-describedby={errors.message ? "cf-message-err" : undefined}
            placeholder="Send me any inquiries or questions" className={`${field} resize-y ${border(errors.message)}`}
          />
          {errors.message && <p id="cf-message-err" className={errClass}>{errors.message}</p>}
        </div>

        <button type="submit" disabled={sending} className="btn btn-primary w-full sm:w-auto disabled:opacity-60">
          {sending ? "Sending…" : "Send message"}
        </button>
      </form>

      {/* Toast: fixed to the corner, announced to screen readers, dismissed automatically. */}
      <div className="pointer-events-none fixed inset-x-4 bottom-4 z-50 flex justify-end sm:inset-x-auto sm:right-6 sm:bottom-6" role="status" aria-live="polite">
        {notice && (
          <div className="toast pointer-events-auto flex max-w-sm items-start gap-3 rounded-lg border border-line bg-surface px-4 py-3 text-sm shadow-lg">
            {notice.kind === "success"
              ? <FaCircleCheck className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
              : <FaTriangleExclamation className="mt-0.5 shrink-0 text-red-600 dark:text-red-400" aria-hidden="true" />}
            <p>{notice.text}</p>
            <button type="button" onClick={() => setNotice(null)} className="-my-1 -mr-2 px-2 text-muted hover:text-fg" aria-label="Dismiss message">×</button>
          </div>
        )}
      </div>
    </>
  );
}
