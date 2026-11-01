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
    <section id="about" className="relative py-20 sm:py-24 lg:py-28">
      <div className="grid-overlay absolute inset-0" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="float-slower absolute right-4 top-16 size-72 rounded-full bg-sun/5 blur-3xl pointer-events-none"
      />

      <div className="relative mx-auto max-w-[1280px] px-6 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14 items-center">
          {/* Left Column: Editorial intro (6 cols) */}
          <div className="lg:col-span-6">
            <SectionHeading
              tone="light"
              kicker="About us"
              title={
                <>
                  We turn ideas into{" "}
                  <span className="text-sun">digital experiences.</span>
                </>
              }
              description="LIWEB Solutions combines design, technology, usability and business objectives to create websites that work — not just websites that exist."
            />
            <Reveal delay={0.15}>
              <div className="mt-6 space-y-4 text-[16px] leading-relaxed text-[#AFC2BE]">
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
              <div className="mt-8">
                <a href="#contact" className="btn-sun">
                  Discuss your project
                  <ArrowRight className="size-4" />
                </a>
              </div>
            </Reveal>
          </div>

          {/* Right Column: 4 Pillars Grid (6 cols) */}
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-6">
            {PILLARS.map((pillar, i) => (
              <Reveal
                key={pillar.title}
                delay={i * 0.08}
                className={i % 2 === 1 ? "sm:mt-8" : ""}
              >
                <div className="h-full rounded-xl border border-white/15 bg-white/5 p-6 backdrop-blur-md transition-all duration-300 hover:border-sun/40 hover:-translate-y-1">
                  <span className="grid size-11 place-items-center rounded-lg bg-sun/15 text-sun">
                    <pillar.icon className="size-5 text-sun" />
                  </span>
                  <h3 className="mt-4 font-display text-[1.125rem] font-bold text-white">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#AFC2BE]">
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

/** Clean timeline with consistent numbered steps and restrained yellow progress indicators. */
export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.75", "end 0.6"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });
  const height = useTransform(progress, [0, 1], ["0%", "100%"]);

  return (
    <section id="process" className="relative py-20 sm:py-24 lg:py-28">
      <div className="relative mx-auto max-w-4xl px-6 sm:px-8">
        <SectionHeading
          tone="dark"
          align="center"
          kicker="How we work"
          title={
            <>
              Four steps from idea to{" "}
              <span className="bg-[#073638] px-2 text-[#FFDF59]">launch.</span>
            </>
          }
          description="A structured, collaborative approach to delivering your digital presence on time."
        />

        <div ref={ref} className="relative mt-14">
          {/* Spine */}
          <div
            aria-hidden="true"
            className="absolute left-6 top-0 h-full w-px bg-[#073638]/15 sm:left-1/2"
          />
          <motion.div
            aria-hidden="true"
            style={{ height }}
            className="absolute left-6 top-0 w-px bg-sun sm:left-1/2"
          />

          <ol className="space-y-10">
            {STEPS.map((step, i) => (
              <li key={step.number} className="relative">
                {/* Node */}
                <span
                  aria-hidden="true"
                  className="absolute left-6 top-4 z-10 grid size-5 -translate-x-1/2 place-items-center rounded-full border-2 border-[#073638] bg-[#FFDF59] sm:left-1/2 shadow-sm"
                >
                  <span className="size-1 rounded-full bg-[#073638]" />
                </span>
                <Reveal
                  delay={0.05}
                  className={`pl-14 sm:w-[calc(50%-2.5rem)] sm:pl-0 ${
                    i % 2 === 0 ? "sm:mr-auto sm:text-right" : "sm:ml-auto"
                  }`}
                >
                  <div className="rounded-xl border border-[#D8E2DF] bg-white p-6 shadow-card transition-all duration-300 hover:border-[#073638]/30 hover:shadow-card-hover">
                    <span className="font-display text-2xl font-extrabold text-[#073638]">
                      {step.number}
                    </span>
                    <h3 className="headline-md mt-1 text-lg font-bold text-[#0B3032]">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#536461]">
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