import { FaRegChessQueen } from "react-icons/fa6";
import { Button } from "../../ui/Button";
import { Wrapper } from "../../ui/Wrapper";
import { useUserByID } from "../authentication/queries/useUserByID";
import { Comment } from "./Comment";
import { PostActions } from "./PostActions";
import { Post } from "./schema/PostsSchema";
import { useGetComments } from "./queries/useGetComments";

type IndividualModalPostProps = {
  post: Post;
};

export const IndividualModalPost = ({ post }: IndividualModalPostProps) => {
  const { user } = useUserByID(post.user_id);
  const { data, isLoading: isCommentsLoading } = useGetComments(
    post.id,
    user?.user_id
  );

  if (!user) return null;

  return (
    <Wrapper>
      <div className="grid grid-rows-3 sm:grid-rows-1 sm:grid-cols-6 md:grid-cols-5 bg-stone-50 rounded-md shadow-lg h-[700px] mt-3">
        <div
          style={{ backgroundImage: `url(${post.post_url})` }}
          className="bg-cover bg-center col-start-1 col-end-4 shadow-lg bg-stone-100"
        >
          &nbsp;
        </div>
        <div className="row-start-2 -row-end-1 col-start-4 -col-end-1 flex flex-col relative h-full sm:row-start-auto sm:row-end-auto">
          <div className="flex items-center gap-3 border-b border-stone-300 py-5 px-4">
            <img
              src={user.avatar_url}
              alt={user.fullName}
              width={40}
              height={40}
              className="rounded-full w-10 h-10"
            />
            <h2 className="font-semibold text-sm text-stone-900">
              {user.user_name}
            </h2>
          </div>
          <>
            <div className="flex flex-col gap-6 text-stone-900 max-h-[600px] overflow-y-scroll p-4 pb-[200px]">
              {post.description && (
                <Comment user_id={user.user_id} comment={post.description} />
              )}
              {!isCommentsLoading &&
                data?.comments?.map((comment) => (
                  <Comment key={comment.id} {...comment} />
                ))}
              {data?.count && data?.count > 10 ? (
                <div className="py-6 flex items-center justify-center bg-red-500">
                  <Button modifier="close">
                    <FaRegChessQueen />
                  </Button>
                </div>
              ) : null}
            </div>

            <PostActions user_id={user.user_id} post_id={post.id} />
          </>
        </div>
      </div>
    </Wrapper>
  );
};
