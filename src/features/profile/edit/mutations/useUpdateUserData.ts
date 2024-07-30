import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateUserData, updateUserData } from "../services/services";

export const useUpdateUserData = (user_id: string) => {
  const queryClient = useQueryClient();

  const {
    mutate: update,
    isPending: isUpdating,
    error: updateError,
  } = useMutation({
    mutationFn: (data: UpdateUserData) => updateUserData({ user_id, ...data }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  return { update, isUpdating, updateError } as const;
};
