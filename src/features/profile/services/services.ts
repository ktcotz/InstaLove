import { supabase } from "../../../lib/supabase/supabase";
import { CustomError } from "../../../utils/CustomErrors";
import { UserID } from "../../authentication/services/services";
import { ObserveUserData } from "../mutations/useObservation";
import { ProfileSchema, ProfilesSchema } from "../schema/ProfilesSchema";

type CurrentUserID = {
  id: string;
};

type ProfileName = {
  user_name?: string;
};

export const getProfiles = async ({
  id,
  limit,
}: CurrentUserID & { limit?: number }) => {
  const query = limit
    ? supabase.from("users").select("*").neq("user_id", id).limit(limit)
    : supabase.from("users").select("*").neq("user_id", id);

  const { data: users, error } = await query;

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

export const userObserver = async (observe: ObserveUserData) => {
  const observation = await getObserve(observe);

  if (observation && observation!.length > 0) {
    return await supabase
      .from("observations")
      .delete()
      .eq("user_id", observe.user_id)
      .eq("observe_id", observe.observe_id);
  }

  const { data, error } = await supabase
    .from("observations")
    .insert([observe])
    .select();

  if (error) {
    throw new CustomError({
      message: error.message,
    });
  }

  return data;
};

export const getObserve = async ({ user_id, observe_id }: ObserveUserData) => {
  const { data: observations, error } = await supabase
    .from("observations")
    .select("*")
    .eq("user_id", user_id)
    .eq("observe_id", observe_id);

  if (error) {
    throw new CustomError({
      message: error.message,
    });
  }

  return observations;
};

export const getObserversByUser = async ({ user_id }: UserID) => {
  const { data: observations, error } = await supabase
    .from("observations")
    .select("*")
    .eq("user_id", user_id);

  if (error) {
    throw new CustomError({
      message: error.message,
    });
  }

  return observations;
};

export const getObserversOnUser = async ({ user_id }: UserID) => {
  const { data: observations, error } = await supabase
    .from("observations")
    .select("*")
    .eq("observe_id", user_id);

  console.log(observations);

  if (error) {
    throw new CustomError({
      message: error.message,
    });
  }

  return observations;
};
