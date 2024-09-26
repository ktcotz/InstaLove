import { formatDistanceToNow } from "date-fns";
import { useUserByID } from "../authentication/queries/useUserByID";
import { Notification as NotificationSchema } from "./schema/Notifcation";
import { getDateFnsLocaleByActiveLanguage } from "../posts/helpers/dateLocale";
import { Button, CustomLink, Modal } from "../../ui";
import { useTranslation } from "react-i18next";
import { ModalStories } from "../stories/modal/ModalStories";
import { useMediaQuery } from "usehooks-ts";

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
  const isLaptop = useMediaQuery("(min-width:1024px)");

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
    post_mark: t("notifications.postMark"),
    storie_mark: t("notifications.storieMark"),
  };

  const notificationLinkType: Record<typeof type, string> = {
    like: `/dashboard/${receiver?.user_name}/post/${post_id}`,
    mark: `/dashboard/${receiver?.user_name}/post/${post_id}`,
    observe: `/dashboard/${user?.user_name}`,
    comment: `/dashboard/${receiver?.user_name}/post/${post_id}`,
    comment_reply: `/dashboard/${receiver?.user_name}/post/${post_id}`,
    bookmark: `/dashboard/${receiver?.user_name}/post/${post_id}`,
    post_mark: `/dashboard/${user?.user_name}/post/${post_id}`,
    storie_mark: "",
  };

  if (type === "storie_mark") {
    return (
      <>
        <Modal.Open openClass="storie">
          <Button modifier="notification">
            <img
              src={user?.avatar_url}
              alt={user?.user_name}
              width={40}
              height={40}
              className="w-10 h-10 rounded-full"
            />
            <div className="text-xs text-left">
              <p className="text-xs dark:text-stone-50">
                <strong>{user?.user_name}</strong>
              </p>
              <p className="text-stone-900 dark:text-stone-200">
                {notificationType[type]}
              </p>
              <p className="text-stone-600 dark:text-stone-100">
                {formatedDate}
              </p>
            </div>
          </Button>
        </Modal.Open>
        <Modal.Content
          manageClass="storie"
          parentClass={`flex items-center gap-6 max-h-[700px] h-[700px] ${
            !isLaptop && "relative w-full h-full md:max-w-[800px]  mx-auto"
          }`}
        >
          <ModalStories clickedID={by_user} />
        </Modal.Content>
      </>
    );
  }

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
        <p className="text-xs dark:text-stone-50">
          <strong>{user?.user_name}</strong>
        </p>
        <p className="text-stone-900 dark:text-stone-200">
          {notificationType[type]}
        </p>
        <p className="text-stone-600 dark:text-stone-100">{formatedDate}</p>
      </div>
    </CustomLink>
  );
};
