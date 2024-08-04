import { Button } from "../../ui/Button";
import {
  FaRegHeart,
  FaRegComment,
  FaRegBookmark,
  FaHeart,
} from "react-icons/fa";
import { AddComment } from "./AddComment";
import { Post } from "./schema/PostsSchema";
import { useLike } from "./mutations/useLike";
import { useGetPostLikes } from "./queries/useGetPostLikes";
import { PostLikes } from "./PostLikes";
import { useUser } from "../authentication/queries/useUser";

type PostActionsProps = {
  user_id: string;
  post: Post;
};

export const PostActions = ({ user_id, post }: PostActionsProps) => {
  const { user: current } = useUser();
  const { like } = useLike({ post_id: post.id, user_id });
  const { likes, count } = useGetPostLikes({ post_id: post.id });

  const handleLike = () => {
    if (!current) return;

    like({ user_id: current.id, post_id: post.id });
  };

  const isAlreadyLike = likes?.filter(
    (like) => like.user_id === current?.id
  ).length;

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
        <Button aria-label="Comment" modifier="close">
          <FaRegComment className="text-xl" />
        </Button>
        <div className="ml-auto">
          <Button aria-label="Bookmark" modifier="close">
            <FaRegBookmark className="text-xl" />
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
