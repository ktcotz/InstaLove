import { FaComment, FaHeart } from "react-icons/fa";
import { useHover } from "../profile/hooks/useHover";
import { Post as PostSchema } from "./schema/PostsSchema";
import { useGetPostLikes } from "./queries/useGetPostLikes";
import { useGetComments } from "./queries/useGetComments";
import { Loader } from "../../ui/Loader";

export const Post = ({ post_url, id }: PostSchema) => {
  const { hover, unhover, isHover } = useHover();

  const { count, isLoading } = useGetPostLikes({ post_id: id });
  const { data } = useGetComments(id);

  return (
    <div
      className="relative aspect-square bg-cover bg-center cursor-pointer"
      style={{
        backgroundImage: `url(${post_url})`,
      }}
      onMouseEnter={() => hover()}
      onMouseLeave={() => unhover()}
    >
      {isHover ? (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center gap-6 bg-stone-950/60">
          {isLoading && <Loader />}
          <div className="flex gap-2 items-center">
            <FaHeart className="text-xl fill-stone-50" />
            <span className="text-stone-50 font-semibold">{count ?? 0}</span>
          </div>
          <div className="flex gap-2 items-center">
            <FaComment className="text-xl fill-stone-50" />
            <span className="text-stone-50 font-semibold">
              {data?.count ?? 0}
            </span>
          </div>
        </div>
      ) : null}
    </div>
  );
};
