import Skeleton from "react-loading-skeleton";
import { useTernaryDarkMode } from "usehooks-ts";

export const ChatBarSkeletonUsers = () => {
  const MAX_EXPLORE_POSTS = 6;
  const { isDarkMode } = useTernaryDarkMode();

  return Array.from({ length: MAX_EXPLORE_POSTS }, (_, i) => {
    return (
      <div key={i}>
        <Skeleton
          className="w-full h-full rounded-full"
          height={48}
          width={48}
          baseColor={isDarkMode ? "#000" : "#fff"}
          highlightColor={isDarkMode ? "#111" : "#f6f6f6"}
        />
      </div>
    );
  });
};
