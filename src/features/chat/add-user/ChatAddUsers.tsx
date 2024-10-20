import { FaCheck } from "react-icons/fa";
import { Button } from "../../../ui";
import { Profile } from "../../profile/schema/ProfilesSchema";

type ChatAddUserProps = {
  user: Profile;
  selectedUsers: Profile[];
  handleAddUser: (user: Profile) => void;
};

export const ChatAddUser = ({
  user,
  selectedUsers,
  handleAddUser,
}: ChatAddUserProps) => {
  const { user_id, avatar_url, user_name } = user;

  const isChecked = selectedUsers.find((user) => user.user_id === user_id);

  return (
    <Button
      className="flex items-center gap-6 hover:bg-stone-200 transition p-2"
      onClick={() => handleAddUser(user)}
    >
      <img
        src={avatar_url}
        alt={user_name}
        className="h-12 w-12 rounded-full"
      />
      <h2 className="text-sm text-stone-950 dark:text-stone-50">{user_name}</h2>

      <div
        className={`ml-auto h-10 w-10 rounded-full border border-stone-300 flex items-center justify-center ${
          isChecked ? "bg-black dark:bg-white" : ""
        }`}
      >
        {isChecked ? <FaCheck className="text-white dark:text-black" /> : null}
      </div>
    </Button>
  );
};
