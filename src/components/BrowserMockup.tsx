import { cn } from "@/lib/utils";

interface BrowserMockupProps {
  /** URL shown in the fake address bar */
  url?: string;
  /** Optional screenshot; when omitted a skeleton layout is drawn */
  src?: string;
  alt?: string;
  className?: string;
  children?: React.ReactNode;
  lazy?: boolean;
}

/**
 * CSS browser chrome used by the hero composition and the portfolio cards.
 * Pure CSS/DOM — no images required for the chrome itself.
 */
export function BrowserMockup({
  url = "liwebsolutions.in",
  src,
  alt = "",
  className,
  children,
  lazy,
}: BrowserMockupProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-white/15 bg-white shadow-card",
        className
      )}
    >
      <div className="flex items-center gap-2 border-b border-black/5 bg-secondary/95 px-3 py-2">
        <span className="flex gap-1.5">
          <span className="size-2 rounded-full bg-sun" />
          <span className="size-2 rounded-full bg-white/40" />
          <span className="size-2 rounded-full bg-white/40" />
        </span>
        <span className="ml-1 flex-1 truncate rounded-md bg-white/10 px-2 py-0.5 text-[0.62rem] text-white/70">
          {url}
        </span>
      </div>
      {src ? (
        <img
          src={src}
          alt={alt}
          width={1024}
          height={1024}
          loading={lazy ? "lazy" : undefined}
          className="block aspect-[16/10] w-full object-cover object-top"
        />
      ) : (
        children
      )}
    </div>
  );
}

interface SkeletonSiteProps {
  /** Accent color for the skeleton headline */
  accent?: string;
  rows?: number;
}

/** Abstract website skeleton drawn with divs — used inside hero mockups. */
export function SkeletonSite({
  accent = "var(--sun)",
  rows = 3,
}: SkeletonSiteProps) {
  return (
    <div className="flex aspect-[16/10] w-full flex-col gap-2 bg-white p-3">
      <div className="flex items-center justify-between">
        <span className="h-2 w-10 rounded-full bg-teal/80" />
        <span className="flex gap-1.5">
          <span className="h-1.5 w-5 rounded-full bg-black/10" />
          <span className="h-1.5 w-5 rounded-full bg-black/10" />
          <span className="h-1.5 w-5 rounded-full bg-black/10" />
        </span>
      </div>
      <div className="mt-1 flex flex-col gap-1.5">
        <span className="h-3 w-3/5 rounded-sm" style={{ background: accent }} />
        <span className="h-3 w-2/5 rounded-sm bg-teal/70" />
      </div>
      <div className="mt-1 h-1.5 w-4/5 rounded-full bg-black/10" />
      <div className="h-1.5 w-3/5 rounded-full bg-black/10" />
      <div className="mt-1 h-5 w-14 rounded-full" style={{ background: accent }} />
      <div className="mt-auto grid grid-cols-3 gap-1.5 pb-1">
        {Array.from({ length: rows }).map((_, i) => (
          <span key={i} className="h-8 rounded-md bg-muted" />
        ))}
      </div>
    </div>
  );
}
