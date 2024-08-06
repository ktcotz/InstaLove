import { User } from "@supabase/supabase-js";
import { Wrapper } from "../../ui/Wrapper";
import { useUser } from "../authentication/queries/useUser";
import { useProfiles } from "./queries/useProfiles";
import { Loader } from "../../ui/Loader";
import { SubModalItem } from "../../ui/SubModalItem";
import { usePagination } from "../../hooks/usePagination";
import { Pagination } from "../../ui/Pagination";

export const MAX_PROPOSED_PROFILES = 5;

export const AllProposedProfiles = () => {
  const { user } = useUser();
  const { currentPage, nextPage, previousPage } = usePagination();
  const { profiles, count, isLoading } = useProfiles({
    id: (user as User).id,
    page: currentPage,
  });

  return (
    <Wrapper modifier="submodal">
      <div className="flex flex-col items-center justify-center rounded-md shadow-lg bg-stone-100">
        <div className="w-full text-center py-4 border-b border-stone-300 ">
          <h2 className="font-semibold">Proponowani znajomi</h2>
        </div>
        <div className="p-1 sm:p-3 w-full flex flex-col gap-3">
          {isLoading && <Loader />}
          {!isLoading &&
            profiles?.map((profile) => (
              <SubModalItem key={profile.id} user_id={profile.user_id} />
            ))}

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
