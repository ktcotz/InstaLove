import { Tooltip } from "react-tooltip";
import { Button, CustomLink, Modal } from "../../../ui";
import { Profile } from "../../profile/schema/ProfilesSchema";
import { ChatSchemaType } from "../schema/ChatSchema";
import { useHover } from "../../profile/hooks/useHover";
import { MessageActions } from "./MessageActions";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../authentication/context/useAuth";
import { useGetReactions } from "../queries/useGetReactions";

type MessageProps = {
  message: string;
  user_id: Profile;
  chat_id: ChatSchemaType;
  reply_user: Profile | null;
  reply_message: string;
  created_at: string;
  id: number;
};

export const Message = ({
  id,
  message,
  user_id,
  reply_message,
  reply_user,
}: MessageProps) => {
  const { user } = useAuth();
  const isMyMessage = user_id.user_id === user?.id;
  const { hover, isHover, unhover } = useHover();
  const { t } = useTranslation();
  const { reactions } = useGetReactions({ message_id: id });

  console.log(reactions);

  return (
    <div
      className={`flex flex-col gap-2 relative w-fit ${
        isMyMessage ? "self-end" : "self-start"
      }`}
      onMouseEnter={hover}
      onMouseLeave={unhover}
      onTouchStart={hover}
      onTouchEnd={unhover}
    >
      {isMyMessage && reply_message && reply_user && (
        <div className="border border-stone-300 p-4 rounded-md flex flex-col gap-1">
          <p className="text-sm">
            {reply_user.user_id === user_id.user_id
              ? t("messages.repliedYourself")
              : `${t("messages.replied")} ${reply_user.user_name}`}
          </p>
          <p className="text-sm text-stone-600">{reply_message}</p>
        </div>
      )}
      <div className="relative flex items-center gap-2">
        {!isMyMessage && (
          <>
            <CustomLink
              to={`/dashboard/${user_id.user_name}`}
              modifier="avatar"
              data-tooltip-id={`user-${user_id.user_name}`}
              data-tooltip-place="top"
            >
              <img src={user_id.avatar_url} alt={user_id.user_name} />
            </CustomLink>
            <Tooltip id={`user-${user_id.user_name}`}>
              {user_id.user_name}
            </Tooltip>
          </>
        )}
        <div
          className={`${
            isMyMessage
              ? "bg-blue-600 text-white"
              : "bg-stone-200 text-stone-950"
          } relative p-2 rounded-md`}
        >
          <p>{message}</p>
          {reactions && reactions.length > 0 && (
            <div className="text-xs absolute bottom-0 right-0 translate-x-1/3 translate-y-3/4 p-1 rounded-full bg-stone-100">
              <Modal.Open openClass={`message-${id}-reactions`}>
                <Button modifier="close">
                  {reactions[reactions.length - 1].reaction}
                </Button>
              </Modal.Open>
              <Modal.Content
                manageClass={`message-${id}-reactions`}
                parentClass="mx-auto max-w-lg mt-14"
              >
                <h1>ASD</h1>
              </Modal.Content>
            </div>
          )}
        </div>

        <div
          className={`absolute h-full top-0 flex items-center transition ${
            isMyMessage
              ? "-left-2 -translate-x-full"
              : "-right-2 translate-x-full"
          } ${isHover ? "opacity-1" : "opacity-0"}`}
        >
          <MessageActions
            id={id}
            user={user_id}
            message={message}
            isHover={isHover}
            isMyMessage={isMyMessage}
          />
        </div>
      </div>
    </div>
  );
};
