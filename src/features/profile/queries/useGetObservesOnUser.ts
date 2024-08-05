import { useQuery } from "@tanstack/react-query";
import { UserID } from "../../authentication/services/services";
import { getObserversOnUser } from "../services/services";

export const useGetObservesOnUser = ({ user_id }: UserID) => {
  const { data: observations, isLoading } = useQuery({
    queryKey: ["observations-on", user_id],
    queryFn: () => getObserversOnUser({ user_id }),
    enabled: !!user_id,
  });

  return { observations, isLoading } as const;
};
