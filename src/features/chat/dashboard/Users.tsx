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
  toggleSidebar?: () => void;
};

export const Users = ({ users, chat, toggleSidebar }: UsersProps) => {
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
        <div className="flex items-center gap-1">
          {usersWithoutCurrent.map((user, idx) => {
            const isLastElement = idx === usersWithoutCurrent.length - 1;

            return (
              <object key={user.user_id.user_name}>
                <User {...user} isLastElement={isLastElement} />
              </object>
            );
          })}
        </div>
      </CustomLink>
    );
  }

  return (
    <div className=" p-6 border-b border-stone-300 dark:border-stone-50 flex gap-2">
      <UsersImages users={usersWithoutCurrent} />
      <div className="flex items-center gap-1 ">
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
      <button onClick={toggleSidebar}>Pokaż</button>
    </div>
  );
};