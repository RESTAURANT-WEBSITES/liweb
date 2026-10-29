import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

interface SectionHeadingProps {
  kicker: string;
  title: ReactNode;
  description?: string;
  tone?: "light" | "dark";
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  kicker,
  title,
  description,
  tone = "dark",
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      <p
        className={cn(
          "text-xs font-bold uppercase tracking-[0.28em]",
          tone === "light" ? "text-sun" : "text-teal/70"
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            "mb-3 block h-1 w-12 rounded-full bg-sun",
            align === "center" && "mx-auto"
          )}
        />
        {kicker}
      </p>
      <h2
        className={cn(
          "headline-lg mt-4",
          tone === "light" ? "text-white" : "text-teal-dark"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed sm:text-lg",
            tone === "light" ? "text-white/70" : "text-ink-muted"
          )}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}
