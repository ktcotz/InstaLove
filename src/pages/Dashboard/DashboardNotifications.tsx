import { Notifications } from "../../features/notifications/Notifications";

export const DashboardNotifications = () => {
  return (
    <div className="bg-stone-50 border-r border-stone-300 h-full overflow-y-scroll dark:bg-stone-950 dark:border-stone-50">
      <Notifications />
    </div>
  );
};
