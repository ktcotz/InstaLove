import { useQuery } from "@tanstack/react-query";
import { getMessagesAllReactions } from "../services/services";

export type GetMessagesReactions = {
  message_id: number;
};

export const useGetReactions = ({ message_id }: GetMessagesReactions) => {
  const { data: reactions } = useQuery({
    queryKey: ["messages-reactions", message_id],
    queryFn: () => getMessagesAllReactions({ message_id }),
  });

  return { reactions } as const;
};
