import { useEffect } from "react";
import { useUser } from "../authentication/queries/useUser";
import { NotificationsByDate } from "./NotificationsByDate";
import { useGetUnreadNotifications } from "./queries/useGetUnreadNotifications";
import { useReadNotifications } from "./mutations/useReadNotifications";
import { useTranslation } from "react-i18next";

export const Notifications = () => {
  const { user } = useUser();
  const { unreadNotifications } = useGetUnreadNotifications({
    user_id: user?.id,
  });
  const { t } = useTranslation();

  const { readNotifications } = useReadNotifications({ user_id: user?.id });

  useEffect(() => {
    if (!unreadNotifications) return;

    readNotifications({ notifications: unreadNotifications });
  }, [unreadNotifications, readNotifications]);

  return (
    <div className="p-4">
      <h2 className="text-3xl font-semibold mb-2">
        {t("navigation.notifications")}
      </h2>
      <div className="py-4 overflow-y-scroll">
        <NotificationsByDate date="today" />
        <NotificationsByDate date="week" />
        <NotificationsByDate date="month" />
      </div>
    </div>
  );
};
