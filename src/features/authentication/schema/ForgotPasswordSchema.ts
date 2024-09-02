import { z } from "zod";

const MIN_EMAIL_LENGTH = 1;

export const ForgotPasswordSchema = z.object({
  email: z
    .string({ required_error: "validation.email-required" })
    .min(MIN_EMAIL_LENGTH, "validation.email-required")
    .email("validation.email-invalid"),
});

export type ForgotSchema = z.infer<typeof ForgotPasswordSchema>;
