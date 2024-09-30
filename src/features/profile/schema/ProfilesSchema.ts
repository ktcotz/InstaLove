import { z } from "zod";

export const ProfileSchema = z.object({
  id: z.number(),
  avatar_url: z.string(),
  user_id: z.string(),
  user_name: z.string(),
  type: z.enum(["public", "private"]),
  fullName: z.string(),
  biogram: z.string(),
  loggedIn: z.date().nullable(),
  unLoggedIn: z.date().nullable(),
});

export const ProfilesSchema = z.array(ProfileSchema);

export type Profile = z.infer<typeof ProfileSchema>;
export type Profiles = z.infer<typeof ProfileSchema>;
