import { useTranslation } from "react-i18next";
import { useAuth } from "../../authentication/context/useAuth";
import { ChatSchemaType, ChatSupabaseUsersType } from "../schema/ChatSchema";

import { UsersImages } from "../users/UsersImages";
import { CustomLink } from "../../../ui";
import { UsersChatNames } from "../users/UsersChatNames";

type IntroChatProps = {
  users: ChatSupabaseUsersType;
  chat: ChatSchemaType;
};

export const IntroChat = ({ users, chat }: IntroChatProps) => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const usersWithoutCurrent = users.filter(
    (chatUser) => chatUser.user_id.user_id !== user?.id
  );

  const isCreator = user?.id === chat?.created_by;

  console.log(usersWithoutCurrent);

  return (
    <div className="flex flex-col gap-2 items-center justify-center my-6">
      <div className="h-28 w-28">
        <UsersImages users={usersWithoutCurrent} />
      </div>
      <UsersChatNames usersWithoutCurrent={usersWithoutCurrent} />
      {isCreator && chat.type === "group" && (
        <p className="text-xs text-stone-700">{t("messages.createGroup")}</p>
      )}
      {chat.type === "chat" && (
        <CustomLink
          modifier="primary"
          to={`/dashboard/${usersWithoutCurrent[0].user_id.user_name}`}
        >
          {t("messages.seeProfile")}
        </CustomLink>
      )}
    </div>
  );
};
