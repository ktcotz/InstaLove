import { useNavigate, useParams } from "react-router";
import { Button, CustomLink } from "../../../ui";
import { useAuth } from "../../authentication/context/useAuth";
import { ChatSupabaseUsersType } from "../schema/ChatSchema";
import { User } from "./User";
import { UsersImages } from "./UsersImages";
import { useMediaQuery } from "usehooks-ts";
import { HiArrowLeft, HiOutlineInformationCircle } from "react-icons/hi";
import { GlobalRoutes } from "../../../typing/routes";

type UsersProps = {
  users: ChatSupabaseUsersType;
  name?: string;
  type?: "chat" | "dashboard";
  chat?: number;
  toggleSidebar?: () => void;
};

export const Users = ({ users, chat, toggleSidebar, name }: UsersProps) => {
  const { user } = useAuth();
  const { id } = useParams();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const navigate = useNavigate();

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
      </CustomLink>
    );
  }

  return (
    <div className=" p-6 border-b border-stone-300 dark:border-stone-50 flex gap-2">
      {isMobile && (
        <div className="mr-4 flex items-center justify-center">
          <Button
            modifier="close"
            onClick={() => navigate(GlobalRoutes.DashboardMessages)}
          >
            <HiArrowLeft />
          </Button>
        </div>
      )}
      <UsersImages users={usersWithoutCurrent} />
      {name ? (
        <div className="flex items-center gap-1">
          <p className="font-semibold text-sm truncate ">{name}</p>
        </div>
      ) : (
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
      )}
      <div className="ml-auto text-2xl flex items-center justify-center">
        <Button modifier="close" onClick={toggleSidebar}>
          <HiOutlineInformationCircle />
        </Button>
      </div>
    </div>
  );
};
