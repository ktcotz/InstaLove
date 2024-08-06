import { useQuery } from "@tanstack/react-query";
import { getProfiles } from "../services/services";

export const useProfiles = ({
  id,
  limit,
  page,
}: {
  id: string;
  limit?: number;
  page?: number;
}) => {
  const { data, isLoading } = useQuery({
    queryKey: ["profiles", limit, page],
    queryFn: () => getProfiles({ id, limit, page }),
  });

  return { profiles: data?.profiles, count: data?.count, isLoading } as const;
};
