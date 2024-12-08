import { MdOutlineInsertEmoticon, MdOutlineReply } from "react-icons/md";
import { Button } from "../../../ui";
import { Tooltip } from "react-tooltip";
import { useTranslation } from "react-i18next";
import { Profile } from "../../profile/schema/ProfilesSchema";
import { useMessages } from "./context/useMessages";
import { useEffect, useState } from "react";
import EmojiPicker, { Theme } from "emoji-picker-react";
import { useTernaryDarkMode } from "usehooks-ts";
import { useAddReaction } from "../mutations/useAddReaction";
import { useAuth } from "../../authentication/context/useAuth";

type MessageActionsProps = {
  user: Profile;
  message: string;
  isHover: boolean;
  isMyMessage: boolean;
  id: number;
};

export const MessageActions = ({
  user,
  message,
  isHover,
  isMyMessage,
  id,
}: MessageActionsProps) => {
  const { user: current } = useAuth();
  const { t } = useTranslation();
  const { setupReply } = useMessages();
  const [react, setReact] = useState(true);
  const { isDarkMode } = useTernaryDarkMode();
  const { addUserReaction } = useAddReaction({ message_id: id });

  useEffect(() => {
    if (!isHover) {
      setReact(false);
    }
  }, [isHover]);

  const addReaction = (emoji: string) => {
    if (!current) return;
    addUserReaction({ reaction: emoji, user_id: current.id, message_id: id });
  };

  return (
    <div className="flex items-center gap-1">
      <div className="relative flex items-center">
        {react && (
          <div
            className={`absolute -top-2 ${
              isMyMessage ? "-right-2" : "-left-2"
            } -translate-y-full`}
          >
            <EmojiPicker
              theme={isDarkMode ? Theme.DARK : Theme.LIGHT}
              searchDisabled={true}
              skinTonesDisabled={true}
              reactionsDefaultOpen={true}
              allowExpandReactions={false}
              className="z-50"
              onReactionClick={(emoji) => {
                addReaction(emoji.emoji);
              }}
            />
          </div>
        )}
        <Button
          modifier="close"
          data-tooltip-id="react"
          data-tooltip-place="top"
          onClick={() => setReact((prev) => !prev)}
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
