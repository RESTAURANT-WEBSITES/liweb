import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { ArrowRight, Palette, Rocket, Gauge, HeartHandshake } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/Shared";

const PILLARS = [
  {
    icon: Palette,
    title: "Design with intent",
    text: "Every layout, colour and word is chosen to move your visitor towards action.",
  },
  {
    icon: Rocket,
    title: "Modern technology",
    text: "Fast, secure, standards-based builds — no bloated templates or shortcuts.",
  },
  {
    icon: Gauge,
    title: "Usability & performance",
    text: "Responsive on every screen and quick to load, because attention is expensive.",
  },
  {
    icon: HeartHandshake,
    title: "Business first",
    text: "We design around your objectives: enquiries, sales and credibility.",
  },
];

export function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32">
      {/* Dark teal feature band with soft depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-teal via-teal to-teal-deep" aria-hidden="true" />
      <div className="grid-overlay absolute inset-0" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="float-slower absolute right-0 top-16 size-72 rounded-full bg-sun/5 blur-2xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <SectionHeading
              tone="light"
              kicker="About us"
              title={
                <>
                  We turn ideas into{" "}
                  <span className="text-sun-highlight">digital experiences.</span>
                </>
              }
              description="LIWEB Solutions combines design, technology, usability and business objectives to create websites that work — not just websites that exist."
            />
            <Reveal delay={0.15}>
              <div className="mt-8 space-y-4 text-base leading-relaxed text-white/70">
                <p>
                  A website is often the first conversation a customer has with
                  your business. We make sure it says the right things, looks
                  the part, and works flawlessly on every device.
                </p>
                <p>
                  From the first sketch to launch day and beyond, our approach
                  stays the same: understand the business, design with purpose,
                  build with care, and measure what matters.
                </p>
              </div>
              <a href="#contact" className="btn-sun mt-8">
                Discuss your project
                <ArrowRight className="size-4" />
              </a>
            </Reveal>
          </div>

          {/* Asymmetric pillar grid */}
          <div className="grid gap-4 sm:grid-cols-2">
            {PILLARS.map((pillar, i) => (
              <Reveal
                key={pillar.title}
                delay={i * 0.08}
                className={i % 2 === 1 ? "sm:mt-10" : ""}
              >
                <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-colors hover:border-sun/40">
                  <pillar.icon className="size-7 text-sun" />
                  <h3 className="mt-4 font-display text-lg font-bold text-white">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/65">
                    {pillar.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const STEPS = [
  {
    number: "01",
    title: "Discover",
    text: "Understand the business, audience, and project objectives.",
  },
  {
    number: "02",
    title: "Design",
    text: "Define the visual direction, layouts, and user experience.",
  },
  {
    number: "03",
    title: "Develop",
    text: "Build the website, implement functionality, and test responsiveness.",
  },
  {
    number: "04",
    title: "Launch",
    text: "Deploy the website, verify functionality, and provide agreed support.",
  },
];

/** Scroll-linked four-step process timeline with a yellow progress spine. */
export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.75", "end 0.6"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });
  const height = useTransform(progress, [0, 1], ["0%", "100%"]);

  return (
    <section id="process" className="relative py-24 sm:py-32">
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          align="center"
          kicker="How we work"
          title={
            <>
              Four steps from idea to{" "}
              <span className="bg-teal px-2 text-sun">launch.</span>
            </>
          }
        />

        <div ref={ref} className="relative mt-16">
          {/* Spine */}
          <div
            aria-hidden="true"
            className="absolute left-6 top-0 h-full w-px bg-teal/15 sm:left-1/2"
          />
          <motion.div
            aria-hidden="true"
            style={{ height }}
            className="absolute left-6 top-0 w-px bg-sun sm:left-1/2"
          />

          <ol className="space-y-12">
            {STEPS.map((step, i) => (
              <li key={step.number} className="relative">
                {/* Node */}
                <span
                  aria-hidden="true"
                  className="absolute left-6 top-2 z-10 grid size-5 -translate-x-1/2 place-items-center rounded-full border-2 border-sun bg-card sm:left-1/2"
                >
                  <span className="size-1.5 rounded-full bg-sun" />
                </span>
                <Reveal
                  delay={0.05}
                  className={`pl-14 sm:w-[calc(50%-2.5rem)] sm:pl-0 ${
                    i % 2 === 0 ? "sm:mr-auto sm:text-right" : "sm:ml-auto"
                  }`}
                >
                  <div className="rounded-2xl bg-card p-6 shadow-card transition-shadow hover:shadow-card-hover">
                    <span className="font-display text-3xl font-extrabold text-sun-highlight">
                      {step.number}
                    </span>
                    <h3 className="headline-md mt-1 text-teal-dark">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                      {step.text}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
