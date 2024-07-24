import { z } from "zod";

export const RegisterFormSchema = z
  .object({
    email: z
      .string({ required_error: "validation.email-required" })
      .min(1, "validation.email-required")
      .email("validation.email-invalid"),
    password: z
      .string({ required_error: "validation.password-required" })
      .min(6, "validation.password-min-length"),
    confirmPassword: z
      .string({ required_error: "validation.password-required" })
      .min(6, "validation.password-min-length"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "validation.password-not-match",
    path: ["confirmPassword"],
  });

export type RegisterSchema = z.infer<typeof RegisterFormSchema>;
