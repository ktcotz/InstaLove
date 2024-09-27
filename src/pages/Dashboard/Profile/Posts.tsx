import { useTranslation } from "react-i18next";
import { IndividualModalPost } from "../../../features/posts/IndividualModalPost";
import { Post } from "../../../features/posts/Post";
import { useGetPosts } from "../../../features/posts/queries/useGetPosts";
import { ProfilePostsSkeleton } from "../../../features/profile/ProfilePostsSkeleton";
import { useProfile } from "../../../features/profile/queries/useProfile";
import { useProfileParams } from "../../../features/profile/queries/useProfileParams";
import { Button } from "../../../ui/Button";
import { Modal } from "../../../ui/modal/Modal";

export const Posts = () => {
  const { profile } = useProfileParams();
  const { data: user, isLoading } = useProfile(profile);
  const { data: posts, isLoading: isPostsLoading } = useGetPosts(
    user?.user_id,
    true
  );

  const { t } = useTranslation();

  const componentLoading = isLoading || isPostsLoading;

  if (componentLoading) return <ProfilePostsSkeleton />;

  if (posts?.count === 0)
    return (
      <p className=" text-stone-600 col-start-1 -col-end-1 text-center mt-6">
        {t("profile.noposts")}
      </p>
    );

  return posts?.data.map((post) => {
    return (
      <>
        <Modal.Open openClass={`post-${post.id}`}>
          <Button modifier="close">
            <Post {...post} />
          </Button>
        </Modal.Open>
        <Modal.Content
          manageClass={`post-${post.id}`}
          parentClass="mx-auto max-w-6xl w-full px-4"
        >
          <IndividualModalPost post={post} />
        </Modal.Content>
      </>
    );
  });
};
