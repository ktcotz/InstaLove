import { useQuery } from "@tanstack/react-query";
import { getReels } from "../services/services";

export const useGetReels = (user_id?: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ["reels", user_id],
    queryFn: () => getReels({ user_id }),
    enabled: !!user_id,
  });

  return { data, isLoading } as const;
};
