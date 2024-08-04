import { useQuery } from "@tanstack/react-query";
import { getUserByID } from "../services/services";

export const useUserByID = (user_id: string) => {
  const { data: user, isLoading } = useQuery({
    queryKey: ["userID",user_id],
    queryFn: () => getUserByID({ user_id }),
  });

  return { user, isLoading } as const;
};
