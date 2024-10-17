import Skeleton from "react-loading-skeleton";
import { useTernaryDarkMode } from "usehooks-ts";

export const SearchUsersSkeleton = () => {
  const MAX_EXPLORE_POSTS = 8;
  const { isDarkMode } = useTernaryDarkMode();

  return Array.from({ length: MAX_EXPLORE_POSTS }, (_, i) => {
    return (
      <div key={i} className="flex gap-4">
        <Skeleton
          className="w-full h-full rounded-full"
          height={48}
          width={48}
          baseColor={isDarkMode ? "#000" : "#fff"}
          highlightColor={isDarkMode ? "#111" : "#f6f6f6"}
        />
        <div className="flex flex-col gap-1">
          <Skeleton
            width={200}
            baseColor={isDarkMode ? "#000" : "#fff"}
            highlightColor={isDarkMode ? "#111" : "#f6f6f6"}
          />
          <Skeleton
            width={100}
            baseColor={isDarkMode ? "#000" : "#fff"}
            highlightColor={isDarkMode ? "#111" : "#f6f6f6"}
          />
        </div>
      </div>
    );
  });
};
