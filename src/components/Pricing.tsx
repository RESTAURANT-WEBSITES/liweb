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
    <section id="pricing" className="relative py-24 sm:py-32">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          align="center"
          kicker="Pricing"
          title={
            <>
              Transparent packages,{" "}
              <span className="bg-teal px-2 text-sun">honest pricing.</span>
            </>
          }
          description="Pick a package, or pay monthly — whatever gets your business online fastest."
        />

        <div className="mt-16 grid items-stretch gap-8 md:grid-cols-3 lg:gap-6">
          {PLANS.map((plan, i) => (
            <Reveal key={plan.id} delay={i * 0.1} className="h-full">
              <div
                className={cn(
                  "relative flex h-full flex-col rounded-3xl p-8 pb-14 transition-transform duration-300 hover:-translate-y-2",
                  plan.featured
                    ? "bg-sun text-teal-dark shadow-2xl md:-my-4 md:shadow-[0_30px_70px_-20px_oklch(0.906_0.153_95.7/45%)]"
                    : "bg-card text-teal-dark shadow-card"
                )}
              >
                {plan.featured && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-teal px-4 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-sun shadow-lg">
                    Most popular
                  </span>
                )}

                <h3 className="text-sm font-bold uppercase tracking-[0.3em] text-teal/80">
                  {plan.name}
                </h3>
                <p className="mt-4 font-display text-5xl font-extrabold tracking-tight">
                  {plan.price}
                </p>

                {/* OR separator between one-time price and monthly option */}
                <div className="mt-5 flex items-center gap-3" aria-hidden="true">
                  <span className={cn("h-px flex-1", plan.featured ? "bg-teal/20" : "bg-teal/15")} />
                  <span
                    className={cn(
                      "grid size-9 place-items-center rounded-full text-[0.65rem] font-extrabold",
                      plan.featured ? "bg-teal text-sun" : "bg-teal text-sun"
                    )}
                  >
                    OR
                  </span>
                  <span className={cn("h-px flex-1", plan.featured ? "bg-teal/20" : "bg-teal/15")} />
                </div>

                <ul className="mt-7 flex-1 space-y-3.5">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm font-medium">
                      <span
                        className={cn(
                          "mt-0.5 grid size-5 shrink-0 place-items-center rounded-full",
                          plan.featured ? "bg-teal text-sun" : "bg-sun text-teal-dark"
                        )}
                      >
                        <Check className="size-3" strokeWidth={3} />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex gap-2">
                  <a
                    href="#contact"
                    onClick={() => selectPackage(plan.name)}
                    className={cn(
                      "flex-1 text-center text-sm",
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
                      "grid size-11 shrink-0 place-items-center self-stretch rounded-full border transition-colors",
                      plan.featured
                        ? "border-teal/40 text-teal hover:bg-teal hover:text-sun"
                        : "border-teal/25 text-teal hover:bg-teal hover:text-sun"
                    )}
                  >
                    <MessageCircle className="size-5" />
                  </a>
                </div>

                {/* Monthly payment pill overlapping the card bottom */}
                <span
                  className={cn(
                    "absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-5 py-2 text-xs font-bold shadow-lg",
                    plan.featured ? "bg-teal text-sun" : "bg-teal text-sun"
                  )}
                >
                  {plan.monthly}
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-24 text-center">
          <h3 className="font-display text-2xl font-extrabold text-teal-dark sm:text-3xl">
            Pick your plan &amp;{" "}
            <span className="bg-sun px-2">get started today!</span>
          </h3>
          <p className="mt-3 text-sm text-ink-muted sm:text-base">
            One-time or monthly — every package includes a free domain and
            hosting. Tell us about your project and we&apos;ll take it from there.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
