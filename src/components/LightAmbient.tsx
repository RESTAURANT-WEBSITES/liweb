import { z } from "zod";

/** Animated gradient blobs for light sections — pure CSS, always running. */
export function LightAmbient() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="float-slow absolute -left-32 top-10 size-96 rounded-full bg-sun/25 blur-3xl" />
      <div className="float-slower absolute -right-24 bottom-0 size-80 rounded-full bg-teal/10 blur-3xl" />
      <div className="float-slow absolute left-1/3 top-1/2 size-64 rounded-full bg-teal/5 blur-3xl" />
    </div>
  );
}

const inputSchema = z.object({
  fullName: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(200),
  businessName: z.string().trim().max(160).optional().or(z.literal("")),
  selectedPackage: z.string().trim().max(60).optional().or(z.literal("")),
  projectType: z.string().trim().max(80).optional().or(z.literal("")),
  projectDescription: z.string().trim().min(1).max(3000),
});

export type EnquiryInput = z.infer<typeof inputSchema>;
