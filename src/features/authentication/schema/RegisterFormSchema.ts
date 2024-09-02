import { z } from "zod";

const MIN_EMAIL_LENGTH = 1;
const MIN_NICKNAME_LENGTH = 3;
const MIN_PASSWORD_LENGTH = 6;

export const RegisterFormSchema = z
  .object({
    email: z
      .string({ required_error: "validation.email-required" })
      .min(MIN_EMAIL_LENGTH, "validation.email-required")
      .email("validation.email-invalid"),
    nickname: z
      .string({ required_error: "validation.username-required" })
      .min(MIN_NICKNAME_LENGTH, "validation.username-min-length"),
    password: z
      .string({ required_error: "validation.password-required" })
      .min(MIN_PASSWORD_LENGTH, "validation.password-min-length"),
    confirmPassword: z
      .string({ required_error: "validation.password-required" })
      .min(MIN_PASSWORD_LENGTH, "validation.password-min-length"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "validation.password-not-match",
    path: ["confirmPassword"],
  });

export type RegisterSchema = z.infer<typeof RegisterFormSchema>;
