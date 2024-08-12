import { IndividualModalPost } from "../../../features/posts/IndividualModalPost";
import { Post } from "../../../features/posts/Post";
import { useGetBookmarks } from "../../../features/posts/queries/useGetBookmarks";
import { useProfile } from "../../../features/profile/queries/useProfile";
import { useProfileParams } from "../../../features/profile/queries/useProfileParams";
import { Button } from "../../../ui/Button";
import { Loader } from "../../../ui/Loader";
import { Modal } from "../../../ui/modal/Modal";

export const Bookmarks = () => {
  const { profile } = useProfileParams();
  const { data: user, isLoading } = useProfile(profile);

  const { bookmarks, isLoading: isBookmarksLoading } = useGetBookmarks({
    user_id: user?.user_id,
  });

  if (isLoading || isBookmarksLoading) return <Loader />;

  return bookmarks!.length > 0 ? (
    bookmarks?.map((bookmark) => {
      const renderBookmark = bookmark.post_id
        ? bookmark.post_id
        : bookmark.reel_id;

      return (
        <Modal key={bookmark.id}>
          <Modal.Open>
            <Button modifier="close">
              <Post {...renderBookmark} />
            </Button>
          </Modal.Open>
          <Modal.Content>
            <IndividualModalPost
              post={bookmark.post_id ? bookmark.post_id : bookmark.reel_id}
            />
          </Modal.Content>
        </Modal>
      );
    })
  ) : (
    <p className=" text-stone-600 col-start-1 -col-end-1 text-center mt-6">
      No bookmarks posts were found for your account. Create and publish them to
      see them in this section.
    </p>
  );
};
