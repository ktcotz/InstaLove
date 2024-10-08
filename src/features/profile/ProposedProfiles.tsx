import { ProposedProfile } from "./ProposedProfile";
import { useProfiles } from "./queries/useProfiles";
import { ProposedProfilesSkeleton } from "./ProposedProfilesSkeleton";
import { useTranslation } from "react-i18next";
import { useAuth } from "../authentication/context/useAuth";

const MAX_PROFILES = 5;

export const ProposedProfiles = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { profiles, isLoading } = useProfiles({
    id: user?.id,
    limit: MAX_PROFILES,
  });

  if (isLoading)
    return (
      <div className="py-4 flex flex-col w-full">
        <ProposedProfilesSkeleton />
      </div>
    );

  if (!profiles?.length) {
    return (
      <div className="text-sm text-center text-stone-700 dark:text-stone-50">
        {t("profile.noProposesFriends")}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 self-stretch">
      {profiles?.slice(0, MAX_PROFILES).map((profile) => (
        <ProposedProfile key={profile.id} profile={profile} />
      ))}
    </div>
  );
};
