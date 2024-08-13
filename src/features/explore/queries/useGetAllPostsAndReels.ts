import { useInfiniteQuery } from "@tanstack/react-query";
import { getAllPostsAndReels } from "../services/services";
import { MAX_EXPLORE_POST } from "../Explore";

export const useGetAllPostsAndReels = () => {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetching } =
    useInfiniteQuery({
      queryKey: ["all-explore"],
      queryFn: ({ pageParam = 0 }) => {
        return getAllPostsAndReels({ page: pageParam });
      },
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages) => {
        const hasMore = lastPage.length >= MAX_EXPLORE_POST;

        if (!hasMore) return;

        return allPages.length;
      },
    });

  return { data, isLoading, fetchNextPage, hasNextPage, isFetching } as const;
};
