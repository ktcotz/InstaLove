import { ChangeEvent, useState } from "react";
import { Button } from "./Button";
import { useMediaQuery } from "usehooks-ts";
import { MdOutlineInsertEmoticon } from "react-icons/md";
import EmojiPicker from "emoji-picker-react";
import { useTranslation } from "react-i18next";
import { PostOptions } from "../features/create/types";

const MIN_ROW_AREA = 5;
const MAX_ROW_AREA = 10;
const MOBILE_VIEWPORT = "768px";
export const MAX_LENGTH = 300;

type TextareaProps = {
  description: string;
  changeDescription: (description: string) => void;
  handleChange: (ev: ChangeEvent<HTMLTextAreaElement>) => void;
  max?: number;
  type?: PostOptions;
};

export const Textarea = ({
  description,
  handleChange,
  changeDescription,
  max = MAX_LENGTH,
  type = "normal",
}: TextareaProps) => {
  const { t } = useTranslation();
  const [showEmotes, setShowEmotes] = useState(false);
  const isMobile = useMediaQuery(`(max-width:${MOBILE_VIEWPORT})`);

  return (
    <div className="relative">
      <label htmlFor="description" className="sr-only">
        {t("create.description")}
      </label>
      <textarea
        placeholder={t("create.area")}
        className="w-full overflow-scroll px-2 pt-2 pb-8 resize-none"
        rows={isMobile || type === "storie" ? MIN_ROW_AREA : MAX_ROW_AREA}
        value={description}
        onChange={handleChange}
        id="description"
      ></textarea>
      <div className="absolute bottom-0 left-0 w-full h-8 px-2 flex items-center border-b border-stone-300 justify-between bg-stone-50">
        <Button
          modifier="close"
          onClick={() => setShowEmotes((prev) => !prev)}
          aria-label="Emoji picker"
        >
          <MdOutlineInsertEmoticon className="text-xl" aria-label="Emoji" />
        </Button>
        {showEmotes && (
          <EmojiPicker
            height={400}
            width={300}
            searchDisabled={true}
            skinTonesDisabled={true}
            onEmojiClick={({ emoji }) => {
              if (description.length >= max) return;
              changeDescription(emoji);
            }}
          />
        )}
        <p className="text-xs text-stone-600">
          {description.length}/{max}
        </p>
      </div>
    </div>
  );
};
