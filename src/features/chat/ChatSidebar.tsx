import { useParams } from "react-router";
import { useGetChat } from "./queries/useGetChat";
import { useTranslation } from "react-i18next";
import { Button, Modal, SubModalItem } from "../../ui";
import { ConfirmDelete } from "./ConfirmDelete";
import { useUser } from "../authentication/queries/useUser";
import { EditChatName } from "./edit/EditChatName";

export const ChatSidebar = () => {
  const { id } = useParams();
  const { user } = useUser();
  const { data } = useGetChat({ chat_id: Number(id) });
  const { t } = useTranslation();

  const chat = data?.data;

  return (
    <div
      className="flex flex-col h-full border-l 
      bg-stone-50 dark:bg-stone-950  border-stone-200 dark:border-stone-50"
    >
      <div className="p-4 border-b border-stone-200">
        <h2 className="text-xl font-semibold">{t("messages.details")}</h2>
      </div>

      {user?.id === chat?.created_by && (
        <div className="p-4">
          <EditChatName name={chat.name} chatId={Number(id)} />
        </div>
      )}

      <div className="p-2 mt-8 grow flex flex-col">
        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-50">
            {t("messages.users")}
          </h3>
          {data?.users.map((user) => (
            <SubModalItem
              user_id={user.user_id.user_id}
              key={user.user_id.user_id}
            />
          ))}
        </div>

        {user?.id === chat?.created_by && (
          <div className="py-4 border-t border-stone-200 dark:border-stone-50 mt-auto">
            <Modal.Open openClass={`delete-chat-${chat?.id}`}>
              <Button modifier="delete">
                {chat?.type === "chat"
                  ? t("messages.removeChat")
                  : t("messages.removeGroup")}
              </Button>
            </Modal.Open>
            <Modal.Content
              manageClass={`delete-chat-${chat?.id}`}
              parentClass="w-full mx-auto max-w-2xl px-4"
            >
              <ConfirmDelete chat_id={chat?.id} />
            </Modal.Content>
          </div>
        )}
      </div>
    </div>
  );
};
