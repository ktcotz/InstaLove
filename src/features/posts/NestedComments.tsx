import { useState } from "react";
import { Button } from "../../ui/Button";
import { OnlyComments } from "./schema/CommentSchema";
import { Comment } from "./Comment";
import { useTranslation } from "react-i18next";

type NestedCommentsProps = {
  comments: OnlyComments;
  parentComment?: number;
};

export const NestedComments = ({
  comments,
  parentComment,
}: NestedCommentsProps) => {
  const [showComments, setShowComments] = useState(false);
  const { t } = useTranslation();

  return (
    <div className="pl-4">
      <div className="flex items-center gap-2 mb-4">
        <span className="block w-5 h-[1px] bg-slate-600 dark:bg-slate-200">
          &nbsp;
        </span>
        <Button
          modifier="close"
          onClick={() => setShowComments((prev) => !prev)}
        >
          <span className="text-slate-600 text-xs dark:text-slate-200">
            {!showComments
              ? `${t("posts.showComments")} (${comments.length})`
              : `${t("posts.hideReplies")}`}
          </span>
        </Button>
      </div>
      {showComments && (
        <div className="flex flex-col gap-2">
          {comments.map((comment) => (
            <Comment
              key={comment.id}
              {...comment}
              parentComment={parentComment}
            />
          ))}
        </div>
      )}
    </div>
  );
};
