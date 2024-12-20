import { useTranslation } from "react-i18next";
import { Button, Loader, SearchInput } from "../../../ui";
import { useEffect, useState } from "react";
import { useGetAllUsersByQuery } from "../../search/query/useGetAllUsersByQuery";
import { SearchUsersSkeleton } from "./SearchUsersSkeleton";
import { ChatAddUser } from "./ChatAddUsers";
import { Profile } from "../../profile/schema/ProfilesSchema";
import { UsersPreview } from "./UsersPreview";
import { useCreateChat } from "../mutations/useCreateChat";
import { useAuth } from "../../authentication/context/useAuth";
import { useUserByID } from "../../authentication/queries/useUserByID";

type AddUsersProps = {
  clickedUser?: Profile;
  name: string | null;
};

export const AddUsers = ({ clickedUser, name }: AddUsersProps) => {
  const { user: current } = useAuth();
  const [query, setQuery] = useState("");
  const { users, isLoading } = useGetAllUsersByQuery(query);
  const [selectedUsers, setSelectedUsers] = useState<Profile[]>(() => {
    if (clickedUser) {
      return [clickedUser];
    }

    return [];
  });
  const { user } = useUserByID(current?.id);

  useEffect(() => {
    if (name) {
      setQuery(name);
    }
  }, [name]);

  const handleAddUser = (user: Profile) => {
    const isAlreadyInSelected = selectedUsers.find(
      (selectedUser) => selectedUser.user_id === user.user_id
    );

    setSelectedUsers((prev) =>
      isAlreadyInSelected
        ? selectedUsers.filter(
            (selectedUser) => selectedUser.user_id !== user.user_id
          )
        : [...prev, user]
    );
    setQuery("");
  };

  const { create, isPending } = useCreateChat();

  const handleQuery = (newQuery: string) => {
    setQuery(newQuery);
  };

  const addChat = () => {
    if (!current || !user) return;

    const type = selectedUsers.length === 1 ? "chat" : "group";

    const mappedSelectedUsers = [...selectedUsers, user];

    create({
      created_by: current.id,
      type,
      selectedUsers: mappedSelectedUsers,
    });
  };

  const handleRemoveUser = (id: string) => {
    setSelectedUsers(
      selectedUsers.filter((selectedUser) => selectedUser.user_id !== id)
    );
  };

  const isDisabled = !selectedUsers || selectedUsers?.length === 0;

  const { t } = useTranslation();
  return (
    <div className="rounded-md shadow-lg bg-stone-100 dark:bg-stone-950">
      <h2 className="text-stone-950 dark:text-stone-50 text-center font-semibold py-4 border-b border-stone-300 dark:border-stone-50">
        {t("messages.addTitle")}
      </h2>
      <div className="border-b border-stone-300 dark:border-stone-50 p-4 flex flex-wrap gap-4 items-center">
        <span className="font-semibold">{t("messages.toFriend")}:</span>
        {selectedUsers.length > 0 ? (
          <div className="flex gap-4 flex-wrap">
            <UsersPreview
              selectedUsers={selectedUsers}
              handleRemoveUser={handleRemoveUser}
            />
          </div>
        ) : null}
        <div className="min-w-48 md:min-w-96 grow">
          <SearchInput query={query} handleQuery={handleQuery} />
        </div>
      </div>
      <div className="h-[450px] overflow-y-scroll mb-4">
        <div className="flex flex-col gap-1">
          {isLoading && <SearchUsersSkeleton />}
          {!isLoading &&
            users &&
            users.length > 0 &&
            users.map((user) => (
              <ChatAddUser
                key={user.id}
                user={user}
                selectedUsers={selectedUsers}
                handleAddUser={handleAddUser}
              />
            ))}
          {!isLoading && users && users.length === 0 && (
            <p className="text-stone-800 dark:text-stone-50 text-sm p-4">
              {t("messages.notFind")}
            </p>
          )}
        </div>
      </div>
      <Button
        onClick={addChat}
        modifier="add-chat"
        disabled={isDisabled}
        style={isDisabled ? { opacity: "50%" } : {}}
      >
        {isPending ? <Loader /> : t("messages.chat")}
      </Button>
    </div>
  );
};
