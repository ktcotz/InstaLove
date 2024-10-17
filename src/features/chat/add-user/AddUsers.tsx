import { useTranslation } from "react-i18next";
import { Button, SearchInput } from "../../../ui";
import { useState } from "react";
import { useGetAllUsersByQuery } from "../../search/query/useGetAllUsersByQuery";
import { SearchUsersSkeleton } from "./SearchUsersSkeleton";
import { ChatAddUser } from "./ChatAddUsers";

export const AddUsers = () => {
  const [query, setQuery] = useState("");
  const { users, isLoading } = useGetAllUsersByQuery(query);

  const handleQuery = (newQuery: string) => {
    setQuery(newQuery);
  };

  const isDisabled = !users || users?.length === 0;

  console.log(users);

  const { t } = useTranslation();
  return (
    <div className="rounded-md shadow-lg bg-stone-100 dark:bg-stone-950">
      <h2 className="text-stone-950 dark:text-stone-50 text-center font-semibold py-4 border-b border-stone-300 dark:border-stone-50">
        {t("messages.addTitle")}
      </h2>
      <div className="border-b border-stone-300 dark:border-stone-50 p-4 flex flex-wrap gap-4 items-center">
        <span className="font-semibold">{t("messages.toFriend")}:</span>
        <div className="flex gap-4">
          <h1>ASD</h1>
        </div>
        <div className="min-w-48 md:min-w-96 grow">
          <SearchInput query={query} handleQuery={handleQuery} />
        </div>
      </div>
      <div className="h-[450px] overflow-y-scroll mb-4">
        <div className="p-4 flex flex-col gap-4">
          {isLoading && <SearchUsersSkeleton />}
          {!isLoading &&
            users &&
            users.length > 0 &&
            users.map((user) => <ChatAddUser key={user.id} {...user} />)}
          {!isLoading && users && users.length === 0 && (
            <p className="text-stone-800 dark:text-stone-50 text-sm">
              {t("messages.notFind")}
            </p>
          )}
        </div>
      </div>
      <Button
        modifier="add-chat"
        disabled={isDisabled}
        style={isDisabled ? { opacity: "50%" } : {}}
      >
        {t("messages.chat")}
      </Button>
    </div>
  );
};
