import { useQuery } from "@tanstack/react-query";
import { getComments } from "../services/services";

export const useGetComments = (post_id: number, user_id?: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ["comments", post_id],
    queryFn: () => getComments({ post_id, user_id }),
    enabled: !!user_id,
  });

  return {
    data,
    isLoading,
  } as const;
};
