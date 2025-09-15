import ContactForm from "@/app/components/ContactForm";
import { CONTACT } from "@/app/utils/constants";

export default function ContactSection() {
  return (
    <section id="contact" className="py-16 md:py-24 bg-gray-50 dark:bg-neutral-950/40">
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="text-2xl md:text-3xl font-bold">Contact</h2>
        <p className="mt-2 text-gray-600 dark:text-gray-300">Let's build something great together.</p>

        <div className="mt-8 grid grid-cols-1 gap-8">
          <ContactForm />
          <div className="text-sm text-gray-600 dark:text-gray-300">
            <p>
              Or reach me at <a className="underline" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            </p>
            <div className="mt-2 flex gap-4">
              <a className="underline" href={CONTACT.github} target="_blank">GitHub</a>
              <a className="underline" href={CONTACT.linkedin} target="_blank">LinkedIn</a>
              <a className="underline" href={CONTACT.twitter} target="_blank">Twitter</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


