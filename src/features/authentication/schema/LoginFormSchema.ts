import { z } from "zod";

export const LoginFormSchema = z.object({
  email: z
    .string({ required_error: "Email is required!" })
    .min(1, "Email is required!")
    .email("Email is invalid!"),
  password: z
    .string({ required_error: "Password is required!" })
    .min(6, "Password must be more than 5 characters."),
});

export type LoginSchema = z.infer<typeof LoginFormSchema>;
