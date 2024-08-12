import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addUserSearchQuery } from "../services/services";

export const useAddUserSearch = (user_id?: string) => {
  const queryClient = useQueryClient();

  const { mutate: addSearch, isPending } = useMutation({
    mutationFn: addUserSearchQuery,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["queries", user_id] });
    },
  });

  return { addSearch, isPending } as const;
};
