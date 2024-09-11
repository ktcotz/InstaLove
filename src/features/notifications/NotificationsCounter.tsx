import { useUser } from "../authentication/queries/useUser";
import { useGetUnreadNotifications } from "./queries/useGetUnreadNotifications";

const MAX_NOTIFICATION_LENGTH = 9;

export const NotificationsCounter = () => {
  const { user } = useUser();
  const { unreadNotifications } = useGetUnreadNotifications({
    user_id: user?.id,
  });

  const notifications = unreadNotifications?.length;

  if (!notifications) return null;

  return (
    <div
      className="absolute flex items-center justify-center -top-3 -right-3 text-xs rounded-full w-6 h-6 bg-red-600 text-stone-50"
      aria-label="Notifications"
    >
      {length > MAX_NOTIFICATION_LENGTH ? "9+" : notifications}
    </div>
  );
};
