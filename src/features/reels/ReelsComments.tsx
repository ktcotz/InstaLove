import { useTranslation } from "react-i18next";
import { AddComment } from "../posts/AddComment";
import { Comment } from "../posts/Comment";
import { Comment as CommentSchema } from "../posts/schema/CommentSchema";

type ReelsCommentsProps = {
  user_id: string;
  id: number;
  comments: CommentSchema[];
};

export const ReelsComments = ({
  user_id,
  id,
  comments,
}: ReelsCommentsProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center rounded-md shadow-lg bg-stone-100 py-4 dark:bg-stone-950">
      <div className="w-full text-center py-4 border-b border-stone-300 dark:border-stone-50 ">
        <h2 className="font-semibold dark:text-stone-50">
          {t("posts.comments")}
        </h2>
      </div>

      <div className="p-1 sm:p-3 w-full flex flex-col gap-3 mb-4">
        {comments.map((comment) => (
          <Comment {...comment} />
        ))}
      </div>

      <div className="w-full">
        <AddComment user_id={user_id} post_id={id} />
      </div>
    </div>
  );
};
