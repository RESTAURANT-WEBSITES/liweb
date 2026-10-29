import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { ArrowDown, ArrowRight } from "lucide-react";
import { BrowserMockup, SkeletonSite } from "@/components/BrowserMockup";

/**
 * Scroll-driven homepage introduction.
 *
 * A tall section pins its content (sticky) while `scrollYProgress` drives
 * four coordinated scenes. Scrolling stays natural — no wheel/touch hijack.
 * `prefers-reduced-motion` swaps the whole sequence for a static layout.
 */
export function ScrollHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  if (reduce) return <StaticHero />;

  return <PinnedHero progress={scrollYProgress} containerRef={containerRef} />;
}

function PinnedHero({
  progress,
  containerRef,
}: {
  progress: MotionValue<number>;
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  // Scene 1 — introduction
  const s1Opacity = useTransform(progress, [0, 0.16, 0.25], [1, 1, 0]);
  const s1Y = useTransform(progress, [0, 0.25], [0, -90]);
  const s1Scale = useTransform(progress, [0, 0.25], [1, 0.94]);
  const s1Pointer = useTransform(s1Opacity, (v) => (v > 0.5 ? "auto" : "none"));

  // Scene 2 — the transformation (mockup comes into focus)
  const s2Opacity = useTransform(progress, [0.25, 0.33, 0.46, 0.53], [0, 1, 1, 0]);
  const s2Y = useTransform(progress, [0.25, 0.33, 0.53], [60, 0, -60]);
  const mockScale = useTransform(progress, [0.25, 0.38], [0.7, 1]);
  const mockBlur = useTransform(progress, [0.25, 0.38], ["blur(14px)", "blur(0px)"]);
  const mockOpacity = useTransform(progress, [0.25, 0.38], [0.2, 1]);

  // Scene 3 — what we create (staggered previews)
  const s3Opacity = useTransform(progress, [0.53, 0.61, 0.72, 0.79], [0, 1, 1, 0]);
  const s3Y = useTransform(progress, [0.53, 0.61, 0.79], [60, 0, -50]);
  const cardBases = [0.55, 0.58, 0.61, 0.64];

  // Scene 4 — the brand promise
  const s4Opacity = useTransform(progress, [0.79, 0.88], [0, 1]);
  const s4Y = useTransform(progress, [0.79, 0.88], [80, 0]);
  const s4Scale = useTransform(progress, [0.79, 0.92], [0.92, 1]);
  const s4Pointer = useTransform(s4Opacity, (v) => (v > 0.5 ? "auto" : "none"));
  const sunPanelRotate = useTransform(progress, [0.79, 1], [4, 0]);

  // Slow parallax drift for the decorative background shapes
  const bgDrift = useTransform(progress, [0, 1], [0, -120]);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative h-[400vh]"
      aria-label="LIWEB Solutions introduction"
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        {/* Parallax decorative shapes */}
        <motion.div
          aria-hidden="true"
          style={{ y: bgDrift }}
          className="pointer-events-none absolute inset-0"
        >
          <div className="absolute -left-24 top-1/4 size-72 rounded-full border border-sun/20" />
          <div className="absolute -right-16 top-10 size-96 rounded-full border border-white/10" />
          <div className="absolute bottom-10 left-1/3 size-40 rotate-12 rounded-3xl bg-sun/5" />
        </motion.div>

        {/* ---------- Scene 1 — the introduction ---------- */}
        <motion.div
          style={{ opacity: s1Opacity, y: s1Y, scale: s1Scale, pointerEvents: s1Pointer }}
          className="absolute inset-0 z-20 flex items-center"
        >
          <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-4 pt-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
            <div>
              <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-sun/30 bg-sun/10 px-4 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.22em] text-sun">
                Web design &amp; development
              </p>
              <h1 className="headline-xl text-white">
                We build{" "}
                <span className="text-sun-highlight">digital experiences</span>{" "}
                that move businesses{" "}
                <span className="text-sun-highlight">forward.</span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
                From stunning business websites to powerful online stores,
                LIWEB Solutions helps brands turn their ideas into a compelling
                online presence.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a href="#contact" className="btn-sun">
                  Start Your Project
                  <ArrowRight className="size-4" />
                </a>
                <a href="#work" className="btn-ghost-light">
                  Explore Our Work
                  <ArrowDown className="size-4" />
                </a>
              </div>
              <p className="mt-8 flex items-center gap-2 text-sm font-semibold text-white/60">
                <span className="size-1.5 rounded-full bg-sun pulse-soft" />
                Designed with purpose. Built for performance.
              </p>
            </div>

            {/* Floating browser composition */}
            <div className="relative hidden h-[30rem] lg:block" aria-hidden="true">
              <div className="float-slow absolute right-2 top-0 w-72">
                <BrowserMockup url="yourbusiness.in">
                  <SkeletonSite accent="var(--sun)" />
                </BrowserMockup>
              </div>
              <div className="float-slower absolute right-52 top-28 w-64">
                <BrowserMockup url="store.liweb.in">
                  <SkeletonSite accent="oklch(0.65 0.12 165)" rows={2} />
                </BrowserMockup>
              </div>
              <div className="float-slow absolute bottom-2 right-16 w-80">
                <BrowserMockup url="portfolio.liweb.in">
                  <SkeletonSite accent="oklch(0.68 0.14 300)" rows={4} />
                </BrowserMockup>
              </div>
              <div className="absolute -left-2 bottom-16 size-24 rounded-2xl bg-sun/20 blur-sm" />
              <div className="absolute left-10 top-10 size-3 rounded-full bg-sun/70" />
              <div className="absolute right-6 top-6 h-px w-24 bg-gradient-to-r from-transparent via-sun/60 to-transparent" />
            </div>
          </div>
        </motion.div>

        {/* ---------- Scene 2 — the transformation ---------- */}
        <motion.div
          style={{ opacity: s2Opacity, y: s2Y }}
          className="absolute inset-0 z-10 flex items-center justify-center px-4"
        >
          <div className="flex w-full max-w-3xl flex-col items-center text-center">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-sun">
              The transformation
            </p>
            <h2 className="headline-lg text-white">
              Your business deserves more than an{" "}
              <span className="text-sun-highlight">ordinary website.</span>
            </h2>
            <motion.div
              style={{ scale: mockScale, filter: mockBlur, opacity: mockOpacity }}
              className="mt-10 w-full max-w-2xl"
            >
              <BrowserMockup url="yourbusiness.liweb.in">
                <SkeletonSite accent="var(--sun)" rows={4} />
              </BrowserMockup>
            </motion.div>
          </div>
        </motion.div>

        {/* ---------- Scene 3 — what we create ---------- */}
        <motion.div
          style={{ opacity: s3Opacity, y: s3Y }}
          className="absolute inset-0 z-10 flex items-center justify-center px-4"
        >
          <div className="w-full max-w-5xl text-center">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-sun">
              What we create
            </p>
            <h2 className="headline-lg text-white">
              From first impression to{" "}
              <span className="text-sun-highlight">final conversion.</span>
            </h2>
            <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
              {SCENE3_CARDS.map((card, i) => (
                <Scene3Card key={card.label} card={card} progress={progress} base={cardBases[i] ?? 0.55} />
              ))}
            </div>
          </div>
        </motion.div>

        {/* ---------- Scene 4 — the brand promise ---------- */}
        <motion.div
          style={{ opacity: s4Opacity, y: s4Y, scale: s4Scale, pointerEvents: s4Pointer }}
          className="absolute inset-0 z-30 flex items-center justify-center px-4"
        >
          <motion.div
            style={{ rotate: sunPanelRotate }}
            className="relative w-full max-w-4xl overflow-hidden rounded-4xl bg-sun p-10 text-center shadow-2xl sm:p-16"
          >
            <div
              aria-hidden="true"
              className="absolute -left-10 -top-10 size-40 rounded-full bg-teal/10"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-14 -right-8 size-52 rounded-full bg-teal/10"
            />
            <div
              aria-hidden="true"
              className="absolute right-10 top-8 hidden h-1 w-24 rounded-full bg-teal/20 sm:block"
            />
            <h2 className="relative font-display text-4xl font-extrabold leading-tight tracking-tight text-teal-dark sm:text-5xl lg:text-6xl">
              Let&apos;s build something that{" "}
              <span className="underline decoration-teal/40 decoration-4 underline-offset-8">
                matters.
              </span>
            </h2>
            <p className="relative mx-auto mt-5 max-w-md text-base font-medium text-teal-dark/80 sm:text-lg">
              A website that works as hard as you do — designed, built and
              launched by LIWEB Solutions.
            </p>
            <div className="relative mt-8">
              <a href="#contact" className="btn-teal">
                Start Your Project
                <ArrowRight className="size-4" />
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

const SCENE3_CARDS = [
  { label: "Business Websites", accent: "var(--sun)", url: "business.liweb.in" },
  { label: "E-commerce Stores", accent: "oklch(0.65 0.12 165)", url: "store.liweb.in" },
  { label: "Creative Portfolios", accent: "oklch(0.68 0.14 300)", url: "folio.liweb.in" },
  { label: "Landing Pages", accent: "oklch(0.63 0.15 25)", url: "launch.liweb.in" },
] as const;

function Scene3Card({
  card,
  progress,
  base,
}: {
  card: (typeof SCENE3_CARDS)[number];
  progress: MotionValue<number>;
  base: number;
}) {
  const opacity = useTransform(progress, [base, base + 0.06], [0, 1]);
  const y = useTransform(progress, [base, base + 0.06], [40, 0]);
  return (
    <motion.div
      style={{ opacity, y }}
      className="rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm"
    >
      <BrowserMockup url={card.url}>
        <SkeletonSite accent={card.accent} rows={2} />
      </BrowserMockup>
      <p className="mt-2 text-left text-xs font-bold uppercase tracking-wider text-white/80">
        {card.label}
      </p>
    </motion.div>
  );
}

/** Static fallback for `prefers-reduced-motion`. */
function StaticHero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden"
      aria-label="LIWEB Solutions introduction"
    >
      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-4 pb-16 pt-28 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <div>
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-sun/30 bg-sun/10 px-4 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.22em] text-sun">
            Web design &amp; development
          </p>
          <h1 className="headline-xl text-white">
            We build <span className="text-sun-highlight">digital experiences</span>{" "}
            that move businesses <span className="text-sun-highlight">forward.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
            From stunning business websites to powerful online stores, LIWEB
            Solutions helps brands turn their ideas into a compelling online
            presence.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a href="#contact" className="btn-sun">
              Start Your Project
              <ArrowRight className="size-4" />
            </a>
            <a href="#work" className="btn-ghost-light">
              Explore Our Work
              <ArrowDown className="size-4" />
            </a>
          </div>
          <p className="mt-8 flex items-center gap-2 text-sm font-semibold text-white/60">
            <span className="size-1.5 rounded-full bg-sun" />
            Designed with purpose. Built for performance.
          </p>
        </div>
        <div className="relative hidden h-[30rem] lg:block" aria-hidden="true">
          <div className="absolute right-2 top-0 w-72">
            <BrowserMockup url="yourbusiness.in">
              <SkeletonSite accent="var(--sun)" />
            </BrowserMockup>
          </div>
          <div className="absolute right-52 top-28 w-64">
            <BrowserMockup url="store.liweb.in">
              <SkeletonSite accent="oklch(0.65 0.12 165)" rows={2} />
            </BrowserMockup>
          </div>
          <div className="absolute bottom-2 right-16 w-80">
            <BrowserMockup url="portfolio.liweb.in">
              <SkeletonSite accent="oklch(0.68 0.14 300)" rows={4} />
            </BrowserMockup>
          </div>
        </div>
      </div>
    </section>
  );
}
