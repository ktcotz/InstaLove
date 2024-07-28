import { User } from "@supabase/supabase-js";
import { useUser } from "../authentication/queries/useUser";
import { ProposedProfile } from "./ProposedProfile";
import { useProfiles } from "./queries/useProfiles";
import { Loader } from "../../ui/Loader";

export const ProposedProfiles = () => {
  const { user } = useUser();
  const { data, isLoading } = useProfiles((user as User).id);

  if (isLoading) return <Loader />;

  if (!data) {
    return (
      <div className="text-sm text-center text-stone-700">
        No proposed profiles data to show you!
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 self-stretch">
      {data?.map((profile) => (
        <ProposedProfile key={profile.id} {...profile} />
      ))}
    </div>
  );
};
