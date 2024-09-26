import { FaRegHeart, FaHeart } from "react-icons/fa";
import { Button } from "../../ui/Button";
import { useUserByID } from "../authentication/queries/useUserByID";
import { formatDistanceToNow } from "date-fns";
import { getDateFnsLocaleByActiveLanguage } from "./helpers/dateLocale";
import { CustomLink } from "../../ui/CustomLink";
import { useHover } from "../profile/hooks/useHover";
import { HoverProfile } from "../profile/HoverProfile";
import { Modal } from "../../ui/modal/Modal";
import { Likes } from "./Likes";
import { useLike } from "./mutations/useLike";
import { useGetCommentLikes } from "./queries/useGetCommentLikes";
import { useUser } from "../authentication/queries/useUser";
import { useAddNotification } from "../notifications/mutations/useAddNotification";
import { usePostsContext } from "./context/usePostsContext";
import { useGetNestedComments } from "./queries/useGetNestedComments";
import { NestedComments } from "./NestedComments";
import { useTranslation } from "react-i18next";

type CommentProps = {
  comment: string;
  user_id: string;
  id?: number;
  created_at?: string;
  pinned?: boolean;
  post_id: number | null;
  parentComment?: number;
  isTop?: boolean;
};

export const Comment = ({
  comment,
  id,
  user_id,
  created_at,
  pinned = false,
  post_id,
  parentComment,
  isTop = false,
}: CommentProps) => {
  const { t, i18n } = useTranslation();
  const { user: current } = useUser();
  const { user } = useUserByID(user_id);
  const { hover, unhover, isHover } = useHover();
  const { likes, count } = useGetCommentLikes({ comment_id: id });
  const { like } = useLike({ user_id, comment_id: id });
  const { notify } = useAddNotification({ user_id: current!.id });
  const { setValue, setFocus } = usePostsContext();
  const { data: nestedComments } = useGetNestedComments(
    parentComment ? parentComment : id
  );

  const formatedDate = created_at
    ? formatDistanceToNow(new Date(created_at), {
        locale: getDateFnsLocaleByActiveLanguage(i18n.language),
        addSuffix: true,
      })
    : null;

  if (!user) return null;

  const handleLike = () => {
    if (!id || !current) return;

    like(
      { user_id: current.id, comment_id: id },
      {
        onSuccess: () => {
          if (isAlreadyLike) return;
          if (current.id === user.user_id) return;

          notify({
            by_user: current.id,
            status: "unread",
            type: "comment",
            user_id: user.user_id,
            post_id,
          });
        },
      }
    );
  };

  const isAlreadyLike = likes?.filter(
    (like) => like.user_id === current?.id
  ).length;

  const linkProfile = comment.slice(comment.indexOf("@"), comment.indexOf(" "));
  const rest = comment.slice(comment.indexOf(" ") + 1);

  return (
    <>
      <div
        className="relative grid grid-cols-[24px_1fr_auto] gap-2"
        onMouseLeave={() => unhover()}
      >
        <CustomLink to={`/dashboard/${user.user_name}`} modifier="post-avatar">
          <img
            src={user.avatar_url}
            alt=""
            width={24}
            height={24}
            className="w-6 h-6 rounded-full"
            onMouseEnter={() => hover()}
          />
        </CustomLink>
        <p className="text-sm mb-3 flex items-center">
          <CustomLink
            to={`/dashboard/${user.user_name}`}
            modifier="post-user"
            onMouseEnter={() => hover()}
          >
            {user.user_name}
          </CustomLink>
          <span className="ml-2 flex items-center gap-1">
            {linkProfile && (
              <CustomLink
                modifier="link"
                to={`/dashboard/${linkProfile.slice(1)}`}
              >
                {linkProfile}
              </CustomLink>
            )}
            <span className="dark:text-stone-300">
              {comment.includes("@") ? rest : comment}
            </span>
          </span>
        </p>
        <div className="col-start-1 -col-end-1 text-xs text-stone-700 dark:text-stone-100 flex items-center gap-3">
          <p>{formatedDate}</p>
          {!pinned && count && likes && count > 0 ? (
            <div>
              <Modal.Open openClass="comments-like">
                <Button modifier="text">
                  {count} {t("posts.commentsLike")}
                </Button>
              </Modal.Open>
              <Modal.Content
                manageClass="comments-like"
                parentClass="mx-auto max-w-lg mt-14"
              >
                <Likes likes={likes} />
              </Modal.Content>
            </div>
          ) : null}
          {current?.id === user.user_id ? null : (
            <Button
              modifier="close"
              onClick={() => {
                setValue("comment", `@${user.user_name} `);
                setValue("id", parentComment ? parentComment : id);
                setFocus("comment");
              }}
            >
              {t("posts.commentReply")}
            </Button>
          )}
        </div>
        {formatedDate && (
          <div className="col-start-3 col-end-4 row-start-1 flex items-center justify-center">
            <Button modifier="close">
              {isAlreadyLike && isAlreadyLike > 0 ? (
                <FaHeart
                  className="text-sm fill-red-600"
                  onClick={handleLike}
                />
              ) : (
                <FaRegHeart className="text-sm" onClick={handleLike} />
              )}
            </Button>
          </div>
        )}
        {isHover && (
          <HoverProfile
            user_name={user.user_name}
            showPosts={false}
            position={isTop ? "top" : "bottom"}
          />
        )}
      </div>
      {!parentComment && nestedComments && nestedComments.length > 0 && (
        <NestedComments comments={nestedComments} parentComment={id} />
      )}
    </>
  );
};
