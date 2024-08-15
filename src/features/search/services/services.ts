import { supabase } from "../../../lib/supabase/supabase";
import { SearchQuery } from "../../../ui/SearchInput";
import { CustomError } from "../../../utils/CustomErrors";
import { UserID } from "../../authentication/services/services";
import { ProfilesSchema } from "../../profile/schema/ProfilesSchema";
import { SearchDataSchema, SearchSchemaDTO } from "../schema/SearchSchema";

export const getAllUsersByQuery = async ({ query }: SearchQuery) => {
  console.log(query);

  const { data: users, error } = await supabase
    .from("users")
    .select("*")
    .like("user_name", `%${query}%`)
    .limit(100);

  if (error) {
    throw new CustomError({
      message: error.message,
    });
  }

  const parsed = ProfilesSchema.parse(users);

  return parsed;
};

export const getLastUserSearchQueries = async ({ user_id }: UserID) => {
  const { data: users, error } = await supabase
    .from("search")
    .select("*")
    .eq("user_id", user_id)
    .order("created_at", { ascending: false })
    .limit(5);

  if (error) {
    throw new CustomError({
      message: error.message,
    });
  }

  const parsed = SearchDataSchema.parse(users);

  return parsed;
};

export const addUserSearchQuery = async (search: SearchSchemaDTO) => {
  const { data, error } = await supabase
    .from("search")
    .insert([search])
    .select();

  if (error) {
    throw new CustomError({
      message: error.message,
    });
  }

  return data;
};

export const deleteAllUserSearch = async ({ user_id }: UserID) => {
  const { error } = await supabase
    .from("search")
    .delete()
    .eq("user_id", user_id);

  if (error) {
    throw new CustomError({
      message: error.message,
    });
  }
};
