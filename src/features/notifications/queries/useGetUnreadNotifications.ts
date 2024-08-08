import { useQuery } from "@tanstack/react-query";
import { UserID } from "../../authentication/services/services";
import { getUnreadNotifications } from "../services/services";

export const useGetUnreadNotifications = ({ user_id }: UserID) => {
  const { data: unreadNotifications, isLoading } = useQuery({
    queryKey: ["unread-notifications", user_id],
    queryFn: () => getUnreadNotifications({ user_id }),
    enabled: !!user_id,
  });

  return { unreadNotifications, isLoading } as const;
};
