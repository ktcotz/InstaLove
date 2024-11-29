import { MdOutlineInsertEmoticon, MdOutlineReply } from "react-icons/md";
import { Button } from "../../../ui";
import { Tooltip } from "react-tooltip";
import { useTranslation } from "react-i18next";

export const MessageActions = () => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center gap-1">
      <div className="relative">
        <Button
          modifier="close"
          data-tooltip-id="react"
          data-tooltip-place="top"
        >
          <MdOutlineInsertEmoticon className="text-xl" aria-label="Emoji" />
        </Button>
        <Tooltip id="react">{t("messages.reactMessage")}</Tooltip>
      </div>
      <div className="relative">
        <Button
          modifier="close"
          data-tooltip-id="reply"
          data-tooltip-place="top"
        >
          <MdOutlineReply className="text-xl" aria-label="Emoji" />
        </Button>
        <Tooltip id="reply">{t("messages.replyMessage")}</Tooltip>
      </div>
    </div>
  );
};
