import { z } from "zod";

export const UpdatePasswordFormSchema = z.object({
  password: z
    .string({ required_error: "validation.password-required" })
    .min(6, "validation.password-min-length"),
});

export type UpdatePasswordSchema = z.infer<typeof UpdatePasswordFormSchema>;
