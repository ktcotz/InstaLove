import { IndividualModalPost } from "../../../features/posts/IndividualModalPost";
import { Post } from "../../../features/posts/Post";
import { useGetReels } from "../../../features/posts/queries/useGetReels";
import { useProfile } from "../../../features/profile/queries/useProfile";
import { useProfileParams } from "../../../features/profile/queries/useProfileParams";
import { Loader } from "../../../ui/Loader";
import { Modal } from "../../../ui/modal/Modal";

export const Reels = () => {
  const { profile } = useProfileParams();
  const { data: user, isLoading } = useProfile(profile);
  const { data: reels, isLoading: isPostsLoading } = useGetReels(user?.user_id);

  if (isLoading || isPostsLoading) return <Loader />;

  return reels!.length > 0 ? (
    reels?.map((reel) => {
      return (
        <Modal key={reel.id}>
          <Modal.Open>
            <div>
              <Post {...reel} />
            </div>
          </Modal.Open>
          <Modal.Content>
            <IndividualModalPost post={reel} />
          </Modal.Content>
        </Modal>
      );
    })
  ) : (
    <p className=" text-stone-600 col-start-1 -col-end-1 text-center mt-6">
      No reels were found for your account. Create and publish them to see them
      in this section.
    </p>
  );
};
