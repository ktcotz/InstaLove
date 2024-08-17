import { useQuery } from "@tanstack/react-query";
import { getAllStories } from "../services/services";

export const useGetAllStories = () => {
  const { data: stories, isLoading } = useQuery({
    queryKey: ["stories"],
    queryFn: () => getAllStories(),
  });

  return { stories, isLoading } as const;
};
