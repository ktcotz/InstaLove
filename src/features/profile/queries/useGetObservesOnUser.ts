import { useQuery } from "@tanstack/react-query";
import { getObserversOnUser } from "../services/services";
import { SearchQuery } from "../../../ui/SearchInput";
import { UserID } from "../../authentication/services/types";

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
