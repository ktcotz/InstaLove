import { useUserByID } from "../authentication/queries/useUserByID";
import { Notification as NotificationSchema } from "./schema/Notifcation";
import { BookmarkNotifications } from "./type/BookmarkNotification";
import { LikeCommentNotification } from "./type/LikeCommentNotification";
import { LikeNotification } from "./type/LikeNotification";
import { ObserveNotification } from "./type/ObserveNotification";

export const Notification = ({
  by_user,
  created_at,
  type,
  post_id,
  user_id,
}: NotificationSchema) => {
  const { user } = useUserByID(by_user);
  const { user: receiver } = useUserByID(user_id);

  const notificationType: Record<typeof type, JSX.Element> = {
    observe: <ObserveNotification created_at={created_at} user={user} />,
    like: (
      <LikeNotification
        created_at={created_at}
        user={user}
        post_id={post_id}
        receiver={receiver}
      />
    ),
    bookmark: (
      <BookmarkNotifications
        created_at={created_at}
        user={user}
        post_id={post_id}
        receiver={receiver}
      />
    ),
    comment: (
      <LikeCommentNotification
        created_at={created_at}
        user={user}
        post_id={post_id}
        receiver={receiver}
      />
    ),
  };

  return notificationType[type] ?? null;
};
