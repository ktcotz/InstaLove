import { useQuery } from "@tanstack/react-query";
import { getCommentsLikes } from "../services/services";

export type CommentLikes = {
  comment_id?: number;
};

export const useGetCommentLikes = ({ comment_id }: CommentLikes) => {
  const { data, isLoading } = useQuery({
    queryKey: ["likes", comment_id],
    queryFn: () => getCommentsLikes({ comment_id }),
  });

  return { likes: data?.parsed, count: data?.count, isLoading } as const;
};
