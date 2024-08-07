import { IoMdAddCircle } from "react-icons/io";
import { Button } from "../../ui/Button";
import { Wrapper } from "../../ui/Wrapper";
import { useUserByID } from "../authentication/queries/useUserByID";
import { Comment } from "./Comment";
import { PostActions } from "./PostActions";
import { GeneralPost } from "./schema/PostsSchema";
import { useGetComments } from "./queries/useGetComments";
import { useUser } from "../authentication/queries/useUser";

type IndividualModalPostProps = {
  post: GeneralPost;
};

export const MAX_COMMENTS_POST = 12;

export const IndividualModalPost = ({ post }: IndividualModalPostProps) => {
  const { user: currentUser } = useUser();
  const { user } = useUserByID(post.user_id);
  console.log(post);

  const {
    data,
    isLoading: isCommentsLoading,
    fetchNextPage,
    hasNextPage,
  } = useGetComments(post.id);

  if (!user || !currentUser) return null;

  const comments = data?.pages.flatMap((page) => page.comments);

  return (
    <Wrapper>
      <div className="grid grid-rows-3 sm:grid-rows-1 sm:grid-cols-6 md:grid-cols-5 bg-stone-50 rounded-md shadow-lg h-[700px] mt-3">
        <div
          style={
            "post_url" in post
              ? { backgroundImage: `url(${post.post_url})` }
              : {}
          }
          className="bg-cover bg-center col-start-1 col-end-4 shadow-lg bg-stone-100"
        >
          {post.video_url && (
            <video loop muted autoPlay className="h-full w-full object-cover">
              <source src={post.video_url} type="video/mp4" />
            </video>
          )}
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
            <div
              className={`flex flex-col gap-6 text-stone-900 max-h-[600px] overflow-y-scroll p-4 pb-[170px]`}
            >
              {post.description && (
                <Comment
                  user_id={user.user_id}
                  comment={post.description}
                  pinned={true}
                />
              )}
              {!isCommentsLoading &&
                comments?.map((comment) => (
                  <Comment key={comment.id} {...comment} />
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

            <PostActions user_id={currentUser.id} post={post} />
          </>
        </div>
      </div>
    </Wrapper>
  );
};
