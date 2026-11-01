import { ArrowRight, MessageCircle } from "lucide-react";
import { Reveal } from "@/components/Shared";
import { whatsappUrl } from "@/lib/site";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-24 lg:py-28" aria-label="Start your project">
      {/* Sits over the global ambient background */}
      <div className="grid-overlay absolute inset-0" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="float-slow absolute left-[8%] top-10 size-40 rotate-12 rounded-2xl bg-sun/10 blur-xl pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="float-slower absolute bottom-10 right-[10%] size-56 rounded-full bg-sun/10 blur-2xl pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-sun/40 to-transparent"
      />

      <div className="relative mx-auto max-w-4xl px-6 text-center sm:px-8">
        <Reveal>
          <span className="sun-rule mx-auto" />
          <h2 className="headline-lg mt-6 text-white">
            Your next website{" "}
            <span className="text-sun">starts here.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[16.5px] leading-relaxed text-[#AFC2BE]">
            Tell us about your business. We&apos;ll help you find the right
            website solution.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a href="#contact" className="btn-sun">
              Start Your Project
              <ArrowRight className="size-4" />
            </a>
            <a
              href={whatsappUrl(
                "Hello LIWEB Solutions, I would like to discuss building a website for my business."
              )}
              target="_blank"
              rel="noreferrer"
              className="btn-ghost-light"
            >
              <MessageCircle className="size-4" />
              Chat on WhatsApp
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}