import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePost } from "../services/services";

export type DeletePost = {
  id: number;
  user_id?: string;
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  const { mutate: deletingPost, isPending } = useMutation({
    mutationFn: deletePost,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-resources"] });
    },
  });

  return { deletingPost, isPending } as const;
};
