import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { BrowserMockup } from "@/components/BrowserMockup";
import { Reveal, SectionHeading } from "@/components/Shared";
import { cn } from "@/lib/utils";

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

// NOTE: These are clearly-labelled concept projects built for the showcase —
// no real client names, testimonials or outcomes are claimed anywhere.

export function Portfolio() {
  const [active, setActive] = useState<(typeof CATEGORIES)[number]>("All");
  const visible =
    active === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === active);

  return (
    <section id="work" className="relative py-24 sm:py-32">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="Our work"
          title={
            <>
              Digital experiences{" "}
              <span className="bg-sun px-2 text-teal-dark">we&apos;ve designed.</span>
            </>
          }
          description="Concept projects that show the quality bar we build to — from corporate sites to online stores."
        />

        {/* Category filters */}
        <Reveal className="mt-8 flex flex-wrap gap-2" delay={0.1}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActive(cat)}
              aria-pressed={active === cat}
              className={cn(
                "rounded-full border px-4 py-2 text-xs font-bold transition-colors sm:text-sm",
                active === cat
                  ? "border-teal bg-teal text-sun"
                  : "border-teal/20 bg-card text-teal-dark hover:border-teal/50"
              )}
            >
              {cat}
            </button>
          ))}
        </Reveal>

        <motion.div layout className="mt-10 grid gap-8 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {visible.map((project) => (
              <motion.article
                layout
                key={project.title}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="group"
              >
                <div className="transition-transform duration-500 ease-out group-hover:-translate-y-2">
                  <BrowserMockup url={project.url} src={project.image} alt={`${project.title} — website preview`} lazy />
                </div>
                <div className="mt-4 flex items-start justify-between gap-4">
                  <div>
                    <span className="rounded-full bg-teal/10 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-teal">
                      {project.category}
                    </span>
                    <h3 className="headline-md mt-2 text-teal-dark">
                      {project.title}
                    </h3>
                    <p className="mt-1 max-w-md text-sm text-ink-muted">
                      {project.description}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md border border-teal/15 bg-cream px-2 py-0.5 text-[0.68rem] font-semibold text-teal"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <a
                    href="#contact"
                    className="mt-1 shrink-0 rounded-full border border-teal/20 px-4 py-2 text-xs font-bold text-teal transition-colors hover:bg-teal hover:text-sun"
                  >
                    Like this? Talk to us
                  </a>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        <Reveal className="mt-12 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-muted">
            Concept showcase — sample designs, not client claims
          </p>
        </Reveal>
      </div>
    </section>
  );
}
