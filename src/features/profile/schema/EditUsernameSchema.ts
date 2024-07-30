import { z } from "zod";

export const EditUsernameSchema = z.object({
  fullName: z.string().min(1, "Imię i nazwisko jest wymagane!"),
});

export type EditUsernameT = z.infer<typeof EditUsernameSchema>;
