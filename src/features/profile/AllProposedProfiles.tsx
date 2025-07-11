import { User } from "@supabase/supabase-js";
import { Wrapper } from "../../ui/Wrapper";
import { useUser } from "../authentication/queries/useUser";
import { useProfiles } from "./queries/useProfiles";
import { SubModalItem } from "../../ui/SubModalItem";
import { usePagination } from "../../hooks/usePagination";
import { Pagination } from "../../ui/Pagination";
import { useTranslation } from "react-i18next";
import { ProposedProfilesSkeleton } from "./ProposedProfilesSkeleton";

export const MAX_PROPOSED_PROFILES = 5;

export const AllProposedProfiles = () => {
  const { t } = useTranslation();
  const { user } = useUser();
  const { currentPage, nextPage, previousPage } = usePagination();
  const { profiles, count, isLoading } = useProfiles({
    id: (user as User).id,
    page: currentPage,
  });

  return (
    <Wrapper modifier="submodal">
      <div className="flex flex-col items-center justify-center rounded-md shadow-lg bg-stone-100 dark:bg-stone-950">
        <div className="w-full text-center py-4 border-b border-stone-300 dark:border-stone-50 ">
          <h2 className="font-semibold dark:text-stone-50">
            {t("profile.proposesFriends")}
          </h2>
        </div>
        <div className="p-1 sm:p-3 w-full flex flex-col gap-3">
          {isLoading && (
            <div className="flex flex-col justify-center gap-4 p-2">
              <ProposedProfilesSkeleton />
            </div>
          )}
          {!isLoading &&
            profiles &&
            profiles.length > 0 &&
            profiles.map((profile) => (
              <SubModalItem key={profile.id} user_id={profile.user_id} />
            ))}

          {!isLoading && !profiles?.length && (
            <div className="flex items-center justify-center p-4">
              <p>{t("profile.noProposesFriends")}</p>
            </div>
          )}

          {count && count > MAX_PROPOSED_PROFILES && (
            <Pagination
              currentPage={currentPage}
              max={Math.ceil(count / MAX_PROPOSED_PROFILES)}
              nextPage={() =>
                nextPage(Math.ceil(count / MAX_PROPOSED_PROFILES))
              }
              previousPage={previousPage}
            />
          )}
        </div>
      </div>
    </Wrapper>
  );
};
