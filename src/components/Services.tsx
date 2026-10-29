import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/Shared";
import { SERVICES } from "@/lib/site";
import {
  Code2,
  Globe,
  Layout,
  MousePointerClick,
  RefreshCw,
  Wrench,
  type LucideIcon,
} from "lucide-react";

const ICONS: LucideIcon[] = [
  Code2,
  Globe,
  Layout,
  MousePointerClick,
  RefreshCw,
  Wrench,
];

export function Services() {
  return (
    <section id="services" className="relative py-24 sm:py-32">
      <div className="grid-overlay-light absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            kicker="Services"
            title={
              <>
                Everything you need to build your{" "}
                <span className="bg-sun px-2 text-teal-dark">
                  digital presence.
                </span>
              </>
            }
            description="Design, development and ongoing care — one team for the whole journey of your website."
          />
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => {
            const Icon = ICONS[i % ICONS.length] ?? Code2;
            const dark = i % 2 === 1;
            return (
              <Reveal key={service.title} delay={(i % 3) * 0.08}>
                <a
                  href="#contact"
                  className={`group relative flex h-full flex-col rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1.5 ${
                    dark
                      ? "bg-teal text-white shadow-card hover:shadow-card-hover"
                      : "bg-card text-teal-dark shadow-card hover:shadow-card-hover"
                  }`}
                >
                  <span
                    className={`grid size-12 place-items-center rounded-xl transition-transform duration-300 group-hover:scale-110 ${
                      dark ? "bg-sun/15 text-sun" : "bg-teal/10 text-teal"
                    }`}
                  >
                    <Icon className="size-6" />
                  </span>
                  <h3 className="headline-md mt-5">{service.title}</h3>
                  <p
                    className={`mt-3 flex-1 text-sm leading-relaxed ${
                      dark ? "text-white/70" : "text-ink-muted"
                    }`}
                  >
                    {service.description}
                  </p>
                  <span
                    className={`mt-6 inline-flex items-center gap-2 text-sm font-bold ${
                      dark ? "text-sun" : "text-teal"
                    }`}
                  >
                    Start a project
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                  {dark && (
                    <CheckCircle2
                      aria-hidden="true"
                      className="absolute right-6 top-6 size-5 text-sun/50"
                    />
                  )}
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
