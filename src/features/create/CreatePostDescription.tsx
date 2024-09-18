import { ChangeEvent, useState } from "react";
import { useUser } from "../authentication/queries/useUser";
import { MdOutlineInsertEmoticon } from "react-icons/md";
import EmojiPicker from "emoji-picker-react";
import { Button } from "../../ui/Button";
import { useMediaQuery } from "usehooks-ts";
import { AddMusic } from "../stories/AddMusic";
import { useTranslation } from "react-i18next";

export const MAX_LENGTH = 300;

const MIN_ROW_AREA = 5;
const MAX_ROW_AREA = 10;

type CreatePostDescriptionProps = {
  description: string;
  changeDescription: (description: string) => void;
  handleChange: (ev: ChangeEvent<HTMLTextAreaElement>) => void;
  options: { comments: boolean; likes: boolean };
  changeOptions: (ev: ChangeEvent<HTMLInputElement>) => void;
  handleAddMusic: (music: string) => void;
  type: "normal" | "storie";
};

const MOBILE_VIEWPORT = "768px";

export const CreatePostDescription = ({
  description,
  handleChange,
  changeDescription,
  options,
  changeOptions,
  type,
  handleAddMusic,
}: CreatePostDescriptionProps) => {
  const { t } = useTranslation();
  const { user } = useUser();
  const isMobile = useMediaQuery(`(max-width:${MOBILE_VIEWPORT})`);
  const [showEmotes, setShowEmotes] = useState(false);

  if (!user) return null;

  return (
    <div className="col-start-1 col-end-3 md:col-start-auto md:col-end-auto md:border-r border-stone-300 p-4 text-left">
      <div className="flex items-center gap-4 mb-4">
        <img
          src={user?.user_metadata.avatar_url}
          alt={user?.user_metadata.user_name}
          width={32}
          height={32}
          className="rounded-full w-8 h-8"
        />
        <h2 className="font-semibold text-sm">
          {user?.user_metadata.user_name}
        </h2>
      </div>
      <div className="relative">
        <label htmlFor="description" className="sr-only">
          {t("create.description")}
        </label>
        <textarea
          placeholder={t("create.area")}
          className="w-full overflow-scroll px-2 pt-2 pb-8 resize-none"
          rows={isMobile ? MIN_ROW_AREA : MAX_ROW_AREA}
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
                if (description.length >= MAX_LENGTH) return;
                changeDescription(emoji);
              }}
            />
          )}
          <p className="text-xs text-stone-600">
            {description.length}/{MAX_LENGTH}
          </p>
        </div>
      </div>
      <div className="py-4 flex flex-col gap-2 mb-4">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="comments"
            id="comments"
            className="w-4 h-4"
            defaultChecked={options.comments}
            onChange={changeOptions}
          />
          <label htmlFor="comments" className="text-sm text-stone-600">
            Wyłącz komentowanie
          </label>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="likes"
            id="likes"
            className="w-4 h-4"
            defaultChecked={options.likes}
            onChange={changeOptions}
          />
          <label htmlFor="likes" className="text-sm text-stone-600">
            Ukryj liczby polubień
          </label>
        </div>
      </div>
      {type === "storie" && <AddMusic handleAddMusic={handleAddMusic} />}
    </div>
  );
};
