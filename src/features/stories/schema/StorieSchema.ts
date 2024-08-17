import { z } from "zod";

export const StorieDTOSchema = z.object({
  user_id: z.string(),
  disableComments: z.boolean().default(false),
  disableLike: z.boolean().default(false),
  description: z.string().default(""),
  type: z.enum(["video", "post"]),
  music: z.string().default(""),
});

export const StorieSchema = z.object({
  post_url: z.string().optional().nullable(),
  video_url: z.string().optional().nullable(),
  user_id: z.string(),
  disableComments: z.boolean().default(false),
  disableLike: z.boolean().default(false),
  description: z.string().default(""),
  type: z.enum(["video", "post"]),
  music: z.string().nullable(),
});

export const StorieSupabaseSchema = z.intersection(
  z.object({
    id: z.number(),
  }),
  StorieSchema
);

export const Stories = z.array(StorieSupabaseSchema);

export type StorieDTO = z.infer<typeof StorieDTOSchema>;
export type Storie = z.infer<typeof StorieSchema>;
export type Stories = z.infer<typeof Stories>;
