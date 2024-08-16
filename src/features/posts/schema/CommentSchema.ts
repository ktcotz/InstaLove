import { z } from "zod";

export const CreateCommentSchema = z.object({
  comment: z.string(),
  id: z.number().optional(),
});

export const CommentDTOSchema = z.object({
  comment: z.string(),
  user_id: z.string(),
  post_id: z.number().nullable(),
  comment_id: z.number().nullable().optional(),
});

export const CommentSupabaseSchema = z.intersection(
  z.object({ id: z.number(), created_at: z.string() }),
  CommentDTOSchema
);

export const CommentsSchema = z.object({
  count: z.number().nullable(),
  comments: z.array(CommentSupabaseSchema),
});

export const OnlyCommentsSchema = z.array(CommentSupabaseSchema);

export type OnlyComments = z.infer<typeof OnlyCommentsSchema>;
export type CreateComment = z.infer<typeof CreateCommentSchema>;
export type Comments = z.infer<typeof CommentsSchema>;
export type Comment = z.infer<typeof CommentDTOSchema>;
