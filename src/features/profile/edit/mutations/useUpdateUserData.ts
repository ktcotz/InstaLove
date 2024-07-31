import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateUserData, updateUserData } from "../services/services";

export const useUpdateUserData = (user_name: string) => {
  const queryClient = useQueryClient();

  const {
    mutate: update,
    isPending: isUpdating,
    error: updateError,
  } = useMutation({
    mutationFn: (data: UpdateUserData) =>
      updateUserData({ user_name, ...data }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile", user_name] });
    },
  });

  return { update, isUpdating, updateError } as const;
};
