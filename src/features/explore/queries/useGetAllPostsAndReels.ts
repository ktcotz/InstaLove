import { useQuery } from "@tanstack/react-query";
import { getAllPostsAndReels } from "../services/services";

export const useGetAllPostsAndReels = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["all"],
    queryFn: () => getAllPostsAndReels(),
  });

  return { data, isLoading } as const;
};
