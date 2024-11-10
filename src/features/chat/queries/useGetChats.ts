import { useQuery } from "@tanstack/react-query";
import { UserID } from "../../authentication/services/types";
import { getChats } from "../services/services";

export const useGetChats = ({ user_id }: UserID) => {
  const { data, isLoading } = useQuery({
    queryKey: ["chats", user_id],
    queryFn: () => getChats({ user_id }),
    enabled: !!user_id,
  });

  return { data, isLoading };
};
