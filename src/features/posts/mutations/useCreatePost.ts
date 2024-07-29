import { useMutation } from "@tanstack/react-query";
import { createPost } from "../services/services";
import { CustomError } from "../../../utils/CustomErrors";
import toast from "react-hot-toast";

export const useCreatePost = () => {
  const { mutate: create, isPending: isCreating } = useMutation({
    mutationFn: createPost,

    onError: (err: CustomError) => {
      toast.error(err.message);
    },
  });

  return { create, isCreating } as const;
};
