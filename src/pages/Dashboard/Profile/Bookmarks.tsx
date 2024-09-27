import { useTranslation } from "react-i18next";
import { IndividualModalPost } from "../../../features/posts/IndividualModalPost";
import { Post } from "../../../features/posts/Post";
import { useGetBookmarks } from "../../../features/posts/queries/useGetBookmarks";
import { ProfilePostsSkeleton } from "../../../features/profile/ProfilePostsSkeleton";
import { useProfile } from "../../../features/profile/queries/useProfile";
import { useProfileParams } from "../../../features/profile/queries/useProfileParams";
import { Button } from "../../../ui/Button";
import { Modal } from "../../../ui/modal/Modal";

export const Bookmarks = () => {
  const { t } = useTranslation();
  const { profile } = useProfileParams();
  const { data: user, isLoading } = useProfile(profile);

  const { bookmarks, isLoading: isBookmarksLoading } = useGetBookmarks({
    user_id: user?.user_id,
  });

  const componentLoading = isLoading || isBookmarksLoading;

  if (componentLoading) return <ProfilePostsSkeleton />;

  if (bookmarks?.length === 0)
    return (
      <p className=" text-stone-600 col-start-1 -col-end-1 text-center mt-6">
        {t("profile.nobookmarks")}
      </p>
    );

  return bookmarks?.map((bookmark) => {
    const renderBookmark = bookmark.post_id
      ? bookmark.post_id
      : bookmark.reel_id;

    return (
      <>
        <Modal.Open openClass={`bookmark-${bookmark.id}`}>
          <Button modifier="close">
            <Post {...renderBookmark} />
          </Button>
        </Modal.Open>
        <Modal.Content
          manageClass={`bookmark-${bookmark.id}`}
          parentClass="mx-auto max-w-6xl w-full"
        >
          <IndividualModalPost
            post={bookmark.post_id ? bookmark.post_id : bookmark.reel_id}
          />
        </Modal.Content>
      </>
    );
  });
};
