import { Button } from "../../ui/Button";
import { FaRegHeart, FaRegBookmark, FaHeart, FaBookmark } from "react-icons/fa";
import { AddComment } from "./AddComment";
import { Post, Reel } from "./schema/PostsSchema";
import { useLike } from "./mutations/useLike";
import { useGetPostLikes } from "./queries/useGetPostLikes";
import { PostLikes } from "./PostLikes";
import { useUser } from "../authentication/queries/useUser";
import { useBookmark } from "./mutations/useBookmark";
import { useGetBookmark } from "./queries/useGetBookmark";
import { useAddNotification } from "../notifications/mutations/useAddNotification";
import { useTranslation } from "react-i18next";

type PostActionsProps = {
  user_id: string;
  post: Post | Reel;
};

export const PostActions = ({ user_id, post }: PostActionsProps) => {
  const { t } = useTranslation();
  const { user: current } = useUser();
  const { like } = useLike({ post_id: post.id, user_id });
  const { likes, count } = useGetPostLikes({ post_id: post.id, user_id });
  const { bookmarking } = useBookmark({
    user_id: current?.id,
    post_id: post.id,
  });
  const { notify } = useAddNotification({ user_id: current!.id });

  const { bookmarks } = useGetBookmark({
    user_id: current?.id,
    post_id: post.id,
    type: "post_url" in post ? "post" : "reel",
  });

  const handleLike = () => {
    if (!current) return;

    like(
      { user_id: current.id, post_id: post.id },
      {
        onSuccess: () => {
          if (current.id === post.user_id) return;

          notify({
            by_user: current.id,
            status: "unread",
            type: "like",
            user_id: post.user_id,
            post_id: post.id,
          });
        },
      }
    );
  };

  const isAlreadyLike = likes?.filter(
    (like) => like.user_id === current?.id
  ).length;

  const handleBookmark = () => {
    if (!current) return;

    bookmarking(
      {
        user_id: current.id,
        post_id: post.id,
        type: "post_url" in post ? "post" : "reel",
      },
      {
        onSuccess: () => {
          if (bookmarks.length > 0) return;
          if (current.id === post.user_id) return;
          notify({
            by_user: current.id,
            status: "unread",
            type: "bookmark",
            user_id: post.user_id,
            post_id: post.id,
          });
        },
      }
    );
  };

  return (
    <div className="absolute bottom-0 left-0 w-full p-4  border-t border-stone-300 bg-stone-100 dark:bg-stone-950 dark:border-stone-50">
      <div className="flex items-center gap-6 mb-3 text-xs">
        <Button
          aria-label={
            isAlreadyLike && isAlreadyLike > 0
              ? t("posts.unlike")
              : t("posts.like")
          }
          modifier="close"
          onClick={handleLike}
        >
          {isAlreadyLike && isAlreadyLike > 0 ? (
            <FaHeart className="text-xl fill-red-600" />
          ) : (
            <FaRegHeart className="text-xl" />
          )}
        </Button>
        <div className="ml-auto">
          <Button
            aria-label={
              bookmarks!.length > 0
                ? t("posts.bookmark")
                : t("posts.unbookmark")
            }
            modifier="close"
            onClick={handleBookmark}
          >
            {bookmarks!.length > 0 ? (
              <FaBookmark className="text-xl fill-stone-950 dark:fill-stone-50" />
            ) : (
              <FaRegBookmark className="text-xl" />
            )}
          </Button>
        </div>
      </div>
      {post.disableLike || !likes || !count ? null : (
        <PostLikes likes={likes} count={count} />
      )}
      {post.disableComment ? null : (
        <AddComment user_id={user_id} post_id={post.id} />
      )}
    </div>
  );
};
