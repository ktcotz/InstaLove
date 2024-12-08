import { z } from "zod";

export const MessageSchema = z.object({
  created_at: z.string(),
  message: z.string(),
  user_id: z.string(),
  chat_id: z.number(),
  reply_user: z.string().nullable(),
  reply_message: z.string().nullable(),
});

export const MessagesSchema = z.array(MessageSchema);

export type MessagesType = z.infer<typeof MessageSchema>;
export type MessageSchemaType = z.infer<typeof MessageSchema>;
