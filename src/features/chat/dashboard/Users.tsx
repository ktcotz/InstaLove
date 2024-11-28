import { useNavigate, useParams } from "react-router";
import { Button, CustomLink } from "../../../ui";
import { useAuth } from "../../authentication/context/useAuth";
import { ChatSupabaseUsersType } from "../schema/ChatSchema";
import { UsersImages } from "./UsersImages";
import { useMediaQuery } from "usehooks-ts";
import { HiArrowLeft, HiOutlineInformationCircle } from "react-icons/hi";
import { GlobalRoutes } from "../../../typing/routes";
import { UsersChatNames } from "./UsersChatNames";

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
        <div className="h-14 w-14">
          <UsersImages users={usersWithoutCurrent} />
        </div>
        <UsersChatNames usersWithoutCurrent={usersWithoutCurrent} />
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
      <div className="h-14 w-14">
        <UsersImages users={usersWithoutCurrent} />
      </div>
      {name ? (
        <div className="flex items-center gap-1">
          <p className="font-semibold text-sm truncate ">{name}</p>
        </div>
      ) : (
        <UsersChatNames usersWithoutCurrent={usersWithoutCurrent} />
      )}
      <div className="ml-auto text-2xl flex items-center justify-center">
        <Button modifier="close" onClick={toggleSidebar}>
          <HiOutlineInformationCircle />
        </Button>
      </div>
    </div>
  );
};
