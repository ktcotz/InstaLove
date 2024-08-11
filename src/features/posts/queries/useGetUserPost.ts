import { useQuery } from "@tanstack/react-query";
import { getUserPost } from "../services/services";

export type UserPost = {
  post_id: string;
  user_id?: string;
};

export const useGetUserPost = ({ post_id, user_id }: UserPost) => {
  const { data, isLoading } = useQuery({
    queryKey: ["user-post", post_id, user_id],
    queryFn: () => getUserPost({ post_id, user_id }),
    enabled: !!user_id,
  });

  return { data, isLoading } as const;
};
