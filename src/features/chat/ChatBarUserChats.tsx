import { useTranslation } from "react-i18next";
import { useAuth } from "../authentication/context/useAuth";
import { useGetChats } from "./queries/useGetChats";
import { Chat } from "./dashboard/Chat";
import { ChatBarSkeletonChats } from "./ChatBarSkeletonChats";

export const ChatBarUserChats = () => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const { data, isLoading } = useGetChats({ user_id: user?.id });

  if (isLoading)
    return (
      <div className="flex flex-wrap md:flex-col items-center md:items-start gap-4">
        <ChatBarSkeletonChats />
      </div>
    );

  if (!isLoading && data?.length === 0) return null;

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-stone-950 dark:text-stone-50 font-semibold text-xl">
        {t("messages.chats")}
      </h2>
      {data && (
        <div className="md:h-[420px] overflow-y-scroll flex flex-wrap md:flex-nowrap flex-row md:flex-col">
          {data.map((chat) => (
            <Chat chat={chat.chat_id} key={chat.chat_id} />
          ))}
        </div>
      )}
    </div>
  );
};
