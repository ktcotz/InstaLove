import { z } from "zod";
import { ProfileSchema } from "../../profile/schema/ProfilesSchema";

export const ChatSchema = z.object({
  created_by: z.string(),
  type: z.enum(["chat", "group"]),
});

export const ChatParticipant = z.object({
  chat_id: z.string(),
  user_id: z.string(),
  role: z.string(),
});

export const ChatSupabaseUser = z.object({
  chat_id: z.string(),
  user_id: ProfileSchema,
  role: z.string(),
});

export const ActiveSupabaseUser = z.object({
  id: z.number(),
  user_id: ProfileSchema,
  observe_id: ProfileSchema,
});

export const ChatSupabaseUsers = z.array(ChatSupabaseUser);

export const ChatParticipants = z.array(ChatParticipant);

export type ChatSchemaType = z.infer<typeof ChatSchema>;

export type ChatParticipantType = z.infer<typeof ChatParticipant>;

export type ChatParticipantsType = z.infer<typeof ChatParticipants>;

export type ChatSupabaseUsersType = z.infer<typeof ChatSupabaseUsers>;

export type ActiveSupabaseUserType = z.infer<typeof ActiveSupabaseUser>;
