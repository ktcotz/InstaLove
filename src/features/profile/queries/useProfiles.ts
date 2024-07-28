import { useQuery } from "@tanstack/react-query";
import { getProfiles } from "../services/services";

export const useProfiles = (currentUserID: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ["profiles"],
    queryFn: () => getProfiles({ id: currentUserID }),
  });

  return { data, isLoading } as const;
};
