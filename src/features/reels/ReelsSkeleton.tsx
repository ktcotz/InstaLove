import Skeleton from "react-loading-skeleton";
import { useMediaQuery } from "usehooks-ts";

const MOBILE_VIEWPORT = "640px";

export const ReelsSkeleton = () => {
  const isMobile = useMediaQuery(`(max-width:${MOBILE_VIEWPORT})`);

  const MAX_EXPLORE_POSTS = 3;

  return (
    <div className="max-w-sm sm:max-w-xl mx-auto">
      {Array.from({ length: MAX_EXPLORE_POSTS }, (_, i) => {
        return (
          <div key={i}>
            <Skeleton className="w-full h-full" height={isMobile ? 500 : 700} />
          </div>
        );
      })}
    </div>
  );
};
