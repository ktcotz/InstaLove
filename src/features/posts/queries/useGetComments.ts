import { useInfiniteQuery } from "@tanstack/react-query";
import { getComments } from "../services/services";
import { MAX_COMMENTS_POST } from "../IndividualModalPost";

export const useGetComments = (post_id: number) => {
  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["comments", post_id],
    queryFn: ({ pageParam }) => getComments({ post_id, page: pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const morePagesExist = lastPage.comments.length === MAX_COMMENTS_POST;
      if (!morePagesExist) return undefined;
      return allPages.length;
    },
  });

  return {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
  } as const;
};
