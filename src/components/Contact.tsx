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
    .min(10, "Tell us a little more about what you need (at least 10 characters)."),
});

type FormValues = z.infer<typeof formSchema>;

export function Contact() {
  const [serverState, setServerState] = useState<{
    status: "idle" | "success" | "error";
    message?: string;
  }>({ status: "idle" });

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

  // Listen for package clicks from the Pricing table
  useEffect(() => {
    const handler = (e: Event) => {
      const custom = e as CustomEvent<string>;
      if (custom.detail) {
        setValue("selectedPackage", custom.detail);
      }
    };
    window.addEventListener("liweb:select-package", handler);
    return () => window.removeEventListener("liweb:select-package", handler);
  }, [setValue]);

  const onSubmit = async (values: FormValues) => {
    setServerState({ status: "idle" });
    const result = await submitEnquiry(values);
    if (result.success) {
      setServerState({ status: "success" });
      reset();
    } else {
      setServerState({
        status: "error",
        message:
          result.error ??
          "Something went wrong while sending your enquiry. Please reach us on WhatsApp or phone.",
      });
    }
  };

  const inputClass =
    "w-full rounded-xl border border-[#D8E2DF] bg-[#F6F8F5] px-4 py-3 text-sm text-[#0B3032] placeholder:text-[#536461]/60 transition-all duration-200 focus:border-[#073638] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FFDF59]";

  return (
    <section id="contact" className="relative py-20 sm:py-24 lg:py-28">
      <div className="grid-overlay-light absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto max-w-[1280px] px-6 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14 items-start">
          {/* Left: Contact info */}
          <div className="lg:col-span-5">
            <SectionHeading
              tone="dark"
              kicker="Contact"
              title={
                <>
                  Start your project{" "}
                  <span className="bg-[#FFDF59] px-2 text-[#0B3032]">with LIWEB.</span>
                </>
              }
              description="Tell us what you're trying to build. We'll reply within 24 hours with ideas, timeline and a clear quote."
            />

            <Reveal delay={0.1} className="mt-8 space-y-4">
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-4 rounded-xl border border-[#D8E2DF] bg-white p-5 shadow-card transition-all duration-300 hover:border-[#073638] hover:shadow-card-hover"
              >
                <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-[#073638] text-[#FFDF59] transition-transform duration-300 group-hover:scale-105">
                  <MessageCircle className="size-5" />
                </span>
                <div>
                  <span className="block font-display text-base font-bold text-[#0B3032]">
                    Chat on WhatsApp
                  </span>
                  <span className="block text-xs text-[#536461]">
                    Fastest way to get a quick answer.
                  </span>
                </div>
              </a>

              <a
                href={PHONE_TEL}
                className="group flex items-center gap-4 rounded-xl border border-[#D8E2DF] bg-white p-5 shadow-card transition-all duration-300 hover:border-[#073638] hover:shadow-card-hover"
              >
                <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-[#073638] text-[#FFDF59] transition-transform duration-300 group-hover:scale-105">
                  <Phone className="size-5" />
                </span>
                <div>
                  <span className="block font-display text-base font-bold text-[#0B3032]">
                    {PHONE_DISPLAY}
                  </span>
                  <span className="block text-xs text-[#536461]">
                    Tap to call us directly.
                  </span>
                </div>
              </a>
            </Reveal>
          </div>

          {/* Right: Clean Form */}
          <div className="lg:col-span-7">
            <Reveal delay={0.15}>
              <div className="rounded-2xl border border-[#D8E2DF] bg-white p-6 shadow-card sm:p-10">
                {serverState.status === "success" ? (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center py-10 text-center"
                  >
                    <CheckCircle2 className="size-12 text-[#073638]" />
                    <h3 className="headline-md mt-4 text-xl font-bold text-[#0B3032]">
                      Enquiry received.
                    </h3>
                    <p className="mt-2 max-w-sm text-sm text-[#536461]">
                      Thank you — your project details were sent to LIWEB
                      Solutions. Want a faster reply? Continue the conversation on
                      WhatsApp.
                    </p>
                    <div className="mt-6 flex flex-wrap justify-center gap-3">
                      <a
                        href={whatsappUrl()}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-teal text-sm"
                      >
                        <MessageCircle className="size-4" />
                        Chat on WhatsApp
                      </a>
                      <button
                        type="button"
                        onClick={() => setServerState({ status: "idle" })}
                        className="btn-ghost-light !text-[#073638] !border-[#073638]/30 hover:!bg-[#073638]/5 text-sm"
                      >
                        Send another enquiry
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="fullName" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#0B3032]">
                          Full name <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="fullName"
                          type="text"
                          autoComplete="name"
                          placeholder="Your name"
                          className={inputClass}
                          aria-invalid={!!errors.fullName}
                          {...register("fullName")}
                        />
                        {errors.fullName && (
                          <p className="mt-1 text-xs font-semibold text-red-500">
                            {errors.fullName.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="email" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#0B3032]">
                          Email address <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="email"
                          type="email"
                          autoComplete="email"
                          placeholder="you@company.com"
                          className={inputClass}
                          aria-invalid={!!errors.email}
                          {...register("email")}
                        />
                        {errors.email && (
                          <p className="mt-1 text-xs font-semibold text-red-500">
                            {errors.email.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="businessName" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#0B3032]">
                        Business name
                      </label>
                      <input
                        id="businessName"
                        type="text"
                        autoComplete="organization"
                        placeholder="Your business or brand"
                        className={inputClass}
                        {...register("businessName")}
                      />
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="selectedPackage" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#0B3032]">
                          Selected package
                        </label>
                        <div className="relative">
                          <select
                            id="selectedPackage"
                            className={`${inputClass} appearance-none pr-10`}
                            {...register("selectedPackage")}
                          >
                            {["Not sure yet", "STATIC", "DYNAMIC", "PREMIUM"].map((p) => (
                              <option key={p}>{p}</option>
                            ))}
                          </select>
                          <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-[#536461]" />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="projectType" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#0B3032]">
                          Project type
                        </label>
                        <div className="relative">
                          <select
                            id="projectType"
                            className={`${inputClass} appearance-none pr-10`}
                            {...register("projectType")}
                          >
                            {[
                              "Business website",
                              "E-commerce store",
                              "Landing page",
                              "Website redesign",
                              "Maintenance & support",
                              "Other",
                            ].map((t) => (
                              <option key={t}>{t}</option>
                            ))}
                          </select>
                          <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-[#536461]" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="projectDescription" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#0B3032]">
                        Project description <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="projectDescription"
                        rows={4}
                        placeholder="What does your business do, and what should the website achieve?"
                        className={`${inputClass} resize-y`}
                        aria-invalid={!!errors.projectDescription}
                        {...register("projectDescription")}
                      />
                      {errors.projectDescription && (
                        <p className="mt-1 text-xs font-semibold text-red-500">
                          {errors.projectDescription.message}
                        </p>
                      )}
                    </div>

                    {serverState.status === "error" && (
                      <div
                        role="alert"
                        className="flex items-start gap-3 rounded-xl border border-red-500/30 bg-red-50 p-4 text-sm text-red-800"
                      >
                        <TriangleAlert className="mt-0.5 size-4 shrink-0 text-red-500" />
                        <span>{serverState.message}</span>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-sun w-full !py-3.5 text-base font-bold disabled:cursor-not-allowed disabled:opacity-60"
                    >
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

                    <p className="text-center text-xs text-[#536461]">
                      Prefer to talk first? Call{" "}
                      <a
                        href={PHONE_TEL}
                        className="font-bold text-[#073638] underline underline-offset-2"
                      >
                        {PHONE_DISPLAY}
                      </a>{" "}
                      or{" "}
                      <a
                        href={whatsappUrl(DEFAULT_WHATSAPP_MESSAGE)}
                        target="_blank"
                        rel="noreferrer"
                        className="font-bold text-[#073638] underline underline-offset-2"
                      >
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
      </div>
    </section>
  );
}