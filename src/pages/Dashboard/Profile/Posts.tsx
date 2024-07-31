import { useGetPosts } from "../../../features/posts/queries/useGetPosts";
import { useProfile } from "../../../features/profile/queries/useProfile";
import { useProfileParams } from "../../../features/profile/queries/useProfileParams";
import { Loader } from "../../../ui/Loader";

export const Posts = () => {
  const { profile } = useProfileParams();
  const { data: user, isLoading } = useProfile(profile);
  const { data: posts, isLoading: isPostsLoading } = useGetPosts(user?.user_id);

  if (isLoading || isPostsLoading) return <Loader />;

  return posts!.data.length > 0 ? (
    posts?.data.map((post) => {
      return (
        <div
          key={post.id}
          className="relative aspect-square bg-cover bg-center"
          style={{
            backgroundImage: `url(${post.post_url})`,
          }}
        >
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-stone-950/20">
            asd
          </div>
        </div>
      );
    })
  ) : (
    <p className=" text-stone-600 col-start-1 -col-end-1 text-center">
      No posts were found for your account. Create and publish them to see them
      in this section.
    </p>
  );
};
