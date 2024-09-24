import { useRef, useState } from "react";
import { SearchInput } from "../../ui/SearchInput";
import { Button } from "../../ui/Button";
import { useGetAllUsersByQuery } from "./query/useGetAllUsersByQuery";
import { Loader } from "../../ui/Loader";
import { SearchUser } from "./SearchUser";
import { SearchUserProfiles } from "./SearchUserProfiles";
import { useUser } from "../authentication/queries/useUser";
import { useTranslation } from "react-i18next";
import { useMediaQuery, useOnClickOutside } from "usehooks-ts";

const MOBILE_VIEWPORT = "768px";

export const Search = () => {
  const isMobile = useMediaQuery(`(max-width:${MOBILE_VIEWPORT})`);

  const { t } = useTranslation();
  const [query, setQuery] = useState("");
  const { user: current } = useUser();
  const { users, isLoading } = useGetAllUsersByQuery(query);
  const [isFocused, setIsFocused] = useState(false);
  const ref = useRef(null);

  const handleQuery = (val: string) => {
    setQuery(val);
  };

  useOnClickOutside(ref, () => setIsFocused(false));

  return (
    <div className="relative">
      {!isMobile && (
        <h2 className="text-3xl mb-4 p-4 dark:text-stone-50">
          {t("navigation.search")}
        </h2>
      )}

      <div
        className={`relative py-4 px-1 sm:p-4 ${
          isMobile ? "" : "mb-4 border-b border-stone-200 dark:border-stone-50"
        }`}
      >
        <SearchInput
          query={query}
          handleQuery={handleQuery}
          modifier="with-reset"
          upFocus={() => setIsFocused(true)}
        />

        {query && (
          <div className="absolute top-1/2 pt-2 right-6 -translate-y-1/2 flex items-center justify-center">
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

      <div
        className={`flex flex-col gap-1 ${
          isMobile
            ? "absolute bottom-0 translate-y-full w-full z-50 bg-stone-50 dark:bg-stone-950 left-0"
            : ""
        }`}
      >
        <div className="flex flex-col gap-1 divide-y divide-stone-200 dark:divide-stone-50">
          {users?.map((user) => (
            <SearchUser key={user.id} {...user} currentID={current?.id} />
          ))}
        </div>

        {!isLoading && users && users.length === 0 && (
          <p className="text-xl font-medium text-stone-950 dark:text-stone-50 p-4">
            {t("search.empty")}
          </p>
        )}
      </div>

      {(isFocused || !isMobile) && !query && (
        <div
          ref={ref}
          className={`${
            isMobile
              ? "absolute bottom-0 translate-y-full left-0 w-full z-50 bg-stone-50 p-4 rounded-md dark:bg-stone-950"
              : ""
          }`}
        >
          <SearchUserProfiles />
        </div>
      )}
    </div>
  );
};
