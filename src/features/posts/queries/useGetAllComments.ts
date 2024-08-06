import { useQuery } from "@tanstack/react-query";
import { getComments } from "../services/services";

export const useGetAllComments = (post_id: number) => {
  const { data, isLoading } = useQuery({
    queryKey: ["comments-all", post_id],
    queryFn: () => getComments({ post_id }),
  });

  return { data, isLoading } as const;
};
