import { useUser } from "../authentication/queries/useUser";
import { useGetUnreadNotifications } from "./queries/useGetUnreadNotifications";

export const NotificationsCounter = () => {
  const { user } = useUser();
  const { unreadNotifications } = useGetUnreadNotifications({
    user_id: user!.id,
  });

  const length = unreadNotifications?.length;

  if (!length) return null;

  return (
    <div className="absolute flex items-center justify-center -top-3 -right-3 text-xs rounded-full w-6 h-6 bg-red-700 text-stone-50">
      {length > 9 ? "9+" : length}
    </div>
  );
};
