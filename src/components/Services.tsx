import { ArrowRight, Code2, Globe, Layout, MousePointerClick, RefreshCw, Wrench, type LucideIcon } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/Shared";
import { SERVICES } from "@/lib/site";

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
    <section id="services" className="relative py-20 sm:py-24 lg:py-28">
      <div className="grid-overlay-light absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto max-w-[1280px] px-6 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            tone="dark"
            kicker="Services"
            title={
              <>
                Everything you need to build your{" "}
                <span className="bg-[#FFDF59] px-2 text-[#0B3032]">
                  digital presence.
                </span>
              </>
            }
            description="Design, development and ongoing care — one team for the whole journey of your website."
          />
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => {
            const Icon = ICONS[i % ICONS.length] ?? Code2;
            return (
              <Reveal key={service.title} delay={(i % 3) * 0.08}>
                <a
                  href="#contact"
                  className="group relative flex h-full flex-col justify-between rounded-xl border border-[#D8E2DF]/80 bg-white p-7 text-[#0B3032] shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:border-[#FFDF59] hover:shadow-card-hover"
                >
                  <div>
                    <span className="grid size-12 place-items-center rounded-xl bg-[#073638]/5 text-[#073638] transition-all duration-300 group-hover:bg-[#FFDF59] group-hover:text-[#0B3032] group-hover:scale-105">
                      <Icon className="size-5" />
                    </span>
                    <h3 className="headline-md mt-5 text-[1.25rem] font-bold text-[#0B3032] transition-colors group-hover:text-[#073638]">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-[#536461]">
                      {service.description}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center gap-2 border-t border-[#EBF0ED] pt-4 text-sm font-semibold text-[#073638] transition-colors group-hover:text-[#0B3032]">
                    <span>Start a project</span>
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}