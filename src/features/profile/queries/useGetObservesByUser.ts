import { useQuery } from "@tanstack/react-query";
import { UserID } from "../../authentication/services/services";
import { getObserversByUser } from "../services/services";
import { SearchQuery } from "../../../ui/SearchInput";

export const useGetObservesByUser = ({
  user_id,
  query,
}: UserID & SearchQuery) => {
  const { data: observations = [], isLoading } = useQuery({
    queryKey: ["observations-by", user_id, query],
    queryFn: () => getObserversByUser({ user_id, query }),
    enabled: !!user_id || !!query,
  });

  return { observations, isLoading } as const;
};
