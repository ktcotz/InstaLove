import { formatDistanceToNow } from "date-fns";
import { useUserByID } from "../authentication/queries/useUserByID";
import { Notification as NotificationSchema } from "./schema/Notifcation";
import { getDateFnsLocaleByActiveLanguage } from "../posts/helpers/dateLocale";
import { CustomLink } from "../../ui";
import { useTranslation } from "react-i18next";

export const Notification = ({
  by_user,
  created_at,
  type,
  post_id,
  user_id,
}: NotificationSchema) => {
  const { user } = useUserByID(by_user);
  const { user: receiver } = useUserByID(user_id);
  const { t, i18n } = useTranslation();

  const formatedDate = created_at
    ? formatDistanceToNow(new Date(created_at), {
        locale: getDateFnsLocaleByActiveLanguage(
          i18n.language || navigator.language
        ),
        addSuffix: true,
      })
    : null;

  const notificationType: Record<typeof type, string> = {
    like: t("notifications.like"),
    observe: t("notifications.observe"),
    mark: t("notifications.mark"),
    comment: t("notifications.commentLike"),
    comment_reply: t("notifications.commentReply"),
    bookmark: t("notifications.bookmark"),
  };

  const notificationLinkType: Record<typeof type, string> = {
    like: `/dashboard/${receiver?.user_name}/post/${post_id}`,
    mark: `/dashboard/${receiver?.user_name}/post/${post_id}`,
    observe: `/dashboard/${user?.user_name}`,
    comment: `/dashboard/${receiver?.user_name}/post/${post_id}`,
    comment_reply: `/dashboard/${receiver?.user_name}/post/${post_id}`,
    bookmark: `/dashboard/${receiver?.user_name}/post/${post_id}`,
  };

  return (
    <CustomLink modifier="notification" to={notificationLinkType[type]}>
      <img
        src={user?.avatar_url}
        alt={user?.user_name}
        width={40}
        height={40}
        className="w-10 h-10 rounded-full"
      />
      <div className="text-xs">
        <p className="text-xs">
          <strong>{user?.user_name}</strong>
        </p>
        <p className="text-stone-900">{notificationType[type]}</p>
        <p className="text-stone-600">{formatedDate}</p>
      </div>
    </CustomLink>
  );
};
