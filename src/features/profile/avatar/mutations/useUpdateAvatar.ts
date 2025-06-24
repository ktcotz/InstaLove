import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAvatar } from "../services/services";
import toast from "react-hot-toast";

export const useUpdateAvatar = () => {
  const queryClient = useQueryClient();

  const { mutate: update, isPending: isUpdating } = useMutation({
    mutationFn: updateAvatar,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["profile"],
      });
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { update, isUpdating } as const;
};
