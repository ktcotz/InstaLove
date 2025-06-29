import { IoMdAddCircle } from "react-icons/io";
import { Button } from "../../ui/Button";
import { useUserByID } from "../authentication/queries/useUserByID";
import { Comment } from "./Comment";
import { PostActions } from "./PostActions";
import { GeneralPost } from "./schema/PostsSchema";
import { useGetComments } from "./queries/useGetComments";
import { useUser } from "../authentication/queries/useUser";
import { useAddView } from "./mutations/useAddView";
import { useEffect, useRef } from "react";
import { PostsContextProvider } from "./context/PostsContext";
import { StoriesMarks } from "../stories/StoriesMarks";
import { useTranslation } from "react-i18next";
import { useTernaryDarkMode } from "usehooks-ts";
import { FaMusic } from "react-icons/fa";

type IndividualModalPostProps = {
  post: GeneralPost;
};

export const MAX_COMMENTS_POST = 12;

export const IndividualModalPost = ({ post }: IndividualModalPostProps) => {
  const { user: currentUser } = useUser();
  const { user } = useUserByID(post.user_id);
  const { isDarkMode } = useTernaryDarkMode();
  const videoRef = useRef<HTMLVideoElement>(null);
  const { t } = useTranslation();
  const { addView } = useAddView({
    reel_id: post.id,
    user_id: currentUser!.id,
  });

  const {
    data,
    isLoading: isCommentsLoading,
    fetchNextPage,
    hasNextPage,
  } = useGetComments(post.id);

  useEffect(() => {
    if ("video_url" in post) {
      addView();
    }
  }, [addView, post]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = 0.15;
    }
  }, []);

  if (!user || !currentUser) return null;

  const comments = data?.pages.flatMap((page) => page.comments);

  return (
    <PostsContextProvider>
      <div
        className={`grid ${
          "video_url" in post ? "grid-rows-5" : "grid-rows-3"
        }  bg-stone-50 dark:bg-stone-950 rounded-md sm:shadow-lg sm:grid-rows-1 sm:grid-cols-6 md:grid-cols-5 h-[650px] max-h-[800px] mt-3`}
      >
        <div
          style={
            "post_url" in post
              ? { backgroundImage: `url(${post.post_url})` }
              : {}
          }
          className={`${
            "video_url" in post ? "row-start-1 row-end-3" : ""
          }  relative bg-cover bg-center col-start-1 col-end-4 bg-stone-100`}
        >
          {post.video_url && (
            <div className="h-full w-full">
              <video
                ref={videoRef}
                loop
                autoPlay
                className="h-full w-full object-cover"
              >
                <source src={post.video_url} type="video/mp4" />
              </video>
              <div
                className={`${
                  isDarkMode ? "bg-black/5" : "bg-black/20"
                } h-full w-full absolute top-0 left-0 rounded-xl`}
              >
                {post.video_url?.includes("mp3") && (
                  <div className="h-full flex items-center justify-center">
                    <FaMusic
                      className={`${
                        isDarkMode ? "text-white" : "text-black"
                      } text-5xl sm:text-white`}
                    />
                  </div>
                )}
              </div>
            </div>
          )}
          <StoriesMarks post_id={post.id} user_id={currentUser.id} />
        </div>
        <div
          className={`${
            "video_url" in post ? "row-start-3" : "row-start-2"
          }  -row-end-1 col-start-4 -col-end-1 flex flex-col relative h-full sm:row-start-auto sm:row-end-auto `}
        >
          <div className="flex items-center gap-3 border-b border-stone-300 py-3 sm:py-5 px-4">
            <img
              src={user.avatar_url}
              alt={user.fullName}
              width={40}
              height={40}
              className="rounded-full w-10 h-10"
            />
            <h2 className="font-semibold text-sm text-stone-900 dark:text-stone-50">
              {user.user_name}
            </h2>
          </div>

          <>
            <div
              className={`flex flex-col gap-6 text-stone-900 h-full max-h-[600px] overflow-y-scroll p-4 pb-40 sm:pb-36`}
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
                comments?.map((comment, index) => {
                  const isLastestComments = index >= 3;
                  return (
                    <Comment
                      key={comment.id}
                      {...comment}
                      post_id={post.id}
                      isTop={isLastestComments}
                    />
                  );
                })}
              {hasNextPage ? (
                <div className="py-6 flex items-center justify-center border-t border-stone-300">
                  <Button
                    modifier="close"
                    onClick={() => fetchNextPage()}
                    aria-label={t("posts.moreComments")}
                  >
                    <IoMdAddCircle
                      className="text-3xl"
                      aria-label={t("posts.moreComments")}
                    />
                  </Button>
                </div>
              ) : null}
            </div>

            <PostActions user_id={currentUser.id} post={post} />
          </>
        </div>
      </div>
    </PostsContextProvider>
  );
};
