import Skeleton from "react-loading-skeleton";
import { useTernaryDarkMode } from "usehooks-ts";

export const ProposedProfilesSkeleton = () => {
  const { isDarkMode } = useTernaryDarkMode();
  const MAX_EXPLORE_POSTS = 5;

  return Array.from({ length: MAX_EXPLORE_POSTS }, (_, i) => {
    return (
      <div key={i} className="flex justify-between">
        <Skeleton
          className="w-full h-full rounded-full"
          height={40}
          width={40}
          baseColor={isDarkMode ? "#000" : "#fff"}
          highlightColor={isDarkMode ? "#111" : "#f6f6f6"}
        />
        <Skeleton
          className="w-full h-full rounded-full"
          height={50}
          width={100}
          baseColor={isDarkMode ? "#000" : "#fff"}
          highlightColor={isDarkMode ? "#111" : "#f6f6f6"}
        />
      </div>
    );
  });
};
