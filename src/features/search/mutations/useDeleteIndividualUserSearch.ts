import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteIndividualUserSearch } from "../services/services";

export const useDeleteIndividualUserSearch = (user_id?: string) => {
  const queryClient = useQueryClient();

  const { mutate: deleteUser, isPending } = useMutation({
    mutationFn: deleteIndividualUserSearch,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["queries", user_id] });
    },
  });

  return { deleteUser, isPending } as const;
};
