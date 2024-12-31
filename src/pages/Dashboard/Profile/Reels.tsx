import { useTranslation } from "react-i18next";
import { IndividualModalPost } from "../../../features/posts/IndividualModalPost";
import { Post } from "../../../features/posts/Post";
import { useGetReels } from "../../../features/posts/queries/useGetReels";
import { ProfilePostsSkeleton } from "../../../features/profile/ProfilePostsSkeleton";
import { useProfile } from "../../../features/profile/queries/useProfile";
import { useProfileParams } from "../../../features/profile/queries/useProfileParams";
import { Button } from "../../../ui/Button";
import { Modal } from "../../../ui/modal/Modal";
import { Fragment } from "react/jsx-runtime";

export const Reels = () => {
  const { t } = useTranslation();
  const { profile } = useProfileParams();
  const { data: user, isLoading } = useProfile(profile);
  const { data: reels, isLoading: isPostsLoading } = useGetReels(user?.user_id);

  const componentLoading = isLoading || isPostsLoading;

  if (componentLoading) return <ProfilePostsSkeleton />;

  if (reels?.length === 0)
    return (
      <p className=" text-stone-600 col-start-1 -col-end-1 text-center mt-6">
        {t("profile.noreels")}
      </p>
    );

  return reels?.map((reel) => {
    return (
      <Fragment key={reel.id}>
        <Modal.Open openClass={`reel-${reel.id}`}>
          <Button modifier="close">
            <Post {...reel} />
          </Button>
        </Modal.Open>
        <Modal.Content
          manageClass={`reel-${reel.id}`}
          parentClass="mx-auto max-w-6xl w-full"
        >
          <IndividualModalPost post={reel} />
        </Modal.Content>
      </Fragment>
    );
  });
};
