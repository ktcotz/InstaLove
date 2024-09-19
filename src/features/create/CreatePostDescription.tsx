import { ChangeEvent } from "react";
import { useUser } from "../authentication/queries/useUser";
import { AddMusic } from "../stories/AddMusic";
import { useTranslation } from "react-i18next";
import { Textarea } from "../../ui/Textarea";

type CreatePostDescriptionProps = {
  description: string;
  changeDescription: (description: string) => void;
  handleChange: (ev: ChangeEvent<HTMLTextAreaElement>) => void;
  options: { comments: boolean; likes: boolean };
  changeOptions: (ev: ChangeEvent<HTMLInputElement>) => void;
  handleAddMusic: (music: string) => void;
  type: "normal" | "storie";
};

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
      <Textarea
        changeDescription={changeDescription}
        description={description}
        handleChange={handleChange}
        type={type}
      />
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
            {t("create.comment")}
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
            {t("create.like")}
          </label>
        </div>
      </div>
      {type === "storie" && <AddMusic handleAddMusic={handleAddMusic} />}
    </div>
  );
};
