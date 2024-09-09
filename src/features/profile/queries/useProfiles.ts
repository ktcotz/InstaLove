import { useQuery } from "@tanstack/react-query";
import { getProfiles } from "../services/services";

export type ProposedProfilesProps = {
  id?: string;
  limit?: number;
  page?: number;
};

export const useProfiles = ({ id, limit, page }: ProposedProfilesProps) => {
  const { data, isLoading } = useQuery({
    queryKey: ["profiles", limit, page],
    queryFn: () => getProfiles({ id, limit, page }),
    enabled: !!id,
  });

  return { profiles: data?.profiles, count: data?.count, isLoading } as const;
};
