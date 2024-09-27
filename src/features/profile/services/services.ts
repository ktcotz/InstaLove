import { supabase } from "../../../lib/supabase/supabase";
import { SearchQuery } from "../../../ui/SearchInput";
import { CustomError } from "../../../utils/CustomErrors";
import { UserID } from "../../authentication/services/types";
import { MAX_PROPOSED_PROFILES } from "../AllProposedProfiles";
import { ObserveUserData } from "../mutations/useObservation";
import { ProposedProfilesProps } from "../queries/useProfiles";
import { ProfileSchema, ProfilesSchema } from "../schema/ProfilesSchema";

type ProfileName = {
  user_name?: string;
};

export const getProfiles = async ({
  id,
  limit,
  page,
}: ProposedProfilesProps) => {
  const observations = await getObserversByUser({ user_id: id });
  const observationsIds = observations.map(
    (observation) => observation.observe_id
  );

  const rangeStart = Math.floor(Math.random() * 10 + 1);

  const limitQuery = limit
    ? supabase
        .from("users")
        .select("*", { count: "exact" })
        .neq("user_id", id)
        .range(rangeStart, rangeStart + MAX_PROPOSED_PROFILES)
        .limit(limit)
    : supabase.from("users").select("*", { count: "exact" }).neq("user_id", id);

  const query = page
    ? limitQuery.range(
        (page - 1) * MAX_PROPOSED_PROFILES,
        page * MAX_PROPOSED_PROFILES
      )
    : limitQuery;

  const { data: users, count, error } = await query;

  const filteredData = users?.filter(
    (user) => !observationsIds.includes(user.user_id)
  );

  if (error) {
    throw new CustomError({
      message: error.message,
    });
  }

  const parsed = ProfilesSchema.parse(filteredData);

  return { profiles: parsed.sort(() => Math.random() - 0.5), count };
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

export const getObserversByUser = async ({
  user_id,
  query,
}: UserID & SearchQuery) => {
  const supabaseQuery = !query
    ? supabase.from("observations").select("*").eq("user_id", user_id)
    : supabase
        .from("observations")
        .select("*")
        .eq("user_id", user_id)
        .like("observer_name", `%${query}%`);

  const { data: observations, error } = await supabaseQuery;

  if (error) {
    throw new CustomError({
      message: error.message,
    });
  }

  return observations;
};

export const getObserversOnUser = async ({
  user_id,
  query,
}: UserID & SearchQuery) => {
  const supabaseQuery = !query
    ? supabase.from("observations").select("*").eq("observe_id", user_id)
    : supabase
        .from("observations")
        .select("*")
        .eq("observe_id", user_id)
        .like("user_name", `%${query}%`);

  const { data: observations, error } = await supabaseQuery;

  if (error) {
    throw new CustomError({
      message: error.message,
    });
  }

  return observations;
};
