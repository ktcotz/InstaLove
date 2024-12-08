import { MdOutlineInsertEmoticon, MdOutlineReply } from "react-icons/md";
import { Button } from "../../../ui";
import { Tooltip } from "react-tooltip";
import { useTranslation } from "react-i18next";
import { Profile } from "../../profile/schema/ProfilesSchema";
import { useMessages } from "./context/useMessages";

type MessageActionsProps = {
  user: Profile;
  message: string;
};

export const MessageActions = ({ user, message }: MessageActionsProps) => {
  const { t } = useTranslation();
  const { setupReply } = useMessages();

  console.log(user, message);

  return (
    <div className="flex items-center gap-1">
      <div className="relative flex items-center">
        <Button
          modifier="close"
          data-tooltip-id="react"
          data-tooltip-place="top"
        >
          <MdOutlineInsertEmoticon className="text-xl" aria-label="Emoji" />
        </Button>
        <Tooltip id="react">{t("messages.reactMessage")}</Tooltip>
      </div>
      <div className="relative flex items-center">
        <Button
          modifier="close"
          data-tooltip-id="reply"
          data-tooltip-place="top"
          onClick={() => setupReply({ user, message })}
        >
          <MdOutlineReply className="text-xl" aria-label="Emoji" />
        </Button>
        <Tooltip id="reply">{t("messages.replyMessage")}</Tooltip>
      </div>
    </div>
  );
};
