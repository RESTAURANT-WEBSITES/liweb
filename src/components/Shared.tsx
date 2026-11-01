import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
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
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
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
  tone = "light",
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      <div
        className={cn(
          "inline-flex items-center gap-2",
          align === "center" ? "justify-center" : "justify-start"
        )}
      >
        <span aria-hidden="true" className="size-1.5 rounded-full bg-sun" />
        <p className="text-[12px] font-bold uppercase tracking-[0.22em] text-sun">
          {kicker}
        </p>
      </div>

      <h2
        className={cn(
          "headline-lg mt-3.5 tracking-tight",
          tone === "light" ? "text-white" : "text-[#0B3032]"
        )}
      >
        {title}
      </h2>

      {description && (
        <p
          className={cn(
            "mt-4 text-[16px] leading-relaxed sm:text-[17px]",
            tone === "light" ? "text-[#AFC2BE]" : "text-[#536461]"
          )}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}