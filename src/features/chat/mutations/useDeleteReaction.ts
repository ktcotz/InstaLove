import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUserReaction } from "../services/services";
import { useModal } from "../../../ui/modal/ModalContext/useModal";

export type DeleteReactionData = {
  id?: string;
  message_id: number;
};

export const useDeleteReaction = ({ message_id }: DeleteReactionData) => {
  const queryClient = useQueryClient();
  const { close } = useModal();

  const { mutate: deleteReaction } = useMutation({
    mutationFn: deleteUserReaction,
    onSuccess: () => {
      close();
      queryClient.invalidateQueries({
        queryKey: ["messages-reactions", message_id],
      });
    },
  });

  return { deleteReaction } as const;
};
