import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const inputSchema = z.object({
  fullName: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(200),
  businessName: z.string().trim().max(160).optional().or(z.literal("")),
  selectedPackage: z.string().trim().max(60).optional().or(z.literal("")),
  projectType: z.string().trim().max(80).optional().or(z.literal("")),
  projectDescription: z.string().trim().min(1).max(3000),
});

/**
 * Server function: stores a project enquiry in the `contact_submissions`
 * table via the service-role client (the table is locked to anon/authed
 * users by RLS). Returns a plain success/failure shape — never raw errors.
 */
export const submitEnquiry = createServerFn({ method: "POST" })
  .validator((input: unknown) => input)
  .handler(async ({ data }) => {
    const parsed = inputSchema.safeParse(data);
    if (!parsed.success) {
      return {
        ok: false as const,
        error: "Please check the highlighted fields and try again.",
      };
    }

    const { supabaseAdmin } = await import(
      "@/integrations/supabase/client.server"
    );
    const { error } = await supabaseAdmin
      .from("contact_submissions")
      .insert({
        full_name: parsed.data.fullName,
        email: parsed.data.email,
        business_name: parsed.data.businessName || null,
        selected_package: parsed.data.selectedPackage || null,
        project_type: parsed.data.projectType || null,
        project_description: parsed.data.projectDescription,
      });

    if (error) {
      console.error("[contact] failed to store enquiry:", error.message);
      return {
        ok: false as const,
        error:
          "Something went wrong while sending your enquiry. Please try again, or reach us directly on WhatsApp.",
      };
    }

    return { ok: true as const };
  });
