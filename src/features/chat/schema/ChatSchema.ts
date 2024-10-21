import { z } from "zod";

export const ChatSchema = z.object({
  created_by: z.string(),
  type: z.enum(["chat", "group"]),
});

export const ChatParticipant = z.object({
  chat_id: z.string(),
  user_id: z.string(),
  role: z.string(),
});

export const ChatParticipants = z.array(ChatParticipant);

export type ChatSchemaType = z.infer<typeof ChatSchema>;

export type ChatParticipantType = z.infer<typeof ChatParticipant>;

export type ChatParticipantsType = z.infer<typeof ChatParticipants>;
