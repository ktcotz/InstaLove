import Skeleton from "react-loading-skeleton";

const MAX_EXPLORE_POSTS = 6;

export const ExploreSkeleton = () => {
  return Array.from({ length: MAX_EXPLORE_POSTS }, (_, i) => {
    return (
      <div key={i}>
        <Skeleton className="w-full h-full" height={350} />
      </div>
    );
  });
};
