import { z } from "zod";

export const CreateCommentSchema = z.object({
  comment: z.string(),
});

export const CommentDTOSchema = z.object({
  comment: z.string(),
  user_id: z.string(),
  post_id: z.number(),
});

export const CommentSupabaseSchema = z.intersection(
  z.object({ id: z.number(), created_at: z.string() }),
  CommentDTOSchema
);

export const CommentsSchema = z.object({
  count: z.number().nullable(),
  comments: z.array(CommentSupabaseSchema),
});

export type CreateComment = z.infer<typeof CreateCommentSchema>;
export type Comments = z.infer<typeof CommentsSchema>;
export type Comment = z.infer<typeof CommentDTOSchema>;
