import { useTranslation } from "react-i18next";
import { Button } from "../../ui/Button";
import { CustomLink } from "../../ui/CustomLink";
import { Modal } from "../../ui/modal/Modal";
import { useUserByID } from "../authentication/queries/useUserByID";
import { useHover } from "../profile/hooks/useHover";
import { HoverProfile } from "../profile/HoverProfile";
import { Likes } from "./Likes";
import { Likes as LikesSchema } from "./schema/LikeSchema";

type PostLikesProps = {
  likes: LikesSchema;
  count: number;
};

export const PostLikes = ({ likes, count }: PostLikesProps) => {
  const { user } = useUserByID(likes[0].user_id);
  const { hover, unhover, isHover } = useHover();
  const { t } = useTranslation();

  if (!user) return null;

  return (
    <div
      className="relative flex items-center gap-2 mb-3"
      onMouseLeave={() => unhover()}
    >
      <img
        src={user.avatar_url}
        alt=""
        width={24}
        height={24}
        className="h-6 w-6 rounded-full"
      />
      <div className="flex items-center gap-2">
        <p className="text-xs">
          <span className="mr-1 dark:text-stone-300">{t("posts.likes")}</span>
          <CustomLink
            to={`/dashboard/${user.user_name}`}
            modifier="post-user"
            onMouseEnter={() => hover()}
          >
            {user.user_name}
          </CustomLink>
        </p>
        {count > 1 && (
          <p className="flex gap-1 text-xs">
            <span className="dark:text-stone-300">i</span>

            <Modal.Open openClass="post-likes">
              <Button modifier="text">
                {count - 1} {t("posts.likesOthers")}
              </Button>
            </Modal.Open>
            <Modal.Content
              manageClass="post-likes"
              parentClass="mx-auto max-w-lg mt-14 w-full"
            >
              <Likes likes={likes} />
            </Modal.Content>
          </p>
        )}
      </div>
      {isHover && <HoverProfile user_name={user.user_name} position="top" />}
    </div>
  );
};
