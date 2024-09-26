import { useTranslation } from "react-i18next";
import { SubModalItem } from "../../ui/SubModalItem";
import { Likes as LikesSchema } from "./schema/LikeSchema";

type LikesProps = {
  likes: LikesSchema;
};

export const Likes = ({ likes }: LikesProps) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center justify-center rounded-md shadow-lg bg-stone-100 dark:bg-stone-950">
      <div className="w-full text-center py-4 border-b border-stone-300 dark:border-stone-50">
        <h2 className="font-semibold dark:text-stone-50">
          {t("posts.likesTitle")}
        </h2>
      </div>
      <div className="p-1 sm:p-3 w-full flex flex-col gap-3">
        {likes.map((like) => (
          <SubModalItem key={like.id} user_id={like.user_id} />
        ))}
      </div>
    </div>
  );
};
