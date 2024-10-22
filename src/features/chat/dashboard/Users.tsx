import { useAuth } from "../../authentication/context/useAuth";
import { ChatSupabaseUsersType } from "../schema/ChatSchema";
import { User } from "./User";

type UsersProps = {
  users: ChatSupabaseUsersType;
};

export const Users = ({ users }: UsersProps) => {
  const { user } = useAuth();

  const usersWithoutCurrent = users.filter(
    (chatUser) => chatUser.user_id.user_id !== user?.id
  );

  return (
    <div className="p-6 border-b border-stone-300 dark:border-stone-50 flex items-center gap-1">
      {usersWithoutCurrent.map((user, idx) => {
        const isLastElement = idx === usersWithoutCurrent.length - 1;

        return (
          <User
            {...user}
            key={user.user_id.user_name}
            isLastElement={isLastElement}
          />
        );
      })}
    </div>
  );
};
