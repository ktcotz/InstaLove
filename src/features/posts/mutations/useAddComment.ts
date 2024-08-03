import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCommentToPost } from "../services/services";

export const useAddComment = (post_id: number) => {
  const queryClient = useQueryClient();

  const { mutate: addComment, isPending: isAdding } = useMutation({
    mutationFn: addCommentToPost,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments", post_id],
      });
    },
  });

  return { addComment, isAdding } as const;
};
