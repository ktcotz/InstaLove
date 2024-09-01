import { z } from "zod";

const MIN_EMAIL_LENGTH = 1;
const MIN_PASSWORD_LENGTH = 6;

export const LoginFormSchema = z.object({
  email: z
    .string({ required_error: "validation.email-required" })
    .min(MIN_EMAIL_LENGTH, "validation.email-required")
    .email("validation.email-invalid"),
  password: z
    .string({ required_error: "validation.password-required" })
    .min(MIN_PASSWORD_LENGTH, "validation.password-min-length"),
});

export type LoginSchema = z.infer<typeof LoginFormSchema>;
