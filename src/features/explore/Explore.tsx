import { useGetAllPostsAndReels } from "./queries/useGetAllPostsAndReels";
import { useCallback, useRef } from "react";
import { ExploreData } from "./ExploreData";
import { ExploreSkeleton } from "./ExploreSkeleton";

export const MAX_EXPLORE_POST = 4;

export const Explore = () => {
  // const { data, fetchNextPage, hasNextPage, isLoading, isFetching } =
  //   useGetAllPostsAndReels();

  // const observer = useRef<IntersectionObserver>();
  // const lastElementRef = useCallback(
  //   (node: HTMLButtonElement) => {
  //     if (isLoading) return;

  //     if (observer.current) observer.current.disconnect();

  //     observer.current = new IntersectionObserver((entries) => {
  //       if (entries[0].isIntersecting && hasNextPage && !isFetching) {
  //         fetchNextPage();
  //       }
  //     });

  //     if (node) observer.current.observe(node);
  //   },
  //   [fetchNextPage, hasNextPage, isFetching, isLoading]
  // );

  const isLoading = true;

  return (
    <div className="mx-auto px-1 w-full max-w-6xl">
      {/* <div className="grid gap-1">
        {data?.pages.map((dataPage, idx) => (
          <ExploreData
            key={idx}
            idx={idx}
            data={dataPage}
            lastElement={lastElementRef}
          />
        ))}
      </div> */}

      {isLoading && (
        <div className="grid grid-cols-3 grid-rows-2 gap-1 p-6">
          <ExploreSkeleton />
        </div>
      )}
    </div>
  );
};
