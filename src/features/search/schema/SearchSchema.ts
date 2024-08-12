import { z } from "zod";

export const SearchSchema = z.object({
  user_id: z.string(),
  search_user_id: z.string(),
});

export const SearchSupabaseSchema = z.intersection(
  z.object({
    id: z.number(),
  }),
  SearchSchema
);

export const SearchDataSchema = z.array(SearchSupabaseSchema);

export type SearchSchemaDTO = z.infer<typeof SearchSchema>;
export type SearchData = z.infer<typeof SearchDataSchema>;
