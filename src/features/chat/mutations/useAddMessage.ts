import { useMutation } from "@tanstack/react-query";
import { addMessage } from "../services/services";
import { Profile } from "../../profile/schema/ProfilesSchema";

export type AddMessageData = {
  chatId: number;
  userId: string;
  message: string;
  reply: { user: Profile | null; message: string } | null;
};

export const useAddMessage = () => {
  const { mutate } = useMutation({
    mutationFn: addMessage,
  });

  return { mutate };
};
