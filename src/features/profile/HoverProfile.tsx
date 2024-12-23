import { Button } from "../../ui/Button";
import { CustomLink } from "../../ui/CustomLink";
import { HiUserAdd } from "react-icons/hi";
import { LuSend } from "react-icons/lu";
import { useProfile } from "./queries/useProfile";
import { useGetPosts } from "../posts/queries/useGetPosts";
import { PrivateProfile } from "./PrivateProfile";
import { useGetObserve } from "./queries/useGetObserve";
import { useUser } from "../authentication/queries/useUser";
import { useObservation } from "./mutations/useObservation";
import { useAddNotification } from "../notifications/mutations/useAddNotification";
import { StorieAvatar } from "./avatar/StorieAvatar";
import { useTranslation } from "react-i18next";
import { HoverProfileSkeleton } from "./HoverProfileSkeleton";
import { Modal } from "../../ui";
import { ObservesByUser } from "./ObservesByUser";
import { ObservesOnUser } from "./ObservesOnUser";
import { useGetObservesByUser } from "./queries/useGetObservesByUser";
import { useGetObservesOnUser } from "./queries/useGetObservesOnUser";

type HoverProfileProps = {
  user_name: string;
  showPosts?: boolean;
  position?: "top" | "bottom";
  proposed?: boolean;
};

export const HoverProfile = ({
  user_name,
  showPosts = true,
  position = "bottom",
  proposed = false,
}: HoverProfileProps) => {
  const { t } = useTranslation();
  const { user: currentUser } = useUser();
  const { data: user } = useProfile(user_name);

  const { data: posts, isLoading: isPostsLoading } = useGetPosts(
    user?.user_id,
    showPosts
  );

  const { observations: userObservations } = useGetObservesByUser({
    user_id: user?.user_id,
  });
  const { observations } = useGetObservesOnUser({
    user_id: user?.user_id,
  });

  const { observation } = useGetObserve({
    user_id: currentUser!.id,
    observe_id: user?.user_id,
  });

  const { observer } = useObservation({
    user_id: currentUser!.id,
    observe_id: user?.user_id,
  });

  const { notify } = useAddNotification({ user_id: currentUser!.id });

  if (!user) return null;

  const handleObserve = () => {
    if (!currentUser) return;

    observer(
      {
        user_id: currentUser.id,
        observe_id: user?.user_id,
        user_name: currentUser?.user_metadata.user_name,
        observer_name: user_name,
      },
      {
        onSuccess: () => {
          if (isObserve) return;

          notify({
            status: "unread",
            type: "observe",
            user_id: user.user_id,
            by_user: currentUser.id,
            post_id: null,
          });
        },
      }
    );
  };

  const isObserve = observation && observation.length > 0;

  return (
    <div
      className={`absolute ${
        position === "bottom"
          ? "bottom-0 translate-y-full"
          : "top-0 -translate-y-full"
      } ${
        !proposed ? "left-0" : "-left-32"
      } p-4 2xl:p-6 bg-stone-50 z-50 shadow-lg rounded-md min-w-[388px] dark:bg-stone-950`}
    >
      <>
        <div className="flex items-center gap-4 mb-2">
          <StorieAvatar profile={user} size={40} />
          <div className="flex flex-col">
            <CustomLink
              to={`/dashboard/${user.user_name}`}
              modifier="hover-name"
            >
              {user.user_name}
            </CustomLink>
            <p className="text-sm text-stone-500 dark:text-stone-200">
              {user.fullName}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center gap-6 mb-2">
          <div className="text-center p-2 2xl:p-4">
            <p className="font-semibold dark:text-stone-50">
              {posts?.count ?? 0}
            </p>
            <h2 className="text-sm text-stone-600 dark:text-stone-200">
              {t("profile.posts")}
            </h2>
          </div>
          <div className="text-center p-2 2xl:p-4">
            <Modal.Open openClass={`hover-${user_name}-user-observations`}>
              <Button modifier="hover">
                <p className="font-semibold dark:text-stone-50">
                  {userObservations.length ?? 0}
                </p>
                <h2 className="text-sm text-stone-600 dark:text-stone-200">
                  {t("profile.observers")}
                </h2>
              </Button>
            </Modal.Open>
            <Modal.Content
              manageClass={`hover-${user_name}-user-observations`}
              parentClass="mx-auto max-w-lg mt-14"
            >
              <ObservesByUser user_id={user.user_id} />
            </Modal.Content>
          </div>
          <div className="text-center p-2 2xl:p-4">
            <Modal.Open openClass={`hover-${user_name}-observations`}>
              <Button modifier="hover">
                <p className="font-semibold dark:text-stone-50">
                  {observations.length ?? 0}
                </p>
                <h2 className="text-sm text-stone-600 dark:text-stone-200">
                  {t("profile.byobservers")}
                </h2>
              </Button>
            </Modal.Open>
            <Modal.Content
              parentClass="mx-auto max-w-lg mt-14"
              manageClass={`hover-${user_name}-observations`}
            >
              <ObservesOnUser user_id={user.user_id} />
            </Modal.Content>
          </div>
        </div>
        {showPosts ? (
          <div className="grid grid-cols-3 gap-2 mb-4">
            {user.type === "public" || isObserve ? (
              <>
                {isPostsLoading && <HoverProfileSkeleton />}
                {!isPostsLoading &&
                  posts?.data.slice(0, 3).map((post) => {
                    return (
                      <CustomLink
                        to={`/dashboard/${user_name}/post/${post.id}`}
                        modifier="logo"
                        key={post.id}
                      >
                        <div
                          className="w-full aspect-square bg-center bg-cover"
                          key={post.id}
                          style={{ backgroundImage: `url(${post.post_url})` }}
                        >
                          &nbsp;
                        </div>
                      </CustomLink>
                    );
                  })}
                {!isPostsLoading && posts?.data.length === 0 && (
                  <p className="text-stone-600 text-center col-start-1 -col-end-1 dark:text-stone-200">
                    {t("hover.noPosts")}
                  </p>
                )}
              </>
            ) : (
              <div className="col-start-1 -col-end-1">
                <PrivateProfile />
              </div>
            )}
          </div>
        ) : null}
        <div className="flex gap-2 flex-wrap">
          {currentUser?.id === user.user_id ? null : (
            <Button modifier="add-user" onClick={handleObserve}>
              <HiUserAdd />
              {isObserve ? t("profile.unobserver") : t("profile.observe")}
            </Button>
          )}
          {currentUser?.id === user.user_id ? null : !isObserve ? null : (
            <CustomLink
              modifier="send"
              to={`/dashboard/messages?name=${user.user_name}`}
            >
              <LuSend className="text-stone-50 dark:text-stone-950" />
              {t("posts.sendMessage")}
            </CustomLink>
          )}
        </div>
      </>
    </div>
  );
};
