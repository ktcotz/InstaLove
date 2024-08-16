import { useQuery } from "@tanstack/react-query";
import { getNestedComments } from "../services/services";

export const useGetNestedComments = (comment_id?: number) => {
  const { data, isLoading } = useQuery({
    queryKey: ["nested-comments", comment_id],
    queryFn: () => getNestedComments({ comment_id }),
    enabled: !!comment_id,
  });

  return { data, isLoading } as const;
};
