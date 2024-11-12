import { useParams } from "react-router";
import { useGetChat } from "./queries/useGetChat";
import { useTranslation } from "react-i18next";

export const ChatSidebar = () => {
  const { id } = useParams();
  const { data } = useGetChat({ chat_id: Number(id) });
  const { t } = useTranslation();

  return (
    <div
      className="h-full border-l 
     border-stone-200 dark:border-stone-50"
    >
      <div className="p-4 border-b border-stone-200">
        <h2 className="text-xl font-semibold">{t("messages.details")}</h2>
      </div>
    </div>
  );
};
