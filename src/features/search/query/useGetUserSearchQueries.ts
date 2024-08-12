import { useQuery } from "@tanstack/react-query";
import { getLastUserSearchQueries } from "../services/services";

export const useGetUserSearchQueries = (user_id?: string) => {
  const { data: queries, isLoading } = useQuery({
    queryKey: ["queries", user_id],
    queryFn: () => getLastUserSearchQueries({ user_id }),
    enabled: !!user_id,
  });

  return { queries, isLoading } as const;
};
