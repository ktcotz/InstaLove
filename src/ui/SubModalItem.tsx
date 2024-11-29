import { useTranslation } from "react-i18next";
import { useUser } from "../features/authentication/queries/useUser";
import { useUserByID } from "../features/authentication/queries/useUserByID";
import { useAddNotification } from "../features/notifications/mutations/useAddNotification";
import { useObservation } from "../features/profile/mutations/useObservation";
import { useGetObserve } from "../features/profile/queries/useGetObserve";
import { Button } from "./Button";
import { CustomLink } from "./CustomLink";

type SubModalItemProps = {
  user_id: string;
};

export const SubModalItem = ({ user_id }: SubModalItemProps) => {
  const { t } = useTranslation();
  const { user: currentUser } = useUser();
  const { user } = useUserByID(user_id);
  const { observation } = useGetObserve({
    user_id: currentUser?.id,
    observe_id: user?.user_id,
  });
  const { observer } = useObservation({
    user_id: currentUser?.id,
    observe_id: user?.user_id,
  });

  const { notify } = useAddNotification({ user_id: currentUser!.id });

  if (!user) return null;

  const handleObserve = () => {
    observer(
      {
        user_id: currentUser?.id,
        observe_id: user?.user_id,
        user_name: currentUser?.user_metadata?.user_name,
        observer_name: user?.user_name,
      },
      {
        onSuccess: () => {
          if (isObserve) return;

          notify({
            status: "unread",
            type: "observe",
            user_id: user?.user_id,
            by_user: currentUser!.id,
            post_id: null,
          });
        },
      }
    );
  };

  const isObserve = observation && observation.length > 0;

  return (
    <div className="flex items-center gap-3 p-2">
      <CustomLink
        modifier="avatar"
        target="_blank"
        to={`/dashboard/${user.user_name}`}
      >
        <img
          src={user.avatar_url}
          alt={user.user_name}
          width={32}
          height={32}
          className="rounded-full w-8 h-8"
        />
      </CustomLink>
      <div>
        <h2 className="font-semibold text-sm dark:text-stone-50">
          {user.user_name}
        </h2>
        <p className="text-sm text-stone-600 dark:text-stone-200">
          {user.fullName}
        </p>
      </div>
      {currentUser?.id === user?.user_id ? null : (
        <div className="ml-auto">
          <Button modifier="follow" onClick={handleObserve}>
            {isObserve ? t("profile.unobserver") : t("profile.observe")}
          </Button>
        </div>
      )}
    </div>
  );
};
