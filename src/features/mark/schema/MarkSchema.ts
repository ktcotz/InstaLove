import { z } from "zod";

export const MarkSchema = z.object({
  name: z.string(),
  x: z.number(),
  y: z.number(),
});

export const MarkDTOSchema = z.intersection(
  z.object({
    id: z.number().optional(),
  }),
  MarkSchema
);

export const MarksDatabaseSchema = z.intersection(
  z.object({
    user_id: z.string(),
    post_id: z.number(),
  }),
  MarkSchema
);

export type MarkDTO = z.infer<typeof MarkDTOSchema>;
export type MarksDatabase = z.infer<typeof MarksDatabaseSchema>;
