import { useMutation } from "@tanstack/react-query";
import { addMessage } from "../services/services";

export type AddMessageData = {
  chatId: number;
  userId: string;
  message: string;
};

export const useAddMessage = () => {
  const { mutate } = useMutation({
    mutationFn: addMessage,
  });

  return { mutate };
};
