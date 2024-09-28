import { CustomLink } from "../../ui/CustomLink";
import { useProfile } from "./queries/useProfile";
import { useProfileParams } from "./queries/useProfileParams";
import { Loader } from "../../ui/Loader";
import { useUser } from "../authentication/queries/useUser";
import { useGetPosts } from "../posts/queries/useGetPosts";
import { Wrapper } from "../../ui/Wrapper";
import { CiBookmark, CiViewBoard, CiVideoOn } from "react-icons/ci";
import { Outlet, useNavigate } from "react-router";
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
import { useTranslation } from "react-i18next";
import { GlobalRoutes } from "../../typing/routes";
import { LuSend } from "react-icons/lu";
import { useEffect } from "react";

export const ProfileDetails = () => {
  const { t } = useTranslation();
  const { profile } = useProfileParams();
  const { user: currentUser } = useUser();
  const { data: user, isLoading } = useProfile(profile);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = `${user?.fullName} (@${user?.user_name})`;

    return () => {
      document.title = `InstaLove - love ❤️`;
    };
  }, [user?.fullName, user?.user_name]);

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

  if (!user) {
    navigate(GlobalRoutes.Dashboard);
    return null;
  }

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
        <div className="flex flex-col  lg:flex-row gap-16 2xl:gap-32 py-6 md:py-0">
          <div className="self-center sm:self-start">
            {currentUser?.id === user.user_id ? (
              <Avatar size={176} overlay={true} />
            ) : (
              <StorieAvatar size={176} profile={user} />
            )}
          </div>
          <div className="flex flex-col gap-12 grow w-full lg:w-auto">
            <div className="flex items-center gap-3 justify-between flex-wrap">
              <p className="text-xl font-medium dark:text-stone-50">
                {user?.user_name} - {user.fullName}
              </p>
              <div className="mr-left flex gap-2">
                {currentUser?.id === user.user_id ? null : !isObserve ? null : (
                  <CustomLink modifier="send" to="/dashboard/messages">
                    <LuSend className="text-stone-50 dark:text-stone-950" />
                    {t("posts.sendMessage")}
                  </CustomLink>
                )}
                {currentUser!.id === user!.user_id && (
                  <CustomLink to="/dashboard/profile/edit" modifier="primary">
                    {t("profile.edit")}
                  </CustomLink>
                )}
                {currentUser!.id !== user!.user_id && (
                  <Button modifier="submit" onClick={handleObserve}>
                    {isObserve ? t("profile.unobserver") : t("profile.observe")}
                  </Button>
                )}
              </div>
            </div>
            <div className="flex  justify-center gap-12 sm:gap-3 sm:items-center sm:justify-between sm:w-3/4">
              <p className="flex gap-1 flex-col items-center sm:flex-row text-stone-900 dark:text-stone-50">
                <strong className="font-medium text-stone-950 dark:text-stone-100">
                  {t("profile.posts")}:
                </strong>
                <span className="font-semibold mt-auto sm:mt-0">
                  {posts?.count ?? 0}
                </span>
              </p>

              <Modal.Open openClass="observes">
                <Button modifier="all-profiles">
                  <p className="h-full flex gap-1 flex-col items-center sm:flex-row text-stone-900 dark:text-stone-50">
                    <strong className="font-medium text-stone-950 dark:text-stone-100">
                      {t("profile.observers")}:
                    </strong>
                    <span className="font-semibold mt-auto sm:mt-0">
                      {onUserObservations?.length ?? 0}
                    </span>
                  </p>
                </Button>
              </Modal.Open>
              <Modal.Content
                manageClass="observes"
                parentClass="mx-auto max-w-lg mt-14 w-full px-4"
              >
                <ObservesOnUser user_id={user?.user_id} />
              </Modal.Content>

              <Modal.Open openClass="user-observes">
                <Button modifier="all-profiles">
                  <p className="h-full flex gap-1 flex-col items-center sm:flex-row text-stone-900 dark:text-stone-50">
                    <strong className="font-medium text-stone-950 dark:text-stone-100">
                      {t("profile.byobservers")}:
                    </strong>
                    <span className="font-semibold mt-auto sm:mt-0">
                      {observations?.length ?? 0}
                    </span>
                  </p>
                </Button>
              </Modal.Open>
              <Modal.Content
                manageClass="user-observes"
                parentClass="mx-auto max-w-lg mt-14 w-full px-4"
              >
                <ObservesByUser user_id={user?.user_id} />
              </Modal.Content>
            </div>
            <div className="py-2">
              <p className="max-w-prose text-wrap text break-words dark:text-stone-50">
                {user.biogram.split("\n").map((row) => (
                  <span key={row} className="block">
                    {row}
                  </span>
                ))}
              </p>
            </div>
          </div>
        </div>
      </Wrapper>

      <Wrapper>
        <div className="flex items-center justify-center sm:flex-row gap-2 sm:gap-12 border-y sm:border-b-0 border-x-stone-300 dark:border-x-stone-50">
          <CustomLink
            to="posts"
            modifier="profile-details"
            type="active-link"
            activeClass="border-t border-stone-950 font-semibold"
          >
            <CiViewBoard className="text-xl" />
            <span className="uppercase text-sm tracking-wide">
              {t("profile.posts")}
            </span>
          </CustomLink>
          <CustomLink
            to="reels"
            modifier="profile-details"
            type="active-link"
            activeClass="border-t border-stone-950 font-semibold"
          >
            <CiVideoOn className="text-xl" />
            <span className="uppercase text-sm tracking-wide">
              {t("profile.reels")}
            </span>
          </CustomLink>
          {currentUser?.id === user.user_id && (
            <CustomLink
              to="bookmarks"
              modifier="profile-details"
              type="active-link"
              activeClass="border-t border-stone-950 font-semibold"
            >
              <CiBookmark className="text-xl" />
              <span className="uppercase text-sm tracking-wide">
                {t("profile.mark")}
              </span>
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
