import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { BrowserMockup } from "@/components/BrowserMockup";
import { Reveal, SectionHeading } from "@/components/Shared";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

import imgConsulting from "@/assets/work-consulting.jpg";
import imgRestaurant from "@/assets/work-restaurant.jpg";
import imgFitness from "@/assets/work-fitness.jpg";
import imgEcommerce from "@/assets/work-ecommerce.jpg";
import imgPortfolio from "@/assets/work-portfolio.jpg";
import imgSalon from "@/assets/work-salon.jpg";

const CATEGORIES = [
  "All",
  "Business",
  "Restaurants & Hospitality",
  "Fitness & Wellness",
  "E-commerce",
  "Creative Portfolio",
  "Service Business",
] as const;

const PROJECTS = [
  {
    title: "SummitPoint Consulting",
    category: "Business",
    image: imgConsulting,
    url: "summitpoint-consulting.in",
    description:
      "Corporate website with lead-focused service pages and enquiry flows.",
    tags: ["Responsive", "Lead generation"],
  },
  {
    title: "Vela Restaurant & Bar",
    category: "Restaurants & Hospitality",
    image: imgRestaurant,
    url: "velarestaurant.in",
    description:
      "Elegant dining site with menu showcase and reservation calls-to-action.",
    tags: ["Menu design", "Reservations"],
  },
  {
    title: "FuelFit Studio",
    category: "Fitness & Wellness",
    image: imgFitness,
    url: "fuelfitstudio.in",
    description:
      "High-energy gym website with class schedules and membership sign-up.",
    tags: ["Class booking", "Bold UI"],
  },
  {
    title: "Velora Fashion Store",
    category: "E-commerce",
    image: imgEcommerce,
    url: "velorafashion.in",
    description:
      "Online store with product catalogue, collections and shopping flows.",
    tags: ["Product grid", "Storefront"],
  },
  {
    title: "Alex Rivera — Designer",
    category: "Creative Portfolio",
    image: imgPortfolio,
    url: "alexrivera.design",
    description:
      "Portfolio for a creative professional with project gallery and journal.",
    tags: ["Gallery", "Personal brand"],
  },
  {
    title: "Serenity Salon & Spa",
    category: "Service Business",
    image: imgSalon,
    url: "serenityspa.in",
    description:
      "Calm, premium salon site with treatment menu and appointment booking.",
    tags: ["Appointments", "Pricing menu"],
  },
] as const;

export function Portfolio() {
  const [active, setActive] = useState<(typeof CATEGORIES)[number]>("All");
  const visible =
    active === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === active);

  return (
    <section id="work" className="relative py-20 sm:py-24 lg:py-28">
      <div className="relative mx-auto max-w-[1280px] px-6 sm:px-8">
        <SectionHeading
          tone="dark"
          kicker="Our work"
          title={
            <>
              Digital experiences{" "}
              <span className="bg-[#FFDF59] px-2 text-[#0B3032]">
                we&apos;ve designed.
              </span>
            </>
          }
          description="Concept projects that show the quality bar we build to — from corporate sites to online stores."
        />

        {/* Category filter pills */}
        <Reveal className="mt-10 flex flex-wrap gap-2.5" delay={0.1}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActive(cat)}
              aria-pressed={active === cat}
              className={cn(
                "rounded-xl border px-4 py-2 text-xs font-semibold transition-all sm:text-sm",
                active === cat
                  ? "border-[#073638] bg-[#073638] text-[#FFDF59] shadow-sm"
                  : "border-[#D8E2DF] bg-white text-[#0B3032] hover:border-[#073638]/40 hover:bg-[#F6F8F5]"
              )}
            >
              {cat}
            </button>
          ))}
        </Reveal>

        {/* Portfolio Grid */}
        <motion.div layout className="mt-12 grid gap-8 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {visible.map((project) => (
              <motion.article
                layout
                key={project.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="group flex flex-col justify-between rounded-2xl border border-[#D8E2DF] bg-white p-5 shadow-card transition-all duration-300 hover:shadow-card-hover hover:border-[#073638]/30"
              >
                <div>
                  <div className="overflow-hidden rounded-xl">
                    <BrowserMockup
                      url={project.url}
                      src={project.image}
                      alt={`${project.title} — website preview`}
                      lazy
                    />
                  </div>

                  <div className="mt-5">
                    <span className="inline-block rounded-full bg-[#073638]/8 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#073638]">
                      {project.category}
                    </span>
                    <h3 className="headline-md mt-2 text-xl font-bold text-[#0B3032] transition-colors group-hover:text-[#073638]">
                      {project.title}
                    </h3>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-[#536461]">
                      {project.description}
                    </p>

                    <div className="mt-3.5 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md border border-[#D8E2DF] bg-[#F6F8F5] px-2.5 py-0.5 text-xs font-medium text-[#073638]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-end border-t border-[#EBF0ED] pt-4">
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#073638] transition-colors hover:text-[#0B3032]"
                  >
                    <span>Like this? Discuss your project</span>
                    <ArrowUpRight className="size-3.5" />
                  </a>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        <Reveal className="mt-12 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#536461]">
            Concept showcase — sample designs, not client claims
          </p>
        </Reveal>
      </div>
    </section>
  );
}