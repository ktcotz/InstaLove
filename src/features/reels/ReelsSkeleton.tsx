import Skeleton from "react-loading-skeleton";
import { useMediaQuery, useTernaryDarkMode } from "usehooks-ts";

const MOBILE_VIEWPORT = "640px";

export const ReelsSkeleton = () => {
  const isMobile = useMediaQuery(`(max-width:${MOBILE_VIEWPORT})`);
  const { isDarkMode } = useTernaryDarkMode();
  const MAX_EXPLORE_POSTS = 3;

  return (
    <div className="max-w-sm sm:max-w-xl mx-auto">
      {Array.from({ length: MAX_EXPLORE_POSTS }, (_, i) => {
        return (
          <div key={i}>
            <Skeleton
              className="w-full h-full"
              baseColor={isDarkMode ? "#000" : "#fff"}
              highlightColor={isDarkMode ? "#111" : "#f6f6f6"}
              height={isMobile ? 500 : 700}
            />
          </div>
        );
      })}
    </div>
  );
};
