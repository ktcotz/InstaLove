import { FormEvent, useState } from "react";
import { Button } from "../../../ui";
import { MdOutlineInsertEmoticon } from "react-icons/md";
import EmojiPicker, { Theme } from "emoji-picker-react";
import { useTernaryDarkMode } from "usehooks-ts";
import { useAuth } from "../../authentication/context/useAuth";
import { useAddMessage } from "../mutations/useAddMessage";

type AddChatMessageProps = {
  chatId: number;
};

export const AddChatMessage = ({ chatId }: AddChatMessageProps) => {
  const { user } = useAuth();
  const [message, setMessage] = useState("");
  const [showEmotes, setShowEmotes] = useState(false);
  const { isDarkMode } = useTernaryDarkMode();
  const { mutate } = useAddMessage();

  const handleAddMessage = (ev: FormEvent) => {
    ev.preventDefault();

    if (!user) return;

    mutate(
      { chatId, userId: user.id, message },
      {
        onSuccess: () => {
          setMessage("");
        },
      }
    );
  };

  return (
    <div className="bg-stone-50 p-4 absolute bottom-0 left-0 w-full h-14  flex items-center justify-center  z-50">
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
            className="w-full py-3 bg-transparent focus:outline-none text-base"
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
