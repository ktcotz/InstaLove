import { supabase } from "../../../lib/supabase/supabase";
import { CustomError } from "../../../utils/CustomErrors";

export const getAllPostsAndReels = async () => {
  const { data: posts, error } = await supabase.from("posts").select("*");
  const { data: reels, error: reelsError } = await supabase
    .from("reels")
    .select("*");

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

  return [...posts, ...reels].sort(() => Math.random() - 0.5);
};
