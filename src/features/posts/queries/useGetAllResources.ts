import { useInfiniteQuery } from "@tanstack/react-query";
import { getAllResources } from "../services/services";

export const useGetAllResources = () => {
  return useInfiniteQuery({
    queryKey: ["all-resources"],
    initialPageParam: 1,
    queryFn: ({ pageParam = 1 }) => getAllResources(pageParam),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.hasMore) {
        return allPages.length + 1;
      }
      return undefined;
    },
  });
};
