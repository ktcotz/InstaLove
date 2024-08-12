import { useState } from "react";
import { SearchInput } from "../../ui/SearchInput";
import { Button } from "../../ui/Button";
import { useGetAllUsersByQuery } from "./query/useGetAllUsersByQuery";
import { Loader } from "../../ui/Loader";
import { SearchUser } from "./SearchUser";
import { SearchUserProfiles } from "./SearchUserProfiles";
import { useUser } from "../authentication/queries/useUser";

export const Search = () => {
  const [query, setQuery] = useState("");
  const { user: current } = useUser();
  const { users, isLoading } = useGetAllUsersByQuery(query);

  const handleQuery = (val: string) => {
    setQuery(val);
  };

  return (
    <div className="p-4">
      <h2 className="text-3xl font-semibold mb-4">Search</h2>
      <div className="relative mb-4">
        <SearchInput
          query={query}
          handleQuery={handleQuery}
          modifier="with-reset"
        />

        {query && (
          <div className="absolute top-1/2 pt-2 right-4 -translate-y-1/2">
            {isLoading ? (
              <Loader />
            ) : (
              <Button modifier="close" onClick={() => setQuery("")}>
                &times;
              </Button>
            )}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-1">
        {users?.map((user) => (
          <SearchUser key={user.id} {...user} currentID={current?.id} />
        ))}

        {!isLoading && users && users.length === 0 && (
          <p className="text-xl font-medium text-stone-950">Brak wyników</p>
        )}
      </div>
      {!query && <SearchUserProfiles />}
    </div>
  );
};
