import { cn } from "@/lib/utils";

interface LogoProps {
  /** "light" for dark teal backgrounds, "dark" for light backgrounds */
  tone?: "light" | "dark";
  className?: string;
}

/**
 * Geometric LIWEB wordmark: a square mark with a yellow chevron plus the
 * LIWEB wordmark. "LI" is always yellow, "WEB" follows the tone.
 */
export function Logo({ tone = "light", className }: LogoProps) {
  const webColor = tone === "light" ? "text-white" : "text-teal-dark";
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span
        aria-hidden="true"
        className="relative grid size-9 shrink-0 place-items-center overflow-hidden rounded-lg border border-white/20 bg-white/5"
      >
        <span className="absolute inset-x-0 top-0 h-1/2 bg-sun" />
        <span className="absolute inset-x-[26%] bottom-0 top-1/2 rounded-t-full bg-sun/70" />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-xl font-extrabold tracking-tight",
            webColor
          )}
        >
          <span className="text-sun">LI</span>WEB
        </span>
        <span
          className={cn(
            "mt-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.32em]",
            tone === "light" ? "text-white/60" : "text-ink-muted"
          )}
        >
          Solutions
        </span>
      </span>
    </span>
  );
}
