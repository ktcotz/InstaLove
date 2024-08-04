import { Button } from "../../ui/Button";
import { CustomLink } from "../../ui/CustomLink";
import { Modal } from "../../ui/modal/Modal";
import { useUserByID } from "../authentication/queries/useUserByID";
import { Likes } from "./Likes";
import { Likes as LikesSchema } from "./schema/LikeSchema";

type PostLikesProps = {
  likes: LikesSchema;
  count: number;
};

export const PostLikes = ({ likes, count }: PostLikesProps) => {
  const { user } = useUserByID(likes[0].user_id);

  if (!user) return null;

  return (
    <div className="flex items-center gap-2 mb-3">
      <img
        src={user.avatar_url}
        alt=""
        width={24}
        height={24}
        className="h-6 w-6 rounded-full"
      />
      <div className="flex items-center gap-2">
        <p className="text-sm">
          <span className="mr-1">Lubią to</span>
          <CustomLink to={`/dashboard/${user.user_name}`} modifier="post-user">
            {user.user_name}
          </CustomLink>
        </p>
        {count > 1 && (
          <p className="flex gap-1">
            <span>i</span>
            <Modal>
              <Modal.Open>
                <Button modifier="text">{count - 1} innych użytkowników</Button>
              </Modal.Open>
              <Modal.Content>
                <Likes likes={likes} />
              </Modal.Content>
            </Modal>
          </p>
        )}
      </div>
    </div>
  );
};
