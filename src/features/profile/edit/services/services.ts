import { supabase } from "../../../../lib/supabase/supabase";
import { CustomError } from "../../../../utils/CustomErrors";

export type UpdateUserData = {
  biogram?: string;
  fullName?: string;
  type?: "public" | "private";
};

type UserName = {
  user_name: string;
};

export const updateUserData = async ({
  user_name,
  ...updatedData
}: UpdateUserData & UserName) => {
  const { data, error } = await supabase
    .from("users")
    .update(updatedData)
    .eq("user_name", user_name)
    .select();

  if (error) {
    throw new CustomError({
      message: error.message,
    });
  }

  return data;
};
