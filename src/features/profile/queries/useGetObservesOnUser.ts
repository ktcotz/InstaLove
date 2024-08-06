import { useQuery } from "@tanstack/react-query";
import { UserID } from "../../authentication/services/services";
import { getObserversOnUser } from "../services/services";
import { SearchQuery } from "../../../ui/SearchInput";

export const useGetObservesOnUser = ({
  user_id,
  query,
}: UserID & SearchQuery) => {
  const { data: observations = [], isLoading } = useQuery({
    queryKey: ["observations-on", user_id, query],
    queryFn: () => getObserversOnUser({ user_id, query }),
    enabled: !!user_id || !query,
  });

  return { observations, isLoading } as const;
};
