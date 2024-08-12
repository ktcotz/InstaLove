import { useQuery } from "@tanstack/react-query";
import { getAllUsersByQuery } from "../services/services";

export const useGetAllUsersByQuery = (query: string) => {
  const { data: users, isLoading } = useQuery({
    queryKey: ["all-users", query],
    queryFn: () => getAllUsersByQuery({ query }),
    enabled: !!query,
  });

  return { users, isLoading } as const;
};
