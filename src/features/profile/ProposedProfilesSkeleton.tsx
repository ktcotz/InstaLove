import Skeleton from "react-loading-skeleton";

export const ProposedProfilesSkeleton = () => {
  const MAX_EXPLORE_POSTS = 5;

  return Array.from({ length: MAX_EXPLORE_POSTS }, (_, i) => {
    return (
      <div key={i}>
        <Skeleton
          className="w-full h-full"
          height={75}
          baseColor="#000"
          highlightColor="#111"
        />
      </div>
    );
  });
};
