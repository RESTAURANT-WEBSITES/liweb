import { ArrowRight, Check, MessageCircle } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/Shared";
import { PLANS, whatsappUrl } from "@/lib/site";
import { cn } from "@/lib/utils";

export function selectPackage(planName: string) {
  window.dispatchEvent(
    new CustomEvent("liweb:select-package", { detail: planName })
  );
}

export function Pricing() {
  return (
    <section id="pricing" className="relative py-20 sm:py-24 lg:py-28">
      <div className="relative mx-auto max-w-[1280px] px-6 sm:px-8">
        <SectionHeading
          tone="dark"
          align="center"
          kicker="Pricing"
          title={
            <>
              Transparent packages,{" "}
              <span className="bg-[#073638] px-2 text-[#FFDF59]">honest pricing.</span>
            </>
          }
          description="Pick a package, or pay monthly — whatever gets your business online fastest."
        />

        <div className="mt-14 grid items-stretch gap-8 md:grid-cols-3 lg:gap-6">
          {PLANS.map((plan, i) => (
            <Reveal key={plan.id} delay={i * 0.1} className="h-full">
              <div
                className={cn(
                  "relative flex h-full flex-col justify-between rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1.5",
                  plan.featured
                    ? "bg-[#FFDF59] text-[#0B3032] shadow-2xl ring-2 ring-[#073638]/20 md:-my-2"
                    : "border border-[#D8E2DF] bg-white text-[#0B3032] shadow-card hover:shadow-card-hover"
                )}
              >
                <div>
                  {/* Featured Pill */}
                  {plan.featured && (
                    <div className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-[#073638] px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-[#FFDF59]">
                      <span className="size-1.5 rounded-full bg-[#FFDF59]" />
                      Most Popular
                    </div>
                  )}

                  <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-[#073638]/80">
                    {plan.name}
                  </h3>

                  {/* Price */}
                  <div className="mt-3 flex items-baseline gap-1">
                    <span className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
                      {plan.price}
                    </span>
                    <span className="text-xs font-semibold text-[#536461]">
                      one-time
                    </span>
                  </div>

                  {/* Monthly installment banner */}
                  <div
                    className={cn(
                      "mt-4 rounded-lg px-3.5 py-2 text-center text-xs font-bold",
                      plan.featured
                        ? "bg-[#073638] text-[#FFDF59]"
                        : "bg-[#073638]/5 text-[#073638]"
                    )}
                  >
                    {plan.monthly}
                  </div>

                  {/* Feature list */}
                  <ul className="mt-6 space-y-3 border-t border-black/10 pt-6">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm font-medium">
                        <span
                          className={cn(
                            "mt-0.5 grid size-4.5 shrink-0 place-items-center rounded-full",
                            plan.featured
                              ? "bg-[#073638] text-[#FFDF59]"
                              : "bg-[#FFDF59] text-[#0B3032]"
                          )}
                        >
                          <Check className="size-3" strokeWidth={3} />
                        </span>
                        <span className="leading-snug text-[#0B3032]/90">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card CTA Actions */}
                <div className="mt-8 flex items-center gap-2 pt-4">
                  <a
                    href="#contact"
                    onClick={() => selectPackage(plan.name)}
                    className={cn(
                      "flex-1 text-center text-sm font-semibold",
                      plan.featured ? "btn-teal" : "btn-sun"
                    )}
                  >
                    {plan.cta}
                    <ArrowRight className="size-4" />
                  </a>
                  <a
                    href={whatsappUrl(
                      `Hello LIWEB Solutions, I'm interested in the ${plan.name} package (${plan.price}).`
                    )}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Ask about the ${plan.name} package on WhatsApp`}
                    className={cn(
                      "grid size-11 shrink-0 place-items-center rounded-xl border transition-colors",
                      plan.featured
                        ? "border-[#073638]/40 text-[#073638] hover:bg-[#073638] hover:text-[#FFDF59]"
                        : "border-[#D8E2DF] text-[#073638] hover:bg-[#073638] hover:text-[#FFDF59]"
                    )}
                  >
                    <MessageCircle className="size-4.5" />
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16 text-center">
          <h3 className="font-display text-2xl font-bold text-[#0B3032] sm:text-3xl">
            Pick your plan &amp;{" "}
            <span className="bg-[#FFDF59] px-2 text-[#0B3032]">get started today!</span>
          </h3>
          <p className="mt-3 text-[15px] text-[#536461] sm:text-base">
            One-time or monthly — every package includes a free domain and
            hosting. Tell us about your project and we&apos;ll take it from there.
          </p>
        </Reveal>
      </div>
    </section>
  );
}