import { supabase } from "../../../lib/supabase/supabase";
import { CustomError } from "../../../utils/CustomErrors";
import { UserID } from "../../authentication/services/services";
import { UpdateNotifications } from "../mutations/useReadNotifications";
import { GetNotifications } from "../queries/useGetNotifications";
import { Notification, NotificationsSchema } from "../schema/Notifcation";

export const addNotification = async (notification: Notification) => {
  const user_id = notification.user_id.startsWith("@")
    ? notification.user_id.slice(1)
    : notification.user_id;

  if (!user_id) return;

  const { data: users, error: userError } = await supabase
    .from("users")
    .select("*")
    .eq("user_name", user_id);

  if (userError) {
    throw new CustomError({
      message: userError.message,
    });
  }

  if (users.length > 0 && users[0].user_id === notification.by_user) return;

  const { data, error } = await supabase
    .from("notifications")
    .insert([
      {
        user_id: users.length > 0 ? users[0].user_id : notification.user_id,
        status: notification.status,
        type: notification.type,
        post_id: notification.post_id,
        by_user: notification.by_user,
      },
    ])
    .select();

  if (error) {
    throw new CustomError({
      message: error.message,
    });
  }

  return data;
};

export const getNotifications = async ({
  user_id,
  date: { start, end },
}: GetNotifications) => {
  const { data: notifications, error } = await supabase
    .from("notifications")
    .select("*")
    .eq("user_id", user_id)
    .gte("created_at", start)
    .lte("created_at", end)
    .order("created_at", { ascending: false });

  if (error) {
    throw new CustomError({
      message: error.message,
    });
  }

  console.log(notifications);

  const parsed = NotificationsSchema.parse(notifications);

  return parsed;
};

export const getUnreadNotifications = async ({ user_id }: UserID) => {
  const { data: notifications, error } = await supabase
    .from("notifications")
    .select("*")
    .eq("user_id", user_id)
    .eq("status", "unread");

  if (error) {
    throw new CustomError({
      message: error.message,
    });
  }

  const parsed = NotificationsSchema.parse(notifications);

  return parsed;
};

export const updateReadNotifications = async ({
  notifications,
}: UpdateNotifications) => {
  notifications.forEach(async (notification) => {
    await supabase
      .from("notifications")
      .update({ status: "read" })
      .eq("id", notification.id)
      .select();
  });

  return notifications;
};
