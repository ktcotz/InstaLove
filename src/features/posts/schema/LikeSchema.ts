import { z } from "zod";

export const LikeSchema = z.object({
  user_id: z.string(),
  comment_id: z.number().nullable().optional(),
  post_id: z.number().nullable().optional(),
});

export const LikesSupabaseSchema = z.intersection(
  z.object({ id: z.number() }),
  LikeSchema
);

export const LikesSchema = z.array(LikesSupabaseSchema);

export type Like = z.infer<typeof LikeSchema>;
export type Likes = z.infer<typeof LikesSchema>;
