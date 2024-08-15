import { IoMdAddCircle } from "react-icons/io";
import { Button } from "../../ui/Button";
import { GeneralPost } from "./schema/PostsSchema";
import { useGetComments } from "./queries/useGetComments";
import { Comment } from "./Comment";
import { Profile } from "../profile/schema/ProfilesSchema";

type CommentsProps = {
  post: GeneralPost;
  user: Profile;
};

export const Comments = ({ post, user }: CommentsProps) => {
  const {
    data,
    isLoading: isCommentsLoading,
    fetchNextPage,
    hasNextPage,
  } = useGetComments(post.id);

  const comments = data?.pages.flatMap((page) => page.comments);

  return (
    <div
      className={`flex flex-col gap-6 text-stone-900 max-h-[600px] overflow-y-scroll p-4 pb-[170px]`}
    >
      {post.description && (
        <Comment
          user_id={user.user_id}
          comment={post.description}
          pinned={true}
          post_id={post.id}
        />
      )}
      {!isCommentsLoading &&
        comments?.map((comment) => (
          <Comment key={comment.id} {...comment} post_id={post.id} />
        ))}
      {hasNextPage ? (
        <div className="py-6 flex items-center justify-center border-t border-stone-300">
          <Button
            modifier="close"
            onClick={() => fetchNextPage()}
            aria-label="Fetch more comments"
          >
            <IoMdAddCircle
              className="text-3xl"
              aria-label="Fetch more comments"
            />
          </Button>
        </div>
      ) : null}
    </div>
  );
};
