import { useQuery } from "@tanstack/react-query";
import { getAllActiveUsers } from "../services/services";

export type GetActiveProfilesData = {
  current?: string;
};

export const useGetActiveProfiles = ({ current }: GetActiveProfilesData) => {
  const { data, isLoading } = useQuery({
    queryKey: ["active-users", current],
    queryFn: () => getAllActiveUsers({ current }),
    enabled: !!current,
  });

  return { data, isLoading } as const;
};
