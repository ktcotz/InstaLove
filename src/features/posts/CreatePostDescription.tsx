import { ChangeEvent, useState } from "react";
import { useUser } from "../authentication/queries/useUser";
import { MdOutlineInsertEmoticon } from "react-icons/md";
import EmojiPicker from "emoji-picker-react";
import { Button } from "../../ui/Button";
import { useMediaQuery } from "usehooks-ts";

export const MAX_LENGTH = 300;

type CreatePostDescriptionProps = {
  description: string;
  changeDescription: (description: string) => void;
  handleChange: (ev: ChangeEvent<HTMLTextAreaElement>) => void;
  options: { comments: boolean; likes: boolean };
  changeOptions: (ev: ChangeEvent<HTMLInputElement>) => void;
};

export const CreatePostDescription = ({
  description,
  handleChange,
  changeDescription,
  options,
  changeOptions,
}: CreatePostDescriptionProps) => {
  const isMobile = useMediaQuery("(max-width:768px)");
  const { user } = useUser();
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
          className="rounded-full"
        />
        <h2 className="font-medium text-sm">{user?.user_metadata.user_name}</h2>
      </div>
      <div className="relative">
        <textarea
          placeholder="Dodaj opis..."
          className="w-full overflow-scroll px-2 pt-2 pb-8 resize-none"
          rows={isMobile ? 5 : 10}
          value={description}
          onChange={handleChange}
        ></textarea>
        <div className="absolute bottom-0 left-0 w-full h-8 px-2 flex items-center border-b border-stone-300 justify-between bg-stone-50">
          <Button
            modifier="close"
            onClick={() => setShowEmotes((prev) => !prev)}
          >
            <MdOutlineInsertEmoticon className="text-xl" />
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
      <div className="py-4 flex flex-col gap-2">
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
    </div>
  );
};
