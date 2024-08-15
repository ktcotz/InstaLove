import { Wrapper } from "../../ui/Wrapper";
import { useUserByID } from "../authentication/queries/useUserByID";
import { PostActions } from "./PostActions";
import { GeneralPost } from "./schema/PostsSchema";
import { useUser } from "../authentication/queries/useUser";
import { useAddView } from "./mutations/useAddView";
import { useEffect } from "react";
import { Comments } from "./Comments";

type IndividualModalPostProps = {
  post: GeneralPost;
};

export const MAX_COMMENTS_POST = 12;

export const IndividualModalPost = ({ post }: IndividualModalPostProps) => {
  const { user: currentUser } = useUser();
  const { user } = useUserByID(post.user_id);
  const { addView } = useAddView({
    reel_id: post.id,
    user_id: currentUser!.id,
  });

  useEffect(() => {
    if ("video_url" in post) {
      addView();
    }
  }, [addView, post]);

  if (!user || !currentUser) return null;

  return (
    <Wrapper>
      <div
        className={`grid ${
          "video_url" in post ? "grid-rows-5" : "grid-rows-3"
        } sm:grid-rows-1 sm:grid-cols-6 md:grid-cols-5 bg-stone-50 rounded-md shadow-lg min-h-[800px] mt-3`}
      >
        <div
          style={
            "post_url" in post
              ? { backgroundImage: `url(${post.post_url})` }
              : {}
          }
          className={`${
            "video_url" in post ? "row-start-1 row-end-3" : ""
          } bg-cover bg-center col-start-1 col-end-4 shadow-lg bg-stone-100`}
        >
          {post.video_url && (
            <video loop muted autoPlay className="h-full w-full object-cover">
              <source src={post.video_url} type="video/mp4" />
            </video>
          )}
        </div>
        <div
          className={`${
            "video_url" in post ? "row-start-3" : "row-start-2"
          } -row-end-1 col-start-4 -col-end-1 flex flex-col relative h-full sm:row-start-auto sm:row-end-auto`}
        >
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
            <Comments post={post} user={user} />

            <PostActions user_id={currentUser.id} post={post} />
          </>
        </div>
      </div>
    </Wrapper>
  );
};
