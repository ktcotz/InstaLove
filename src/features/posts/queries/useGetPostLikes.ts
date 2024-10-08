import { useQuery } from "@tanstack/react-query";
import { getPostsLikes } from "../services/services";

export type PostLikes = {
  post_id?: number;
  user_id?: string;
};

export const useGetPostLikes = ({ post_id, user_id }: PostLikes) => {
  const { data, isLoading } = useQuery({
    queryKey: ["likes", post_id, user_id],
    queryFn: () => getPostsLikes({ post_id }),
  });

  return { likes: data?.parsed, count: data?.count, isLoading } as const;
};
