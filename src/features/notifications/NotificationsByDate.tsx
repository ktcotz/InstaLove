import { useUser } from "../authentication/queries/useUser";
import { Notification } from "./Notification";
import { useGetNotifications } from "./queries/useGetNotifications";

export type NotificationsDate = "today";

type NotificationsByDateProps = {
  date: NotificationsDate;
};

const getDate: Record<NotificationsDate, { start: string; end: string }> = {
  today: {
    start: `${new Date().toISOString().split("T")[0]}T00:00:00`,
    end: `${new Date().toISOString().split("T")[0]}T23:59:59`,
  },
};

export const NotificationsByDate = ({ date }: NotificationsByDateProps) => {
  const { user } = useUser();

  const { notifications } = useGetNotifications({
    user_id: user!.id,
    date: getDate[date],
  });

  if (!notifications?.length) return null;

  return (
    <div className="border-b border-stone-300 py-4 last:border-0">
      <h3 className="text-xl font-semibold mb-3">Dzisiaj</h3>
      <div className="flex flex-col gap-3">
        {notifications?.map((notification) => (
          <Notification key={notification.id} {...notification} />
        ))}
      </div>
    </div>
  );
};
