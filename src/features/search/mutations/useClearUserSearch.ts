import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAllUserSearch } from "../services/services";

export const useClearUserSearch = (user_id?: string) => {
  const queryClient = useQueryClient();

  const { mutate: clear, isPending } = useMutation({
    mutationFn: deleteAllUserSearch,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["queries", user_id] });
    },
  });

  return { clear, isPending } as const;
};
