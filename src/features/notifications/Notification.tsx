import { useUserByID } from "../authentication/queries/useUserByID";
import { Notification as NotificationSchema } from "./schema/Notifcation";
import { LikeNotification } from "./type/LikeNotifications";
import { ObserveNotification } from "./type/ObserveNotification";

export const Notification = ({
  by_user,
  created_at,
  type,
}: NotificationSchema) => {
  const { user } = useUserByID(by_user);

  const notificationType: Record<typeof type, JSX.Element> = {
    observe: <ObserveNotification created_at={created_at} user={user} />,
    like: <LikeNotification created_at={created_at} user={user} />,
    bookmark: <ObserveNotification />,
  };

  return notificationType[type] ?? null;
};
