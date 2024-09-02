import { z } from "zod";

const MIN_PASSWORD_LENGTH = 6;

export const UpdatePasswordFormSchema = z.object({
  password: z
    .string({ required_error: "validation.password-required" })
    .min(MIN_PASSWORD_LENGTH, "validation.password-min-length"),
});

export type UpdatePasswordSchema = z.infer<typeof UpdatePasswordFormSchema>;
