import { Button } from "../../ui/Button";
import { FaRegHeart, FaRegBookmark, FaHeart } from "react-icons/fa";
import { AddComment } from "./AddComment";
import { Post, Reel } from "./schema/PostsSchema";
import { useLike } from "./mutations/useLike";
import { useGetPostLikes } from "./queries/useGetPostLikes";
import { PostLikes } from "./PostLikes";
import { useUser } from "../authentication/queries/useUser";
import { useBookmark } from "./mutations/useBookmark";
import { useGetBookmark } from "./queries/useGetBookmark";
import { useAddNotification } from "../notifications/mutations/useAddNotification";

type PostActionsProps = {
  user_id: string;
  post: Post | Reel;
};

export const PostActions = ({ user_id, post }: PostActionsProps) => {
  const { user: current } = useUser();
  const { like } = useLike({ post_id: post.id, user_id });
  const { likes, count } = useGetPostLikes({ post_id: post.id });
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
          if (isAlreadyLike) return;
          notify({
            by_user: current.id,
            status: "unread",
            type: "like",
            user_id: post.user_id,
            post_id:post.id
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
            post_id:post.id
          });
        },
      }
    );
  };

  return (
    <div className="absolute bottom-0 left-0 w-full p-4 shadow-lg border-t border-stone-300 bg-stone-100">
      <div className="flex items-center gap-6 mb-3">
        <Button aria-label="Like" modifier="close" onClick={handleLike}>
          {isAlreadyLike && isAlreadyLike > 0 ? (
            <FaHeart className="text-xl fill-red-600" />
          ) : (
            <FaRegHeart className="text-xl" />
          )}
        </Button>
        <div className="ml-auto">
          <Button
            aria-label="Bookmark"
            modifier="close"
            onClick={handleBookmark}
          >
            {bookmarks!.length > 0 ? (
              <FaRegBookmark className="text-xl fill-yellow-500" />
            ) : (
              <FaRegBookmark className="text-xl" />
            )}
          </Button>
        </div>
      </div>
      {post.disableLike || !likes || !count ? null : (
        <PostLikes likes={likes} count={count} />
      )}
      <p className="text-xs text-stone-700 mb-3">18 marca</p>
      {post.disableComment ? null : (
        <AddComment user_id={user_id} post_id={post.id} />
      )}
    </div>
  );
};
