import { IndividualModalPost } from "../../../features/posts/IndividualModalPost";
import { useGetPosts } from "../../../features/posts/queries/useGetPosts";
import { useProfile } from "../../../features/profile/queries/useProfile";
import { useProfileParams } from "../../../features/profile/queries/useProfileParams";
import { Loader } from "../../../ui/Loader";
import { Modal } from "../../../ui/modal/Modal";

export const Posts = () => {
  const { profile } = useProfileParams();
  const { data: user, isLoading } = useProfile(profile);
  const { data: posts, isLoading: isPostsLoading } = useGetPosts(user?.user_id);

  if (isLoading || isPostsLoading) return <Loader />;

  return posts!.data.length > 0 ? (
    posts?.data.map((post) => {
      return (
        <Modal>
          <Modal.Open>
            <div
              key={post.id}
              className="relative aspect-square bg-cover bg-center cursor-pointer"
              style={{
                backgroundImage: `url(${post.post_url})`,
              }}
            >
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-stone-950/20">
                asd
              </div>
            </div>
          </Modal.Open>
          <Modal.Content>
            <IndividualModalPost post={post}/>
          </Modal.Content>
        </Modal>
      );
    })
  ) : (
    <p className=" text-stone-600 col-start-1 -col-end-1 text-center mt-6">
      No posts were found for your account. Create and publish them to see them
      in this section.
    </p>
  );
};
