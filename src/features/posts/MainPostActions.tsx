import { useTranslation } from "react-i18next";
import { Button, CustomLink, Modal } from "../../ui";
import {
  FaBookmark,
  FaHeart,
  FaRegBookmark,
  FaRegComment,
  FaRegHeart,
} from "react-icons/fa";
import { useUser } from "../authentication/queries/useUser";
import { GeneralPost } from "./schema/PostsSchema";
import { useGetPostLikes } from "./queries/useGetPostLikes";
import { useLike } from "./mutations/useLike";
import { useAddNotification } from "../notifications/mutations/useAddNotification";
import { useGetBookmark } from "./queries/useGetBookmark";
import { useBookmark } from "./mutations/useBookmark";
import { useUserByID } from "../authentication/queries/useUserByID";
import { Likes } from "./Likes";
import { useGetAllComments } from "./queries/useGetAllComments";
import { AddComment } from "./AddComment";

type MainPostActionsProps = {
  user_id: string;
  post: GeneralPost;
};

export const MainPostActions = ({ user_id, post }: MainPostActionsProps) => {
  const { t } = useTranslation();
  const { user: profile } = useUserByID(user_id);
  const { user: current } = useUser();
  const { likes, count } = useGetPostLikes({ post_id: post.id, user_id });
  const { like } = useLike({ post_id: post.id, user_id });
  const { notify } = useAddNotification({ user_id: current!.id });
  const { bookmarks } = useGetBookmark({
    user_id: current?.id,
    post_id: post.id,
    type: "post_url" in post ? "post" : "reel",
  });
  const { data } = useGetAllComments(post.id);
  const { bookmarking } = useBookmark({
    user_id: current?.id,
    post_id: post.id,
  });

  const isAlreadyLike = likes?.filter(
    (like) => like.user_id === current?.id
  ).length;

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
    <div className="bg-stone-50 dark:bg-stone-950 p-4 sm:py-4">
      <div className="flex gap-4 items-center">
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
        <CustomLink
          to={`/dashboard/${profile?.user_name}/post/${post.id}`}
          modifier="close"
        >
          <FaRegComment className="text-xl text-stone-950 dark:text-stone-50" />
        </CustomLink>
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
      {!post.disableLike && likes && likes.length > 0 && (
        <div>
          <Modal.Open openClass={`likes-${post.id}`}>
            <Button modifier="close">
              <p className="mt-4 text-stone-950 dark:text-stone-100 text-sm">
                {t("posts.likesCount")} {count}
              </p>
            </Button>
          </Modal.Open>
          <Modal.Content
            manageClass={`likes-${post.id}`}
            parentClass="mx-auto max-w-lg mt-14"
          >
            <Likes likes={likes} />
          </Modal.Content>
        </div>
      )}
      <p className="mt-4 text-sm text-stone-600 dark:text-stone-300">
        <strong className="font-semibold text-stone-950 dark:text-stone-50">
          {profile?.user_name}
        </strong>
        {post.description}
      </p>
      <div className="mt-4">
        <CustomLink
          to={`/dashboard/${profile?.user_name}/post/${post.id}`}
          modifier="close"
        >
          <span className="text-sm text-stone-600 dark:text-stone-300">
            {t("posts.allComments")} {data?.count}
          </span>
        </CustomLink>
      </div>
      {!post.disableComment && (
        <div className="mt-4">
          <AddComment post_id={post.id} user_id={user_id} />
        </div>
      )}
    </div>
  );
};
