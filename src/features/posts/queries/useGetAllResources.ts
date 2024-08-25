import { useQuery } from "@tanstack/react-query";
import { getAllResources } from "../services/services";

export const useGetAllResources = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["all-resources"],
    queryFn: () => getAllResources(),
  });

  return { data, isLoading } as const;
};
