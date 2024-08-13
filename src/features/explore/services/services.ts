import { supabase } from "../../../lib/supabase/supabase";
import { CustomError } from "../../../utils/CustomErrors";
import { GeneralsPostsSchema } from "../../posts/schema/PostsSchema";
import { MAX_EXPLORE_POST } from "../Explore";

export const getAllPostsAndReels = async ({ page = 0 }: { page: number }) => {
  const offset = page * MAX_EXPLORE_POST;

  const { data: posts, error } = await supabase
    .from("posts")
    .select("*")
    .order("id")
    .range(offset, offset + MAX_EXPLORE_POST - 1);
  const { data: reels, error: reelsError } = await supabase
    .from("reels")
    .select("*")
    .order("id")
    .range(offset, offset + MAX_EXPLORE_POST - 1);

  if (error) {
    throw new CustomError({
      message: error.message,
    });
  }

  if (reelsError) {
    throw new CustomError({
      message: reelsError.message,
    });
  }

  const combined = [...posts, ...reels];

  if (combined.length === 0) return [];

  const parsed = GeneralsPostsSchema.parse(combined);

  return parsed.sort(() => Math.random() - 0.5);
};
