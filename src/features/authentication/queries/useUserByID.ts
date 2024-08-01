import { useQuery } from "@tanstack/react-query";
import { getUserByID } from "../services/services";

export const useUserByID = (user_id: string) => {
  const { data: user, isLoading } = useQuery({
    queryKey: ["userID"],
    queryFn: () => getUserByID({ user_id }),
    enabled: !!user_id,
  });

  return { user, isLoading } as const;
};
