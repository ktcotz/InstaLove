import { useQuery } from "@tanstack/react-query";
import { getProposedPosts } from "../services/services";

export const useProposedPosts = (user_id?: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ["posts", user_id],
    queryFn: () => getProposedPosts({ user_id }),
    enabled: !!user_id,
  });

  return { data, isLoading } as const;
};
