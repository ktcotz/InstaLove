import Skeleton from "react-loading-skeleton";
import { useTernaryDarkMode } from "usehooks-ts";

export const HoverProfileSkeleton = () => {
  const MAX_EXPLORE_POSTS = 3;
  const { isDarkMode } = useTernaryDarkMode();

  return Array.from({ length: MAX_EXPLORE_POSTS }, (_, i) => {
    return (
      <div key={i} className="w-full">
        <Skeleton
          className="w-full h-full"
          height={100}
          baseColor={isDarkMode ? "#000" : "#fff"}
          highlightColor={isDarkMode ? "#111" : "#f6f6f6"}
        />
      </div>
    );
  });
};
