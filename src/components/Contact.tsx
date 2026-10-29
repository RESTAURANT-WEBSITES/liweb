import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "motion/react";
import {
  CheckCircle2,
  ChevronDown,
  Loader2,
  MessageCircle,
  Send,
  TriangleAlert,
  Phone,
} from "lucide-react";
import { Reveal, SectionHeading } from "@/components/Shared";
import { LightAmbient } from "@/components/LightAmbient";
import { submitEnquiry } from "@/lib/contact";
import {
  DEFAULT_WHATSAPP_MESSAGE,
  PHONE_DISPLAY,
  PHONE_TEL,
  whatsappUrl,
} from "@/lib/site";

const formSchema = z.object({
  fullName: z.string().trim().min(1, "Please enter your name."),
  email: z.string().trim().email("Please enter a valid email address."),
  businessName: z.string().trim().optional(),
  selectedPackage: z.string().optional(),
  projectType: z.string().optional(),
  projectDescription: z
    .string()
    .trim()
    .min(10, "Tell us a little more about the project (at least 10 characters)."),
});

type FormValues = z.infer<typeof formSchema>;

const inputClass =
  "w-full rounded-xl border border-input bg-card px-4 py-3 text-sm text-teal-dark placeholder:text-ink-muted/60 focus:border-sun focus:outline-none focus:ring-2 focus:ring-sun/40";

export function Contact() {
  const [serverState, setServerState] = useState<
    { status: "idle" } | { status: "success" } | { status: "error"; message: string }
  >({ status: "idle" });

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      businessName: "",
      selectedPackage: "Not sure yet",
      projectType: "Business website",
      projectDescription: "",
    },
  });

  // Pricing CTAs preselect the chosen package here
  useEffect(() => {
    const onSelect = (event: Event) => {
      const detail = (event as CustomEvent<string>).detail;
      if (detail) {
        setValue("selectedPackage", detail, { shouldValidate: false });
      }
    };
    window.addEventListener("liweb:select-package", onSelect);
    return () => window.removeEventListener("liweb:select-package", onSelect);
  }, [setValue]);

  const onSubmit = async (values: FormValues) => {
    setServerState({ status: "idle" });
    try {
      const result = await submitEnquiry({ data: values });
      if (result?.ok) {
        setServerState({ status: "success" });
        reset();
      } else {
        setServerState({
          status: "error",
          message:
            result?.error ??
            "Something went wrong while sending your enquiry. Please try again, or reach us directly on WhatsApp.",
        });
      }
    } catch {
      setServerState({
        status: "error",
        message:
          "We couldn't reach the server. Please try again, or message us directly on WhatsApp.",
      });
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden py-24 sm:py-32">
      <LightAmbient />
      <div className="grid-overlay-light absolute inset-0" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Left: contact info */}
          <div>
            <SectionHeading
              kicker="Contact"
              title={
                <>
                  Tell us about your{" "}
                  <span className="bg-sun px-2 text-teal-dark">project.</span>
                </>
              }
              description="Send the form and we'll get back to you, or start the conversation right away on WhatsApp or by phone."
            />

            <Reveal delay={0.1} className="mt-8 space-y-4">
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-4 rounded-2xl bg-teal p-5 text-white shadow-card transition-transform hover:-translate-y-0.5"
              >
                <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-sun text-teal-dark">
                  <MessageCircle className="size-6" />
                </span>
                <span>
                  <span className="block font-display text-lg font-bold">WhatsApp</span>
                  <span className="block text-sm text-white/70">
                    Fastest way to reach us — we reply to messages during business hours.
                  </span>
                </span>
              </a>
              <a
                href={PHONE_TEL}
                className="group flex items-center gap-4 rounded-2xl bg-card p-5 shadow-card transition-transform hover:-translate-y-0.5"
              >
                <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-teal text-sun">
                  <Phone className="size-6" />
                </span>
                <span>
                  <span className="block font-display text-lg font-bold text-teal-dark">
                    {PHONE_DISPLAY}
                  </span>
                  <span className="block text-sm text-ink-muted">
                    Tap to call us directly.
                  </span>
                </span>
              </a>
            </Reveal>
          </div>

          {/* Right: form */}
          <Reveal delay={0.15}>
            <div className="rounded-3xl bg-card p-6 shadow-card sm:p-10">
              {serverState.status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center py-10 text-center"
                >
                  <CheckCircle2 className="size-14 text-teal" />
                  <h3 className="headline-md mt-5 text-teal-dark">
                    Enquiry received.
                  </h3>
                  <p className="mt-2 max-w-sm text-sm text-ink-muted">
                    Thank you — your project details were sent to LIWEB
                    Solutions. Want a faster reply? Continue the conversation on
                    WhatsApp.
                  </p>
                  <div className="mt-6 flex flex-wrap justify-center gap-3">
                    <a href={whatsappUrl()} target="_blank" rel="noreferrer" className="btn-teal text-sm">
                      <MessageCircle className="size-4" />
                      Chat on WhatsApp
                    </a>
                    <button
                      type="button"
                      onClick={() => setServerState({ status: "idle" })}
                      className="rounded-full border border-teal/25 px-5 py-2.5 text-sm font-bold text-teal-dark transition-colors hover:bg-teal hover:text-sun"
                    >
                      Send another enquiry
                    </button>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="fullName" className="mb-1.5 block text-sm font-bold text-teal-dark">
                        Full name <span className="text-destructive">*</span>
                      </label>
                      <input id="fullName" type="text" autoComplete="name" placeholder="Your name" className={inputClass} aria-invalid={!!errors.fullName} {...register("fullName")} />
                      {errors.fullName && <p className="mt-1.5 text-xs font-semibold text-destructive">{errors.fullName.message}</p>}
                    </div>
                    <div>
                      <label htmlFor="email" className="mb-1.5 block text-sm font-bold text-teal-dark">
                        Email address <span className="text-destructive">*</span>
                      </label>
                      <input id="email" type="email" autoComplete="email" placeholder="you@company.com" className={inputClass} aria-invalid={!!errors.email} {...register("email")} />
                      {errors.email && <p className="mt-1.5 text-xs font-semibold text-destructive">{errors.email.message}</p>}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="businessName" className="mb-1.5 block text-sm font-bold text-teal-dark">
                      Business name
                    </label>
                    <input id="businessName" type="text" autoComplete="organization" placeholder="Your business or brand" className={inputClass} {...register("businessName")} />
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="selectedPackage" className="mb-1.5 block text-sm font-bold text-teal-dark">
                        Selected package
                      </label>
                      <div className="relative">
                        <select id="selectedPackage" className={`${inputClass} appearance-none pr-10`} {...register("selectedPackage")}>
                          {["Not sure yet", "STATIC", "DYNAMIC", "PREMIUM"].map((p) => (
                            <option key={p}>{p}</option>
                          ))}
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-ink-muted" />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="projectType" className="mb-1.5 block text-sm font-bold text-teal-dark">
                        Project type
                      </label>
                      <div className="relative">
                        <select id="projectType" className={`${inputClass} appearance-none pr-10`} {...register("projectType")}>
                          {["Business website", "E-commerce store", "Landing page", "Website redesign", "Maintenance & support", "Other"].map((t) => (
                            <option key={t}>{t}</option>
                          ))}
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-ink-muted" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="projectDescription" className="mb-1.5 block text-sm font-bold text-teal-dark">
                      Project description <span className="text-destructive">*</span>
                    </label>
                    <textarea id="projectDescription" rows={5} placeholder="What does your business do, and what should the website achieve?" className={`${inputClass} resize-y`} aria-invalid={!!errors.projectDescription} {...register("projectDescription")} />
                    {errors.projectDescription && <p className="mt-1.5 text-xs font-semibold text-destructive">{errors.projectDescription.message}</p>}
                  </div>

                  {serverState.status === "error" && (
                    <div role="alert" className="flex items-start gap-3 rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-teal-dark">
                      <TriangleAlert className="mt-0.5 size-5 shrink-0 text-destructive" />
                      <span>{serverState.message}</span>
                    </div>
                  )}

                  <button type="submit" disabled={isSubmitting} className="btn-sun w-full disabled:cursor-not-allowed disabled:opacity-60">
                    {isSubmitting ? (
                      <>
                        <Loader2 className="size-4 animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        <Send className="size-4" />
                        Send enquiry
                      </>
                    )}
                  </button>

                  <p className="text-center text-xs text-ink-muted">
                    Prefer to talk first? Call{" "}
                    <a href={PHONE_TEL} className="font-bold text-teal underline underline-offset-2">
                      {PHONE_DISPLAY}
                    </a>{" "}
                    or{" "}
                    <a href={whatsappUrl(DEFAULT_WHATSAPP_MESSAGE)} target="_blank" rel="noreferrer" className="font-bold text-teal underline underline-offset-2">
                      message us on WhatsApp
                    </a>
                    .
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
