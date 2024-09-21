import { useQuery } from "@tanstack/react-query";
import { getAllMarksByPost } from "../services/services";

export type MarksByUserPost = {
  user_id?: string;
  post_id: number;
};

export const useGetAllMarksOnPost = ({ user_id, post_id }: MarksByUserPost) => {
  const { data: marks, isLoading } = useQuery({
    queryKey: ["marks", post_id, user_id],
    queryFn: () => getAllMarksByPost({ user_id, post_id }),
    enabled: !!user_id,
  });

  return { marks, isLoading } as const;
};
