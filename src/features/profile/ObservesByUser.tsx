import { useState } from "react";
import { Loader } from "../../ui/Loader";
import { SearchInput } from "../../ui/SearchInput";
import { SubModalItem } from "../../ui/SubModalItem";
import { Wrapper } from "../../ui/Wrapper";
import { useGetObservesByUser } from "./queries/useGetObservesByUser";

type ObservesByUserProps = {
  user_id?: string;
};

export const ObservesByUser = ({ user_id }: ObservesByUserProps) => {
  const [query, setQuery] = useState("");
  const { observations, isLoading } = useGetObservesByUser({ user_id, query });

  const handleQuery = (value: string) => {
    setQuery(value);
  };

  return (
    <Wrapper modifier="submodal">
      <div className="flex flex-col items-center justify-center rounded-md shadow-lg bg-stone-100">
        <div className="w-full text-center py-4 border-b border-stone-300 ">
          <h2 className="font-semibold">Obserwowani</h2>
        </div>
        <div className="p-1 sm:p-3 w-full flex flex-col gap-3">
          <SearchInput query={query} handleQuery={handleQuery} />
          {isLoading && <Loader />}
          {!isLoading && observations!.length > 0 ? (
            observations?.map((observation) => (
              <SubModalItem
                key={observation.id}
                user_id={observation.observe_id}
              />
            ))
          ) : (
            <p className="text-sm text-stone-900 text-center">
              Profil nie obserwuje nikogo
            </p>
          )}
        </div>
      </div>
    </Wrapper>
  );
};
