import { supabase } from "../../../lib/supabase/supabase";
import { CustomError } from "../../../utils/CustomErrors";

export const getAllReels = async () => {
  const { data: reels, error } = await supabase.from("reels").select("*");

  if (error) {
    throw new CustomError({
      message: error.message,
    });
  }

  return reels;
};
