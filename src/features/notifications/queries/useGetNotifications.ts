import { useQuery } from "@tanstack/react-query";
import { getNotifications } from "../services/services";

export type GetNotifications = {
  user_id: string;
  date: {
    start: string;
    end: string;
  };
};

export const useGetNotifications = ({ user_id, date }: GetNotifications) => {
  const { data: notifications, isLoading } = useQuery({
    queryKey: ["notifications", user_id, date],
    queryFn: () => getNotifications({ user_id, date }),
    enabled: !!user_id,
  });

  return { notifications, isLoading } as const;
};
