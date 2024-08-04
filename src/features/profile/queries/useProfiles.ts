import { useQuery } from "@tanstack/react-query";
import { getProfiles } from "../services/services";

export const useProfiles = ({ id, limit }: { id: string; limit?: number }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["profiles", limit],
    queryFn: () => getProfiles({ id, limit }),
  });

  return { data, isLoading } as const;
};
