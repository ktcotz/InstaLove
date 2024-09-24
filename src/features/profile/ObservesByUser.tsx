import { useState } from "react";
import { Loader } from "../../ui/Loader";
import { SearchInput } from "../../ui/SearchInput";
import { SubModalItem } from "../../ui/SubModalItem";
import { useGetObservesByUser } from "./queries/useGetObservesByUser";
import { useTranslation } from "react-i18next";

type ObservesByUserProps = {
  user_id?: string;
};

export const ObservesByUser = ({ user_id }: ObservesByUserProps) => {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");
  const { observations, isLoading } = useGetObservesByUser({ user_id, query });

  const handleQuery = (value: string) => {
    setQuery(value);
  };

  console.log(observations);

  return (
    <div className="mx-auto max-w-lg">
      <div className="flex flex-col items-center justify-center rounded-md shadow-lg bg-stone-100">
        <div className="w-full text-center py-4 border-b border-stone-300 ">
          <h2 className="font-semibold">{t("profile.byobservers")}</h2>
        </div>
        <div className="p-1 sm:p-3 w-full flex flex-col gap-3">
          <div className="mt-4">
            <SearchInput query={query} handleQuery={handleQuery} />
          </div>

          {isLoading && (
            <div className="flex items-center justify-center py-4">
              <Loader />
            </div>
          )}
          {!isLoading && observations.length === 0 && (
            <p className="text-sm text-stone-900 text-center py-4">
              {t("profile.noobserved")}
            </p>
          )}
          {!isLoading &&
            observations!.length > 0 &&
            observations?.map((observation) => (
              <SubModalItem
                key={observation.id}
                user_id={observation.observe_id}
              />
            ))}
        </div>
      </div>
    </div>
  );
};
