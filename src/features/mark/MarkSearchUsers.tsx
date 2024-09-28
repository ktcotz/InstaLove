import { IoClose } from "react-icons/io5";
import { Button, SearchInput } from "../../ui";
import { useGetAllUsersByQuery } from "../search/query/useGetAllUsersByQuery";
import { SearchUser } from "../search/SearchUser";
import { MarkDTO } from "./schema/MarkSchema";
import { useTranslation } from "react-i18next";

type MarkSearchUsersProps = {
  query: string;
  handleQuery: (query: string) => void;
  handleChoosenUser: (mark: MarkDTO) => void;
  reset: () => void;
  position: { x: number; y: number };
};

export const MarkSearchUsers = ({
  query,
  handleQuery,
  handleChoosenUser,
  reset,
  position,
}: MarkSearchUsersProps) => {
  const { users } = useGetAllUsersByQuery(query);
  const { t } = useTranslation();

  return (
    <div className="relative bg-stone-50 dark:bg-stone-950 z-50 w-full max-w-64 sm:max-w-96  min-h-24 shadow-lg rounded-md top-1/2 left-1/2 -translate-x-1/2 ">
      <div className="grid grid-cols-[1fr_auto]">
        <SearchInput query={query} handleQuery={handleQuery} />
        <div className="px-4 flex items-center justify-center">
          <Button
            modifier="close"
            onClick={(e) => {
              e.stopPropagation();
              reset();
            }}
            aria-label={t("mark.removeAll")}
          >
            <IoClose aria-label={t("mark.removeAll")} />
          </Button>
        </div>
      </div>
      {users && users.length > 0 ? (
        <div className="flex flex-col gap-1 divide-y divide-stone-200 dark:divide-stone-50 text-left">
          {users?.map((user) => (
            <SearchUser
              key={user.id}
              {...user}
              handleChoosenUser={handleChoosenUser}
              isMarkable={true}
              position={position}
            />
          ))}
        </div>
      ) : (
        <p className="py-2 font-semibold text-sm dark:text-stone-200 text-center">
          {t("mark.search")}
        </p>
      )}
    </div>
  );
};
