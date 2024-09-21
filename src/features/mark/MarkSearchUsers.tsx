import { SearchInput } from "../../ui";
import { useGetAllUsersByQuery } from "../search/query/useGetAllUsersByQuery";
import { SearchUser } from "../search/SearchUser";

type MarkSearchUsersProps = {
  query: string;
  handleQuery: (query: string) => void;
  handleChoosenUser: (name: string) => void;
};

export const MarkSearchUsers = ({
  query,
  handleQuery,
  handleChoosenUser,
}: MarkSearchUsersProps) => {
  const { users } = useGetAllUsersByQuery(query);

  return (
    <div className="relative bg-stone-50 w-full max-w-64 sm:max-w-96  min-h-24 shadow-lg rounded-md top-1/2 left-1/2 -translate-x-1/2 ">
      <SearchInput query={query} handleQuery={handleQuery} />

      {users && users.length > 0 && (
        <div className="flex flex-col gap-1 divide-y divide-stone-200 text-left">
          {users?.map((user) => (
            <SearchUser
              key={user.id}
              {...user}
              handleChoosenUser={handleChoosenUser}
              isMarkable={true}
            />
          ))}
        </div>
      )}
    </div>
  );
};
