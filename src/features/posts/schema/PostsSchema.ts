import { z } from "zod";

export const PostSchema = z.object({
  id: z.number(),
  post_url: z.string(),
  disableComment: z.boolean(),
  disableLike: z.boolean(),
  description: z.string(),
  user_id: z.string(),
});

export const PostReelsSchema = z.object({
  id: z.number(),
  video_url: z.string(),
  disableComment: z.boolean(),
  disableLike: z.boolean(),
  description: z.string(),
  user_id: z.string(),
});

export const PostsSchema = z.array(PostSchema);
export const PostsReelsSchema = z.array(PostReelsSchema);

export type Posts = z.infer<typeof PostsSchema>;
export type Post = z.infer<typeof PostSchema>;
