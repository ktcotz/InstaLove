import Skeleton from "react-loading-skeleton";
import { useTernaryDarkMode } from "usehooks-ts";

export const StoriesSkeleton = () => {
  const MAX_EXPLORE_POSTS = 10;
  const { isDarkMode } = useTernaryDarkMode();

  return Array.from({ length: MAX_EXPLORE_POSTS }, (_, i) => {
    return (
      <div key={i}>
        <Skeleton
          className="w-full h-full rounded-full"
          height={56}
          width={56}
          baseColor={isDarkMode ? "#111" : "#fff"}
          highlightColor={isDarkMode ? "#222" : "#f6f6f6"}
        />
      </div>
    );
  });
};
