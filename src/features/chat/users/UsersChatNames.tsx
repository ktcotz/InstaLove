import { ChatSupabaseUsersType } from "../schema/ChatSchema";
import { User } from "../users/User";

type UsersChatNamesProps = {
  usersWithoutCurrent: ChatSupabaseUsersType;
};

export const UsersChatNames = ({
  usersWithoutCurrent,
}: UsersChatNamesProps) => {
  return (
    <div className="flex items-center flex-wrap gap-1">
      {usersWithoutCurrent.map((user, idx) => {
        const isLastElement = idx === usersWithoutCurrent.length - 1;

        return (
          <object key={user.user_id.user_name}>
            <User {...user} isLastElement={isLastElement} />
          </object>
        );
      })}
    </div>
  );
};
