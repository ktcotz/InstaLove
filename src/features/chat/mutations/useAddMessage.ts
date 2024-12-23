import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addMessage } from "../services/services";
import { Profile } from "../../profile/schema/ProfilesSchema";

export type AddMessageData = {
  chatId: number;
  userId: string;
  message: string;
  reply: { user: Profile | null; message: string } | null;
};

export const useAddMessage = ({ chatId }: { chatId: number }) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: addMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages", chatId] });
    },
  });

  return { mutate };
};
