import { FormEvent, useState } from "react";
import { Button } from "../../../ui";
import { MdOutlineInsertEmoticon } from "react-icons/md";
import EmojiPicker, { Theme } from "emoji-picker-react";
import { useTernaryDarkMode } from "usehooks-ts";
import { useAuth } from "../../authentication/context/useAuth";
import { useAddMessage } from "../mutations/useAddMessage";
import { useMessages } from "./context/useMessages";
import { useTranslation } from "react-i18next";
import { TfiClose } from "react-icons/tfi";

type AddChatMessageProps = {
  chatId: number;
};

export const AddChatMessage = ({ chatId }: AddChatMessageProps) => {
  const { user } = useAuth();
  const [message, setMessage] = useState("");
  const [showEmotes, setShowEmotes] = useState(false);
  const { isDarkMode } = useTernaryDarkMode();
  const { mutate } = useAddMessage({ chatId });
  const { reply, reset } = useMessages();
  const { t } = useTranslation();

  const handleAddMessage = (ev: FormEvent) => {
    ev.preventDefault();

    if (!user) return;

    mutate(
      { chatId, userId: user.id, message, reply },
      {
        onSuccess: () => {
          setMessage("");
          reset();
        },
      }
    );
  };

  return (
    <div className="bg-stone-100 dark:bg-stone-950 p-4 absolute bottom-0 left-0 w-full h-14  flex flex-col items-center justify-center  z-50">
      {reply?.user && (
        <div className="bg-stone-50 dark:bg-stone-800 absolute top-0 left-0 w-full p-4 border-t border-stone-300 -translate-y-full">
          <div className="flex items-center justify-between gap-2 mb-2">
            <p className="text-sm dark:text-stone-300">
              {t("messages.replyUserMessage")}:
              <strong>{reply.user.user_name}</strong>
            </p>
            <Button modifier="close" onClick={reset}>
              <TfiClose className="text-sm" />
            </Button>
          </div>
          <p className="text-sm text-stone-700 dark:text-stone-200">
            {reply.message}
          </p>
        </div>
      )}
      <div className="flex items-center gap-3 w-full  px-3 border border-stone-300 rounded-full">
        <Button
          modifier="close"
          onClick={() => setShowEmotes((prev) => !prev)}
          aria-label="Emoji picker"
        >
          <MdOutlineInsertEmoticon className="text-xl" aria-label="Emoji" />
        </Button>
        {showEmotes && (
          <div className="absolute top-0 left-0 -translate-y-full">
            <EmojiPicker
              height={400}
              width={300}
              theme={isDarkMode ? Theme.DARK : Theme.LIGHT}
              searchDisabled={true}
              skinTonesDisabled={true}
              className="z-50"
              onEmojiClick={(emoji) => {
                setMessage((prevMessage) => prevMessage + emoji.emoji);
              }}
            />
          </div>
        )}
        <form
          className="relative h-full w-full flex"
          onSubmit={handleAddMessage}
        >
          <input
            name="message"
            value={message}
            placeholder="Wyślij wiadomość..."
            className="w-full py-3 bg-transparent focus:outline-none text-base dark:text-stone-50"
            onChange={(ev) => setMessage(ev.target.value)}
          />
          <div className="mx-4 flex items-center justify-center">
            <Button modifier="close">Wyślij</Button>
          </div>
        </form>
      </div>
    </div>
  );
};
