import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteChat } from "../services/services";
import { UserID } from "../../authentication/services/types";

export const useDeleteChat = ({ user_id }: UserID) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: deleteChat,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chats", user_id] });
    },
  });

  return { mutate, isPending };
};
