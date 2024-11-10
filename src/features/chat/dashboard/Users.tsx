import { useParams } from "react-router";
import { CustomLink } from "../../../ui";
import { useAuth } from "../../authentication/context/useAuth";
import { ChatSupabaseUsersType } from "../schema/ChatSchema";
import { User } from "./User";
import { UsersImages } from "./UsersImages";

type UsersProps = {
  users: ChatSupabaseUsersType;
  type?: "chat" | "dashboard";
  chat?: number;
};

export const Users = ({ users, chat }: UsersProps) => {
  const { user } = useAuth();
  const { id } = useParams();

  const isActualActive = chat === Number(id);

  const usersWithoutCurrent = users.filter(
    (chatUser) => chatUser.user_id.user_id !== user?.id
  );

  if (chat) {
    return (
      <CustomLink
      
        type={isActualActive ? "active-link" : "link"}
        activeClass="bg-stone-200 dark:text-stone-950"
        to={String(chat)}
        modifier="chat-users"
      >
        <UsersImages users={usersWithoutCurrent} />
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
      </CustomLink>
    );
  }

  return (
    <div className=" p-6 border-b border-stone-300 dark:border-stone-50 flex items-center gap-2">
      <UsersImages users={usersWithoutCurrent} />
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
