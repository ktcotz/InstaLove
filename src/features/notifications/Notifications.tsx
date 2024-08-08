import { NotificationsByDate } from "./NotificationsByDate";

export const Notifications = () => {
  return (
    <div className="p-4">
      <h2 className="text-3xl font-semibold mb-4">Notifications</h2>
      <div className="py-4 overflow-y-scroll">
        <NotificationsByDate date="today" />
      </div>
    </div>
  );
};
