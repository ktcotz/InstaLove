import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getMessages } from "../services/services";
import { useEffect } from "react";
import { supabase } from "../../../lib/supabase/supabase";

export type GetMessagesData = {
  chatId: number;
};

export const useGetMessages = ({ chatId }: GetMessagesData) => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["messages", chatId],
    queryFn: () => getMessages({ chatId }),
    staleTime: Infinity,
  });

  useEffect(() => {
    const subscription = supabase
      .channel(`chat:${chatId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `chat_id=eq.${chatId}`,
        },
        (payload) => {
          queryClient.setQueryData(
            ["messages", chatId],
            (oldMessages: [] = []) => [...oldMessages, payload.new]
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  });

  return { data, isLoading };
};
