import { useQuery } from "@tanstack/react-query";
import { getAllReels } from "../services/services";

export const useGetAllReels = () => {
  const { data: reels, isLoading } = useQuery({
    queryKey: ["all-reels"],
    queryFn: () => getAllReels(),
  });

  return { reels, isLoading } as const;
};
