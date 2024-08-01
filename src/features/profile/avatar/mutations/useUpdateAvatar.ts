import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAvatar } from "../services/services";

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
  });

  return { update, isUpdating } as const;
};
