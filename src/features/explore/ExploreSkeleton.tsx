import Skeleton from "react-loading-skeleton";
import { useMediaQuery } from "usehooks-ts";

const MOBILE_VIEWPORT = "640px";

export const ExploreSkeleton = () => {
  const isMobile = useMediaQuery(`(max-width:${MOBILE_VIEWPORT})`);

  const MAX_EXPLORE_POSTS = isMobile ? 9 : 6;

  return Array.from({ length: MAX_EXPLORE_POSTS }, (_, i) => {
    return (
      <div key={i}>
        <Skeleton className="w-full h-full" height={isMobile ? 175 : 350} />
      </div>
    );
  });
};
