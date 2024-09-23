import Skeleton from "react-loading-skeleton";

export const ProfilePostsSkeleton = () => {
  const MAX_EXPLORE_POSTS = 6;

  return Array.from({ length: MAX_EXPLORE_POSTS }, (_, i) => {
    return (
      <div>
        <div key={i}>
          <Skeleton className="w-full h-full" height={350} />
        </div>
      </div>
    );
  });
};
