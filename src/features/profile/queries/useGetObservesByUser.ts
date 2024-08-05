import { useQuery } from "@tanstack/react-query";
import { UserID } from "../../authentication/services/services";
import { getObserversByUser } from "../services/services";

export const useGetObservesByUser = ({ user_id }: UserID) => {
  const { data: observations, isLoading } = useQuery({
    queryKey: ["observations-by", user_id],
    queryFn: () => getObserversByUser({ user_id }),
    enabled: !!user_id,
  });

  return { observations, isLoading } as const;
};
