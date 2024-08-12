import { IndividualModalPost } from "../../../features/posts/IndividualModalPost";
import { Post } from "../../../features/posts/Post";
import { useGetPosts } from "../../../features/posts/queries/useGetPosts";
import { useProfile } from "../../../features/profile/queries/useProfile";
import { useProfileParams } from "../../../features/profile/queries/useProfileParams";
import { Button } from "../../../ui/Button";
import { Loader } from "../../../ui/Loader";
import { Modal } from "../../../ui/modal/Modal";

export const Posts = () => {
  const { profile } = useProfileParams();
  const { data: user, isLoading } = useProfile(profile);
  const { data: posts, isLoading: isPostsLoading } = useGetPosts(
    user?.user_id,
    true
  );

  if (isLoading || isPostsLoading) return <Loader />;

  return posts!.data.length > 0 ? (
    posts?.data.map((post) => {
      return (
        <Modal key={post.id}>
          <Modal.Open>
            <Button modifier="close">
              <Post {...post} />
            </Button>
          </Modal.Open>
          <Modal.Content>
            <IndividualModalPost post={post} />
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
