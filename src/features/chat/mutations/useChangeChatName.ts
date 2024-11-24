import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changeChatName } from "../services/services";

export const useChangeChatName = (id?: number) => {
  const queryClient = useQueryClient();

  const { mutate: change } = useMutation({
    mutationFn: changeChatName,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chat", id] });
    },
  });

  return { change } as const;
};
