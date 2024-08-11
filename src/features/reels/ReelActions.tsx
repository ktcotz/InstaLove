import {
  FaHeart,
  FaRegBookmark,
  FaRegComment,
  FaRegHeart,
} from "react-icons/fa";
import { Button } from "../../ui/Button";
import { CustomLink } from "../../ui/CustomLink";
import { useUser } from "../authentication/queries/useUser";
import { useAddNotification } from "../notifications/mutations/useAddNotification";
import { useLike } from "../posts/mutations/useLike";
import { useGetPostLikes } from "../posts/queries/useGetPostLikes";
import { Profile } from "../profile/schema/ProfilesSchema";
import { Modal } from "../../ui/modal/Modal";
import { Likes } from "../posts/Likes";
import { useGetAllComments } from "../posts/queries/useGetAllComments";
import { useGetBookmark } from "../posts/queries/useGetBookmark";
import { useBookmark } from "../posts/mutations/useBookmark";
import { ReelsComments } from "./ReelsComments";

type ReelActionsProps = {
  user: Profile;
  id: number;
};

export const ReelActions = ({ user, id }: ReelActionsProps) => {
  const { user: current } = useUser();
  const { like } = useLike({ post_id: id, user_id: user.user_id });
  const { likes, count } = useGetPostLikes({ post_id: id });
  const { notify } = useAddNotification({ user_id: current!.id });
  const { data } = useGetAllComments(id);
  const { bookmarks } = useGetBookmark({
    user_id: current?.id,
    post_id: id,
    type: "reel",
  });
  const { bookmarking } = useBookmark({
    user_id: current?.id,
    post_id: id,
  });

  const handleLike = () => {
    if (!current) return;

    like(
      { user_id: current.id, post_id: id },
      {
        onSuccess: () => {
          if (isAlreadyLike) return;
          notify({
            by_user: current.id,
            status: "unread",
            type: "like",
            user_id: user.user_id,
            post_id: id,
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
        post_id: id,
        type: "reel",
      },
      {
        onSuccess: () => {
          if (bookmarks.length > 0) return;
          if (current.id === user.user_id) return;
          notify({
            by_user: current.id,
            status: "unread",
            type: "bookmark",
            user_id: user.user_id,
            post_id: id,
          });
        },
      }
    );
  };

  const isAlreadyLike = likes?.filter(
    (like) => like.user_id === current?.id
  ).length;

  return (
    <div className="flex flex-col items-center">
      <ul className="list-none flex flex-col gap-4 mb-6 items-center">
        <li className="flex flex-col gap-1 items-center">
          <Button aria-label="Like" modifier="close" onClick={handleLike}>
            {isAlreadyLike && isAlreadyLike > 0 ? (
              <FaHeart className="text-xl fill-red-600" />
            ) : (
              <FaRegHeart className="text-xl" />
            )}
          </Button>
          {count && (
            <Modal>
              <Modal.Open>
                <Button modifier="close">
                  <p className="text-xs">
                    {new Intl.NumberFormat(navigator.language, {
                      notation: "compact",
                    }).format(count)}
                  </p>
                </Button>
              </Modal.Open>
              {likes && (
                <Modal.Content>
                  <Likes likes={likes} />
                </Modal.Content>
              )}
            </Modal>
          )}
        </li>
        <li className="flex flex-col gap-1 items-center">
          {data?.count && (
            <Modal>
              <Modal.Open>
                <Button aria-label="Comment" modifier="close">
                  <div className="flex flex-col gap-1">
                    <FaRegComment />
                    <p className="text-xs">
                      {new Intl.NumberFormat(navigator.language, {
                        notation: "compact",
                      }).format(data?.count)}
                    </p>
                  </div>
                </Button>
              </Modal.Open>
              {data?.comments && (
                <Modal.Content>
                  <ReelsComments
                    user_id={user.user_id}
                    id={id}
                    comments={data.comments}
                  />
                </Modal.Content>
              )}
            </Modal>
          )}
        </li>
        <li>
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
        </li>
      </ul>
      <CustomLink modifier="link" to={`/dashboard/${user.user_name}`}>
        <img
          src={user.avatar_url}
          alt={user.fullName}
          width={24}
          height={24}
          className=" w-6 h-6"
        />
      </CustomLink>
    </div>
  );
};
