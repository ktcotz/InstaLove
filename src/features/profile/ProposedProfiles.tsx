import { useUser } from "../authentication/queries/useUser";
import { ProposedProfile } from "./ProposedProfile";
import { useProfiles } from "./queries/useProfiles";
import { Loader } from "../../ui/Loader";

export const ProposedProfiles = () => {
  const { user } = useUser();
  const { profiles, isLoading } = useProfiles({
    id: user?.id,
    limit: 5,
  });

  if (isLoading)
    return (
      <div className="py-4">
        <Loader />
      </div>
    );

  if (!profiles?.length) {
    return (
      <div className="text-sm text-center text-stone-700">
        No proposed profiles data to show you!
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 self-stretch">
      {profiles?.map((profile) => (
        <ProposedProfile key={profile.id} {...profile} />
      ))}
    </div>
  );
};
