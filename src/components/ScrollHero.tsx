import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "motion/react";
import { ArrowDown, ArrowRight } from "lucide-react";
import {
  BrowserMockup,
  AgencySitePreview,
  EcommerceSitePreview,
  StudioSitePreview,
} from "@/components/BrowserMockup";

/**
 * ScrollHero pinned storytelling section.
 * Refined for premium digital agency aesthetics:
 * - 55% left column, 45% right column
 * - Balanced headline: 64-76px clamp, line-height 1.08, no collision with navbar
 * - Realistic website interface previews with LIWEB brand palette
 * - Controlled subtle floating animations
 */
export function ScrollHero() {
  const prefersReducedMotion = useReducedMotion();
  if (prefersReducedMotion) {
    return <StaticHero />;
  }
  return <PinnedHero />;
}

function PinnedHero() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const progress = scrollYProgress;

  // Scene 1: 0 -> 0.24 (Hero statement)
  const s1Opacity = useTransform(progress, [0, 0.18, 0.24], [1, 1, 0]);
  const s1Y = useTransform(progress, [0, 0.24], [0, -50]);

  // Scene 2: 0.24 -> 0.52 (The transformation)
  const s2Opacity = useTransform(
    progress,
    [0.22, 0.28, 0.46, 0.52],
    [0, 1, 1, 0]
  );
  const s2Y = useTransform(progress, [0.22, 0.28, 0.46, 0.52], [50, 0, 0, -50]);
  const mockScale = useTransform(progress, [0.26, 0.44], [0.94, 1.02]);
  const mockBlur = useTransform(
    progress,
    [0.26, 0.34],
    ["blur(4px)", "blur(0px)"]
  );

  // Scene 3: 0.52 -> 0.78 (What we create)
  const s3Opacity = useTransform(
    progress,
    [0.5, 0.56, 0.72, 0.78],
    [0, 1, 1, 0]
  );
  const s3Y = useTransform(progress, [0.5, 0.56, 0.72, 0.78], [50, 0, 0, -50]);
  const cardBases = [0.54, 0.58, 0.62, 0.66];

  // Scene 4: 0.78 -> 1.0 (The brand promise)
  const s4Opacity = useTransform(progress, [0.76, 0.84, 1], [0, 1, 1]);
  const s4Y = useTransform(progress, [0.76, 0.84], [50, 0]);
  const s4Scale = useTransform(progress, [0.78, 0.86], [0.95, 1]);
  const s4Pointer = useTransform(progress, (v) => (v > 0.78 ? "auto" : "none"));

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative h-[400vh]"
      aria-label="LIWEB Solutions introduction"
    >
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
        {/* Background grid overlay */}
        <div className="grid-overlay absolute inset-0" aria-hidden="true" />

        {/* ---------- Scene 1 — Main Hero Statement ---------- */}
        <motion.div
          style={{ opacity: s1Opacity, y: s1Y }}
          className="absolute inset-0 z-20 flex items-center px-6 sm:px-8"
        >
          <div className="mx-auto grid w-full max-w-[1280px] items-center gap-12 pt-20 lg:grid-cols-12 lg:gap-8 lg:pt-0">
            {/* Left Column (55% width): Typography & CTAs */}
            <div className="lg:col-span-7">

              {/* Main Hero Headline */}
              <h1 className="headline-hero max-w-[620px] text-white">
                We Build <span className="text-sun">Digital Experiences</span>{" "}
                That Move Businesses <span className="text-sun">Forward.</span>
              </h1>

              {/* Supporting paragraph */}
              <p className="mt-5 max-w-[500px] text-[16.5px] leading-relaxed text-[#AFC2BE]">
                From stunning business websites to powerful online stores, LIWEB
                Solutions helps brands turn their ideas into a compelling online
                presence.
              </p>

              {/* Call to Actions */}
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

              {/* Reassurance note */}
              <div className="mt-8 flex items-center gap-2.5 text-[13px] font-medium text-[#AFC2BE]">
                <span className="size-1.5 rounded-full bg-sun" />
                <span>Designed with purpose. Built for performance.</span>
              </div>
            </div>

            {/* Right Column (45% width): Floating Website Mockups */}
            <div
              className="relative hidden h-[32rem] items-center justify-center lg:col-span-5 lg:flex"
              aria-hidden="true"
            >
              {/* Primary mockup: Corporate / Agency */}
              <div className="float-slow absolute right-0 top-6 z-20 w-[340px] xl:w-[370px]">
                <BrowserMockup url="apex-enterprise.in">
                  <AgencySitePreview />
                </BrowserMockup>
              </div>

              {/* Secondary mockup: E-commerce Store */}
              <div className="float-slower absolute bottom-8 left-2 z-10 w-[290px] xl:w-[320px]">
                <BrowserMockup url="atelier-shop.in">
                  <EcommerceSitePreview />
                </BrowserMockup>
              </div>

              {/* Ambient yellow light accents */}
              <div className="absolute -left-6 bottom-16 size-28 rounded-full bg-sun/15 blur-2xl pointer-events-none" />
              <div className="absolute right-8 top-10 size-20 rounded-full bg-sun/10 blur-xl pointer-events-none" />
            </div>
          </div>
        </motion.div>

        {/* ---------- Scene 2 — The Transformation ---------- */}
        <motion.div
          style={{ opacity: s2Opacity, y: s2Y }}
          className="absolute inset-0 z-10 flex items-center justify-center px-6"
        >
          <div className="flex w-full max-w-3xl flex-col items-center text-center">
            <p className="mb-3 text-[12px] font-bold uppercase tracking-[0.24em] text-sun">
              The Transformation
            </p>
            <h2 className="headline-lg text-white">
              Your business deserves more than an{" "}
              <span className="text-sun">ordinary website.</span>
            </h2>
            <p className="mt-4 max-w-xl text-base text-[#AFC2BE]">
              We craft high-performance digital architectures tailored to your customers&apos;
              exact needs.
            </p>
            <motion.div
              style={{ scale: mockScale, filter: mockBlur }}
              className="mt-8 w-full max-w-2xl"
            >
              <BrowserMockup url="yourbrand.liweb.in">
                <AgencySitePreview />
              </BrowserMockup>
            </motion.div>
          </div>
        </motion.div>

        {/* ---------- Scene 3 — What We Create ---------- */}
        <motion.div
          style={{ opacity: s3Opacity, y: s3Y }}
          className="absolute inset-0 z-10 flex items-center justify-center px-6"
        >
          <div className="w-full max-w-5xl text-center">
            <p className="mb-3 text-[12px] font-bold uppercase tracking-[0.24em] text-sun">
              What We Create
            </p>
            <h2 className="headline-lg text-white">
              From first impression to{" "}
              <span className="text-sun">final conversion.</span>
            </h2>
            <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
              {SCENE3_CARDS.map((card, i) => (
                <Scene3Card
                  key={card.label}
                  card={card}
                  progress={progress}
                  base={cardBases[i] ?? 0.55}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* ---------- Scene 4 — The Brand Promise ---------- */}
        <motion.div
          style={{
            opacity: s4Opacity,
            y: s4Y,
            scale: s4Scale,
            pointerEvents: s4Pointer,
          }}
          className="absolute inset-0 z-30 flex items-center justify-center px-6"
        >
          <div className="relative w-full max-w-3xl overflow-hidden rounded-2xl bg-sun p-10 text-center shadow-2xl sm:p-14">
            <div
              aria-hidden="true"
              className="absolute -left-10 -top-10 size-40 rounded-full bg-[#073638]/10"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-14 -right-8 size-52 rounded-full bg-[#073638]/10"
            />
            <h2 className="relative font-display text-3xl font-extrabold leading-tight tracking-tight text-[#0B3032] sm:text-4xl lg:text-5xl">
              Let&apos;s build something that{" "}
              <span className="underline decoration-[#073638]/40 decoration-4 underline-offset-6">
                matters.
              </span>
            </h2>
            <p className="relative mx-auto mt-4 max-w-md text-base font-medium text-[#0B3032]/80 sm:text-lg">
              A website that works as hard as you do — designed, built and
              launched by LIWEB Solutions.
            </p>
            <div className="relative mt-8">
              <a href="#contact" className="btn-teal">
                Start Your Project
                <ArrowRight className="size-4" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const SCENE3_CARDS = [
  {
    label: "Business Websites",
    url: "business.liweb.in",
    component: AgencySitePreview,
  },
  {
    label: "E-commerce Stores",
    url: "store.liweb.in",
    component: EcommerceSitePreview,
  },
  {
    label: "Creative Portfolios",
    url: "folio.liweb.in",
    component: StudioSitePreview,
  },
  {
    label: "Landing Pages",
    url: "launch.liweb.in",
    component: AgencySitePreview,
  },
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
  const y = useTransform(progress, [base, base + 0.06], [30, 0]);
  const Component = card.component;
  return (
    <motion.div
      style={{ opacity, y }}
      className="rounded-xl border border-white/10 bg-white/5 p-2.5 backdrop-blur-sm"
    >
      <BrowserMockup url={card.url}>
        <Component />
      </BrowserMockup>
      <p className="mt-2.5 text-center text-[12px] font-semibold uppercase tracking-wider text-white/85">
        {card.label}
      </p>
    </motion.div>
  );
}

/**
 * Static fallback for `prefers-reduced-motion`.
 */
function StaticHero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-16"
      aria-label="LIWEB Solutions introduction"
    >
      <div className="grid-overlay absolute inset-0" aria-hidden="true" />
      <div className="mx-auto grid w-full max-w-[1280px] items-center gap-12 px-6 sm:px-8 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">

          <h1 className="headline-hero max-w-[620px] text-white">
            We Build <span className="text-sun">Digital Experiences</span>{" "}
            That Move Businesses <span className="text-sun">Forward.</span>
          </h1>

          <p className="mt-5 max-w-[500px] text-[16.5px] leading-relaxed text-[#AFC2BE]">
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

          <div className="mt-8 flex items-center gap-2.5 text-[13px] font-medium text-[#AFC2BE]">
            <span className="size-1.5 rounded-full bg-sun" />
            <span>Designed with purpose. Built for performance.</span>
          </div>
        </div>

        <div className="relative hidden h-[32rem] items-center justify-center lg:col-span-5 lg:flex" aria-hidden="true">
          <div className="absolute right-0 top-8 z-20 w-[340px] xl:w-[370px]">
            <BrowserMockup url="apex-enterprise.in">
              <AgencySitePreview />
            </BrowserMockup>
          </div>
          <div className="absolute bottom-10 left-2 z-10 w-[290px] xl:w-[320px]">
            <BrowserMockup url="atelier-shop.in">
              <EcommerceSitePreview />
            </BrowserMockup>
          </div>
        </div>
      </div>
    </section>
  );
}