import { z } from "zod";

export const ForgotPasswordSchema = z.object({
  email: z
    .string({ required_error: "validation.email-required" })
    .min(1, "validation.email-required")
    .email("validation.email-invalid"),
});

export type ForgotSchema = z.infer<typeof ForgotPasswordSchema>;
