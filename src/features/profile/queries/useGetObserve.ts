import { useQuery } from "@tanstack/react-query";
import { getObserve } from "../services/services";
import { ObserveUserData } from "../mutations/useObservation";

export const useGetObserve = ({ user_id, observe_id }: ObserveUserData) => {
  const { data: observation, isLoading } = useQuery({
    queryKey: ["observe", user_id, observe_id],
    queryFn: () => getObserve({ user_id, observe_id }),
    enabled: !!observe_id,
  });

  return { observation, isLoading } as const;
};
