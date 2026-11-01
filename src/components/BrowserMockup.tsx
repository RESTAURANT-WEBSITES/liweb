import { cn } from "@/lib/utils";

interface BrowserMockupProps {
  /** URL shown in the fake address bar */
  url?: string;
  /** Optional screenshot; when omitted a realistic preview is drawn */
  src?: string;
  alt?: string;
  className?: string;
  children?: React.ReactNode;
  lazy?: boolean;
}

/**
 * Premium CSS browser chrome used by the hero composition and portfolio cards.
 * Follows exact LIWEB brand palette: #073638, #0B3032, #FFDF59, #FFFFFF, #F6F8F5.
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
        "overflow-hidden rounded-xl border border-white/20 bg-[#073638] shadow-2xl transition-all duration-300",
        className
      )}
    >
      {/* Browser chrome address bar */}
      <div className="flex items-center gap-2 border-b border-white/10 bg-[#0B3032] px-3.5 py-2">
        <span className="flex items-center gap-1.5" aria-hidden="true">
          <span className="size-2 rounded-full bg-[#FFDF59]" />
          <span className="size-2 rounded-full bg-white/30" />
          <span className="size-2 rounded-full bg-white/30" />
        </span>
        <div className="ml-1 flex flex-1 items-center justify-between truncate rounded-md bg-white/5 px-2.5 py-0.5 text-[0.65rem] text-[#AFC2BE]">
          <span className="truncate">{url}</span>
          <span className="ml-2 size-1.5 rounded-full bg-[#FFDF59]/70 shrink-0" />
        </div>
      </div>

      {src ? (
        <img
          src={src}
          alt={alt}
          width={1024}
          height={640}
          loading={lazy ? "lazy" : undefined}
          className="block aspect-[16/10] w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        children
      )}
    </div>
  );
}

/**
 * Realistic corporate / digital agency website preview.
 */
export function AgencySitePreview() {
  return (
    <div className="flex aspect-[16/10] w-full flex-col justify-between bg-[#F6F8F5] p-3 text-[#0B3032]">
      {/* Mini navbar */}
      <div className="flex items-center justify-between border-b border-black/5 pb-2">
        <div className="flex items-center gap-1.5">
          <span className="size-3.5 rounded bg-[#073638]" />
          <span className="text-[0.62rem] font-bold tracking-tight text-[#073638]">
            APEX<span className="text-[#FFDF59] bg-[#073638] px-0.5 rounded">.</span>
          </span>
        </div>
        <div className="flex items-center gap-2 text-[0.55rem] font-semibold text-[#536461]">
          <span>Solutions</span>
          <span>Case Studies</span>
          <span className="rounded bg-[#FFDF59] px-1.5 py-0.5 text-[0.5rem] font-bold text-[#0B3032]">
            Contact
          </span>
        </div>
      </div>

      {/* Hero content */}
      <div className="my-auto py-1">
        <span className="inline-block rounded-full bg-[#073638]/10 px-2 py-0.5 text-[0.5rem] font-bold uppercase tracking-wider text-[#073638]">
          Enterprise Strategy
        </span>
        <h4 className="mt-1 text-[0.8rem] font-extrabold leading-snug tracking-tight text-[#073638]">
          Scaling Brands with <span className="underline decoration-[#FFDF59] decoration-2">Digital Excellence.</span>
        </h4>
        <p className="mt-0.5 text-[0.55rem] text-[#536461] line-clamp-1">
          End-to-end digital development and advisory for fast-growing companies.
        </p>

        {/* Metric pills */}
        <div className="mt-2 flex items-center gap-2">
          <div className="flex items-center gap-1 rounded border border-[#073638]/15 bg-white px-2 py-1 shadow-sm">
            <span className="text-[0.65rem] font-extrabold text-[#073638]">+140%</span>
            <span className="text-[0.45rem] font-medium text-[#536461]">Growth</span>
          </div>
          <div className="flex items-center gap-1 rounded border border-[#073638]/15 bg-white px-2 py-1 shadow-sm">
            <span className="text-[0.65rem] font-extrabold text-[#073638]">99.8%</span>
            <span className="text-[0.45rem] font-medium text-[#536461]">Uptime</span>
          </div>
        </div>
      </div>

      {/* Mini bottom feature cards */}
      <div className="grid grid-cols-2 gap-1.5 pt-1 border-t border-black/5">
        <div className="rounded bg-white p-1.5 border border-black/5">
          <span className="block h-1 w-8 rounded-full bg-[#FFDF59]" />
          <span className="mt-1 block text-[0.5rem] font-bold text-[#073638]">Bespoke Systems</span>
        </div>
        <div className="rounded bg-white p-1.5 border border-black/5">
          <span className="block h-1 w-8 rounded-full bg-[#073638]" />
          <span className="mt-1 block text-[0.5rem] font-bold text-[#073638]">High Conversion</span>
        </div>
      </div>
    </div>
  );
}

/**
 * Realistic modern e-commerce store preview.
 */
export function EcommerceSitePreview() {
  return (
    <div className="flex aspect-[16/10] w-full flex-col justify-between bg-white p-3 text-[#0B3032]">
      {/* Mini store header */}
      <div className="flex items-center justify-between border-b border-black/5 pb-2">
        <span className="text-[0.62rem] font-extrabold tracking-widest text-[#073638]">
          ATELIER
        </span>
        <div className="flex items-center gap-1.5 text-[0.5rem] text-[#536461]">
          <span>Shop</span>
          <span>Catalog</span>
          <span className="rounded-full bg-[#073638] px-1.5 py-0.2 text-[0.45rem] text-white">
            Cart (2)
          </span>
        </div>
      </div>

      {/* Product grid / showcase */}
      <div className="grid grid-cols-2 gap-2 my-auto py-1">
        <div className="relative overflow-hidden rounded bg-[#F6F8F5] p-2 border border-black/5">
          <span className="rounded bg-[#FFDF59] px-1 py-0.5 text-[0.45rem] font-bold text-[#0B3032]">
            FEATURED
          </span>
          <div className="my-1.5 h-8 rounded bg-gradient-to-tr from-[#073638]/20 to-[#FFDF59]/30" />
          <p className="text-[0.55rem] font-bold text-[#073638]">Minimalist Chrono</p>
          <div className="flex items-center justify-between mt-0.5">
            <span className="text-[0.55rem] font-extrabold text-[#073638]">₹2,499</span>
            <span className="rounded bg-[#073638] px-1.5 py-0.5 text-[0.45rem] font-semibold text-white">
              Add
            </span>
          </div>
        </div>
        <div className="flex flex-col justify-between rounded bg-[#F6F8F5] p-2 border border-black/5">
          <div>
            <span className="text-[0.45rem] font-bold text-[#536461] uppercase tracking-wider">Summer Drop</span>
            <h5 className="text-[0.62rem] font-extrabold text-[#073638] leading-tight mt-0.5">
              Premium Leather Collection
            </h5>
          </div>
          <div className="mt-2 space-y-1">
            <div className="flex items-center gap-1 text-[0.48rem] text-[#073638]">
              <span className="size-1 rounded-full bg-[#FFDF59]" />
              <span>Free Express Delivery</span>
            </div>
            <div className="flex items-center gap-1 text-[0.48rem] text-[#073638]">
              <span className="size-1 rounded-full bg-[#FFDF59]" />
              <span>Secure Razorpay / UPI</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-black/5 pt-1.5 text-center text-[0.48rem] font-semibold text-[#536461]">
        Verified Merchant · Instant Online Checkout
      </div>
    </div>
  );
}

/**
 * Realistic portfolio / creative hospitality showcase preview.
 */
export function StudioSitePreview() {
  return (
    <div className="flex aspect-[16/10] w-full flex-col justify-between bg-[#073638] p-3 text-white">
      {/* Mini header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-2">
        <span className="text-[0.62rem] font-bold tracking-tight">
          LUMEN<span className="text-[#FFDF59]">STUDIO</span>
        </span>
        <span className="rounded-full border border-white/20 px-2 py-0.5 text-[0.5rem] font-medium text-[#AFC2BE]">
          Showcase 2026
        </span>
      </div>

      {/* Showcase cards */}
      <div className="my-auto grid grid-cols-3 gap-1.5 py-1">
        <div className="rounded bg-white/5 p-1.5 border border-white/10">
          <div className="h-7 rounded bg-[#FFDF59]/20" />
          <span className="mt-1 block text-[0.5rem] font-bold text-white">Branding</span>
          <span className="text-[0.42rem] text-[#AFC2BE]">Identity & UI</span>
        </div>
        <div className="rounded bg-white/5 p-1.5 border border-white/10">
          <div className="h-7 rounded bg-[#0B3032]" />
          <span className="mt-1 block text-[0.5rem] font-bold text-white">Architecture</span>
          <span className="text-[0.42rem] text-[#AFC2BE]">Commercial</span>
        </div>
        <div className="rounded bg-white/5 p-1.5 border border-white/10">
          <div className="h-7 rounded bg-[#FFDF59]/30" />
          <span className="mt-1 block text-[0.5rem] font-bold text-white">Web Apps</span>
          <span className="text-[0.42rem] text-[#AFC2BE]">High Speed</span>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-white/10 pt-1.5 text-[0.48rem] text-[#AFC2BE]">
        <span>Client Rating: ★★★★★ 5.0</span>
        <span className="font-semibold text-[#FFDF59]">Explore Archive →</span>
      </div>
    </div>
  );
}

/**
 * Clean, branded fallback skeleton site.
 */
export function SkeletonSite({
  accent = "#FFDF59",
  rows = 3,
}: {
  accent?: string;
  rows?: number;
}) {
  return (
    <div className="flex aspect-[16/10] w-full flex-col justify-between bg-white p-3">
      <div className="flex items-center justify-between border-b border-black/5 pb-1.5">
        <span className="h-2 w-10 rounded-full bg-[#073638]" />
        <span className="flex gap-1">
          <span className="h-1.5 w-4 rounded-full bg-black/10" />
          <span className="h-1.5 w-4 rounded-full bg-black/10" />
          <span className="h-1.5 w-4 rounded-full bg-black/10" />
        </span>
      </div>
      <div className="my-auto space-y-1.5 py-1">
        <span className="block h-2.5 w-3/4 rounded-sm" style={{ background: accent }} />
        <span className="block h-2.5 w-1/2 rounded-sm bg-[#073638]/60" />
        <span className="block h-1.5 w-4/5 rounded-full bg-black/10" />
      </div>
      <div className="grid grid-cols-3 gap-1 pt-1.5 border-t border-black/5">
        {Array.from({ length: rows }).map((_, i) => (
          <span key={i} className="h-6 rounded bg-[#F6F8F5] border border-black/5" />
        ))}
      </div>
    </div>
  );
}