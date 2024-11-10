import { useTranslation } from "react-i18next";
import { useAuth } from "../authentication/context/useAuth";
import { useGetChats } from "./queries/useGetChats";
import { Chat } from "./dashboard/Chat";

export const ChatBarUserChats = () => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const { data, isLoading } = useGetChats({ user_id: user?.id });

  if (!isLoading && data?.length === 0) return null;

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-stone-950 dark:text-stone-50 font-semibold text-xl">
        {t("messages.chats")}
      </h2>
      {data && (
        <div className="flex flex-col">
          {data.map((chat) => (
            <Chat chat={chat} key={chat.id} />
          ))}
        </div>
      )}
    </div>
  );
};
