import { CustomLink } from "../../ui/CustomLink";
import { useProfile } from "./queries/useProfile";
import { useProfileParams } from "./queries/useProfileParams";
import { Loader } from "../../ui/Loader";
import { useUser } from "../authentication/queries/useUser";
import { useGetPosts } from "../posts/queries/useGetPosts";
import { Wrapper } from "../../ui/Wrapper";
import { CiBookmark, CiViewBoard, CiVideoOn } from "react-icons/ci";
import { Outlet } from "react-router";
import { Avatar } from "./avatar/Avatar";
import { PrivateProfile } from "./PrivateProfile";
import { Button } from "../../ui/Button";
import { useGetObserve } from "./queries/useGetObserve";
import { useObservation } from "./mutations/useObservation";
import { Modal } from "../../ui/modal/Modal";
import { useGetObservesByUser } from "./queries/useGetObservesByUser";
import { ObservesByUser } from "./ObservesByUser";
import { ObservesOnUser } from "./ObservesOnUser";
import { useGetObservesOnUser } from "./queries/useGetObservesOnUser";
import { useAddNotification } from "../notifications/mutations/useAddNotification";
import { StorieAvatar } from "./avatar/StorieAvatar";

export const ProfileDetails = () => {
  const { profile } = useProfileParams();
  const { user: currentUser } = useUser();
  const { data: user, isLoading } = useProfile(profile);

  const { observations } = useGetObservesByUser({ user_id: user?.user_id });
  const { observations: onUserObservations } = useGetObservesOnUser({
    user_id: user?.user_id,
  });

  const { notify } = useAddNotification({ user_id: currentUser!.id });

  const { observation } = useGetObserve({
    user_id: currentUser!.id,
    observe_id: user?.user_id,
  });

  const { observer } = useObservation({
    user_id: currentUser!.id,
    observe_id: user?.user_id,
  });

  const { data: posts, isLoading: isPostsLoading } = useGetPosts(user?.user_id);

  if (isLoading || isPostsLoading)
    return (
      <div className="p-4">
        <Loader />
      </div>
    );

  if (!user) return null;

  const handleObserve = () => {
    if (!currentUser) return;

    observer(
      {
        user_id: currentUser.id,
        observe_id: user?.user_id,
        user_name: currentUser.user_metadata?.user_name,
        observer_name: user?.user_name,
      },
      {
        onSuccess: () => {
          if (isObserve) return;

          notify({
            status: "unread",
            type: "observe",
            user_id: user?.user_id,
            by_user: currentUser.id,
            post_id: null,
          });
        },
      }
    );
  };

  const isObserve = observation && observation.length > 0;

  return (
    <>
      <Wrapper modifier="details">
        <div className="flex flex-col lg:flex-row gap-16 2xl:gap-32 py-6 md:py-0">
          {currentUser?.id === user.user_id ? (
            <Avatar size={176} overlay={true} />
          ) : (
            <StorieAvatar size={176} profile={user} />
          )}
          <div className="flex flex-col gap-12 grow">
            <div className="flex items-center gap-3 justify-between">
              <p className="text-xl font-medium">{user?.user_name}</p>
              {currentUser!.id === user!.user_id && (
                <CustomLink to="/dashboard/profile/edit" modifier="primary">
                  Edytuj profil
                </CustomLink>
              )}
              {currentUser!.id !== user!.user_id && (
                <Button modifier="submit" onClick={handleObserve}>
                  {isObserve ? "Odobserwuj" : "Obserwuj"}
                </Button>
              )}
            </div>
            <div className="flex items-center justify-between gap-3">
              <p className="flex gap-1 flex-col items-center sm:flex-row text-stone-900 text-sm">
                Posty
                <strong className="font-medium text-stone-950">
                  {posts?.count ?? 0}
                </strong>
              </p>
              <Modal>
                <Modal.Open>
                  <Button modifier="all-profiles">
                    <p className="flex gap-1 flex-col items-center sm:flex-row text-stone-700">
                      <strong className="font-medium text-stone-950 mr-2">
                        Obserwujących
                      </strong>
                      {onUserObservations?.length}
                    </p>
                  </Button>
                </Modal.Open>
                <Modal.Content>
                  <ObservesOnUser user_id={user?.user_id} />
                </Modal.Content>
              </Modal>
              <Modal>
                <Modal.Open>
                  <Button modifier="all-profiles">
                    <p className="flex gap-1 flex-col items-center sm:flex-row text-stone-700">
                      <strong className="font-medium text-stone-950 mr-2">
                        Obserwowani
                      </strong>
                      {observations?.length}
                    </p>
                  </Button>
                </Modal.Open>
                <Modal.Content>
                  <ObservesByUser user_id={user?.user_id} />
                </Modal.Content>
              </Modal>
            </div>
            <div className="py-2">
              <p className="max-w-prose text-wrap text break-words">
                {user.biogram}
              </p>
            </div>
          </div>
        </div>
      </Wrapper>

      <Wrapper>
        <div className="flex items-center justify-center flex-col sm:flex-row gap-2 sm:gap-12 border-y sm:border-b-0 border-x-stone-300 ">
          <CustomLink
            to="posts"
            modifier="profile-details"
            type="active-link"
            activeClass="border-t border-stone-950 font-semibold"
          >
            <CiViewBoard aria-label="Posts" className="text-xl" />
            Posty
          </CustomLink>
          <CustomLink
            to="reels"
            modifier="profile-details"
            type="active-link"
            activeClass="border-t border-stone-950 font-semibold"
          >
            <CiVideoOn aria-label="Posts" className="text-xl" />
            Reels
          </CustomLink>
          {currentUser?.id === user.user_id && (
            <CustomLink
              to="bookmarks"
              modifier="profile-details"
              type="active-link"
              activeClass="border-t border-stone-950 font-semibold"
            >
              <CiBookmark aria-label="Bookmarks" className="text-xl" />
              Zapisane
            </CustomLink>
          )}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 py-8 pb-32">
          {user.type === "public" ||
          user.user_id === currentUser?.id ||
          isObserve ? (
            <Outlet />
          ) : (
            <div className="col-start-1 -col-end-1 sm:col-start-2 sm:col-end-3 mt-7">
              <PrivateProfile />
            </div>
          )}
        </div>
      </Wrapper>
    </>
  );
};
