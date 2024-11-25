import { useState } from "react";
import { Button } from "../../../ui";
import { MdOutlineInsertEmoticon } from "react-icons/md";
import EmojiPicker, { Theme } from "emoji-picker-react";
import { useTernaryDarkMode } from "usehooks-ts";

export const AddChatMessage = () => {
  const [message, setMessage] = useState("");
  const [showEmotes, setShowEmotes] = useState(false);
  const { isDarkMode } = useTernaryDarkMode();

  return (
    <div className="bg-stone-50 p-4 absolute bottom-0 left-0 w-full h-14  flex items-center justify-center  z-50">
      <div className="flex items-center gap-3 w-full p-3 border border-stone-300 rounded-full">
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
        <input
          name="message"
          value={message}
          placeholder="Wyślij wiadomość..."
          className="w-full focus:outline-none text-base"
          onChange={(ev) => setMessage(ev.target.value)}
        />
      </div>
    </div>
  );
};
