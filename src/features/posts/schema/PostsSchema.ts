import { z } from "zod";

export const PostSchema = z.object({
  id: z.number(),
  post_url: z.string().optional(),
  disableComment: z.boolean(),
  disableLike: z.boolean(),
  description: z.string(),
  user_id: z.string(),
});

export const PostReelsSchema = z.object({
  id: z.number(),
  video_url: z.string().optional(),
  disableComment: z.boolean(),
  disableLike: z.boolean(),
  description: z.string(),
  user_id: z.string(),
  views: z.number().optional(),
});

export const GeneralPostSchema = z.intersection(PostSchema, PostReelsSchema);
export const GeneralsPostsSchema = z.array(GeneralPostSchema);

export type GeneralPost = z.infer<typeof GeneralPostSchema>;
export type GeneralPosts = z.infer<typeof GeneralsPostsSchema>;

export const PostsSchema = z.array(PostSchema);
export const PostsReelsSchema = z.array(PostReelsSchema);

export type Posts = z.infer<typeof PostsSchema>;
export type Post = z.infer<typeof PostSchema>;
export type Reel = z.infer<typeof PostReelsSchema>;
