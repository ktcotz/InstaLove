import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CustomError } from "../../../utils/CustomErrors";
import toast from "react-hot-toast";
import { createPost } from "../services/services";

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  const { mutate: create, isPending: isCreating } = useMutation({
    mutationFn: createPost,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["reels"] });
      queryClient.invalidateQueries({ queryKey: ["stories"] });
    },

    onError: (err: CustomError) => {
      toast.error(err.message);
    },
  });

  return { create, isCreating } as const;
};
