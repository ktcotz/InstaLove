import { useTranslation } from "react-i18next";
import { useUser } from "../authentication/queries/useUser";
import {
  getWeekEnd,
  getWeekStart,
  getMonthStart,
  getMonthEnd,
  getTodayStart,
  getTodayEnd,
} from "./helpers/date";
import { Notification } from "./Notification";
import { NotificationsSkeleton } from "./NotificationsSkeleton";
import { useGetNotifications } from "./queries/useGetNotifications";

export type NotificationsDate = "today" | "week" | "month";

export type Dates = {
  start: string;
  end: string;
};

type NotificationsByDateProps = {
  date: NotificationsDate;
};

const getDate: Record<NotificationsDate, Dates> = {
  today: {
    start: getTodayStart(),
    end: getTodayEnd(),
  },
  week: {
    start: getWeekStart(),
    end: getWeekEnd(),
  },
  month: {
    start: getMonthStart(),
    end: getMonthEnd(),
  },
};

export const NotificationsByDate = ({ date }: NotificationsByDateProps) => {
  const { user } = useUser();
  const { t } = useTranslation();

  const { notifications, isLoading } = useGetNotifications({
    user_id: user!.id,
    date: getDate[date],
  });

  if (isLoading) return <NotificationsSkeleton />;

  if (!notifications?.length) return null;

  return (
    <div className="border-b border-stone-300 py-4 last:border-0">
      <h3 className="text-xl font-semibold mb-3">
        {date === "today" && t("notifications.today")}
        {date === "week" && t("notifications.week")}
        {date === "month" && t("notifications.month")}
      </h3>
      <div className="flex flex-col gap-3">
        {notifications?.map((notification) => (
          <Notification key={notification.id} {...notification} />
        ))}
      </div>
    </div>
  );
};
