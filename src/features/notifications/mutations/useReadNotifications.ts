import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateReadNotifications } from "../services/services";
import { UserID } from "../../authentication/services/services";
import { Notifications } from "../schema/Notifcation";

export type UpdateNotifications = {
  notifications: Notifications;
};

export const useReadNotifications = ({ user_id }: UserID) => {
  const queryClient = useQueryClient();

  const { mutate: readNotifications } = useMutation({
    mutationFn: updateReadNotifications,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["unread-notifications", user_id],
      });
    },
  });

  return { readNotifications } as const;
};
