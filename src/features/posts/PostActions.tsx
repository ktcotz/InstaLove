import { Button } from "../../ui/Button";
import { FaRegHeart, FaRegComment, FaRegBookmark } from "react-icons/fa";
import { CustomLink } from "../../ui/CustomLink";
import { AddComment } from "./AddComment";

type PostActionsProps = {
  user_id: string;
  post_id: number;
};

export const PostActions = ({ user_id, post_id }: PostActionsProps) => {
  return (
    <div className="absolute bottom-0 left-0 w-full p-4 shadow-lg border-t border-stone-300 bg-stone-100">
      <div className="flex items-center gap-6 mb-3">
        <Button aria-label="Like" modifier="close">
          <FaRegHeart className="text-xl" />
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
      <div className="flex items-center gap-2 mb-3">
        <img
          src="./images/home-phones.png"
          alt=""
          width={24}
          height={24}
          className="h-6 w-6 rounded-full"
        />
        <p className="text-sm">
          Lubią to{" "}
          <CustomLink to="ewcia" modifier="post-user">
            ewxia_
          </CustomLink>
          i 61 innych użytkowników
        </p>
      </div>
      <p className="text-xs text-stone-700 mb-3">18 marca</p>
      <AddComment user_id={user_id} post_id={post_id} />
    </div>
  );
};
