import { supabase } from "../../../lib/supabase/supabase";
import { CustomError } from "../../../utils/CustomErrors";
import { MarksByUserPost } from "../queries/useGetAllMarksOnPost";
import { MarksDatabase } from "../schema/MarkSchema";

export const addMarks = async (marks: MarksDatabase[]) => {
  const { data, error } = await supabase.from("marks").insert(marks).select();

  if (error) {
    throw new CustomError({
      message: error.message,
    });
  }

  return data;
};

export const getAllMarksByPost = async ({
  user_id,
  post_id,
}: MarksByUserPost) => {
  const { data, error } = await supabase
    .from("marks")
    .select("*")
    .eq("user_id", user_id)
    .eq("post_id", post_id);

  if (error) {
    throw new CustomError({
      message: error.message,
    });
  }

  return data;
};
