import { useMutation, useQueryClient } from "@tanstack/react-query";
import { manageLike } from "../services/services";
import { Like } from "../schema/LikeSchema";

export const useLike = ({ comment_id, post_id }: Like) => {
  const queryClient = useQueryClient();

  const { mutate: like, isPending } = useMutation({
    mutationFn: manageLike,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["likes", post_id] });
      queryClient.invalidateQueries({ queryKey: ["likes", comment_id] });
    },
  });

  return { like, isPending } as const;
};
