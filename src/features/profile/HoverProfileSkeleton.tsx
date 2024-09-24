import Skeleton from "react-loading-skeleton";

export const HoverProfileSkeleton = () => {
  const MAX_EXPLORE_POSTS = 3;

  return Array.from({ length: MAX_EXPLORE_POSTS }, (_, i) => {
    return (
      <div key={i}>
        <Skeleton className="w-full h-full" height={125} />
      </div>
    );
  });
};
