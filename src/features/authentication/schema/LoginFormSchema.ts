import { z } from "zod";

export const LoginFormSchema = z.object({
  email: z
    .string({ required_error: "validation.email-required" })
    .min(1, "validation.email-required")
    .email("validation.email-invalid"),
  password: z
    .string({ required_error: "validation.password-required" })
    .min(6, "validation.password-min-length"),
});

export type LoginSchema = z.infer<typeof LoginFormSchema>;
