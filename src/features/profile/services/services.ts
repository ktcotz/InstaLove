import { supabase } from "../../../lib/supabase/supabase";
import { CustomError } from "../../../utils/CustomErrors";
import { ProfileSchema, ProfilesSchema } from "../schema/ProfilesSchema";

type CurrentUserID = {
  id: string;
};

type ProfileName = {
  user_name: string;
};

export const getProfiles = async ({ id }: CurrentUserID) => {
  const { data: users, error } = await supabase
    .from("users")
    .select("*")
    .neq("user_id", id);

  console.log(users);

  if (error) {
    throw new CustomError({
      message: error.message,
    });
  }

  const parsed = ProfilesSchema.parse(users);

  return parsed;
};

export const getProfile = async ({ user_name }: ProfileName) => {
  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("user_name", user_name)
    .single();

  if (error) {
    throw new CustomError({
      message: error.message,
    });
  }

  const parsed = ProfileSchema.parse(user);

  return parsed;
};
