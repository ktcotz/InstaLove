import Skeleton from "react-loading-skeleton";
import { useMediaQuery, useTernaryDarkMode } from "usehooks-ts";

export const MainScreenPostsSkeleton = () => {
  const { isDarkMode } = useTernaryDarkMode();
  const MAX_EXPLORE_POSTS = 3;

  const isMobile = useMediaQuery("(max-width:676px)");

  return Array.from({ length: MAX_EXPLORE_POSTS }, (_, i) => {
    return (
      <div key={i}>
        <Skeleton
          className="w-full h-full"
          height={isMobile ? 350 : 600}
          baseColor={isDarkMode ? "#000" : "#fff"}
          highlightColor={isDarkMode ? "#111" : "#f6f6f6"}
        />
      </div>
    );
  });
};
