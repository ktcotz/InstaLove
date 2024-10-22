import { useQuery } from "@tanstack/react-query";
import { getChat } from "../services/services";

export type GetChatData = {
  chat_id?: number;
};

export const useGetChat = ({ chat_id }: GetChatData) => {
  const { data, isLoading } = useQuery({
    queryKey: ["chat", chat_id],
    queryFn: () => getChat({ chat_id }),
    enabled: !!chat_id,
  });

  return { data, isLoading } as const;
};
