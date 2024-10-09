import { useQuery } from "@tanstack/react-query";
import { getAllActiveUsers } from "../services/services";

export const useGetActiveProfiles = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["active-users"],
    queryFn: getAllActiveUsers,
  });

  return { data, isLoading } as const;
};
