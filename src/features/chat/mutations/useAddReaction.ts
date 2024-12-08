import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addReactionToMessage } from "../services/services";

export type AddReactionData = {
  message_id: number;
  user_id: string;
  reaction: string;
};

export const useAddReaction = ({
  message_id,
}: Pick<AddReactionData, "message_id">) => {
  const queryClient = useQueryClient();

  const { mutate: addUserReaction } = useMutation({
    mutationFn: addReactionToMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["messages-reactions", message_id],
      });
    },
  });

  return { addUserReaction } as const;
};
