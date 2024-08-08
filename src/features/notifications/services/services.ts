import { supabase } from "../../../lib/supabase/supabase";
import { CustomError } from "../../../utils/CustomErrors";
import { UserID } from "../../authentication/services/services";
import { UpdateNotifications } from "../mutations/useReadNotifications";
import { GetNotifications } from "../queries/useGetNotifications";
import { Notification, NotificationsSchema } from "../schema/Notifcation";

export const addNotification = async (notification: Notification) => {
  const { data, error } = await supabase
    .from("notifications")
    .insert([notification])
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
