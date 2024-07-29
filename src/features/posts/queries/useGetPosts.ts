import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../services/services";

export const useGetPosts = (user_id: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ["posts", user_id],
    queryFn: () => getPosts({ user_id }),
  });

  return { data, isLoading } as const;
};
