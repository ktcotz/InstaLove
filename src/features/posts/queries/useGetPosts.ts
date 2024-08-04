import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../services/services";

export const useGetPosts = (user_id?: string, showPosts?: boolean) => {
  const { data, isLoading } = useQuery({
    queryKey: ["posts", user_id],
    queryFn: () => getPosts({ user_id }),
    enabled: !!user_id && !!showPosts,
  });

  return { data, isLoading } as const;
};
