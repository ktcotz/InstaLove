import { useQuery } from "@tanstack/react-query";
import { getObserversByUser } from "../services/services";
import { SearchQuery } from "../../../ui/SearchInput";
import { UserID } from "../../authentication/services/types";

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
