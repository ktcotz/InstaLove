import { supabase } from "../../../../lib/supabase/supabase";
import { CustomError } from "../../../../utils/CustomErrors";
import { UserID } from "../../../authentication/services/services";

export type UpdateUserData = {
  biogram?: string;
  fullName?: string;
  type?: "public" | "private";
};

export const updateUserData = async ({
  user_id,
  ...updatedData
}: UpdateUserData & UserID) => {
  const { error } = await supabase
    .from("users")
    .update(updatedData)
    .eq("user_id", user_id)
    .select();

  if (error) {
    throw new CustomError({
      message: error.message,
    });
  }
};
