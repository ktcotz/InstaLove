import { FaComment, FaHeart, FaPlay } from "react-icons/fa";
import { useHover } from "../profile/hooks/useHover";
import { GeneralPost } from "./schema/PostsSchema";
import { useGetPostLikes } from "./queries/useGetPostLikes";
import { Loader } from "../../ui/Loader";
import { useGetAllComments } from "./queries/useGetAllComments";

export const Post = ({ post_url, video_url, id, views }: GeneralPost) => {
  const { hover, unhover, isHover } = useHover();

  const { count, isLoading } = useGetPostLikes({ post_id: id });
  const { data } = useGetAllComments(id);

  const formatedLikes = count
    ? new Intl.NumberFormat(navigator.language).format(count)
    : 0;
  const formatedComments = data?.count
    ? new Intl.NumberFormat(navigator.language).format(data?.count)
    : 0;

  const formatedViews = views
    ? new Intl.NumberFormat(navigator.language).format(views)
    : 0;

  return (
    <div
      className="relative aspect-square bg-cover bg-center cursor-pointer"
      style={
        post_url
          ? {
              backgroundImage: `url(${post_url})`,
            }
          : {}
      }
      onMouseEnter={() => hover()}
      onMouseLeave={() => unhover()}
    >
      {isLoading && (
        <div className="absolute top-1/2 left-1/2 translate-x-1/2 -translate-y-1/2">
          <Loader />
        </div>
      )}
      {video_url && (
        <>
          <video loop muted className="h-full w-full object-cover">
            <source src={video_url} type="video/mp4" />
          </video>
          {isHover ? null : (
            <div className="absolute bottom-4 left-4 p-4 flex items-center gap-2 text-stone-50 font-semibold">
              <FaPlay /> <span>{formatedViews}</span>
            </div>
          )}
        </>
      )}
      {isHover ? (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center gap-6 bg-stone-950/60">
          <div className="flex gap-2 items-center">
            <FaHeart className="text-xl fill-stone-50" />
            <span className="text-stone-50 font-semibold">{formatedLikes}</span>
          </div>
          <div className="flex gap-2 items-center">
            <FaComment className="text-xl fill-stone-50" />
            <span className="text-stone-50 font-semibold">
              {formatedComments}
            </span>
          </div>
        </div>
      ) : null}
    </div>
  );
};
