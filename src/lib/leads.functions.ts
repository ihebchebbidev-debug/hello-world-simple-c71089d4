// Server functions for capturing leads. Public — no auth required.
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const QuoteSchema = z.object({
  insurance_type: z.string().min(2).max(60),
  full_name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(160),
  phone: z.string().trim().min(6).max(32),
  age: z.number().int().min(0).max(120).optional(),
  city: z.string().trim().max(80).optional(),
  message: z.string().trim().max(2000).optional(),
});

export const submitQuoteRequest = createServerFn({ method: "POST" })
  .inputValidator((input) => QuoteSchema.parse(input))
  .handler(async ({ data }) => {
    const { error } = await supabaseAdmin.from("quote_requests").insert(data);
    if (error) {
      console.error("[submitQuoteRequest]", error);
      return { ok: false, error: "Une erreur est survenue. Merci de réessayer." };
    }
    return { ok: true };
  });

const CallbackSchema = z.object({
  full_name: z.string().trim().min(2).max(120),
  phone: z.string().trim().min(6).max(32),
  preferred_time: z.string().trim().max(80).optional(),
});

export const submitCallbackRequest = createServerFn({ method: "POST" })
  .inputValidator((input) => CallbackSchema.parse(input))
  .handler(async ({ data }) => {
    const { error } = await supabaseAdmin.from("callback_requests").insert(data);
    if (error) {
      console.error("[submitCallbackRequest]", error);
      return { ok: false, error: "Une erreur est survenue. Merci de réessayer." };
    }
    return { ok: true };
  });

const NewsletterSchema = z.object({
  email: z.string().trim().email().max(160),
});

export const subscribeNewsletter = createServerFn({ method: "POST" })
  .inputValidator((input) => NewsletterSchema.parse(input))
  .handler(async ({ data }) => {
    const { error } = await supabaseAdmin
      .from("newsletter_subscribers")
      .insert(data);
    if (error && !String(error.message).toLowerCase().includes("duplicate")) {
      console.error("[subscribeNewsletter]", error);
      return { ok: false, error: "Une erreur est survenue." };
    }
    return { ok: true };
  });
